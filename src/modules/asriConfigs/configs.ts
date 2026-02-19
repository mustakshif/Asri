import { environment as env } from "../../util/rsc";
import { loadAsriConfig, saveAsriConfig } from "./repository";
import { createDefaultAsriConfigV2, fromLegacyShape, toLegacyShape } from "./schema";
import { setFollowSysAccentColor } from "./state";

export const asriConfigs: AsriConfigs = toLegacyShape(createDefaultAsriConfigV2());

function applyConfigSnapshot(config: AsriConfigs) {
  asriConfigs.light = { ...config.light };
  asriConfigs.dark = { ...config.dark };
  asriConfigs.features = { ...config.features };
}

export async function getLocalConfigs() {
  const { config } = await loadAsriConfig();
  applyConfigSnapshot(toLegacyShape(config));
  setFollowSysAccentColor(!!asriConfigs[env.appSchemeMode].followSysAccentColor);
}

export async function updateAsriConfigs() {
  await saveAsriConfig(fromLegacyShape(asriConfigs));
}
