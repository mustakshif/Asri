/**
 * 颜色和调色板管理
 */

import { FastAverageColor, type FastAverageColorOptions } from "fast-average-color";
import { remote } from "../utils/electron";
import { convertToHex, extractFirstColorFromCSSBackground, hexToHSL, hexToOklch } from "../utils/colorTools";
import { getFocusedProtyleInfo } from "../utils/misc";
import { environment as env } from "../utils/rsc";
import { asriConfigs, runtime, setIsCoverImgColorGray, setSysAccentColor, setIsSysAccentGray } from "./config";
import { cssVarManager } from "./cssVar";
import { handleGrayScale, reverseOnPrimaryLightness } from "./colorUtils";

// ============================================================================
// Preset Palettes (精简格式)
// ============================================================================

type PaletteMode = { primary: string; chroma: string; followSysAccentColor: boolean };
type PresetPalette = { dark: PaletteMode; light: PaletteMode };

const createPalette = (darkPrimary: string, darkChroma: string, lightPrimary: string, lightChroma: string): PresetPalette => ({
  dark: { primary: darkPrimary, chroma: darkChroma, followSysAccentColor: false },
  light: { primary: lightPrimary, chroma: lightChroma, followSysAccentColor: false },
});

export const asriPrstPalettes: Record<string, PresetPalette> = {
  "prst-palette-auriflow": createPalette("#D2B983", "0.3", "#F4D18B", "0"),
  "prst-palette-everbliss": createPalette("#13012a", "1.5", "#F4CA57", "2.8"),
  "prst-palette-aerisland": createPalette("#111a3f", "2", "#e6f9db", "2"),
  "prst-palette-zerith": createPalette("#ABC3D9", "2.4", "#C2E2DF", "0.7"),
  "prst-palette-polar": createPalette("#E6E9EF", "0", "#1B1C1D", "0"),
  "prst-palette-stellula": createPalette("#3B2731", "0.6", "#FFF4EB", "2.5"),
  "prst-palette-vael": createPalette("#96c4df", "2.5", "#FFFCF3", "1.2"),
};

// ============================================================================
// System Accent Color
// ============================================================================

export function getSystemAccentColor() {
  if (env.isInBrowser || env.isMobile || env.isLinux) return;

  const accentHex = "#" + remote.systemPreferences.getAccentColor().slice(0, 6);
  const accentHsl = hexToHSL(accentHex);
  if (!accentHsl) return;

  if (runtime.sysAccentColor !== accentHex) {
    cssVarManager.setProperty("--asri-sys-accent", accentHex);
    if (accentHsl.s > 0.28) cssVarManager.setProperty("--asri-sys-accent-accessible", accentHex);
    else cssVarManager.removeProperty("--asri-sys-accent-accessible");

    setIsSysAccentGray(accentHsl.s === 0);
    setSysAccentColor(accentHex);
  }

  if (runtime.followSysAccentColor) {
    handleGrayScale(accentHsl.s);
    reverseOnPrimaryLightness(accentHex);
  }
}

// ============================================================================
// Cover Image Color (精简单例 + 合并函数)
// ============================================================================

const fac = new FastAverageColor();

export const coverImgColorManager = {
  async getSourceType(activeDocId?: string): Promise<{ type: "img" | "vid" | "css"; source: string | HTMLImageElement | HTMLVideoElement } | null> {
    const protyle = (await getFocusedProtyleInfo(activeDocId, true)).protyle;
    if (!protyle) return null;

    const bgParent = protyle.querySelector(`.protyle-background__img:not(.fn__none)`);
    if (!bgParent) return null;

    const bgImg = bgParent.querySelector(`&>img`) as HTMLImageElement;
    const bgVid = bgParent.querySelector(`&>video`) as HTMLVideoElement;

    // Check CSS background first
    if (bgImg?.style) {
      const { backgroundColor, backgroundImage } = bgImg.style;
      if (backgroundColor) return { type: "css", source: convertToHex(backgroundColor) };
      if (backgroundImage) {
        const color = extractFirstColorFromCSSBackground(backgroundImage);
        return { type: "css", source: color || "#3478f6" };
      }
    }

    if (bgVid) return { type: "vid", source: bgVid };
    if (bgImg) return { type: "img", source: bgImg };
    return null;
  },

  async getColor(sourceEl: HTMLImageElement | HTMLVideoElement, options?: FastAverageColorOptions): Promise<string | undefined> {
    if (!sourceEl) return;
    const color = sourceEl instanceof HTMLImageElement
      ? await fac.getColorAsync(sourceEl, options)
      : fac.getColor(sourceEl, options);
    return color.hex;
  },

  destroy() {
    fac.destroy();
  },

  // 兼容旧代码的拼写错误
  destory() {
    this.destroy();
  },
};

export async function getCoverImgColor(activeDocId?: string): Promise<string | undefined> {
  const sourceType = await coverImgColorManager.getSourceType(activeDocId);
  if (!sourceType) return;

  if (sourceType.type === "css") return sourceType.source as string;
  return coverImgColorManager.getColor(sourceType.source as HTMLImageElement | HTMLVideoElement, { algorithm: "dominant" });
}

export async function updateCoverImgColor(activeDocId?: string) {
  const color = await getCoverImgColor(activeDocId);
  const prevColor = cssVarManager.getAllVars().get("--asri-cover-dominant");

  let targetColor: string;
  let colorChroma: number;

  if (!color) {
    targetColor = prevColor || asriConfigs[runtime.mode].userCustomColor;
    colorChroma = prevColor ? (hexToOklch(prevColor)?.C || 0) : parseFloat(asriConfigs[runtime.mode].chroma) || 0;
  } else {
    targetColor = color;
    colorChroma = hexToOklch(color)?.C || 0;
  }

  cssVarManager.setProperty("--asri-cover-dominant", targetColor);

  const isGray = colorChroma.toFixed(3) === "0.000";
  setIsCoverImgColorGray(isGray);

  if (isGray || asriConfigs[runtime.mode].chroma === "0") {
    colorChroma = 0;
  }

  console.log("isCoverImgColorGray", targetColor, colorChroma, runtime.isCoverImgColorGray);

  handleGrayScale(colorChroma);
  reverseOnPrimaryLightness(targetColor);
}
