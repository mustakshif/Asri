/**
 * 核心模块统一导出
 * 提供主题配置、颜色管理和工具函数
 */

// 配置和状态管理
export {
  asriConfigs,
  getLocalConfigs,
  updateAsriConfigs,
  loadI18n,
  initI18n,
  // 运行时状态
  runtime,
  curConfig,
  setCurMode,
  setI18n,
  setSysAccentColor,
  setIsSysAccentGray,
  setIsUserAccentGray,
  setIsCoverImgColorGray,
  setFollowSysAccentColor,
  // DOM 元素引用
  followSysAccentBtn,
  followCoverImgColorBtn,
  pickColorBtn,
  asriChromaSlider,
  colorPicker,
  topbarFusionPlusBtn,
  tfpProgressiveBtn,
  tfpAcrylicBtn,
  tfpLuminousBtn,
  // DOM 元素 setter
  setFollowSysAccentBtn,
  setFollowCoverImgColorBtn,
  setPickColorBtn,
  setAsriChromaSlider,
  setColorPicker,
  setTopbarFusionPlusBtn,
  setTfpProgressiveBtn,
  setTfpAcrylicBtn,
  setTfpLuminousBtn,
} from "./config";

// 为兼容性提供 getI18n 别名
export { initI18n as getI18n } from "./config";

// 主题调色板
export { loadThemePalette, unloadThemePalette } from "./themePalette";

// 颜色和调色板
export {
  asriPrstPalettes,
  getSystemAccentColor,
  coverImgColorManager,
  getCoverImgColor,
  updateCoverImgColor,
} from "./palette";

// CSS 变量管理
export { cssVarManager, CSSVarManager } from "./cssVar";

// 颜色工具
export {
  handleGrayScale,
  reverseOnPrimaryLightness,
  addHdrSupportImage,
  removeHdrSupportImage,
  reverseThreshold,
} from "./colorUtils";

// 主题生命周期
export { loadAsriTheme, unloadAsriTheme } from "./theme";
