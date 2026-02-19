import {
  applyWindowVibrancy,
  removeWindowVibrancy,
  setThemeSource as setThemeSourceImpl,
} from "../core/platform/windowChrome";

export function setVibrancy() {
  applyWindowVibrancy();
}

export function removeVibrancy() {
  removeWindowVibrancy();
}

export function setThemeSource(mode: "dark" | "light" | "system" = "system") {
  setThemeSourceImpl(mode);
}
