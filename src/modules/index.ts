import { AsriEventListener } from "../util/eventListeners";
import { debounce } from "../util/misc";
import { AsriMutationObserver, globalClassNameMoCallback, MOConfigForClassNames } from "../util/observers";
import { updateWndEls } from "../util/state";
import { calcProtyleSpacings, removeProtyleSpacings } from "./afwd";
import { docBodyMoCallback } from "./dialog";
import { destroyDockBg, dockLBg } from "./docks";
import { debouncedFormatProtyleWithBgImageOnly, removeProtyleWithBgImageOnlyClassName } from "./editor";
import { addEnvClassNames, removeEnvClassNames } from "./env";
import { restoreDefaultSiyuanScrollbar, useMacSysScrollbar } from "./scrollbar";
import { removeIndentGuidesFormatClassName } from "./sidepanels";
import { removeStatusHeightVar, setStatusHeightVar } from "./status";
import { calcTabbarSpacings, loadTopbarFusion, unloadTopbarFusion } from "./topbarFusion";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./trafficLights";

const globalClickEventListener = new AsriEventListener(mouseupEvents);
const watchImgExportMo = new AsriMutationObserver(debounce(docBodyMoCallback, 500));
const globalClassNameMo = new AsriMutationObserver(globalClassNameMoCallback);

export async function loadAsriJSModules() {
    addEnvClassNames();
    useMacSysScrollbar();
    applyTrafficLightPosition();
    setStatusHeightVar();
    await updateWndEls();
    loadTopbarFusion();
    updateStyle();
    globalClickEventListener.start(document.body, 'mouseup');
    globalClassNameMo.observe(document.body, MOConfigForClassNames);
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
    // run on first load
    if (!e) {
        mouseTriggeredUpdates();
    }

    // run on mouse events
    else if (e.type.startsWith('mouse')) {
        mouseTriggeredUpdates();
    }

    function mouseTriggeredUpdates() {
        setTimeout(() => {
            dockLBg();
            debouncedFormatProtyleWithBgImageOnly();
        }, 0);

        (async () => {
            const wnds = await updateWndEls();
            calcTabbarSpacings(wnds);
            calcProtyleSpacings(wnds);
        })();
    }
}

function destroyStyleUpdates() {
    destroyDockBg();
    removeIndentGuidesFormatClassName();
    removeProtyleWithBgImageOnlyClassName();
    removeProtyleSpacings();
}