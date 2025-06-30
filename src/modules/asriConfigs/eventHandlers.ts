import { AsriEventListener } from "../../util/eventListeners";
import { debounce, getFocusedProtyleInfo } from "../../util/misc";
import { environment as env } from "../../util/rsc";
import { startFadeInFadeOutTranstition } from "../modeTransition";
import { cssVarManager } from "./cssVarManager";
import { asriConfigs, getLocalConfigs, updateAsriConfigs } from "./configs";
import { asriPrstPalettes } from "./palettes";
import {
  curMode,
  i18n,
  followSysAccentBtn,
  followCoverImgColorBtn,
  pickColorBtn,
  asriChromaSlider,
  colorPicker,
  followSysAccentColor,
  setFollowSysAccentColor,
  setIsUserAccentGray,
  sysAccentColor,
  isUserAccentGray,
  setFollowCoverImgColorBtn,
} from "./state";
import { getSystemAccentColor } from "./systemColor";
import { handleGrayScale, reverseOnPrimaryLightness } from "./util";
import { coverImgColorManager, updateCoverImgColor } from "./coverImgColor";

const debounceChramaValueSaving = debounce(updateAsriConfigs, 200);

export function initAsriConfigMenuItemClick() {
  if (!followSysAccentBtn || !pickColorBtn || !asriChromaSlider || !colorPicker || !followCoverImgColorBtn) return;

  // handle click events
  if (env.isInBrowser || env.isMobile || env.isLinux) {
    // followSysAccentColor = false;
    followSysAccentBtn.classList.add("fn__none");
  } else {
    followSysAccentBtn.addEventListener("mouseup", handleFollowSystemAccentBtnClick);
  }
  pickColorBtn.addEventListener("click", handlePickColorBtnClick);
  colorPicker.addEventListener("input", handleColorPickerInput);
  colorPicker.addEventListener("change", handleColorPickerChange);
  asriChromaSlider.addEventListener("input", handleChromaSliderInput);
  followCoverImgColorBtn.addEventListener("click", handleFollowCoverImgColorBtnClick);
}

function handleFollowSystemAccentBtnClick() {
  // if (followSysAccentBtn?.classList.contains('b3-menu__item--disabled')) return;

  if (followSysAccentColor) return;

  startFadeInFadeOutTranstition(600, () => {
    resetPresetPalette(false);

    document
      .querySelectorAll(".asri-config.b3-menu__item--selected")
      .forEach((el) => el.classList.remove("b3-menu__item--selected"));
    setFollowSysAccentColor(true);
    followSysAccentBtn!.classList.add("b3-menu__item--selected");
    // pickColorBtn!.classList.remove('b3-menu__item--selected');
    cssVarManager.removeProperty("--asri-user-custom-accent");
    cssVarManager.removeProperty("--asri-cover-dominant");

    asriConfigs[curMode].followSysAccentColor = true;
    asriConfigs[curMode].followCoverImgColor = false;
    getSystemAccentColor();
    updateAsriConfigs();
  });
}

function handleFollowCoverImgColorBtnClick() {
  if (asriConfigs[curMode].followCoverImgColor) return;
  resetPresetPalette();
  setFollowSysAccentColor(false);

  startFadeInFadeOutTranstition(600, async () => {
    document
      .querySelectorAll(".asri-config.b3-menu__item--selected")
      .forEach((el) => el.classList.remove("b3-menu__item--selected"));
    followCoverImgColorBtn!.classList.add("b3-menu__item--selected");
    asriConfigs[curMode].followCoverImgColor = true;
    asriConfigs[curMode].followSysAccentColor = false;

    const activeDocId = (await getFocusedProtyleInfo(undefined, true)).docID;

    updateCoverImgColor(activeDocId || "");
  });
}

function handlePickColorBtnClick(event: Event) {
  startFadeInFadeOutTranstition(600, () => {
    resetPresetPalette();
    if (document.documentElement.getAttribute("--asri-user-custom-accent")) return;
    setFollowSysAccentColor(false);
    document
      .querySelectorAll(".asri-config.b3-menu__item--selected")
      .forEach((el) => el.classList.remove("b3-menu__item--selected"));

    pickColorBtn!.classList.add("b3-menu__item--selected");

    cssVarManager.setProperty("--asri-user-custom-accent", asriConfigs[curMode].userCustomColor);
    cssVarManager.removeProperty("--asri-cover-dominant");

    handleGrayScale(asriConfigs[curMode].chroma);
    reverseOnPrimaryLightness(asriConfigs[curMode].userCustomColor);

    asriConfigs[curMode].userCustomColor = asriConfigs[curMode].userCustomColor;

    asriConfigs[curMode].followSysAccentColor = false;
    asriConfigs[curMode].followCoverImgColor = false;
    updateAsriConfigs();
  });
}

function handleColorPickerInput() {
  resetPresetPalette();
  const hexColor = colorPicker!.value;
  cssVarManager.setProperty("--asri-user-custom-accent", hexColor);
  reverseOnPrimaryLightness(hexColor);
}

function handleColorPickerChange() {
  // resetPresetPalette();
  followSysAccentBtn!.classList.remove("b3-menu__item--selected");
  pickColorBtn!.classList.add("b3-menu__item--selected");
  reverseOnPrimaryLightness(colorPicker!.value);

  asriConfigs[curMode].userCustomColor = colorPicker!.value;
  setFollowSysAccentColor(false);
  asriConfigs[curMode].followSysAccentColor = false;
  asriConfigs[curMode].followCoverImgColor = false;
  updateAsriConfigs();
}

function handleChromaSliderInput(this: any) {
  // if (asriChromaSlider?.classList.contains('b3-menu__item--disabled')) {
  //     this.value = asriConfigs[curMode].chroma;
  //     return;
  // }
  resetPresetPalette();
  const chromaValue = this.value;
  cssVarManager.setProperty("--asri-c-factor", chromaValue);
  this.parentElement!.ariaLabel = i18n["asriChroma"] + chromaValue;
  asriConfigs[curMode].chroma = chromaValue;

  setIsUserAccentGray(chromaValue === "0" ? true : false);

  handleGrayScale(chromaValue);

  debounceChramaValueSaving();
}

function resetPresetPalette(alterFollowSysAccentColor: boolean = true) {
  const curPresetPalette = document.documentElement.getAttribute("data-asri-palette");

  if (curPresetPalette === null) return;

  asriConfigs[curMode].presetPalette = "";
  document.getElementById(`prst-palette-${curPresetPalette}`)?.classList.remove("b3-menu__item--selected");
  document.documentElement.removeAttribute("data-asri-palette");

  const followSysAccentColorState = asriConfigs[curMode]["followSysAccentColor"];
  if (alterFollowSysAccentColor) setFollowSysAccentColor(followSysAccentColorState);

  if (followSysAccentColorState && !(env.isInBrowser || env.isMobile || env.isLinux)) {
    followSysAccentBtn!.classList.add("b3-menu__item--selected");
    cssVarManager.removeProperty("--asri-user-custom-accent");
    // asriConfigs[curMode].followSysAccentColor = true;
    // asriConfigs[curMode].followCoverImgColor = false;
    getSystemAccentColor();
  } else {
    pickColorBtn!.classList.add("b3-menu__item--selected");
    cssVarManager.setProperty(
      "--asri-user-custom-accent",
      asriConfigs[curMode].userCustomColor || sysAccentColor || "#3478f6"
    );
    // asriConfigs[curMode].followSysAccentColor = false;
  }

  cssVarManager.setProperty("--asri-c-factor", asriConfigs[curMode].chroma);
  setIsUserAccentGray(asriConfigs[curMode].chroma === "0" ? true : false);
  handleGrayScale(asriConfigs[curMode].chroma);
  reverseOnPrimaryLightness(!followSysAccentColor ? asriConfigs[curMode].userCustomColor : sysAccentColor);

  // updateAsriConfigs();
}

export const tfpMenuItemCallbackEventListener = new AsriEventListener(tfpMenuItemCallback);

function tfpMenuItemCallback(e: Event) {
  const target = (e.target as HTMLElement).closest('[id^="tfp-"]');
  if (!target) return;

  const tfpMenuItems = document.querySelectorAll('[id^="tfp-"]');
  if (target.id === "tfp-disable") {
    // disable all tfp features
    document.body.classList.remove("asri-tfp-acrylic", "asri-tfp-progressive", "asri-tfp", "asri-tfp-luminous");
    tfpMenuItems.forEach((item) => {
      item.classList.remove("b3-menu__item--selected");
    });
    asriConfigs.features.tfp = "";
  } else {
    // enable tfp features
    if (target.classList.contains("b3-menu__item--selected")) {
      document.body.classList.remove("asri-tfp", target.id.replace("tfp-", "asri-tfp-"));
      asriConfigs.features.tfp = "";
    } else {
      tfpMenuItems.forEach((item) => {
        item.classList.remove("b3-menu__item--selected");
      });
      document.body.classList.remove("asri-tfp-acrylic", "asri-tfp-progressive", "asri-tfp-luminous");
      document.body.classList.add("asri-tfp", target.id.replace("tfp-", "asri-tfp-"));
      asriConfigs.features.tfp = target.id.replace("tfp-", "");
    }
    target.classList.toggle("b3-menu__item--selected");
  }
  updateAsriConfigs();
}

export const paletteMenuItemClickEventListener = new AsriEventListener(paletteMenuItemCallback);

async function paletteMenuItemCallback(e: Event) {
  const target = (e.target as HTMLElement).closest('[id^="prst-palette-"]');
  if (!target) return;
  const asriChromaBtn = document.getElementById("asriChroma");
  const paletteID = target.id as keyof typeof asriPrstPalettes;
  const curPalette = asriPrstPalettes[paletteID][curMode];

  if (asriConfigs[curMode].presetPalette === paletteID) return;

  // document.querySelectorAll('[id^="prst-palette-"]').forEach((el) => el.classList.remove("b3-menu__item--selected"));
  document
    .querySelectorAll(".asri-config.b3-menu__item--selected")
    .forEach((el) => el.classList.remove("b3-menu__item--selected"));

  startFadeInFadeOutTranstition(600, () => {
    target.classList.add("b3-menu__item--selected");
    document.documentElement.setAttribute("data-asri-palette", paletteID.split("-")[2]);

    // pickColorBtn?.classList.add("b3-menu__item--disabled");
    // followSysAccentBtn?.classList.add("b3-menu__item--disabled");
    // asriChromaBtn?.classList.add("b3-menu__item--disabled");

    setFollowSysAccentColor(false);
    followSysAccentBtn!.classList.remove("b3-menu__item--selected");
    pickColorBtn!.classList.remove("b3-menu__item--selected");

    cssVarManager.setProperty("--asri-user-custom-accent", curPalette.primary);
    cssVarManager.setProperty("--asri-c-factor", curPalette.chroma);
    cssVarManager.removeProperty("--asri-cover-dominant");
    setIsUserAccentGray(curPalette.chroma === "0" ? true : false);

    handleGrayScale(curPalette.chroma);
    reverseOnPrimaryLightness(curPalette.primary);

    // 写入预设色板数据
    asriConfigs[curMode].presetPalette = paletteID;
    asriConfigs[curMode].followSysAccentColor = false;
    asriConfigs[curMode].followCoverImgColor = false;
    updateAsriConfigs();
  });
}
