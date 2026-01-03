import { environment as env } from "../utils/rsc";
import { asriConfigs, setCurMode, setI18n, setFollowSysAccentColor, setIsUserAccentGray, runtime, loadI18n, getLocalConfigs } from "./config";
import { asriPrstPalettes } from "./palette";
import { cssVarManager } from "./cssVar";
import { getSystemAccentColor } from "./palette";
import { handleGrayScale, reverseOnPrimaryLightness } from "./colorUtils";
import { coverImgColorManager, updateCoverImgColor } from "./palette";
import { hexToOklch } from "../utils/colorTools";
import { getFocusedProtyleInfo } from "../utils/misc";

export async function loadThemePalette() {
  // if (env.isIOSApp) return; // fix app crash
  // const i18n = await loadI18n();
  setCurMode(env.appSchemeMode);
  await getLocalConfigs();

  if (!env.supportOklch) return;

  // check local configs to set initial theme color
  const shouldUseCustomColor =
    env.isInBrowser ||
    env.isMobile ||
    env.isLinux ||
    (!runtime.followSysAccentColor && !asriConfigs[runtime.mode].followCoverImgColor);

  if (shouldUseCustomColor) {
    cssVarManager.setProperty("--asri-user-custom-accent", asriConfigs[runtime.mode].userCustomColor);
    cssVarManager.removeProperty("--asri-cover-dominant");
    reverseOnPrimaryLightness(asriConfigs[runtime.mode].userCustomColor);
  } else {
    cssVarManager.removeProperty("--asri-user-custom-accent");
    if (asriConfigs[runtime.mode].followCoverImgColor) cssVarManager.removeProperty("--asri-cover-dominant");
  }

  if (asriConfigs[runtime.mode].presetPalette) {
    const paletteID = asriConfigs[runtime.mode].presetPalette as keyof typeof asriPrstPalettes;
    const curPalette = asriPrstPalettes[paletteID][runtime.mode];

    document.documentElement.setAttribute("data-asri-palette", paletteID.split("-")[2]);
    setFollowSysAccentColor(false);
    cssVarManager.setProperty("--asri-user-custom-accent", curPalette.primary);
    cssVarManager.setProperty("--asri-c-factor", curPalette.chroma);
    cssVarManager.removeProperty("--asri-cover-dominant");
    setIsUserAccentGray(curPalette.chroma === "0" ? true : false);
    handleGrayScale(curPalette.chroma);
    reverseOnPrimaryLightness(curPalette.primary);
  } else if (asriConfigs[runtime.mode].followCoverImgColor) {
    cssVarManager.setProperty("--asri-c-factor", asriConfigs[runtime.mode].chroma);
    document.documentElement.removeAttribute("data-asri-palette");
    updateCoverImgColor();
  } else {
    cssVarManager.setProperty("--asri-c-factor", asriConfigs[runtime.mode].chroma);
    document.documentElement.removeAttribute("data-asri-palette");
    setIsUserAccentGray(asriConfigs[runtime.mode].chroma === "0" ? true : false);
    handleGrayScale(asriConfigs[runtime.mode].chroma);
  }
  getSystemAccentColor();

  if (asriConfigs.features.tfp) {
    document.body.classList.add("asri-tfp", "asri-tfp-" + asriConfigs.features.tfp);
  }

  // env.supportOklch && asriDoms.barMode?.addEventListener("click", customizeThemeColor);
}

export function unloadThemePalette() {
  // cssVarManager.removeProperty("--asri-user-custom-accent");
  // cssVarManager.removeProperty("--asri-sys-accent-grayscale");
  // cssVarManager.removeProperty("--asri-c-factor");
  // cssVarManager.removeProperty("--asri-sys-accent");
  // cssVarManager.removeProperty("--asri-sys-accent-accessible");
  // cssVarManager.removeProperty("--asri-c-0");
  // cssVarManager.removeProperty("--asri-on-primary-reverse");
  // cssVarManager.removeProperty("--asri-cover-dominant");
  cssVarManager.destory();
  coverImgColorManager.destory();
  // asriDoms.barMode?.removeEventListener("click", customizeThemeColor);
  document.body.classList.remove("asri-c-0");
  document.querySelectorAll(".asri-config").forEach((el) => el.remove());
}

export async function initI18n() {
  const i18n = await loadI18n();
  setI18n(i18n);
  return i18n;
}
