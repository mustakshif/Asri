import { querySelectorAsync } from "../../util/misc";
import { asriConfigs } from "./configs";
import { initAsriConfigMenuItemClick } from "./eventHandlers";
import { buildAsriConfigMenuHTML, buildTopbarFusionPlusMenuHTML } from "./menuMarkup";
import {
  asriChromaSlider,
  colorPicker,
  curMode,
  followCoverImgColorBtn,
  followSysAccentBtn,
  followSysAccentColor,
  i18n,
  pickColorBtn,
  setAsriChromaSlider,
  setColorPicker,
  setFollowCoverImgColorBtn,
  setFollowSysAccentBtn,
  setPickColorBtn,
  setTfpAcrylicBtn,
  setTfpLuminousBtn,
  setTfpProgressiveBtn,
  tfpAcrylicBtn,
  tfpLuminousBtn,
  tfpProgressiveBtn,
} from "./state";

function bindMenuElements() {
  setFollowSysAccentBtn(document.getElementById("followSysAccent"));
  setFollowCoverImgColorBtn(document.getElementById("followCoverImgColor"));
  setPickColorBtn(document.getElementById("pickColor"));
  setAsriChromaSlider(document.getElementById("asriChromaSlider") as HTMLInputElement | null);
  setColorPicker(pickColorBtn?.querySelector("input") as HTMLInputElement | null);
}

export async function createBarModeMenuItems(e: Event) {
  if (e.type !== "mouseup") return;

  const target = e.target as HTMLElement;
  const targetItem = target.closest(".toolbar__item") as HTMLElement;
  if (!targetItem) return;

  if (document.querySelector(".asri-config")) return;

  const barModeMenuItems = await querySelectorAsync('#commonMenu[data-name="barmode"] .b3-menu__items', document, 2, 0);
  if (!barModeMenuItems) return;

  const chromaLabel = i18n["asriChroma"] + (asriChromaSlider?.value ?? asriConfigs[curMode].chroma ?? "1");
  const asriConfigMenuHTML = buildAsriConfigMenuHTML(i18n, asriConfigs[curMode].userCustomColor, chromaLabel);
  const asriConfigFrag = document.createRange().createContextualFragment(asriConfigMenuHTML);
  barModeMenuItems.appendChild(asriConfigFrag);

  bindMenuElements();

  const topbarFusionPlusBtn = document.getElementById("topbarFusionPlus");
  if (topbarFusionPlusBtn) {
    topbarFusionPlusBtn.innerHTML = buildTopbarFusionPlusMenuHTML(i18n);
  }

  if (!followSysAccentBtn || !pickColorBtn || !asriChromaSlider || !colorPicker) return;

  initMenuItems();
  initAsriConfigMenuItemClick();
}

export function initMenuItems() {
  const asriChromaBtn = document.getElementById("asriChroma");
  setTfpProgressiveBtn(document.getElementById("tfp-progressive"));
  setTfpAcrylicBtn(document.getElementById("tfp-acrylic"));
  setTfpLuminousBtn(document.getElementById("tfp-luminous"));
  setFollowCoverImgColorBtn(document.getElementById("followCoverImgColor"));

  followSysAccentBtn?.classList.toggle(
    "b3-menu__item--selected",
    !asriConfigs[curMode].presetPalette && followSysAccentColor
  );
  followCoverImgColorBtn?.classList.toggle(
    "b3-menu__item--selected",
    asriConfigs[curMode].followCoverImgColor && !asriConfigs[curMode].presetPalette && !followSysAccentColor
  );
  pickColorBtn?.classList.toggle(
    "b3-menu__item--selected",
    !asriConfigs[curMode].presetPalette && !followSysAccentColor && !asriConfigs[curMode].followCoverImgColor
  );

  if (asriChromaSlider) {
    asriChromaSlider.value = asriConfigs[curMode].chroma || "1";
    if (asriChromaSlider.parentElement) {
      asriChromaSlider.parentElement.ariaLabel = i18n["asriChroma"] + asriConfigs[curMode].chroma;
    }
  }

  if (asriConfigs[curMode].presetPalette) {
    const curPalette = document.getElementById(asriConfigs[curMode].presetPalette);
    asriChromaBtn?.classList.add("b3-menu__item--disabled");
    curPalette?.classList.add("b3-menu__item--selected");
  }

  [tfpProgressiveBtn, tfpAcrylicBtn, tfpLuminousBtn].forEach((btn) => {
    if (!btn) return;
    const type = btn.id.replace("tfp-", "");
    btn.classList.toggle("b3-menu__item--selected", asriConfigs.features.tfp === type);
  });
}
