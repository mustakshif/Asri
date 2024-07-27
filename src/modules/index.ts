import { AsriEventListener } from "../util/eventListeners";
import { debounce } from "../util/misc";
import { asriMoCallback, AsriMutationObserver, MOConfigForClassNames } from "../util/observers";
import { updateWndEls } from "../util/state";
import { calcProtyleSpacings, removeProtyleSpacings } from "./afwd";
import { destroyDockBg, dockLBg } from "./docks";
import { formatProtyleWithBgImageOnly, removeProtyleWithBgImageOnlyClassName } from "./editor";
import { addEnvClassNames, removeEnvClassNames } from "./env";
import { restoreDefaultSiyuanScrollbar, useMacSysScrollbar } from "./scrollbar";
import { formatIndentGuidesForFocusedItems, removeIndentGuidesFormatClassName } from "./sidepanels";
import { removeStatusHeightVar, setStatusHeightVar } from "./status";
import { calcTabbarSpacings, loadTopbarFusion, unloadTopbarFusion } from "./topbarFusion";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./trafficLights";

const globalClickEventListener = new AsriEventListener(mouseupEvents);
// const watchImgExportMo = new AsriMutationObserver(debounce(docBodyMoCallback, 200));
// const itemFocusMo = new AsriMutationObserver(itemFocusMoCallback);
const asriMo = new AsriMutationObserver(debounce(asriMoCallback, 200));

export function loadAsriJSModules() {
    addEnvClassNames();
    useMacSysScrollbar();
    applyTrafficLightPosition();
    setStatusHeightVar();
    loadTopbarFusion();
    updateStyle();
    globalClickEventListener.start(document.body, 'mouseup');
    asriMo.observe(document.body, MOConfigForClassNames);
    // // watchImgExportMo.observe(document.body, { childList: true });
    // itemFocusMo.observe(document.body, MOConfigForClassNames);
}

export function unloadAsriJSModules() {
    removeEnvClassNames();
    restoreDefaultSiyuanScrollbar();
    restoreTrafficLightPosition();
    removeStatusHeightVar();
    unloadTopbarFusion();
    destroyStyleUpdates();
    globalClickEventListener.remove(document, 'mouseup');
    // watchImgExportMo.disconnect(() => document.body.classList.remove("has-exportimg"));
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