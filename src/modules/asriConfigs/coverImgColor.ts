import { FastAverageColor, FastAverageColorOptions } from "fast-average-color";
import { convertToHex, extractFirstColorFromCSSBackground, hexToOklch } from "../../util/colorTools";
import { getFocusedProtyleInfo } from "../../util/misc";
import { asriConfigs } from "./configs";
import { cssVarManager } from "./cssVarManager";
import { curMode, isCoverImgColorGray, setIsCoverImgColorGray } from "./state";
import { handleGrayScale, reverseOnPrimaryLightness } from "./util";

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
      `.protyle:not(.fn__none)[data-id="${activeDocId}] .protyle-background__img:not(.fn__none)> img`
    ) as HTMLImageElement;
    return sourceImg || null;
  }

  getSourceVid(activeDocId: string) {
    const sourceVid = document.querySelector(
      `.protyle:not(.fn__none)[data-id="${activeDocId}] .protyle-background__img:not(.fn__none)> video`
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
      targetColor = asriConfigs[curMode].userCustomColor;
      colorChroma = parseFloat(asriConfigs[curMode].chroma) || 0;
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

  if (isGray || asriConfigs[curMode].chroma === "0") {
    colorChroma = 0;
  }

  console.log("isCoverImgColorGray", targetColor, colorChroma, isCoverImgColorGray);

  handleGrayScale(colorChroma);
  reverseOnPrimaryLightness(targetColor);
}
