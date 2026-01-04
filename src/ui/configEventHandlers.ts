import { debounce, getFocusedProtyleInfo, throttle } from "../utils/misc";
import { environment as env } from "../utils/rsc";
import { startFadeInFadeOutTranstition } from "../features/modeTransition";
import { cssVarManager } from "../core/cssVar";
import { asriConfigs, getLocalConfigs, updateAsriConfigs, runtime, getI18nText, followSysAccentBtn, followCoverImgColorBtn, pickColorBtn, asriChromaSlider, colorPicker, setFollowSysAccentColor, setIsUserAccentGray, setFollowCoverImgColorBtn } from "../core/config";
import { asriPrstPalettes, getSystemAccentColor, updateCoverImgColor } from "../core/palette";
import { handleGrayScale, reverseOnPrimaryLightness } from "../core/colorUtils";

export function initAsriConfigMenuItemClick() {
  if (!followSysAccentBtn || !pickColorBtn || !asriChromaSlider || !colorPicker || !followCoverImgColorBtn) return;

  // handle click events
  if (env.isInBrowser || env.isMobile || env.isLinux) {
    // runtime.followSysAccentColor = false;
    followSysAccentBtn.classList.add("fn__none");
  } else {
    followSysAccentBtn.addEventListener("click", handleFollowSystemAccentBtnClick);
  }
  pickColorBtn.addEventListener("mouseup", handlePickColorBtnClick); // 使用mouseup事件防止重复触发
  colorPicker.addEventListener("input", handleColorPickerInput);
  colorPicker.addEventListener("change", handleColorPickerChange);
  asriChromaSlider.addEventListener("input", handleChromaSliderInput);
  followCoverImgColorBtn.addEventListener("click", handleFollowCoverImgColorBtnClick);
}

function handleFollowSystemAccentBtnClick() {
  // if (followSysAccentBtn?.classList.contains('b3-menu__item--disabled')) return;

  if (runtime.followSysAccentColor) return;

  startFadeInFadeOutTranstition(600, () => {
    resetPresetPalette(false);

    document.querySelectorAll(".asri-config.b3-menu__item--selected").forEach((el) => el.classList.remove("b3-menu__item--selected"));
    setFollowSysAccentColor(true);
    followSysAccentBtn!.classList.add("b3-menu__item--selected");
    // pickColorBtn!.classList.remove('b3-menu__item--selected');
    cssVarManager.removeProperty("--asri-user-custom-accent");
    cssVarManager.removeProperty("--asri-cover-dominant");

    asriConfigs[runtime.mode].followSysAccentColor = true;
    asriConfigs[runtime.mode].followCoverImgColor = false;
    getSystemAccentColor();
    updateAsriConfigs();
  });
}

function handleFollowCoverImgColorBtnClick() {
  if (asriConfigs[runtime.mode].followCoverImgColor) return;
  startFadeInFadeOutTranstition(600, async () => {
    resetPresetPalette();
    setFollowSysAccentColor(false);
    document.querySelectorAll(".asri-config.b3-menu__item--selected").forEach((el) => el.classList.remove("b3-menu__item--selected"));
    followCoverImgColorBtn!.classList.add("b3-menu__item--selected");
    asriConfigs[runtime.mode].followCoverImgColor = true;
    asriConfigs[runtime.mode].followSysAccentColor = false;

    updateCoverImgColor();
    updateAsriConfigs();
  });
}

function handlePickColorBtnClick(event: Event) {
  startFadeInFadeOutTranstition(600, () => {
    resetPresetPalette();
    if (document.documentElement.getAttribute("--asri-user-custom-accent")) return;
    setFollowSysAccentColor(false);
    document.querySelectorAll(".asri-config.b3-menu__item--selected").forEach((el) => el.classList.remove("b3-menu__item--selected"));

    pickColorBtn!.classList.add("b3-menu__item--selected");

    cssVarManager.setProperty("--asri-user-custom-accent", asriConfigs[runtime.mode].userCustomColor);
    cssVarManager.removeProperty("--asri-cover-dominant");

    asriConfigs[runtime.mode].userCustomColor = asriConfigs[runtime.mode].userCustomColor;
    asriConfigs[runtime.mode].followSysAccentColor = false;
    asriConfigs[runtime.mode].followCoverImgColor = false;
    handleGrayScale(asriConfigs[runtime.mode].chroma);
    reverseOnPrimaryLightness(asriConfigs[runtime.mode].userCustomColor);
    updateAsriConfigs();
  });
}

const throttledColorUpdate = throttle((hexColor: string) => {
  requestAnimationFrame(() => {
    cssVarManager.setProperty("--asri-user-custom-accent", hexColor);
    reverseOnPrimaryLightness(hexColor);
  });
}, 400);

function handleColorPickerInput() {
  const hexColor = colorPicker!.value;
  throttledColorUpdate(hexColor);
}

function handleColorPickerChange() {
  // resetPresetPalette();
  followSysAccentBtn!.classList.remove("b3-menu__item--selected");
  pickColorBtn!.classList.add("b3-menu__item--selected");
  reverseOnPrimaryLightness(colorPicker!.value);

  asriConfigs[runtime.mode].userCustomColor = colorPicker!.value;
  setFollowSysAccentColor(false);
  asriConfigs[runtime.mode].followSysAccentColor = false;
  asriConfigs[runtime.mode].followCoverImgColor = false;
  updateAsriConfigs();
}

function handleChromaSliderInput(this: HTMLInputElement) {
  // if (asriChromaSlider?.classList.contains('b3-menu__item--disabled')) {
  //     this.value = asriConfigs[runtime.mode].chroma;
  //     return;
  // }
  // resetPresetPalette();
  const chromaValue = this.value;
  requestAnimationFrame(() => {
    cssVarManager.setProperty("--asri-c-factor", chromaValue);
    this.parentElement!.ariaLabel = getI18nText("asriChroma") + chromaValue;
    asriConfigs[runtime.mode].chroma = chromaValue;

    setIsUserAccentGray(chromaValue === "0" ? true : false);
    handleGrayScale(chromaValue);
  });
  debounce(updateAsriConfigs, 200)();
}

function resetPresetPalette(alterFollowSysAccentColor: boolean = true) {
  const curPresetPalette = document.documentElement.getAttribute("data-asri-palette");

  if (curPresetPalette === null) return;

  asriConfigs[runtime.mode].presetPalette = "";
  document.getElementById(`prst-palette-${curPresetPalette}`)?.classList.remove("b3-menu__item--selected");
  document.getElementById("asriChroma")?.classList.remove("b3-menu__item--disabled");
  document.documentElement.removeAttribute("data-asri-palette");
  cssVarManager.setProperty("--asri-c-factor", asriConfigs[runtime.mode].chroma);
  setIsUserAccentGray(asriConfigs[runtime.mode].chroma === "0" ? true : false);
  // handleGrayScale(asriConfigs[runtime.mode].chroma);
  // reverseOnPrimaryLightness(!runtime.followSysAccentColor ? asriConfigs[runtime.mode].userCustomColor : runtime.sysAccentColor);
}

export function setupTfpMenuItemCallback() {
  document.addEventListener("mouseup", tfpMenuItemCallback);
}

export function removeTfpMenuItemCallback() {
  document.removeEventListener("mouseup", tfpMenuItemCallback);
}

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

export function setupPaletteMenuItemClick() {
  document.addEventListener("mouseup", paletteMenuItemCallback);
}

export function removePaletteMenuItemClick() {
  document.removeEventListener("mouseup", paletteMenuItemCallback);
}

async function paletteMenuItemCallback(e: Event) {
  const target = (e.target as HTMLElement).closest('[id^="prst-palette-"]');
  if (!target) return;
  const asriChromaBtn = document.getElementById("asriChroma");
  const paletteID = target.id as keyof typeof asriPrstPalettes;
  const curPalette = asriPrstPalettes[paletteID][runtime.mode];

  if (asriConfigs[runtime.mode].presetPalette === paletteID) return;

  // document.querySelectorAll('[id^="prst-palette-"]').forEach((el) => el.classList.remove("b3-menu__item--selected"));

  startFadeInFadeOutTranstition(600, () => {
    document.querySelectorAll(".asri-config.b3-menu__item--selected").forEach((el) => el.classList.remove("b3-menu__item--selected"));
    asriChromaBtn?.classList.add("b3-menu__item--disabled");

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

    asriConfigs[runtime.mode].presetPalette = paletteID;
    asriConfigs[runtime.mode].followSysAccentColor = false;
    asriConfigs[runtime.mode].followCoverImgColor = false;

    handleGrayScale(curPalette.chroma);
    reverseOnPrimaryLightness(curPalette.primary);

    updateAsriConfigs();
  });
}
