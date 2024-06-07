import { AsriEventListener } from "../util/eventListeners";
import { watchImgExportMo } from "./dialog";
import { dockBg } from "./docks";
import { addEnvClassNames, removeEnvClassNames } from "./env";
import { restoreDefaultScrollbar, useSysScrollbar } from "./scrollbar";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./trafficLights";

const asriClickEventListener = new AsriEventListener(listenClickEvents);

export function initModules() {
    addEnvClassNames();
    useSysScrollbar();
    applyTrafficLightPosition();   
    dockBg();
    asriClickEventListener.start(document, 'click');
    watchImgExportMo.observe(document.body, { childList: true });
}

export function destroyModules() {
    removeEnvClassNames();
    restoreDefaultScrollbar();
    restoreTrafficLightPosition();
    asriClickEventListener.remove(document, 'click');
    watchImgExportMo.disconnect(() => document.body.classList.remove("has-exportimg"));
}
function listenClickEvents(e: Event) {
    console.log(e);
    dockBg();
}