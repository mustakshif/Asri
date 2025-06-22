// Core functionality
export { loadThemePalette, unloadThemePalette, initI18n } from "./core";

// CSS Variable Manager
export { cssVarManager, CSSVarManager } from "./cssVarManager";

// Configuration management
export { asriConfigs, getAsriConfigs, updateAsriConfigs } from "./configs";

// Palette data
export { asriPrstPalettes } from "./palettes";

// State management
export * from "./state";

// System color handling
export { getSystemAccentColor, handleGrayScale, reverseOnPrimaryLightness } from "./systemColor";

// Menu items
export { createBarModeMenuItems, initMenuItems } from "./menuItems";

// Event handlers
export { 
  initAsriConfigMenuItemClick,
  handleFollowSystemAccentBtnClick,
  handlePickColorBtnClick,
  handleColorPickerInput,
  handleColorPickerChange,
  handleChromaSliderInput,
  tfpMenuItemCallbackEventListener,
  paletteMenuItemClickEventListener
} from "./eventHandlers";

// I18n
export { loadI18n } from "./i18n";

// Types
export type * from "./types";

// Re-export main functions for backward compatibility
export let i18n: any;
export let followSysAccentColor = false;

// Initialize and export for backward compatibility
import { initI18n } from "./core";

// This function should be called to initialize i18n if needed
export async function getI18n() {
  return await initI18n();
} 