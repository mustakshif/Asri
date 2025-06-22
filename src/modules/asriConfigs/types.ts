export interface AsriModeConfig {
  followSysAccentColor: boolean;
  chroma: string;
  userCustomColor: string;
  presetPalette: string;
}

export interface AsriFeatures {
  tfp: string;
}

export interface AsriConfigs {
  light: AsriModeConfig;
  dark: AsriModeConfig;
  features: AsriFeatures;
}

export interface PaletteConfig {
  primary: string;
  chroma: string;
  followSysAccentColor: boolean;
}

export interface PresetPalette {
  dark: PaletteConfig;
  light: PaletteConfig;
}

export type AsriDomsExtended = HTMLElement | null; 