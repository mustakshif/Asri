import { applyAsriTrafficLightPosition, restoreDefaultTrafficLightPosition } from "../core/platform/windowChrome";

export function applyTrafficLightPosition() {
  applyAsriTrafficLightPosition();
}

export function restoreTrafficLightPosition() {
  restoreDefaultTrafficLightPosition();
}
