import { remote } from "../util/electronAPI";
import { environment as env } from "../util/rsc";

function setTrafficLightPosition(x: number, y = x) {
    if (remote) {
        remote.getCurrentWindow().setWindowButtonPosition({ x: x, y: y });
    }
}

export function applyTrafficLightPosition() {
    if (env.isMacOS) {
        if (!env.isInBrowser) setTrafficLightPosition(16);
        if (env.isMiniWindow) setTrafficLightPosition(14);
    }
}

export function restoreTrafficLightPosition() {
    if (env.isMacOS) {
        if (!env.isInBrowser) setTrafficLightPosition(8);
        if (env.isMiniWindow) setTrafficLightPosition(8, 13);
    }
}