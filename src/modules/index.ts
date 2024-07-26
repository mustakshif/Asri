import { AsriEventListener } from "../util/eventListeners";
import { debounce } from "../util/misc";
import { AsriMutationObserver } from "../util/observers";
import { updateWndEls } from "../util/state";
import { calcProtyleSpacings, removeProtyleSpacings } from "./afwd";
import { docBodyMoCallback } from "./dialog";
import { destroyDockBg, dockLBg } from "./docks";
import { formatProtyleWithBgImageOnly, removeProtyleWithBgImageOnlyClassName } from "./editor";
import { addEnvClassNames, removeEnvClassNames } from "./env";
import { restoreDefaultSiyuanScrollbar, useMacSysScrollbar } from "./scrollbar";
import { formatIndentGuidesForFocusedItems, removeIndentGuidesFormatClassName } from "./sidepanels";
import { removeStatusHeightVar, setStatusHeightVar } from "./status";
import { calcTabbarSpacings, loadTopbarFusion, unloadTopbarFusion } from "./topbarFusion";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./trafficLights";

const globalClickEventListener = new AsriEventListener(mouseupEvents);
const watchImgExportMo = new AsriMutationObserver(debounce(docBodyMoCallback, 200));

export function loadAsriJSModules() {
    addEnvClassNames();
    useMacSysScrollbar();
    applyTrafficLightPosition();
    setStatusHeightVar();
    loadTopbarFusion();
    updateStyle();
    globalClickEventListener.start(document.body, 'mouseup');
    watchImgExportMo.observe(document.body, { childList: true });
}

export function unloadAsriJSModules() {
    removeEnvClassNames();
    restoreDefaultSiyuanScrollbar();
    restoreTrafficLightPosition();
    removeStatusHeightVar();
    unloadTopbarFusion();
    destroyStyleUpdates();
    globalClickEventListener.remove(document, 'mouseup');
    watchImgExportMo.disconnect(() => document.body.classList.remove("has-exportimg"));
}
function mouseupEvents(e: Event) {
    // console.log(e);
    updateStyle(e);
}

function updateStyle(e?: Event) {
    setTimeout(async () => {
        dockLBg();
        const wnds = await updateWndEls();
        calcTabbarSpacings(wnds);
        calcProtyleSpacings(wnds);
    }, 0);

    setTimeout(() => {
        formatIndentGuidesForFocusedItems();
        formatProtyleWithBgImageOnly();
    }, 200);

    if (e) {
        console.log(e);
    }
}

function destroyStyleUpdates() {
    destroyDockBg();
    removeIndentGuidesFormatClassName();
    removeProtyleWithBgImageOnlyClassName();
    removeProtyleSpacings();
}