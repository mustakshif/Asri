import { AsriEventListener } from "../util/eventListeners";
import { debounce } from "../util/misc";
import { AsriMutationObserver } from "../util/observers";
import { docBodyMoCallback } from "./dialog";
import { destroyDockBg, dockLBg } from "./docks";
import { addEnvClassNames, removeEnvClassNames } from "./env";
import { restoreDefaultScrollbar, useSysScrollbar } from "./scrollbar";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./trafficLights";

const clickEventListener = new AsriEventListener(clickEvents);
const watchImgExportMo = new AsriMutationObserver(debounce(docBodyMoCallback, 200));
export function loadModules() {
    addEnvClassNames();
    useSysScrollbar();
    applyTrafficLightPosition();   
    dockLBg();
    clickEventListener.start(document, 'click');
    watchImgExportMo.observe(document.body, { childList: true });
}

export function unloadModules() {
    removeEnvClassNames();
    restoreDefaultScrollbar();
    restoreTrafficLightPosition();
    destroyDockBg();
    clickEventListener.remove(document, 'click');
    watchImgExportMo.disconnect(() => document.body.classList.remove("has-exportimg"));
}
function clickEvents(e: Event) {
    console.log(e);
    dockLBg();
}