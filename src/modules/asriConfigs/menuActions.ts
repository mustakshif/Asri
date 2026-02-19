import { startFadeInFadeOutTranstition } from "../modeTransition";
import { cssVarManager } from "./cssVarManager";
import { asriConfigs, updateAsriConfigs } from "./configs";
import { updateCoverImgColor } from "./coverImgColor";
import { asriPrstPalettes } from "./palettes";
import {
  curMode,
  followCoverImgColorBtn,
  followSysAccentBtn,
  followSysAccentColor,
  i18n,
  pickColorBtn,
  setFollowSysAccentColor,
  setIsUserAccentGray,
} from "./state";
import { getSystemAccentColor } from "./systemColor";
import { handleGrayScale, reverseOnPrimaryLightness } from "./util";

function clearSelectedAsriMenuItems() {
  document.querySelectorAll(".asri-config.b3-menu__item--selected").forEach((el) => {
    el.classList.remove("b3-menu__item--selected");
  });
}

export function resetPresetPaletteSelection() {
  const curPresetPalette = document.documentElement.getAttribute("data-asri-palette");
  if (curPresetPalette === null) return;

  asriConfigs[curMode].presetPalette = "";
  document.getElementById(`prst-palette-${curPresetPalette}`)?.classList.remove("b3-menu__item--selected");
  document.getElementById("asriChroma")?.classList.remove("b3-menu__item--disabled");
  document.documentElement.removeAttribute("data-asri-palette");
  cssVarManager.setProperty("--asri-c-factor", asriConfigs[curMode].chroma);
  setIsUserAccentGray(asriConfigs[curMode].chroma === "0");
}

export function selectFollowSystemAccent() {
  const systemAccentBtn = followSysAccentBtn;
  if (followSysAccentColor || !systemAccentBtn) return;

  startFadeInFadeOutTranstition(600, () => {
    resetPresetPaletteSelection();
    clearSelectedAsriMenuItems();

    setFollowSysAccentColor(true);
    systemAccentBtn.classList.add("b3-menu__item--selected");

    cssVarManager.removeProperty("--asri-user-custom-accent");
    cssVarManager.removeProperty("--asri-cover-dominant");

    asriConfigs[curMode].followSysAccentColor = true;
    asriConfigs[curMode].followCoverImgColor = false;
    getSystemAccentColor();
    void updateAsriConfigs();
  });
}

export function selectFollowCoverImgColor() {
  const coverColorBtn = followCoverImgColorBtn;
  if (asriConfigs[curMode].followCoverImgColor || !coverColorBtn) return;

  startFadeInFadeOutTranstition(600, () => {
    resetPresetPaletteSelection();
    setFollowSysAccentColor(false);
    clearSelectedAsriMenuItems();

    coverColorBtn.classList.add("b3-menu__item--selected");
    asriConfigs[curMode].followCoverImgColor = true;
    asriConfigs[curMode].followSysAccentColor = false;

    void updateCoverImgColor();
    void updateAsriConfigs();
  });
}

export function selectCustomColorMode() {
  const colorModeBtn = pickColorBtn;
  if (!colorModeBtn) return;

  startFadeInFadeOutTranstition(600, () => {
    resetPresetPaletteSelection();
    if (document.documentElement.getAttribute("--asri-user-custom-accent")) return;

    setFollowSysAccentColor(false);
    clearSelectedAsriMenuItems();

    colorModeBtn.classList.add("b3-menu__item--selected");
    cssVarManager.setProperty("--asri-user-custom-accent", asriConfigs[curMode].userCustomColor);
    cssVarManager.removeProperty("--asri-cover-dominant");

    asriConfigs[curMode].followSysAccentColor = false;
    asriConfigs[curMode].followCoverImgColor = false;
    handleGrayScale(asriConfigs[curMode].chroma);
    reverseOnPrimaryLightness(asriConfigs[curMode].userCustomColor);
    void updateAsriConfigs();
  });
}

export function previewCustomColor(hexColor: string) {
  requestAnimationFrame(() => {
    cssVarManager.setProperty("--asri-user-custom-accent", hexColor);
    reverseOnPrimaryLightness(hexColor);
  });
}

export function commitCustomColor(hexColor: string) {
  followSysAccentBtn?.classList.remove("b3-menu__item--selected");
  pickColorBtn?.classList.add("b3-menu__item--selected");
  reverseOnPrimaryLightness(hexColor);

  asriConfigs[curMode].userCustomColor = hexColor;
  setFollowSysAccentColor(false);
  asriConfigs[curMode].followSysAccentColor = false;
  asriConfigs[curMode].followCoverImgColor = false;
  void updateAsriConfigs();
}

export function updateChroma(chromaValue: string, ariaTarget?: Element | null) {
  requestAnimationFrame(() => {
    cssVarManager.setProperty("--asri-c-factor", chromaValue);
    if (ariaTarget) ariaTarget.ariaLabel = i18n["asriChroma"] + chromaValue;
    asriConfigs[curMode].chroma = chromaValue;

    setIsUserAccentGray(chromaValue === "0");
    handleGrayScale(chromaValue);
  });
}

export function applyTfpMenuSelection(target: HTMLElement) {
  const tfpMenuItems = document.querySelectorAll('[id^="tfp-"]');

  if (target.id === "tfp-disable") {
    document.body.classList.remove("asri-tfp-acrylic", "asri-tfp-progressive", "asri-tfp", "asri-tfp-luminous");
    tfpMenuItems.forEach((item) => item.classList.remove("b3-menu__item--selected"));
    asriConfigs.features.tfp = "";
    void updateAsriConfigs();
    return;
  }

  if (target.classList.contains("b3-menu__item--selected")) {
    document.body.classList.remove("asri-tfp", target.id.replace("tfp-", "asri-tfp-"));
    asriConfigs.features.tfp = "";
  } else {
    tfpMenuItems.forEach((item) => item.classList.remove("b3-menu__item--selected"));
    document.body.classList.remove("asri-tfp-acrylic", "asri-tfp-progressive", "asri-tfp-luminous");
    document.body.classList.add("asri-tfp", target.id.replace("tfp-", "asri-tfp-"));
    asriConfigs.features.tfp = target.id.replace("tfp-", "");
  }

  target.classList.toggle("b3-menu__item--selected");
  void updateAsriConfigs();
}

export function applyPresetPaletteSelection(target: HTMLElement) {
  const paletteID = target.id as keyof typeof asriPrstPalettes;
  if (asriConfigs[curMode].presetPalette === paletteID) return;

  const asriChromaBtn = document.getElementById("asriChroma");
  const curPalette = asriPrstPalettes[paletteID][curMode];

  startFadeInFadeOutTranstition(600, () => {
    clearSelectedAsriMenuItems();
    asriChromaBtn?.classList.add("b3-menu__item--disabled");
    target.classList.add("b3-menu__item--selected");
    document.documentElement.setAttribute("data-asri-palette", paletteID.split("-")[2]);

    setFollowSysAccentColor(false);
    followSysAccentBtn?.classList.remove("b3-menu__item--selected");
    pickColorBtn?.classList.remove("b3-menu__item--selected");

    cssVarManager.setProperty("--asri-user-custom-accent", curPalette.primary);
    cssVarManager.setProperty("--asri-c-factor", curPalette.chroma);
    cssVarManager.removeProperty("--asri-cover-dominant");
    setIsUserAccentGray(curPalette.chroma === "0");

    asriConfigs[curMode].presetPalette = paletteID;
    asriConfigs[curMode].followSysAccentColor = false;
    asriConfigs[curMode].followCoverImgColor = false;

    handleGrayScale(curPalette.chroma);
    reverseOnPrimaryLightness(curPalette.primary);
    void updateAsriConfigs();
  });
}
