import { remote } from "../../util/electron";
import { environment as env } from "../../util/rsc";

export type ThemeSourceMode = "dark" | "light" | "system";

const { nativeTheme } = remote ?? {};
const os = remote?.require("os");
const release = os?.release();
const buildVer = parseInt(release?.split(".")[2] || "0");
const isWin11 = buildVer >= 22000;

function setWindowButtonPosition(x: number, y = x) {
  if (!remote) return;
  remote.getCurrentWindow().setWindowButtonPosition({ x, y });
}

export function applyAsriTrafficLightPosition() {
  if (!env.isMacOS) return;
  if (!env.isInBrowser) setWindowButtonPosition(16);
  if (env.isMiniWindow) setWindowButtonPosition(14);
}

export function restoreDefaultTrafficLightPosition() {
  if (!env.isMacOS) return;
  if (!env.isInBrowser) setWindowButtonPosition(8);
  if (env.isMiniWindow) setWindowButtonPosition(8, 13);
}

export function setThemeSource(mode: ThemeSourceMode = "system") {
  if (!remote || !(env.isMacOS || (env.isWindows && isWin11))) return;
  setTimeout(() => {
    nativeTheme.themeSource = mode;
  }, 400);
}

export function applyWindowVibrancy() {
  if (!remote) return;
  const appMode = env.appSchemeMode;
  const isFollowSysMode = env.isFollowSysMode;

  setThemeSource(isFollowSysMode ? "system" : appMode);

  if (env.isMacOS) {
    remote.getCurrentWindow().setVibrancy("menu", 300);
    document.body.classList.add("asri-vibrancy");
  } else if (env.isWindows && isWin11) {
    remote.getCurrentWindow().setBackgroundMaterial("acrylic", 300);
    document.body.classList.add("asri-vibrancy");
  }
}

export function removeWindowVibrancy() {
  if (!remote) return;
  setThemeSource();

  if (env.isMacOS) {
    remote.getCurrentWindow().setVibrancy(null);
  } else if (env.isWindows && isWin11) {
    remote.getCurrentWindow().setBackgroundMaterial(null);
  }

  document.body.classList.remove("asri-vibrancy");
}
