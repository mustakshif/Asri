import {
  ASRI_CONFIG_VERSION,
  AsriConfigV2,
  createDefaultAsriConfigV2,
  normalizeFeaturesConfig,
  normalizeModeConfig,
} from "./schema";

export type AsriConfigSourceKind = "default" | "v2" | "legacy" | "invalid";

export interface AsriConfigMigrationResult {
  config: AsriConfigV2;
  migrated: boolean;
  sourceKind: AsriConfigSourceKind;
}

type RecordLike = Record<string, unknown>;

function isRecord(value: unknown): value is RecordLike {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isModeConfigComplete(input: unknown) {
  if (!isRecord(input)) return false;
  return (
    typeof input.followSysAccentColor === "boolean" &&
    typeof input.followCoverImgColor === "boolean" &&
    typeof input.chroma === "string" &&
    typeof input.userCustomColor === "string" &&
    typeof input.presetPalette === "string"
  );
}

function isCSSLoaderConfigComplete(input: unknown) {
  if (!isRecord(input)) return false;
  return typeof input.enabled === "boolean" && Array.isArray(input.enabledSnippets);
}

function isFeaturesConfigComplete(input: unknown) {
  if (!isRecord(input)) return false;
  return typeof input.tfp === "string" && isCSSLoaderConfigComplete(input.cssLoader);
}

export function migrateAsriConfig(raw: unknown): AsriConfigMigrationResult {
  const defaults = createDefaultAsriConfigV2();

  if (!isRecord(raw)) {
    return {
      config: defaults,
      migrated: false,
      sourceKind: "default",
    };
  }

  if (isRecord(raw.modes)) {
    const modes = raw.modes;
    const config: AsriConfigV2 = {
      version: ASRI_CONFIG_VERSION,
      modes: {
        light: normalizeModeConfig(modes.light, defaults.modes.light),
        dark: normalizeModeConfig(modes.dark, defaults.modes.dark),
      },
      features: normalizeFeaturesConfig(raw.features, defaults.features),
    };

    const isCanonicalV2 =
      raw.version === ASRI_CONFIG_VERSION &&
      isModeConfigComplete(modes.light) &&
      isModeConfigComplete(modes.dark) &&
      isFeaturesConfigComplete(raw.features);

    return {
      config,
      migrated: !isCanonicalV2,
      sourceKind: "v2",
    };
  }

  if (isRecord(raw.light) || isRecord(raw.dark) || isRecord(raw.features)) {
    const config: AsriConfigV2 = {
      version: ASRI_CONFIG_VERSION,
      modes: {
        light: normalizeModeConfig(raw.light, defaults.modes.light),
        dark: normalizeModeConfig(raw.dark, defaults.modes.dark),
      },
      features: normalizeFeaturesConfig(raw.features, defaults.features),
    };

    return {
      config,
      migrated: true,
      sourceKind: "legacy",
    };
  }

  return {
    config: defaults,
    migrated: true,
    sourceKind: "invalid",
  };
}
