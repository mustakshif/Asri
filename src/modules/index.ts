import { AsriEventListener } from "../util/eventListeners";
import { debounce } from "../util/misc";
import { AsriMutationObserver } from "../util/observers";
import { docBodyMoCallback } from "./dialog";
import { destroyDockBg, dockLBg } from "./docks";
import { formatProtyleWithBgImageOnly, removeProtyleWithBgImageOnlyClassName } from "./editor";
import { addEnvClassNames, removeEnvClassNames } from "./env";
import { restoreDefaultSiyuanScrollbar, useMacSysScrollbar } from "./scrollbar";
import { formatIndentGuidesForFocusedItems, removeIndentGuidesFormatClassName } from "./sidepanels";
import { removeStatusHeightVar, setStatusHeightVar } from "./status";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./trafficLights";

const clickEventListener = new AsriEventListener(mouseupEvents);
const watchImgExportMo = new AsriMutationObserver(debounce(docBodyMoCallback, 200));
export function loadAsriModules() {
    addEnvClassNames();
    useMacSysScrollbar();
    applyTrafficLightPosition();
    setStatusHeightVar();
    updateStyle();
    clickEventListener.start(document, 'mouseup');
    watchImgExportMo.observe(document.body, { childList: true });
}

export function unloadAsriModules() {
    removeEnvClassNames();
    restoreDefaultSiyuanScrollbar();
    restoreTrafficLightPosition();
    removeStatusHeightVar();
    destroyStyleUpdates();
    clickEventListener.remove(document, 'mouseup');
    watchImgExportMo.disconnect(() => document.body.classList.remove("has-exportimg"));
}
function mouseupEvents(e: Event) {
    // console.log(e);
    updateStyle(e);
}

function updateStyle(e?: Event) {
    setTimeout(() => {
        dockLBg();
    }, 0);

    setTimeout(() => {
        formatIndentGuidesForFocusedItems();
        formatProtyleWithBgImageOnly();
    }, 200);
}

function destroyStyleUpdates() {
    destroyDockBg();
    removeIndentGuidesFormatClassName();
    removeProtyleWithBgImageOnlyClassName();
}