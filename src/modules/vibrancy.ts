import { environment as env } from "../util/rsc";
import { remote } from "../util/electron";

const { nativeTheme } = remote ? remote : {};
// const isSysDark = nativeTheme.shouldUseDarkColors;
const appMode = env.appSchemeMode;
const isFollowSysMode = env.isFollowSysMode;

export function setVibrancy() {
  if (remote && env.isMacOS) {
    setThemeSource(isFollowSysMode ? "system" : appMode);
    remote.getCurrentWindow().setVibrancy("menu", 500);
  }
}

export function removeVibrancy() {
  if (remote && env.isMacOS) {
    setThemeSource();
    remote.getCurrentWindow().setVibrancy(null);
  }
}

export function setThemeSource(mode: "dark" | "light" | "system" = "system") {
  if (remote && env.isMacOS) {
    setTimeout(() => {
      nativeTheme.themeSource = mode; // can break theme.js execution
    }, 200);
    console.log(isFollowSysMode, "resetThemeSource", mode, env.appSchemeMode);
  }
}
