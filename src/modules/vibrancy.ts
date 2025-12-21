import { environment as env } from "../util/rsc";
import { remote } from "../util/electron";

const { nativeTheme } = remote ? remote : {};
// const isSysDark = nativeTheme.shouldUseDarkColors;
const appMode = env.appSchemeMode;
const isFollowSysMode = env.isFollowSysMode;

export function setVibrancy() {
  if (!remote) return;
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
  if (!remote) return;
  if (env.isMacOS) {
    setThemeSource();
    remote.getCurrentWindow().setVibrancy(null);
  } else if (env.isWindows) {
    remote.getCurrentWindow().setBackgroundMaterial(null);
  }
  document.body.classList.remove("asri-vibrancy");
}

export function setThemeSource(mode: "dark" | "light" | "system" = "system") {
  if (remote && (env.isMacOS || env.isWindows)) {
    setTimeout(() => {
      nativeTheme.themeSource = mode; // can break theme.js execution
    }, 200);
    console.log(isFollowSysMode, "resetThemeSource", mode, env.appSchemeMode);
  }
}
