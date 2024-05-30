import { remote } from "../util/electron";
import { environment as env } from "../util/rsc";
export function setTrafficLightPosition(x: number, y = x) {
    if (remote === null) return;
    remote.getCurrentWindow().setWindowButtonPosition({ x: x, y: y });
}

export function applyTrafficLightPosition() {
    if (env.isMacOS && !env.isInBrowser) setTrafficLightPosition(16);
    if (env.isMacOS && env.isMiniWindow) setTrafficLightPosition(14);
}
export function restoreTrafficLightPosition() {
    if (env.isMacOS && !env.isInBrowser) setTrafficLightPosition(8);
    if (env.isMacOS && env.isMiniWindow) setTrafficLightPosition(8, 13);
}