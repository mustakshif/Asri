import { getFile, putFile } from "../../util/api";
import { migrateAsriConfig } from "./migration";
import {
  ASRI_CONFIG_LEGACY_BACKUP_PATH,
  ASRI_CONFIG_PATH,
  AsriConfigV2,
  createDefaultAsriConfigV2,
} from "./schema";

export interface LoadAsriConfigResult {
  config: AsriConfigV2;
  migrated: boolean;
  backupWritten: boolean;
}

async function readTextFile(path: string): Promise<string | null> {
  const response = await getFile(path);
  if (!response || response.status !== 200) return null;
  return await response.text();
}

async function writeTextFile(path: string, content: string): Promise<void> {
  await putFile(path, content);
}

async function writeLegacyBackupIfMissing(rawContent: string): Promise<boolean> {
  const existingBackup = await readTextFile(ASRI_CONFIG_LEGACY_BACKUP_PATH);
  if (existingBackup !== null) return false;
  await writeTextFile(ASRI_CONFIG_LEGACY_BACKUP_PATH, rawContent);
  return true;
}

export async function saveAsriConfig(config: AsriConfigV2): Promise<void> {
  await writeTextFile(ASRI_CONFIG_PATH, JSON.stringify(config, null, 4));
}

export async function loadAsriConfig(): Promise<LoadAsriConfigResult> {
  const rawContent = await readTextFile(ASRI_CONFIG_PATH);

  if (rawContent === null) {
    return {
      config: createDefaultAsriConfigV2(),
      migrated: false,
      backupWritten: false,
    };
  }

  let parsed: unknown = null;
  let parseFailed = false;
  try {
    parsed = JSON.parse(rawContent);
  } catch (error) {
    parseFailed = true;
  }

  const migrationResult = parseFailed
    ? {
        config: createDefaultAsriConfigV2(),
        migrated: true,
        sourceKind: "invalid" as const,
      }
    : migrateAsriConfig(parsed);
  const shouldBackup = migrationResult.sourceKind === "legacy" || migrationResult.sourceKind === "invalid";

  let backupWritten = false;
  if (shouldBackup) {
    backupWritten = await writeLegacyBackupIfMissing(rawContent);
  }

  if (migrationResult.migrated || shouldBackup) {
    await saveAsriConfig(migrationResult.config);
  }

  return {
    config: migrationResult.config,
    migrated: migrationResult.migrated || shouldBackup,
    backupWritten,
  };
}
