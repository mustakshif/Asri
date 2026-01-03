/**
 * 核心配置管理
 * 负责主题配置的加载、保存和状态管理
 */

import { getFile, putFile } from "../utils/api";
import { environment as env } from "../utils/rsc";
import { runtime, setMode, setI18n, setSysAccentColor, setIsSysAccentGray, setIsUserAccentGray, setIsCoverImgColorGray, setFollowSysAccentColor } from "./runtime";

// ============================================================================
// 类型定义
// ============================================================================

export interface AsriConfigMode {
  followSysAccentColor: boolean;
  followCoverImgColor: boolean;
  chroma: string;
  userCustomColor: string;
  presetPalette: string;
}

export interface AsriConfigs {
  light: AsriConfigMode;
  dark: AsriConfigMode;
  features: {
    tfp: string;
  };
}

export type Modes = "light" | "dark";

// ============================================================================
// 默认配置
// ============================================================================

export const asriConfigs: AsriConfigs = {
  "light": {
    "followSysAccentColor": false,
    "followCoverImgColor": false,
    "chroma": "1",
    "userCustomColor": "#3478f6",
    "presetPalette": "",
  },
  "dark": {
    "followSysAccentColor": false,
    "followCoverImgColor": false,
    "chroma": "1",
    "userCustomColor": "#3478f6",
    "presetPalette": "",
  },
  "features": {
    "tfp": "",
  },
};

// ============================================================================
// 运行时状态（从 core/runtime.ts 导入）
// ============================================================================

export { runtime };
export { setMode as setCurMode, setI18n, setSysAccentColor, setIsSysAccentGray, setIsUserAccentGray, setIsCoverImgColorGray, setFollowSysAccentColor };

// 便捷访问函数
export function getI18nText(key: string): string {
  return runtime.i18n[key] || key;
}

// ============================================================================
// 当前配置访问器
// ============================================================================

/**
 * 获取当前模式的配置
 * 简化 asriConfigs[curMode] 的访问
 */
export function curConfig(): AsriConfigMode {
  return asriConfigs[runtime.mode];
}

// ============================================================================
// DOM 元素引用（UI 层状态）
// ============================================================================

export let followSysAccentBtn: AsriDomsExtended;
export let followCoverImgColorBtn: AsriDomsExtended;
export let pickColorBtn: AsriDomsExtended;
export let asriChromaSlider: HTMLInputElement | null;
export let colorPicker: HTMLInputElement | null;
export let topbarFusionPlusBtn: AsriDomsExtended;
export let tfpProgressiveBtn: AsriDomsExtended;
export let tfpAcrylicBtn: AsriDomsExtended;
export let tfpLuminousBtn: AsriDomsExtended;

export const setFollowSysAccentBtn = (element: AsriDomsExtended) => {
  followSysAccentBtn = element;
};

export const setFollowCoverImgColorBtn = (element: AsriDomsExtended) => {
  followCoverImgColorBtn = element;
};

export const setPickColorBtn = (element: AsriDomsExtended) => {
  pickColorBtn = element;
};

export const setAsriChromaSlider = (element: HTMLInputElement | null) => {
  asriChromaSlider = element;
};

export const setColorPicker = (element: HTMLInputElement | null) => {
  colorPicker = element;
};

export const setTopbarFusionPlusBtn = (element: AsriDomsExtended) => {
  topbarFusionPlusBtn = element;
};

export const setTfpProgressiveBtn = (element: AsriDomsExtended) => {
  tfpProgressiveBtn = element;
};

export const setTfpAcrylicBtn = (element: AsriDomsExtended) => {
  tfpAcrylicBtn = element;
};

export const setTfpLuminousBtn = (element: AsriDomsExtended) => {
  tfpLuminousBtn = element;
};

// ============================================================================
// 配置加载和保存
// ============================================================================

export async function getLocalConfigs() {
  console.log("curMode", env.appSchemeMode);
  await getFile("/data/snippets/Asri.config.json")
    .then((response) => {
      if (response && response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((data) => {
      if (!data) {
        return;
      }

      // 如果本地配置缺失数据，则赋与默认值
      for (let key in asriConfigs) {
        if (!(key in data)) {
          data[key] = asriConfigs[key as keyof typeof asriConfigs];
        }
      }

      const modes: Modes[] = ["light", "dark"];
      for (const mode of modes) {
        asriConfigs[mode].followSysAccentColor = !!data[mode].followSysAccentColor;
        asriConfigs[mode].followCoverImgColor = !!data[mode].followCoverImgColor;
        asriConfigs[mode].chroma = data[mode].chroma ?? "1";
        asriConfigs[mode].userCustomColor = data[mode].userCustomColor ?? "#3478f6";
        asriConfigs[mode].presetPalette = data[mode].presetPalette ?? "";
      }
      asriConfigs.features = data.features;
      setFollowSysAccentColor(!!data[env.appSchemeMode].followSysAccentColor);
    });
}

export async function updateAsriConfigs() {
  await putFile("/data/snippets/Asri.config.json", JSON.stringify(asriConfigs, undefined, 4));
}

// ============================================================================
// 国际化
// ============================================================================

export async function loadI18n() {
  let res: Response;
  try {
    if (["zh_CN", "zh_CHT", "en_US", "ar_SA"].includes(env.lang)) {
      res = await fetch(`/appearance/themes/Asri/i18n/${env.lang}.json`);
    } else {
      res = await fetch("/appearance/themes/Asri/i18n/en_US.json");
    }

    const i18n = await res.json();
    return i18n;
  } catch (error) {
    console.error("failed to load i18n:", error);
    throw error;
  }
}

export async function initI18n() {
  const i18n = await loadI18n();
  setI18n(i18n);
  return i18n;
}
