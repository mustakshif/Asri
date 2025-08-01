import { environment as env } from "../../util/rsc";
import { loadI18n } from "./i18n";
import { getLocalConfigs, asriConfigs } from "./configs";
import { asriPrstPalettes } from "./palettes";
import {
  setCurMode,
  setI18n,
  setFollowSysAccentColor,
  setIsUserAccentGray,
  followSysAccentColor,
  curMode,
} from "./state";
import { cssVarManager } from "./cssVarManager";
import { getSystemAccentColor } from "./systemColor";
import { handleGrayScale, reverseOnPrimaryLightness } from "./util";
import { coverImgColorManager, updateCoverImgColor } from "./coverImgColor";
import { hexToOklch } from "../../util/colorTools";
import { getFocusedProtyleInfo } from "../../util/misc";

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
    (!followSysAccentColor && !asriConfigs[curMode].followCoverImgColor);

  if (shouldUseCustomColor) {
    cssVarManager.setProperty("--asri-user-custom-accent", asriConfigs[curMode].userCustomColor);
    cssVarManager.removeProperty("--asri-cover-dominant");
    reverseOnPrimaryLightness(asriConfigs[curMode].userCustomColor);
  } else {
    cssVarManager.removeProperty("--asri-user-custom-accent");
    if (asriConfigs[curMode].followCoverImgColor) cssVarManager.removeProperty("--asri-cover-dominant");
  }

  if (asriConfigs[curMode].presetPalette) {
    const paletteID = asriConfigs[curMode].presetPalette as keyof typeof asriPrstPalettes;
    const curPalette = asriPrstPalettes[paletteID][curMode];

    document.documentElement.setAttribute("data-asri-palette", paletteID.split("-")[2]);
    setFollowSysAccentColor(false);
    cssVarManager.setProperty("--asri-user-custom-accent", curPalette.primary);
    cssVarManager.setProperty("--asri-c-factor", curPalette.chroma);
    cssVarManager.removeProperty("--asri-cover-dominant");
    setIsUserAccentGray(curPalette.chroma === "0" ? true : false);
    handleGrayScale(curPalette.chroma);
    reverseOnPrimaryLightness(curPalette.primary);
  } else if (asriConfigs[curMode].followCoverImgColor) {
    cssVarManager.setProperty("--asri-c-factor", asriConfigs[curMode].chroma);
    document.documentElement.removeAttribute("data-asri-palette");
    updateCoverImgColor();
  } else {
    cssVarManager.setProperty("--asri-c-factor", asriConfigs[curMode].chroma);
    document.documentElement.removeAttribute("data-asri-palette");
    setIsUserAccentGray(asriConfigs[curMode].chroma === "0" ? true : false);
    handleGrayScale(asriConfigs[curMode].chroma);
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
