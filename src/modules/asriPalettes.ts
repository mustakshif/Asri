import { getFile, putFile } from "../util/api";
import { remote } from "../util/electron";
import { AsriEventListener } from "../util/eventListeners";
import { debounce, hexToHSL, hexToOklchL, querySelectorAsync } from "../util/misc";
import { environment as env } from "../util/rsc";
import { startFadeInFadeOutTranstition } from "./modeTransition";

class CSSVarManager {
  private static instance: CSSVarManager;
  private styleElement: HTMLStyleElement;
  private pendingUpdates: Map<string, string>;
  private rafId: number | null = null;
  private existingVars: Map<string, string>;

  private constructor() {
    // 检查是否已存在style元素
    const existingStyle = document.getElementById("snippetCSS-asri-root-vars") as HTMLStyleElement;
    if (existingStyle) {
      this.styleElement = existingStyle;
      // 解析现有的CSS变量
      this.existingVars = this.parseExistingVars();
    } else {
      this.styleElement = document.createElement("style");
      this.styleElement.id = "snippetCSS-asri-root-vars";
      document.head.appendChild(this.styleElement);
      this.existingVars = new Map();
    }
    this.pendingUpdates = new Map();
  }

  private parseExistingVars(): Map<string, string> {
    const vars = new Map<string, string>();
    const cssText = this.styleElement.textContent;
    if (!cssText) return vars;

    // 解析:root中的CSS变量
    const rootMatch = cssText.match(/:root\s*{([^}]*)}/);
    if (rootMatch) {
      const varDeclarations = rootMatch[1].split(";");
      for (const declaration of varDeclarations) {
        const [name, value] = declaration.split(":").map((s) => s.trim());
        if (name && value) {
          vars.set(name, value);
        }
      }
    }
    return vars;
  }

  public static getInstance(): CSSVarManager {
    if (!CSSVarManager.instance) {
      CSSVarManager.instance = new CSSVarManager();
    }
    return CSSVarManager.instance;
  }

  public setProperty(name: string, value: string) {
    this.pendingUpdates.set(name, value);
    this.scheduleUpdate();
  }

  public removeProperty(name: string) {
    this.pendingUpdates.set(name, "");
    this.scheduleUpdate();
  }

  private scheduleUpdate() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    this.rafId = requestAnimationFrame(() => this.applyUpdates());
  }

  private applyUpdates() {
    if (this.pendingUpdates.size === 0) return;

    let cssText = ":root {";

    // 合并现有变量和待更新变量
    const allVars = new Map([...this.existingVars, ...this.pendingUpdates]);

    allVars.forEach((value, name) => {
      if (value === "") {
        this.existingVars.delete(name);
      } else {
        cssText += `${name}: ${value};`;
        this.existingVars.set(name, value);
      }
    });

    cssText += "}";
    this.styleElement.textContent = cssText;
    this.pendingUpdates.clear();
    this.rafId = null;
  }

  // 获取当前所有CSS变量的值
  public getAllVars(): Map<string, string> {
    return new Map(this.existingVars);
  }
}

const cssVarManager = CSSVarManager.getInstance();

const asriConfigs = {
  "light": {
    "followSysAccentColor": false,
    "chroma": "1",
    "userCustomColor": "#3478f6",
    "presetPalette": "",
  },
  "dark": {
    "followSysAccentColor": false,
    "chroma": "1",
    "userCustomColor": "#3478f6",
    "presetPalette": "",
  },
  "features": {
    "tfp": "",
  },
};

let curMode: "light" | "dark";

const debounceChramaValueSaving = debounce(updateAsriConfigs, 200);

export let i18n: any;
let sysAccentColor: string;
let isSysAccentGray = false,
  isUserAccentGray = false;
let followSysAccentBtn: AsriDomsExtended,
  pickColorBtn: AsriDomsExtended,
  asriChromaSlider: HTMLInputElement | null,
  colorPicker: HTMLInputElement | null,
  topbarFusionPlusBtn: AsriDomsExtended,
  tfpProgressiveBtn: AsriDomsExtended,
  tfpAcrylicBtn: AsriDomsExtended,
  tfpLuminousBtn: AsriDomsExtended;
export let followSysAccentColor = false;
export async function loadThemePalette() {
  // if (env.isIOSApp) return; // fix app crash
  // i18n = await loadI18n();
  curMode = env.appSchemeMode;
  getAsriConfigs().then(() => {
    if (!env.supportOklch) return;

    // check local configs to set initial theme color
    if (!(env.isInBrowser || env.isMobile || env.isLinux)) {
      if (followSysAccentColor) {
        cssVarManager.removeProperty("--asri-user-custom-accent");
      } else {
        cssVarManager.setProperty("--asri-user-custom-accent", asriConfigs[curMode].userCustomColor);
        reverseOnPrimaryLightness(asriConfigs[curMode].userCustomColor);
      }
    } else {
      cssVarManager.setProperty("--asri-user-custom-accent", asriConfigs[curMode].userCustomColor);
      reverseOnPrimaryLightness(asriConfigs[curMode].userCustomColor);
    }

    if (asriConfigs[curMode].presetPalette) {
      const paletteID = asriConfigs[curMode].presetPalette as keyof typeof asriPrstPalettes;
      const curPalette = asriPrstPalettes[paletteID][curMode];

      document.documentElement.setAttribute("data-asri-palette", paletteID.split("-")[2]);
      followSysAccentColor = false;
      cssVarManager.setProperty("--asri-user-custom-accent", curPalette.primary);
      cssVarManager.setProperty("--asri-c-factor", curPalette.chroma);
      isUserAccentGray = curPalette.chroma === "0" ? true : false;
      handleGrayScale(curPalette.chroma);
      reverseOnPrimaryLightness(curPalette.primary);
    } else {
      cssVarManager.setProperty("--asri-c-factor", asriConfigs[curMode].chroma);
      document.documentElement.removeAttribute("data-asri-palette");
      isUserAccentGray = asriConfigs[curMode].chroma === "0" ? true : false;
      handleGrayScale(asriConfigs[curMode].chroma);
    }
    getSystemAccentColor();

    if (asriConfigs.features.tfp) {
      document.body.classList.add("asri-tfp", "asri-tfp-" + asriConfigs.features.tfp);
    }
  });

  // env.supportOklch && asriDoms.barMode?.addEventListener("click", customizeThemeColor);
}

export function unloadThemePalette() {
  // cssVarManager.removeProperty("--asri-user-custom-accent");
  // cssVarManager.removeProperty("--asri-sys-accent-grayscale");
  // cssVarManager.removeProperty("--asri-c-factor");
  // cssVarManager.removeProperty("--asri-sys-accent");
  // cssVarManager.removeProperty("--asri-sys-accent-accessible");
  // cssVarManager.removeProperty("--asri-c-0");
  // cssVarManager.removeProperty("--asri-on-primary-reverse");
  // asriDoms.barMode?.removeEventListener("click", customizeThemeColor);
  document.querySelectorAll(".asri-config").forEach((el) => el.remove());
}

export async function loadI18n() {
  let res: Response;
  try {
    if (["zh_CN", "zh_CHT", "en_US", "ar_SA"].includes(env.lang)) {
      res = await fetch(`/appearance/themes/Asri/i18n/${env.lang}.json`);
    } else {
      res = await fetch("/appearance/themes/Asri/i18n/en_US.json");
    }

    i18n = await res.json();
    return i18n;
  } catch (error) {
    console.error("failed to load i18n:", error);
    throw error;
  }
}

async function getAsriConfigs() {
  console.log("curMode", curMode);
  await getFile("/data/snippets/Asri.config.json")
    .then((response) => {
      if (response && response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((data) => {
      if (!data) {
        followSysAccentColor = asriConfigs[curMode].followSysAccentColor;
        return;
      }

      /**
            https://github.com/mustakshif/Asri/issues/165 这个写法导致当config数据不全时，updateAsriConfigs()会形成循坏引用，从而无法储存主题配置

            // // 如果本地配置数据中没有light或dark，则将旧数据赋值给asriConfigs
            // let originalData: any;

            // if (!(data['light'])) {
            //     originalData = data;
            //     Object.keys(asriConfigs).forEach(key => {
            //         data[key as keyof typeof asriConfigs] = originalData;
            //     })
            // } 

            // if (!(data.features)) {
            //     data.features = asriConfigs.features;
            // }
            **/

      // 如果本地配置缺失数据，则赋与默认值

      for (let key in asriConfigs) {
        if (!(key in data)) {
          data[key] = asriConfigs[key as keyof typeof asriConfigs];
        }
      }

      const modes: ("light" | "dark")[] = ["light", "dark"];
      for (const mode of modes) {
        asriConfigs[mode].followSysAccentColor = !!data[mode].followSysAccentColor;
        asriConfigs[mode].chroma = data[mode].chroma ?? "1";
        asriConfigs[mode].userCustomColor = data[mode].userCustomColor ?? "#3478f6";
        asriConfigs[mode].presetPalette = data[mode].presetPalette ?? "";
      }
      asriConfigs.features = data.features;
      followSysAccentColor = !!data[curMode].followSysAccentColor;
    });
}

async function updateAsriConfigs() {
  await putFile("/data/snippets/Asri.config.json", JSON.stringify(asriConfigs, undefined, 4));
}

// async function customizeThemeColor() {
//     if (!Object.keys(i18n).length) i18n = await loadI18n();
//     // create menu items and handle click events
//     setTimeout(createMenuItems, 0);
// }

const asriPrstPalettes = {
  "prst-palette-auriflow": {
    "dark": {
      "primary": "#D2B983",
      "chroma": "0.3",
      "followSysAccentColor": false,
    },
    "light": {
      "primary": "#F4D18B",
      "chroma": "0",
      "followSysAccentColor": false,
    },
  },

  "prst-palette-everbliss": {
    "dark": {
      "primary": "#13012a",
      "chroma": "1.5",
      "followSysAccentColor": false,
    },
    "light": {
      "primary": "#F4CA57",
      "chroma": "2.8",
      "followSysAccentColor": false,
    },
  },

  "prst-palette-aerisland": {
    "dark": {
      "primary": "#111a3f",
      "chroma": "2",
      "followSysAccentColor": false,
    },
    "light": {
      "primary": "#e6f9db", // 饱和度需要高一点，修复Safari显示为红色的问题
      "chroma": "2",
      "followSysAccentColor": false,
    },
  },

  "prst-palette-zerith": {
    "dark": {
      "primary": "#ABC3D9",
      "chroma": "2.4",
      "followSysAccentColor": false,
    },
    "light": {
      "primary": "#C2E2DF",
      "chroma": "0.7",
      "followSysAccentColor": false,
    },
  },

  "prst-palette-polar": {
    "dark": {
      "primary": "#E6E9EF",
      "chroma": "0",
      "followSysAccentColor": false,
    },
    "light": {
      "primary": "#1B1C1D",
      "chroma": "0",
      "followSysAccentColor": false,
    },
  },

  "prst-palette-stellula": {
    "dark": {
      "primary": "#3B2731",
      "chroma": "0.6",
      "followSysAccentColor": false,
    },
    "light": {
      "primary": "#FFF4EB",
      "chroma": "2.5",
      "followSysAccentColor": false,
    },
  },
};

const paletteMenuItem = (paletteID: string) => {
  const displayName = i18n[paletteID] || paletteID;
  return `<button class="b3-menu__item asri-config" id="${paletteID}"><svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 3h-4a2 2 0 0 0-2 2v12a4 4 0 0 0 8 0V5a2 2 0 0 0-2-2"/><path d="m13 7.35l-2-2a2 2 0 0 0-2.828 0L5.344 8.178a2 2 0 0 0 0 2.828l9 9"/><path d="M7.3 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h12m0-4v.01"/></g></svg><span class="b3-menu__label">${displayName}</span></button>`;
};

export async function createBarModeMenuItems(e: Event) {
  if (e.type !== "mouseup") return;
  if (!Object.keys(i18n).length) i18n = await loadI18n();
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
  followSysAccentBtn = document.getElementById("followSysAccent");
  pickColorBtn = document.getElementById("pickColor");
  asriChromaSlider = document.getElementById("asriChromaSlider") as HTMLInputElement | null;
  colorPicker = pickColorBtn!.querySelector("input") as HTMLInputElement | null;
  topbarFusionPlusBtn = document.getElementById("topbarFusionPlus");
  topbarFusionPlusBtn!.innerHTML = `
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

  if (!followSysAccentBtn || !pickColorBtn || !asriChromaSlider || !colorPicker) return;
  initMenuItems();
  initAsriConfigMenuItemClick();
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

function initMenuItems() {
  // check local configs to determine the initial state of the menu items
  const asriChromaBtn = document.getElementById("asriChroma");
  tfpProgressiveBtn = document.getElementById("tfp-progressive");
  tfpAcrylicBtn = document.getElementById("tfp-acrylic");
  tfpLuminousBtn = document.getElementById("tfp-luminous");

  if (asriConfigs[curMode].presetPalette) {
    pickColorBtn?.classList.add("b3-menu__item--disabled");
    followSysAccentBtn?.classList.add("b3-menu__item--disabled");
    asriChromaBtn?.classList.add("b3-menu__item--disabled");
  }

  followSysAccentBtn!.classList.toggle(
    "b3-menu__item--selected",
    !asriConfigs[curMode].presetPalette && followSysAccentColor
  );
  pickColorBtn!.classList.toggle(
    "b3-menu__item--selected",
    !asriConfigs[curMode].presetPalette && !followSysAccentColor
  );
  asriChromaSlider!.value = asriConfigs[curMode].chroma || "1";
  asriChromaSlider!.parentElement!.ariaLabel = i18n["asriChroma"] + asriConfigs[curMode].chroma;

  if (asriConfigs[curMode].presetPalette) {
    const curPalette = document.getElementById(`${asriConfigs[curMode].presetPalette}`);
    curPalette?.classList.add("b3-menu__item--selected");
  }

  [tfpProgressiveBtn, tfpAcrylicBtn, tfpLuminousBtn].forEach((btn) => {
    if (btn) {
      const type = btn.id.replace("tfp-", "");
      btn.classList.toggle("b3-menu__item--selected", asriConfigs.features.tfp === type);
    }
  });
}

function initAsriConfigMenuItemClick() {
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

function handleFollowSystemAccentBtnClick() {
  // if (followSysAccentBtn?.classList.contains('b3-menu__item--disabled')) return;
  startFadeInFadeOutTranstition(600, () => {
    document
      .querySelectorAll(".asri-config.b3-menu__item--selected")
      .forEach((el) => el.classList.remove("b3-menu__item--selected"));
    if (!asriConfigs[curMode].followSysAccentColor) {
      followSysAccentColor = true;
      followSysAccentBtn!.classList.add("b3-menu__item--selected");
      // pickColorBtn!.classList.remove('b3-menu__item--selected');
      cssVarManager.removeProperty("--asri-user-custom-accent");

      asriConfigs[curMode].followSysAccentColor = true;
      getSystemAccentColor();
    } else {
      followSysAccentColor = false;
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

function handlePickColorBtnClick(event: Event) {
  // if (pickColorBtn?.classList.contains('b3-menu__item--disabled')) {
  //     event.preventDefault();
  //     return;
  // };
  // document.querySelectorAll('.asri-config.b3-menu__item--selected').forEach(el => el.classList.remove('b3-menu__item--selected'));

  startFadeInFadeOutTranstition(600, () => {
    if (!followSysAccentColor) return;

    followSysAccentColor = false;
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

function handleColorPickerInput() {
  const hexColor = colorPicker!.value;
  cssVarManager.setProperty("--asri-user-custom-accent", hexColor);
  reverseOnPrimaryLightness(hexColor);
}

function handleColorPickerChange() {
  followSysAccentBtn!.classList.remove("b3-menu__item--selected");
  pickColorBtn!.classList.add("b3-menu__item--selected");
  reverseOnPrimaryLightness(colorPicker!.value);

  asriConfigs[curMode].userCustomColor = colorPicker!.value;
  followSysAccentColor = false;
  asriConfigs[curMode].followSysAccentColor = false;
  updateAsriConfigs();
}

function handleChromaSliderInput(this: any) {
  // if (asriChromaSlider?.classList.contains('b3-menu__item--disabled')) {
  //     this.value = asriConfigs[curMode].chroma;
  //     return;
  // }
  const chromaValue = this.value;
  cssVarManager.setProperty("--asri-c-factor", chromaValue);
  this.parentElement!.ariaLabel = i18n["asriChroma"] + chromaValue;
  asriConfigs[curMode].chroma = chromaValue;

  isUserAccentGray = chromaValue === "0" ? true : false;

  handleGrayScale(chromaValue);

  debounceChramaValueSaving();
}

export function getSystemAccentColor() {
  if (!(env.isInBrowser || env.isMobile || env.isLinux)) {
    const accent = remote.systemPreferences.getAccentColor();
    const accentHex = "#" + accent.slice(0, 6);
    const accentHsl = hexToHSL(accentHex);
    if (!accentHsl) return;

    if (sysAccentColor !== accentHex) {
      cssVarManager.setProperty("--asri-sys-accent", accentHex);
      if (accentHsl.s > 0.28) cssVarManager.setProperty("--asri-sys-accent-accessible", accentHex);
      else cssVarManager.removeProperty("--asri-sys-accent-accessible");

      isSysAccentGray = accentHsl.s === 0 ? true : false;

      // document.body.classList.add('asri-mode-transition');
      // setTimeout(() => {
      //     document.body.classList.remove('asri-mode-transition');
      // }, 350);

      sysAccentColor = accentHex;
    }

    if (followSysAccentColor) {
      handleGrayScale(accentHsl.s);
      reverseOnPrimaryLightness(accentHex);
    }
  }
}

/**
 * decide if use grayscale or not, if so return true, otherwise return false
 * @param {string | number} chroma
 * @returns boolean
 */
function handleGrayScale(chroma: string | number) {
  // console.log('chroma', chroma, 'followSysAccentColor', followSysAccentColor, 'isSysAccentGray', isSysAccentGray, 'isUserAccentGray', isUserAccentGray);
  const chromaValue = String(chroma);
  if (chromaValue === "0" || (followSysAccentColor && isSysAccentGray) || isUserAccentGray) {
    cssVarManager.setProperty("--asri-c-0", "0");
    return true;
  } else {
    cssVarManager.removeProperty("--asri-c-0");
    return false;
  }
}

const reverseThreshold = env.appSchemeMode === "light" ? 0.81 : 0.79;
function reverseOnPrimaryLightness(hex: string) {
  const lightness = hexToOklchL(hex);
  if (!lightness) return;
  if (lightness > reverseThreshold) {
    cssVarManager.setProperty("--asri-on-primary-reverse", env.appSchemeMode === "light" ? ".4" : ".3");
  } else {
    cssVarManager.removeProperty("--asri-on-primary-reverse");
  }
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

      followSysAccentColor = asriConfigs[curMode]["followSysAccentColor"];
      if (followSysAccentColor) {
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
      isUserAccentGray = asriConfigs[curMode].chroma === "0" ? true : false;
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

      followSysAccentColor = false;
      followSysAccentBtn!.classList.remove("b3-menu__item--selected");
      pickColorBtn!.classList.remove("b3-menu__item--selected");

      cssVarManager.setProperty("--asri-user-custom-accent", curPalette.primary);
      cssVarManager.setProperty("--asri-c-factor", curPalette.chroma);
      isUserAccentGray = curPalette.chroma === "0" ? true : false;

      handleGrayScale(curPalette.chroma);
      reverseOnPrimaryLightness(curPalette.primary);

      // 写入预设色板数据
      asriConfigs[curMode].presetPalette = paletteID;
      updateAsriConfigs();
    }
  });
}
