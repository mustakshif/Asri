import { remote } from "../util/electron";
import { environment as env } from "../util/rsc";

const { isMacOS, isInBrowser, isMiniWindow } = env;

function setTrafficLightPosition(x: number, y = x) {
    if (remote) {
        remote.getCurrentWindow().setWindowButtonPosition({ x: x, y: y });
    }
}

export function applyTrafficLightPosition() {
    if (isMacOS && !isInBrowser) setTrafficLightPosition(16);
    if (isMacOS && isMiniWindow) setTrafficLightPosition(14);
}

export function restoreTrafficLightPosition() {
    if (isMacOS && !isInBrowser) setTrafficLightPosition(8);
    if (isMacOS && isMiniWindow) setTrafficLightPosition(8, 13);
}