import { AsriEventListener } from "../util/eventListeners";
import { watchImgExportMo } from "./dialog";
import { destroyDockBg, docklBg } from "./docks";
import { addEnvClassNames, removeEnvClassNames } from "./env";
import { restoreDefaultScrollbar, useSysScrollbar } from "./scrollbar";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./trafficLights";

const asriClickEventListener = new AsriEventListener(listenClickEvents);

export function loadModules() {
    addEnvClassNames();
    useSysScrollbar();
    applyTrafficLightPosition();   
    docklBg();
    asriClickEventListener.start(document, 'click');
    watchImgExportMo.observe(document.body, { childList: true });
}

export function unloadModules() {
    removeEnvClassNames();
    restoreDefaultScrollbar();
    restoreTrafficLightPosition();
    destroyDockBg();
    asriClickEventListener.remove(document, 'click');
    watchImgExportMo.disconnect(() => document.body.classList.remove("has-exportimg"));
}
function listenClickEvents(e: Event) {
    console.log(e);
    docklBg();
}