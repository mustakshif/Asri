import { hexToOklch } from "../../util/colorTools";
import { environment as env } from "../../util/rsc";
import { asriConfigs } from "./configs";
import { cssVarManager } from "./cssVarManager";
import { curMode, followSysAccentColor, isCoverImgColorGray, isSysAccentGray, isUserAccentGray } from "./state";

export const reverseThreshold = env.appSchemeMode === "light" ? 0.81 : 0.79;

/**
 * decide if use grayscale or not, if so return true, otherwise return false
 * @param {string | number} chroma
 * @returns boolean
 */

export function handleGrayScale(chroma: string | number) {
  const chromaValue = String(chroma);

  // console.log('chroma', chroma, 'followSysAccentColor', followSysAccentColor, 'isSysAccentGray', isSysAccentGray, 'isUserAccentGray', isUserAccentGray, 'isCoverImgColorGray', isCoverImgColorGray, "addCfactor0", chromaValue === "0" || (followSysAccentColor && isSysAccentGray) || isUserAccentGray || (isCoverImgColorGray && asriConfigs[curMode].followCoverImgColor));

  if (
    chromaValue === "0" ||
    (followSysAccentColor && isSysAccentGray) ||
    isUserAccentGray ||
    (isCoverImgColorGray && asriConfigs[curMode].followCoverImgColor)
  ) {
    console.log("addCfactor0");
    cssVarManager.setProperty("--asri-c-0", "0");
    return true;
  } else {
    cssVarManager.removeProperty("--asri-c-0");
    return false;
  }
}

export function reverseOnPrimaryLightness(hex: string) {
  const { L } = hexToOklch(hex) || {};
  if (L === undefined) return;
  if (L > reverseThreshold) {
    cssVarManager.setProperty("--asri-on-primary-reverse", env.appSchemeMode === "light" ? ".4" : ".3");
  } else {
    cssVarManager.removeProperty("--asri-on-primary-reverse");
  }
}
