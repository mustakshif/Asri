import { environment as env } from "../util/rsc";
import { remote } from "../util/electron";

const { nativeTheme } = remote ?? {};
// const isSysDark = nativeTheme.shouldUseDarkColors;
const appMode = env.appSchemeMode;
const isFollowSysMode = env.isFollowSysMode;

const os = remote?.require("os");
const release = os?.release();
const buildVer = parseInt(release?.split(".")[2] || "0");
const isWin11 = buildVer >= 22000;

export function setVibrancy() {
  if (!remote && !isWin11) return;
  setThemeSource(isFollowSysMode ? "system" : appMode);
  if (env.isMacOS) {
    remote.getCurrentWindow().setVibrancy("menu", 300);
    document.body.classList.add("asri-vibrancy");
  } else if (env.isWindows) {
    remote.getCurrentWindow().setBackgroundMaterial("acrylic", 300);
    document.body.classList.add("asri-vibrancy");
  }
}

export function removeVibrancy() {
  if (!remote && !isWin11) return;
  setThemeSource();
  if (env.isMacOS) {
    remote.getCurrentWindow().setVibrancy(null);
  } else if (env.isWindows) {
    remote.getCurrentWindow().setBackgroundMaterial(null);
  }
  document.body.classList.remove("asri-vibrancy");
}

export function setThemeSource(mode: "dark" | "light" | "system" = "system") {
  if (remote && (env.isMacOS || env.isWindows && isWin11)) {
    setTimeout(() => {
      nativeTheme.themeSource = mode; // can break theme.js execution
    }, 400);
    console.log(isFollowSysMode, "resetThemeSource", mode, env.appSchemeMode);
  }
}
