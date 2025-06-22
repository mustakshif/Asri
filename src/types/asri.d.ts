// DOM 元素相关类型
type AsriDomsExtended = HTMLElement | null | undefined;
type ElDir = "L" | "R" | "B";
type Modes = "light" | "dark";

// Asri 配置相关类型 - 全局可用
interface AsriModeConfig {
  followSysAccentColor: boolean;
  chroma: string;
  userCustomColor: string;
  presetPalette: string;
}

interface AsriFeatures {
  tfp: string;
  [key: string]: any;
}

interface AsriConfigs {
  light: AsriModeConfig;
  dark: AsriModeConfig;
  features: AsriFeatures;
}

interface PaletteConfig {
  primary: string;
  chroma: string;
  followSysAccentColor: boolean;
}

interface PresetPalette {
  dark: PaletteConfig;
  light: PaletteConfig;
}
