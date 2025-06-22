import { remote } from "../../util/electron";
import { hexToHSL, hexToOklchL } from "../../util/misc";
import { environment as env } from "../../util/rsc";
import { cssVarManager } from "./cssVarManager";
import { setSysAccentColor, setIsSysAccentGray, followSysAccentColor, sysAccentColor, isSysAccentGray, isUserAccentGray } from "./state";

export function getSystemAccentColor() {
  if (!(env.isInBrowser || env.isMobile || env.isLinux)) {
    const accent = remote.systemPreferences.getAccentColor();
    const accentHex = "#" + accent.slice(0, 6);
    const accentHsl = hexToHSL(accentHex);
    if (!accentHsl) return;

    if (sysAccentColor !== accentHex) {
      cssVarManager.setProperty("--asri-sys-accent", accentHex);
      if (accentHsl.s > 0.28) cssVarManager.setProperty("--asri-sys-accent-accessible", accentHex);
      else cssVarManager.removeProperty("--asri-sys-accent-accessible");

      setIsSysAccentGray(accentHsl.s === 0 ? true : false);

      setSysAccentColor(accentHex);
    }

    if (followSysAccentColor) {
      handleGrayScale(accentHsl.s);
      reverseOnPrimaryLightness(accentHex);
    }
  }
}

/**
 * decide if use grayscale or not, if so return true, otherwise return false
 * @param {string | number} chroma
 * @returns boolean
 */
export function handleGrayScale(chroma: string | number) {
  // console.log('chroma', chroma, 'followSysAccentColor', followSysAccentColor, 'isSysAccentGray', isSysAccentGray, 'isUserAccentGray', isUserAccentGray);
  const chromaValue = String(chroma);
  if (chromaValue === "0" || (followSysAccentColor && isSysAccentGray) || isUserAccentGray) {
    cssVarManager.setProperty("--asri-c-0", "0");
    return true;
  } else {
    cssVarManager.removeProperty("--asri-c-0");
    return false;
  }
}

const reverseThreshold = env.appSchemeMode === "light" ? 0.81 : 0.79;
export function reverseOnPrimaryLightness(hex: string) {
  const lightness = hexToOklchL(hex);
  if (!lightness) return;
  if (lightness > reverseThreshold) {
    cssVarManager.setProperty("--asri-on-primary-reverse", env.appSchemeMode === "light" ? ".4" : ".3");
  } else {
    cssVarManager.removeProperty("--asri-on-primary-reverse");
  }
} 