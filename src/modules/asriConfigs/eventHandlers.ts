import { AsriEventListener } from "../../util/eventListeners";
import { debounce } from "../../util/misc";
import { environment as env } from "../../util/rsc";
import { startFadeInFadeOutTranstition } from "../modeTransition";
import { cssVarManager } from "./cssVarManager";
import { asriConfigs, updateAsriConfigs } from "./configs";
import { asriPrstPalettes } from "./palettes";
import {
  curMode,
  i18n,
  followSysAccentBtn,
  pickColorBtn,
  asriChromaSlider,
  colorPicker,
  followSysAccentColor,
  setFollowSysAccentColor,
  setIsUserAccentGray,
  sysAccentColor,
  isUserAccentGray,
} from "./state";
import { getSystemAccentColor, handleGrayScale, reverseOnPrimaryLightness } from "./systemColor";

const debounceChramaValueSaving = debounce(updateAsriConfigs, 200);

export function initAsriConfigMenuItemClick() {
  if (!followSysAccentBtn || !pickColorBtn || !asriChromaSlider || !colorPicker) return;

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
}

export function handleFollowSystemAccentBtnClick() {
  // if (followSysAccentBtn?.classList.contains('b3-menu__item--disabled')) return;
  startFadeInFadeOutTranstition(600, () => {
    document
      .querySelectorAll(".asri-config.b3-menu__item--selected")
      .forEach((el) => el.classList.remove("b3-menu__item--selected"));
    if (!asriConfigs[curMode].followSysAccentColor) {
      setFollowSysAccentColor(true);
      followSysAccentBtn!.classList.add("b3-menu__item--selected");
      // pickColorBtn!.classList.remove('b3-menu__item--selected');
      cssVarManager.removeProperty("--asri-user-custom-accent");

      asriConfigs[curMode].followSysAccentColor = true;
      getSystemAccentColor();
    } else {
      setFollowSysAccentColor(false);
      // followSysAccentBtn!.classList.remove('b3-menu__item--selected');
      pickColorBtn!.classList.add("b3-menu__item--selected");
      cssVarManager.setProperty(
        "--asri-user-custom-accent",
        asriConfigs[curMode].userCustomColor || sysAccentColor || "#3478f6"
      );

      handleGrayScale(asriConfigs[curMode].chroma);
      reverseOnPrimaryLightness(asriConfigs[curMode].userCustomColor || sysAccentColor || "#3478f6");

      asriConfigs[curMode].followSysAccentColor = false;
    }
    updateAsriConfigs();
  });
}

export function handlePickColorBtnClick(event: Event) {
  // if (pickColorBtn?.classList.contains('b3-menu__item--disabled')) {
  //     event.preventDefault();
  //     return;
  // };
  // document.querySelectorAll('.asri-config.b3-menu__item--selected').forEach(el => el.classList.remove('b3-menu__item--selected'));

  startFadeInFadeOutTranstition(600, () => {
    if (!followSysAccentColor) return;

    setFollowSysAccentColor(false);
    followSysAccentBtn!.classList.remove("b3-menu__item--selected");
    pickColorBtn!.classList.add("b3-menu__item--selected");

    cssVarManager.setProperty("--asri-user-custom-accent", asriConfigs[curMode].userCustomColor);

    handleGrayScale(asriConfigs[curMode].chroma);
    reverseOnPrimaryLightness(asriConfigs[curMode].userCustomColor);

    asriConfigs[curMode].userCustomColor = asriConfigs[curMode].userCustomColor;

    asriConfigs[curMode].followSysAccentColor = false;
    updateAsriConfigs();
  });
}

export function handleColorPickerInput() {
  const hexColor = colorPicker!.value;
  cssVarManager.setProperty("--asri-user-custom-accent", hexColor);
  reverseOnPrimaryLightness(hexColor);
}

export function handleColorPickerChange() {
  followSysAccentBtn!.classList.remove("b3-menu__item--selected");
  pickColorBtn!.classList.add("b3-menu__item--selected");
  reverseOnPrimaryLightness(colorPicker!.value);

  asriConfigs[curMode].userCustomColor = colorPicker!.value;
  setFollowSysAccentColor(false);
  asriConfigs[curMode].followSysAccentColor = false;
  updateAsriConfigs();
}

export function handleChromaSliderInput(this: any) {
  // if (asriChromaSlider?.classList.contains('b3-menu__item--disabled')) {
  //     this.value = asriConfigs[curMode].chroma;
  //     return;
  // }
  const chromaValue = this.value;
  cssVarManager.setProperty("--asri-c-factor", chromaValue);
  this.parentElement!.ariaLabel = i18n["asriChroma"] + chromaValue;
  asriConfigs[curMode].chroma = chromaValue;

  setIsUserAccentGray(chromaValue === "0" ? true : false);

  handleGrayScale(chromaValue);

  debounceChramaValueSaving();
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
  document.querySelectorAll('[id^="prst-palette-"]').forEach((el) => el.classList.remove("b3-menu__item--selected"));

  startFadeInFadeOutTranstition(600, () => {
    if (asriConfigs[curMode].presetPalette === paletteID) {
      // 取消预设色板
      target.classList.remove("b3-menu__item--selected");
      document.documentElement.removeAttribute("data-asri-palette");

      pickColorBtn?.classList.remove("b3-menu__item--disabled");
      followSysAccentBtn?.classList.remove("b3-menu__item--disabled");
      asriChromaBtn?.classList.remove("b3-menu__item--disabled");

      asriConfigs[curMode].presetPalette = "";
      // updateMenuItems();

      const followSysAccentColorState = asriConfigs[curMode]["followSysAccentColor"];
      setFollowSysAccentColor(followSysAccentColorState);
      if (followSysAccentColorState) {
        followSysAccentBtn!.classList.add("b3-menu__item--selected");
        cssVarManager.removeProperty("--asri-user-custom-accent");
        asriConfigs[curMode].followSysAccentColor = true;
        getSystemAccentColor();
      } else {
        pickColorBtn!.classList.add("b3-menu__item--selected");
        cssVarManager.setProperty(
          "--asri-user-custom-accent",
          asriConfigs[curMode].userCustomColor || sysAccentColor || "#3478f6"
        );
        asriConfigs[curMode].followSysAccentColor = false;
      }

      cssVarManager.setProperty("--asri-c-factor", asriConfigs[curMode].chroma);
      setIsUserAccentGray(asriConfigs[curMode].chroma === "0" ? true : false);
      handleGrayScale(asriConfigs[curMode].chroma);
      reverseOnPrimaryLightness(!followSysAccentColor ? asriConfigs[curMode].userCustomColor : sysAccentColor);

      updateAsriConfigs();
    } else {
      // 应用预设色板
      target.classList.add("b3-menu__item--selected");
      document.documentElement.setAttribute("data-asri-palette", paletteID.split("-")[2]);

      pickColorBtn?.classList.add("b3-menu__item--disabled");
      followSysAccentBtn?.classList.add("b3-menu__item--disabled");
      asriChromaBtn?.classList.add("b3-menu__item--disabled");

      setFollowSysAccentColor(false);
      followSysAccentBtn!.classList.remove("b3-menu__item--selected");
      pickColorBtn!.classList.remove("b3-menu__item--selected");

      cssVarManager.setProperty("--asri-user-custom-accent", curPalette.primary);
      cssVarManager.setProperty("--asri-c-factor", curPalette.chroma);
      setIsUserAccentGray(curPalette.chroma === "0" ? true : false);

      handleGrayScale(curPalette.chroma);
      reverseOnPrimaryLightness(curPalette.primary);

      // 写入预设色板数据
      asriConfigs[curMode].presetPalette = paletteID;
      updateAsriConfigs();
    }
  });
}
