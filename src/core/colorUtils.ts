/**
 * 颜色工具函数
 * 处理灰度、亮度反转等颜色相关操作
 */

import { hexToOklch } from "../utils/colorTools";
import { environment as env } from "../utils/rsc";
import { asriConfigs, runtime } from "./config";
import { cssVarManager } from "./cssVar";

export const reverseThreshold = env.appSchemeMode === "light" ? 0.74 : 0.79;

/**
 * decide if use grayscale or not, if so return true, otherwise return false
 * @param {string | number} chroma
 * @returns boolean
 */

export function handleGrayScale(chroma: string | number) {
  const chromaValue = String(chroma);

  // console.log('chroma', chroma, 'followSysAccentColor', runtime.followSysAccentColor, 'isSysAccentGray', runtime.isSysAccentGray, 'isUserAccentGray', runtime.isUserAccentGray, 'isCoverImgColorGray', runtime.isCoverImgColorGray, "addCfactor0", chromaValue === "0" || (runtime.followSysAccentColor && runtime.isSysAccentGray) || runtime.isUserAccentGray || (runtime.isCoverImgColorGray && asriConfigs[runtime.mode].followCoverImgColor));

  if (
    chromaValue === "0" ||
    (runtime.followSysAccentColor && runtime.isSysAccentGray) ||
    runtime.isUserAccentGray ||
    (runtime.isCoverImgColorGray && asriConfigs[runtime.mode].followCoverImgColor)
  ) {
    console.log("addCfactor0");
    requestAnimationFrame(() => {
      cssVarManager.setProperty("--asri-c-0", "0");
      document.body.classList.add("asri-c-0");
      addHdrSupportImage();
    });
    return true;
  } else {
    requestAnimationFrame(() => {
      cssVarManager.removeProperty("--asri-c-0");
      document.body.classList.remove("asri-c-0");
      removeHdrSupportImage();
    });
    return false;
  }
}

export function reverseOnPrimaryLightness(hex: string) {
  const { L } = hexToOklch(hex) || {};
  console.log("reverseOnPrimaryLightness", hex, L);
  if (L === undefined) return;
  if (L > reverseThreshold) {
    cssVarManager.setProperty("--asri-on-primary-reverse", env.appSchemeMode === "light" ? ".3" : ".2");
  } else {
    cssVarManager.removeProperty("--asri-on-primary-reverse");
  }
}

export function addHdrSupportImage() {
  // 检查浏览器是否支持HDR
  if (
    window.matchMedia &&
    window.matchMedia("(color-gamut: p3)").matches &&
    !document.querySelector(".asri-hdr-support-image") &&
    env.appSchemeMode === "light"
  ) {
    const img = document.createElement("img");
    img.src = "/appearance/themes/Asri/hdr.jpg"; // source: https://github.com/ardov/hdr-web
    img.style.position = "fixed";
    img.style.pointerEvents = "none";
    img.style.width = "1px";
    img.style.height = "1px";
    img.classList.add("asri-hdr-support-image");
    document.body.appendChild(img);
  }
}

export function removeHdrSupportImage() {
  const hdrImage = document.querySelector(".asri-hdr-support-image");
  if (hdrImage) {
    hdrImage.remove();
  }
}
