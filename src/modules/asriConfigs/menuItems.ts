import { querySelectorAsync } from "../../util/misc";
import { asriConfigs } from "./configs";
import { initAsriConfigMenuItemClick } from "./eventHandlers";
import { asriPrstPalettes } from "./palettes";
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
  setTopbarFusionPlusBtn,
  tfpAcrylicBtn,
  tfpLuminousBtn,
  tfpProgressiveBtn,
} from "./state";

const paletteMenuItem = (paletteID: string) => {
  const displayName = i18n[paletteID] || paletteID;
  return `<button class="b3-menu__item asri-config" id="${paletteID}"><svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 3h-4a2 2 0 0 0-2 2v12a4 4 0 0 0 8 0V5a2 2 0 0 0-2-2"/><path d="m13 7.35l-2-2a2 2 0 0 0-2.828 0L5.344 8.178a2 2 0 0 0 0 2.828l9 9"/><path d="M7.3 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h12m0-4v.01"/></g></svg><span class="b3-menu__label">${displayName}</span></button>`;
};

export async function createBarModeMenuItems(e: Event) {
  if (e.type !== "mouseup") return;
  const target = e.target as HTMLElement;
  const targetItem = target.closest(".toolbar__item") as HTMLElement;
  if (!targetItem) return;
  // use existing menu items if any
  if (document.querySelector(".asri-config")) return;
  // create menu items when there is no existing menu items
  let barModeMenuItems = await querySelectorAsync('#commonMenu[data-name="barmode"] .b3-menu__items', document, 2, 0);
  if (!barModeMenuItems) return;

  const asriConfigMenuHTML = `
        <button class="b3-menu__separator asri-config"></button>
        <div class="menu-item__subtitle" style="user-select: none;">${i18n["palette-presets"]}</div>
        ${Object.keys(asriPrstPalettes)
          .map((paletteID) => paletteMenuItem(paletteID))
          .join("")}
        <button class="b3-menu__separator asri-config"></button>
        <button class="b3-menu__item asri-config" id="pickColor">
            <svg class="b3-menu__icon"></svg>
            <input id="asriColorPicker" type="color" value="${asriConfigs[curMode].userCustomColor}">
            <label for="asriColorPicker" class="be-menu__label">${i18n["pickColor"]}</label>
        </button>
        <button class="b3-menu__item asri-config" id="followSysAccent">
            <svg class="b3-menu__icon"></svg>
            <label for="" class="be-menu__label">${i18n["followSysAccent"]}</label>
        </button>
        <button class="b3-menu__item asri-config" id="followCoverImgColor">
            <svg class="b3-menu__icon"></svg>
            <label for="" class="be-menu__label">${i18n["followCoverImgColor"]||"follow cover img color"}</label>
        </button>
        <button class="b3-menu__item asri-config" data-type="nobg" id="asriChroma">
            <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 11l-8-8l-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0zM5 2l5 5m-8 6h15m5 7a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4c.3 1.6 2 2.4 2 4" />
            </svg>
            <div aria-label="${
              i18n["asriChroma"] + (asriChromaSlider?.value ?? asriConfigs[curMode].chroma ?? "1")
            }" class="b3-tooltips b3-tooltips__n">
                <input style="box-sizing: border-box" type="range" id="asriChromaSlider" class="b3-slider fn__block" min="0" max="5" step="0.1" value="1">
            </div>
        </button>
        <button class="b3-menu__separator asri-config"></button>
        <button class="b3-menu__item asri-config" id="topbarFusionPlus"></button>
`;
  const asriConfigFrag = document.createRange().createContextualFragment(asriConfigMenuHTML);

  barModeMenuItems.appendChild(asriConfigFrag);

  // set funcitons for menu items
  setFollowSysAccentBtn(document.getElementById("followSysAccent"));
  setFollowCoverImgColorBtn(document.getElementById("followCoverImgColor"));
  setPickColorBtn(document.getElementById("pickColor"));
  setAsriChromaSlider(document.getElementById("asriChromaSlider") as HTMLInputElement | null);
  setColorPicker(pickColorBtn!.querySelector("input") as HTMLInputElement | null);
  setTopbarFusionPlusBtn(document.getElementById("topbarFusionPlus"));

  const topbarFusionPlusBtn = document.getElementById("topbarFusionPlus");
  if (topbarFusionPlusBtn) {
    topbarFusionPlusBtn.innerHTML = `
        <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m8 10.5l6.492-6.492M13.496 16L20 9.496zm-4.91-.586L19.413 4.587M8 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"/><path d="M16 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2"/></g></svg>
        <span class="b3-menu__label" style="display: flex">${
          i18n["topbarFusionPlus"]
        }<svg data-position="north" class="b3-menu__icon ariaLabel asri-experimental" aria-label=${
      '"' + i18n["tfp-experimental"] + '"'
    } style="vertical-align: -.1em; height: .8em; width: .8em; opacity: .5; padding-inline-start: .1em; margin-right: unset;margin-inline-start: auto; margin-inline-end: 0;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2M6.453 15h11.094M8.5 2h7"/></svg></span>
        <svg class="b3-menu__icon b3-menu__icon--small">
            <use xlink:href="#iconRight"></use>
        </svg>
        <div class="b3-menu__submenu">
            <div class="b3-menu__items">
                <button class="b3-menu__item" id="tfp-luminous">
                    <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m8 10.5l6.492-6.492M13.496 16L20 9.496zm-4.91-.586L19.413 4.587M8 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"/><path d="M16 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2"/></g></svg>
                    <span class="b3-menu__label">${i18n["tfp-luminous"]}</span>
                </button>
                <button class="b3-menu__item" id="tfp-progressive">
                    <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m8 10.5l6.492-6.492M13.496 16L20 9.496zm-4.91-.586L19.413 4.587M8 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"/><path d="M16 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2"/></g></svg>
                    <span class="b3-menu__label">${i18n["tfp-progressive"]}</span>
                </button>                                
                <button class="b3-menu__item" id="tfp-acrylic">
                    <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m8 10.5l6.492-6.492M13.496 16L20 9.496zm-4.91-.586L19.413 4.587M8 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z"/><path d="M16 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2"/></g></svg>
                    <span class="b3-menu__label">${i18n["tfp-acrylic"]}</span>
                </button>                
                <button class="b3-menu__separator"></button>
                <button class="b3-menu__item" id="tfp-disable">
                    <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9l-6 6m0-6l6 6"/></g>
                    </svg>
                    <span class="b3-menu__label">${i18n["tfp-disable"]}</span>
                </button>
            </div>
        </div>
    `;
  }

  if (!followSysAccentBtn || !pickColorBtn || !asriChromaSlider || !colorPicker) return;
  initMenuItems();
  initAsriConfigMenuItemClick();
}

export function initMenuItems() {
  // check local configs to determine the initial state of the menu items
  const asriChromaBtn = document.getElementById("asriChroma");
  setTfpProgressiveBtn(document.getElementById("tfp-progressive"));
  setTfpAcrylicBtn(document.getElementById("tfp-acrylic"));
  setTfpLuminousBtn(document.getElementById("tfp-luminous"));
  setFollowCoverImgColorBtn(document.getElementById("followCoverImgColor"));

  // if (asriConfigs[curMode].presetPalette) {
  //   pickColorBtn?.classList.add("b3-menu__item--disabled");
  //   followSysAccentBtn?.classList.add("b3-menu__item--disabled");
  //   asriChromaBtn?.classList.add("b3-menu__item--disabled");
  // }

  followSysAccentBtn!.classList.toggle(
    "b3-menu__item--selected",
    !asriConfigs[curMode].presetPalette && followSysAccentColor
  );
  followCoverImgColorBtn!.classList.toggle(
    "b3-menu__item--selected",
    asriConfigs[curMode].followCoverImgColor && !asriConfigs[curMode].presetPalette && !followSysAccentColor
  );
  pickColorBtn!.classList.toggle(
    "b3-menu__item--selected",
    !asriConfigs[curMode].presetPalette && !followSysAccentColor && !asriConfigs[curMode].followCoverImgColor
  );
  asriChromaSlider!.value = asriConfigs[curMode].chroma || "1";
  asriChromaSlider!.parentElement!.ariaLabel = i18n["asriChroma"] + asriConfigs[curMode].chroma;

  if (asriConfigs[curMode].presetPalette) {
    const curPalette = document.getElementById(`${asriConfigs[curMode].presetPalette}`);
    asriChromaBtn?.classList.add("b3-menu__item--disabled");
    curPalette?.classList.add("b3-menu__item--selected");
  }

  [tfpProgressiveBtn, tfpAcrylicBtn, tfpLuminousBtn].forEach((btn) => {
    if (btn) {
      const type = btn.id.replace("tfp-", "");
      btn.classList.toggle("b3-menu__item--selected", asriConfigs.features.tfp === type);
    }
  });
}
