import { AsriEventListener } from "../util/eventListeners";
import { debounce } from "../util/misc";
import { AsriMutationObserver } from "../util/observers";
import { docBodyMoCallback } from "./dialog";
import { destroyDockBg, dockLBg } from "./docks";
import { formatProtyleWithBgImageOnly, removeProtyleWithBgImageOnlyClassName } from "./editor";
import { addEnvClassNames, removeEnvClassNames } from "./env";
import { restoreDefaultScrollbar, useSysScrollbar } from "./scrollbar";
import { formatIndentGuidesForFocusedItems, removeIndentGuidesFormatClassName } from "./sidepanels";
import { removeStatusHeightVar, setStatusHeightVar } from "./status";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./trafficLights";

const clickEventListener = new AsriEventListener(clickEvents);
const watchImgExportMo = new AsriMutationObserver(debounce(docBodyMoCallback, 200));
export function loadModules() {
    addEnvClassNames();
    useSysScrollbar();
    applyTrafficLightPosition();   
    dockLBg();
    setStatusHeightVar();
    formatIndentGuidesForFocusedItems();
    formatProtyleWithBgImageOnly();
    clickEventListener.start(document, 'mouseup');
    watchImgExportMo.observe(document.body, { childList: true });
}

export function unloadModules() {
    removeEnvClassNames();
    restoreDefaultScrollbar();
    restoreTrafficLightPosition();
    destroyDockBg();
    removeStatusHeightVar();
    removeIndentGuidesFormatClassName();
    removeProtyleWithBgImageOnlyClassName();
    clickEventListener.remove(document, 'mouseup');
    watchImgExportMo.disconnect(() => document.body.classList.remove("has-exportimg"));
}
function clickEvents(e: Event) {
    // console.log(e);
    dockLBg();
    setTimeout(() => {
        formatIndentGuidesForFocusedItems();
        formatProtyleWithBgImageOnly();
    }, 200);
}