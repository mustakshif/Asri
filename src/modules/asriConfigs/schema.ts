export const ASRI_CONFIG_VERSION = 2 as const;
export const ASRI_CONFIG_PATH = "/data/snippets/Asri.config.json";
export const ASRI_CONFIG_LEGACY_BACKUP_PATH = "/data/snippets/Asri.config.legacy.json";

export const DEFAULT_MODE_CONFIG: AsriModeConfig = {
  followSysAccentColor: false,
  followCoverImgColor: false,
  chroma: "1",
  userCustomColor: "#3478f6",
  presetPalette: "",
};

export const DEFAULT_FEATURES: AsriFeatures = {
  tfp: "",
  cssLoader: {
    enabled: false,
    enabledSnippets: [],
  },
};

export interface AsriConfigV2 {
  version: typeof ASRI_CONFIG_VERSION;
  modes: Record<Modes, AsriModeConfig>;
  features: AsriFeatures;
}

type RecordLike = Record<string, unknown>;

function isRecord(value: unknown): value is RecordLike {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeString(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function normalizeBoolean(value: unknown, fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

function normalizeStringArray(value: unknown, fallback: string[] = []) {
  if (!Array.isArray(value)) return [...fallback];
  return value.filter((item): item is string => typeof item === "string");
}

export function normalizeModeConfig(input: unknown, fallback: AsriModeConfig = DEFAULT_MODE_CONFIG): AsriModeConfig {
  const modeInput = isRecord(input) ? input : {};
  return {
    followSysAccentColor: normalizeBoolean(modeInput.followSysAccentColor, fallback.followSysAccentColor),
    followCoverImgColor: normalizeBoolean(modeInput.followCoverImgColor, fallback.followCoverImgColor ?? false),
    chroma: normalizeString(modeInput.chroma, fallback.chroma),
    userCustomColor: normalizeString(modeInput.userCustomColor, fallback.userCustomColor),
    presetPalette: normalizeString(modeInput.presetPalette, fallback.presetPalette),
  };
}

export function normalizeFeaturesConfig(input: unknown, fallback: AsriFeatures = DEFAULT_FEATURES): AsriFeatures {
  const featuresInput = isRecord(input) ? input : {};
  const cssLoaderInput = isRecord(featuresInput.cssLoader) ? featuresInput.cssLoader : {};

  return {
    ...fallback,
    ...featuresInput,
    tfp: normalizeString(featuresInput.tfp, fallback.tfp),
    cssLoader: {
      enabled: normalizeBoolean(cssLoaderInput.enabled, fallback.cssLoader?.enabled ?? false),
      enabledSnippets: normalizeStringArray(cssLoaderInput.enabledSnippets, fallback.cssLoader?.enabledSnippets ?? []),
    },
  };
}

export function createDefaultAsriConfigV2(): AsriConfigV2 {
  return {
    version: ASRI_CONFIG_VERSION,
    modes: {
      light: { ...DEFAULT_MODE_CONFIG },
      dark: { ...DEFAULT_MODE_CONFIG },
    },
    features: normalizeFeaturesConfig(DEFAULT_FEATURES),
  };
}

export function toLegacyShape(config: AsriConfigV2): AsriConfigs {
  return {
    light: { ...config.modes.light },
    dark: { ...config.modes.dark },
    features: normalizeFeaturesConfig(config.features),
  };
}

export function fromLegacyShape(config: AsriConfigs): AsriConfigV2 {
  return {
    version: ASRI_CONFIG_VERSION,
    modes: {
      light: normalizeModeConfig(config.light),
      dark: normalizeModeConfig(config.dark),
    },
    features: normalizeFeaturesConfig(config.features),
  };
}
