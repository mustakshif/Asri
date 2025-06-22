import type { PresetPalette } from "./types";

export const asriPrstPalettes: Record<string, PresetPalette> = {
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