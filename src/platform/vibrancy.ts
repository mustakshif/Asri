import { environment as env } from "../utils/rsc";
import { remote } from "../utils/electron";

const { nativeTheme } = remote ?? {};
// const isSysDark = nativeTheme.shouldUseDarkColors;
const appMode = env.appSchemeMode;
const isFollowSysMode = env.isFollowSysMode;

const os = remote?.require("os");
const release = os?.release();
const buildVer = parseInt(release?.split(".")[2] || "0");
const isWin11 = buildVer >= 22000;

export function setVibrancy() {
  if (!remote) return;
  setThemeSource(isFollowSysMode ? "system" : appMode);
  if (env.isMacOS) {
    remote.getCurrentWindow().setVibrancy("menu", 300);
    document.body.classList.add("asri-vibrancy");
  } else if (env.isWindows && isWin11) {
    remote.getCurrentWindow().setBackgroundMaterial("acrylic", 300);
    document.body.classList.add("asri-vibrancy");
  }
}

export function removeVibrancy() {
  if (!remote) return;
  setThemeSource();
  if (env.isMacOS) {
    remote.getCurrentWindow().setVibrancy(null);
  } else if (env.isWindows && isWin11) {
    remote.getCurrentWindow().setBackgroundMaterial(null);
  }
  document.body.classList.remove("asri-vibrancy");
}

export function setThemeSource(mode: "dark" | "light" | "system" = "system") {
  if (remote && (env.isMacOS || env.isWindows && isWin11)) {
    setTimeout(() => {
      nativeTheme.themeSource = mode; // can break theme.js execution
    }, 400);
  }
}
