/**
 * 颜色和调色板管理
 * 负责预设调色板、封面图片颜色跟随和系统颜色获取
 */

import { FastAverageColor, FastAverageColorOptions } from "fast-average-color";
import { remote } from "../utils/electron";
import { convertToHex, extractFirstColorFromCSSBackground, hexToHSL, hexToOklch } from "../utils/colorTools";
import { getFocusedProtyleInfo } from "../utils/misc";
import { environment as env } from "../utils/rsc";
import { asriConfigs, runtime, setIsCoverImgColorGray, setSysAccentColor, setIsSysAccentGray, colorPicker } from "./config";
import { cssVarManager } from "./cssVar";
import { handleGrayScale, reverseOnPrimaryLightness } from "./colorUtils";

// ============================================================================
// 预设调色板数据
// ============================================================================

export const asriPrstPalettes: Record<string, PresetPalette> = {
  "prst-palette-auriflow": {
    "dark": {
      "primary": "#D2B983",
      "chroma": "0.3",
      "followSysAccentColor": false,
    },
    "light": {
      "primary": "#F4D18B",
      "chroma": "0",
      "followSysAccentColor": false,
    },
  },

  "prst-palette-everbliss": {
    "dark": {
      "primary": "#13012a",
      "chroma": "1.5",
      "followSysAccentColor": false,
    },
    "light": {
      "primary": "#F4CA57",
      "chroma": "2.8",
      "followSysAccentColor": false,
    },
  },

  "prst-palette-aerisland": {
    "dark": {
      "primary": "#111a3f",
      "chroma": "2",
      "followSysAccentColor": false,
    },
    "light": {
      "primary": "#e6f9db", // 饱和度需要高一点，修复Safari显示为红色的问题
      "chroma": "2",
      "followSysAccentColor": false,
    },
  },

  "prst-palette-zerith": {
    "dark": {
      "primary": "#ABC3D9",
      "chroma": "2.4",
      "followSysAccentColor": false,
    },
    "light": {
      "primary": "#C2E2DF",
      "chroma": "0.7",
      "followSysAccentColor": false,
    },
  },

  "prst-palette-polar": {
    "dark": {
      "primary": "#E6E9EF",
      "chroma": "0",
      "followSysAccentColor": false,
    },
    "light": {
      "primary": "#1B1C1D",
      "chroma": "0",
      "followSysAccentColor": false,
    },
  },

  "prst-palette-stellula": {
    "dark": {
      "primary": "#3B2731",
      "chroma": "0.6",
      "followSysAccentColor": false,
    },
    "light": {
      "primary": "#FFF4EB",
      "chroma": "2.5",
      "followSysAccentColor": false,
    },
  },

  "prst-palette-vael": {
    "dark": {
      "primary": "#96c4df",
      "chroma": "2.5",
      "followSysAccentColor": false,
    },
    "light": {
      "primary": "#FFFCF3",
      "chroma": "1.2",
      "followSysAccentColor": false,
    },
  },
};

// ============================================================================
// 系统颜色获取
// ============================================================================

export function getSystemAccentColor() {
  if (env.isInBrowser || env.isMobile || env.isLinux) return;

  const accent = remote.systemPreferences.getAccentColor();
  const accentHex = "#" + accent.slice(0, 6);
  const accentHsl = hexToHSL(accentHex);
  if (!accentHsl) return;

  if (runtime.sysAccentColor !== accentHex) {
    cssVarManager.setProperty("--asri-sys-accent", accentHex);
    if (accentHsl.s > 0.28) cssVarManager.setProperty("--asri-sys-accent-accessible", accentHex);
    else cssVarManager.removeProperty("--asri-sys-accent-accessible");

    setIsSysAccentGray(accentHsl.s === 0 ? true : false);

    setSysAccentColor(accentHex);
  }

  if (runtime.followSysAccentColor) {
    handleGrayScale(accentHsl.s);
    reverseOnPrimaryLightness(accentHex);
  }
}

// ============================================================================
// 封面图片颜色跟随
// ============================================================================

const fac = new FastAverageColor();

class CoverImgColorManager {
  private static instance: CoverImgColorManager | null = null;

  private constructor() {}

  public static getInstance(): CoverImgColorManager {
    if (!CoverImgColorManager.instance) {
      CoverImgColorManager.instance = new CoverImgColorManager();
    }
    return CoverImgColorManager.instance;
  }

  /**
   * @param activeDocId - The ID of the active document
   * @returns a subject of the type of the source image (img/vid/css) and the source image element/hex color, or null if no source image is found
   */
  async getSourceType(activeDocId?: string) {
    const curProtyle = (await getFocusedProtyleInfo(activeDocId, true)).protyle;
    let res: { type: "img" | "vid" | "css"; source: string | HTMLImageElement | HTMLVideoElement } | null = null;

    if (!curProtyle) return res;

    const backgroundParentElement = curProtyle.querySelector(`.protyle-background__img:not(.fn__none)`);

    if (!backgroundParentElement) return res;

    const backgroundImgElement = backgroundParentElement.querySelector(`&>img`) as HTMLImageElement;
    const backgroundVidElement = backgroundParentElement.querySelector(`&>video`) as HTMLVideoElement;

    if (backgroundImgElement.style) {
      const style = backgroundImgElement.style;

      if (style.backgroundColor) {
        return (res = {
          type: "css",
          source: convertToHex(style.backgroundColor),
        });
      }

      if (style.backgroundImage) {
        const cssText = style.backgroundImage;
        let parsedColor: string | null = extractFirstColorFromCSSBackground(cssText);

        return (res = {
          type: "css",
          source: parsedColor || "#3478f6",
        });
      }
    }

    if (backgroundVidElement) {
      return (res = {
        type: "vid",
        source: backgroundVidElement,
      });
    }
    if (backgroundImgElement) {
      return (res = {
        type: "img",
        source: backgroundImgElement,
      });
    }

    return res;
  }

  getSourceImg(activeDocId: string) {
    const sourceImg = document.querySelector(
      `.protyle:not(.fn__none)[data-id="${activeDocId}"] .protyle-background__img:not(.fn__none)> img`
    ) as HTMLImageElement;
    return sourceImg || null;
  }

  getSourceVid(activeDocId: string) {
    const sourceVid = document.querySelector(
      `.protyle:not(.fn__none)[data-id="${activeDocId}"] .protyle-background__img:not(.fn__none)> video`
    ) as HTMLVideoElement;
    return sourceVid || null;
  }

  async getCoverImgColorAsync(
    sourceImg: HTMLImageElement,
    option: FastAverageColorOptions = { algorithm: "dominant" }
  ) {
    if (!sourceImg) return;
    const color = await fac.getColorAsync(sourceImg, option);
    return color.hex;
  }

  getCoverVidColor(sourceVid: HTMLVideoElement, option: FastAverageColorOptions = { algorithm: "dominant" }) {
    if (!sourceVid) return;
    const color = fac.getColor(sourceVid, option);
    return color.hex;
  }

  destory() {
    fac.destroy();
    CoverImgColorManager.instance = null;
  }
}

export const coverImgColorManager = CoverImgColorManager.getInstance();

export async function getCoverImgColor(activeDocId?: string) {
  const sourceType = await coverImgColorManager.getSourceType(activeDocId);
  if (!sourceType) return;

  if (sourceType.type === "css") {
    return sourceType.source as string;
  }

  if (sourceType.type === "vid") {
    return coverImgColorManager.getCoverVidColor(sourceType.source as HTMLVideoElement) as string;
  }

  if (sourceType.type === "img") {
    return (await coverImgColorManager.getCoverImgColorAsync(sourceType.source as HTMLImageElement)) as string;
  }
}

export async function updateCoverImgColor(activeDocId?: string) {
  const color = await getCoverImgColor(activeDocId);
  const prevColor = cssVarManager.getAllVars().get("--asri-cover-dominant");

  let targetColor: string;
  let colorChroma: number;

  if (!color) {
    if (!prevColor) {
      targetColor = asriConfigs[runtime.mode].userCustomColor;
      colorChroma = parseFloat(asriConfigs[runtime.mode].chroma) || 0;
    } else {
      targetColor = prevColor;
      colorChroma = hexToOklch(prevColor)?.C || 0;
    }
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
