import { hexToOklchL } from "../../util/misc";
import { environment as env } from "../../util/rsc";
import { cssVarManager } from "./cssVarManager";
import { followSysAccentColor, isSysAccentGray, isUserAccentGray } from "./state";

export const reverseThreshold = env.appSchemeMode === "light" ? 0.81 : 0.79;

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

export function reverseOnPrimaryLightness(hex: string) {
  const lightness = hexToOklchL(hex);
  if (!lightness) return;
  if (lightness > reverseThreshold) {
    cssVarManager.setProperty("--asri-on-primary-reverse", env.appSchemeMode === "light" ? ".4" : ".3");
  } else {
    cssVarManager.removeProperty("--asri-on-primary-reverse");
  }
}
