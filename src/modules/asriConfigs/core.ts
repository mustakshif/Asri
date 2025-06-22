import { environment as env } from "../../util/rsc";
import { loadI18n } from "./i18n";
import { getAsriConfigs, asriConfigs } from "./configs";
import { asriPrstPalettes } from "./palettes";
import { setCurMode, setI18n, setFollowSysAccentColor, setIsUserAccentGray, followSysAccentColor } from "./state";
import { cssVarManager } from "./cssVarManager";
import { getSystemAccentColor, handleGrayScale, reverseOnPrimaryLightness } from "./systemColor";

export async function loadThemePalette() {
  // if (env.isIOSApp) return; // fix app crash
  // const i18n = await loadI18n();
  setCurMode(env.appSchemeMode);
  await getAsriConfigs();

  if (!env.supportOklch) return;

  // check local configs to set initial theme color
  if (!(env.isInBrowser || env.isMobile || env.isLinux)) {
    if (followSysAccentColor) {
      cssVarManager.removeProperty("--asri-user-custom-accent");
    } else {
      cssVarManager.setProperty("--asri-user-custom-accent", asriConfigs[env.appSchemeMode].userCustomColor);
      reverseOnPrimaryLightness(asriConfigs[env.appSchemeMode].userCustomColor);
    }
  } else {
    cssVarManager.setProperty("--asri-user-custom-accent", asriConfigs[env.appSchemeMode].userCustomColor);
    reverseOnPrimaryLightness(asriConfigs[env.appSchemeMode].userCustomColor);
  }

  if (asriConfigs[env.appSchemeMode].presetPalette) {
    const paletteID = asriConfigs[env.appSchemeMode].presetPalette as keyof typeof asriPrstPalettes;
    const curPalette = asriPrstPalettes[paletteID][env.appSchemeMode];

    document.documentElement.setAttribute("data-asri-palette", paletteID.split("-")[2]);
    setFollowSysAccentColor(false);
    cssVarManager.setProperty("--asri-user-custom-accent", curPalette.primary);
    cssVarManager.setProperty("--asri-c-factor", curPalette.chroma);
    setIsUserAccentGray(curPalette.chroma === "0" ? true : false);
    handleGrayScale(curPalette.chroma);
    reverseOnPrimaryLightness(curPalette.primary);
  } else {
    cssVarManager.setProperty("--asri-c-factor", asriConfigs[env.appSchemeMode].chroma);
    document.documentElement.removeAttribute("data-asri-palette");
    setIsUserAccentGray(asriConfigs[env.appSchemeMode].chroma === "0" ? true : false);
    handleGrayScale(asriConfigs[env.appSchemeMode].chroma);
  }
  getSystemAccentColor();

  if (asriConfigs.features.tfp) {
    document.body.classList.add("asri-tfp", "asri-tfp-" + asriConfigs.features.tfp);
  }

  // env.supportOklch && asriDoms.barMode?.addEventListener("click", customizeThemeColor);
}

export function unloadThemePalette() {
  cssVarManager.removeProperty("--asri-user-custom-accent");
  cssVarManager.removeProperty("--asri-sys-accent-grayscale");
  cssVarManager.removeProperty("--asri-c-factor");
  cssVarManager.removeProperty("--asri-sys-accent");
  cssVarManager.removeProperty("--asri-sys-accent-accessible");
  cssVarManager.removeProperty("--asri-c-0");
  cssVarManager.removeProperty("--asri-on-primary-reverse");
  // asriDoms.barMode?.removeEventListener("click", customizeThemeColor);
  document.querySelectorAll(".asri-config").forEach((el) => el.remove());
}

export async function initI18n() {
  const i18n = await loadI18n();
  setI18n(i18n);
  return i18n;
}
