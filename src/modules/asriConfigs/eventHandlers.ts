import { AsriEventListener } from "../../util/eventListeners";
import { debounce, throttle } from "../../util/misc";
import { environment as env } from "../../util/rsc";
import { updateAsriConfigs } from "./configs";
import {
  applyPresetPaletteSelection,
  applyTfpMenuSelection,
  commitCustomColor,
  previewCustomColor,
  selectCustomColorMode,
  selectFollowCoverImgColor,
  selectFollowSystemAccent,
  updateChroma,
} from "./menuActions";
import { asriChromaSlider, colorPicker, followCoverImgColorBtn, followSysAccentBtn, pickColorBtn } from "./state";

const debouncedSaveConfigs = debounce(updateAsriConfigs, 200);
const throttledColorPreview = throttle((hexColor: string) => {
  previewCustomColor(hexColor);
}, 400);

export function initAsriConfigMenuItemClick() {
  if (!followSysAccentBtn || !pickColorBtn || !asriChromaSlider || !colorPicker || !followCoverImgColorBtn) return;
  const colorPickerInput = colorPicker;

  if (env.isInBrowser || env.isMobile || env.isLinux) {
    followSysAccentBtn.classList.add("fn__none");
  } else {
    followSysAccentBtn.addEventListener("click", selectFollowSystemAccent);
  }

  pickColorBtn.addEventListener("mouseup", () => selectCustomColorMode());
  colorPickerInput.addEventListener("input", () => throttledColorPreview(colorPickerInput.value));
  colorPickerInput.addEventListener("change", () => commitCustomColor(colorPickerInput.value));
  asriChromaSlider.addEventListener("input", function () {
    updateChroma(this.value, this.parentElement);
    debouncedSaveConfigs();
  });
  followCoverImgColorBtn.addEventListener("click", () => selectFollowCoverImgColor());
}

export const tfpMenuItemCallbackEventListener = new AsriEventListener(tfpMenuItemCallback);

function tfpMenuItemCallback(e: Event) {
  const target = (e.target as HTMLElement).closest('[id^="tfp-"]') as HTMLElement | null;
  if (!target) return;
  applyTfpMenuSelection(target);
}

export const paletteMenuItemClickEventListener = new AsriEventListener(paletteMenuItemCallback);

function paletteMenuItemCallback(e: Event) {
  const target = (e.target as HTMLElement).closest('[id^="prst-palette-"]') as HTMLElement | null;
  if (!target) return;
  applyPresetPaletteSelection(target);
}
