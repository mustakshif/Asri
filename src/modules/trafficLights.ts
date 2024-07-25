import { remote } from "../util/electronAPI";
import { environment as env } from "../util/rsc";

const { isMacOS, isInBrowser, isMiniWindow } = env;

function setTrafficLightPosition(x: number, y = x) {
    if (remote) {
        remote.getCurrentWindow().setWindowButtonPosition({ x: x, y: y });
    }
}

export function applyTrafficLightPosition() {
    if (isMacOS) {
        if (!isInBrowser) setTrafficLightPosition(16);
        else if (isMiniWindow) setTrafficLightPosition(14);
    }
}

export function restoreTrafficLightPosition() {
    if (isMacOS) {
        if (!isInBrowser) setTrafficLightPosition(8);
        else if (isMiniWindow) setTrafficLightPosition(8, 13);
    }
}