export let curMode: "light" | "dark";
export let i18n: any;
export let sysAccentColor: string;
export let isSysAccentGray = false;
export let isUserAccentGray = false;
export let isCoverImgColorGray = false;
export let followSysAccentColor = false;

// DOM 元素引用
export let followSysAccentBtn: AsriDomsExtended;
export let followCoverImgColorBtn: AsriDomsExtended;
export let pickColorBtn: AsriDomsExtended;
export let asriChromaSlider: HTMLInputElement | null;
export let colorPicker: HTMLInputElement | null;
export let topbarFusionPlusBtn: AsriDomsExtended;
export let tfpProgressiveBtn: AsriDomsExtended;
export let tfpAcrylicBtn: AsriDomsExtended;
export let tfpLuminousBtn: AsriDomsExtended;

// 状态设置函数
export const setCurMode = (mode: "light" | "dark") => {
  curMode = mode;
};

export const setI18n = (i18nData: any) => {
  i18n = i18nData;
};

export const setSysAccentColor = (color: string) => {
  sysAccentColor = color;
};

export const setIsSysAccentGray = (value: boolean) => {
  isSysAccentGray = value;
};

export const setIsUserAccentGray = (value: boolean) => {
  isUserAccentGray = value;
};

export const setIsCoverImgColorGray = (value: boolean) => {
  isCoverImgColorGray = value;
};

export const setFollowSysAccentColor = (value: boolean) => {
  followSysAccentColor = value;
};

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