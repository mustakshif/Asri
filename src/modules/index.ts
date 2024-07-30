import { AsriEventListener } from "../util/eventListeners";
import { debounce, querySelectorPromise } from "../util/misc";
import { AsriMutationObserver, AsriResizeObserver, MOConfigForClassNames } from "../util/observers";
import { asriDoms } from "../util/rsc";
import { debouncedUpdateTopbarOverflow, updateWndEls } from "../util/state";
import { calcProtyleSpacings, debouncedCalcProtyleSpacings, removeProtyleSpacings } from "./afwd";
import { docBodyMoCallback } from "./dialog";
import { destroyDockBg, updateDockLBgAndBorder } from "./docks";
import { debouncedFormatProtyleWithBgImageOnly, removeProtyleWithBgImageOnlyClassName } from "./editor";
import { addEnvClassNames, removeEnvClassNames } from "./env";
import { restoreDefaultSiyuanScrollbar, useMacSysScrollbar } from "./scrollbar";
import { debouncedFormatIndentGuidesForFocusedItems, removeIndentGuidesFormatClassName } from "./sidepanels";
import { removeStatusHeightVar, setStatusHeightVar } from "./status";
import { calcTabbarSpacings, calcTopbarSpacings, handleMacFullScreen, loadTopbarFusion, unloadTopbarFusion, updateDragRect } from "./topbarFusion";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./trafficLights";

const globalClickEventListener = new AsriEventListener(mouseupEventsCallback);
const watchImgExportMo = new AsriMutationObserver(debounce(docBodyMoCallback, 500));
const globalClassNameMo = new AsriMutationObserver(globalClassNameMoCallback);
const lytCenterRo = new AsriResizeObserver(lytCenterRoCallback);
const winRo = new AsriResizeObserver(winRoCallback);

export let isWinResizing = false, fromFullscreen: boolean;
export let protyleWidthChange = 0;

export async function loadAsriJSModules() {
    addEnvClassNames();
    useMacSysScrollbar();
    applyTrafficLightPosition();
    setStatusHeightVar();
    await updateWndEls();
    await updateDragRect('initials');
    loadTopbarFusion();
    updateStyles();
    globalClickEventListener.start(document.body, 'mouseup');
    globalClassNameMo.observe(document.body, MOConfigForClassNames);
    watchImgExportMo.observe(document.body, { childList: true });
    asriDoms.layoutCenter || await querySelectorPromise('.layout__center');
    lytCenterRo.observe(asriDoms.layoutCenter);
    winRo.observe(document.body);
}

export function unloadAsriJSModules() {
    removeEnvClassNames();
    restoreDefaultSiyuanScrollbar();
    restoreTrafficLightPosition();
    removeStatusHeightVar();
    unloadTopbarFusion();
    destroyStyleUpdates();
    globalClickEventListener.remove(document, 'mouseup');
    globalClassNameMo.disconnect();
    lytCenterRo.disconnect();
    winRo.disconnect();
    watchImgExportMo.disconnect(() => {
        document.body.classList.remove("has-exportimg")
    });
}
function mouseupEventsCallback(e: Event) {
    // console.log(e);
    updateStyles(e);
}

async function updateStyles(e?: Event) {
    // run on first load
    if (!e) {
        mouseTriggeredUpdates();
        calcTopbarSpacings().then(calcTabbarSpacings); // make sure to set the styles right on first load
    }

    // run on mouse events
    else if (e.type.startsWith('mouse')) {
        mouseTriggeredUpdates();
        setTimeout(() => {
            calcTopbarSpacings().then(calcTabbarSpacings);
        }, 0);
    }

    function mouseTriggeredUpdates() {
        setTimeout(async () => {
            updateDockLBgAndBorder();
            debouncedFormatProtyleWithBgImageOnly();
            await updateWndEls();
            calcProtyleSpacings();
        }, 0);
    }
}

function destroyStyleUpdates() {
    destroyDockBg();
    removeIndentGuidesFormatClassName();
    removeProtyleWithBgImageOnlyClassName();
    removeProtyleSpacings();
}

function globalClassNameMoCallback(mutationList: MutationRecord[], observer: MutationObserver) {
    for (let mutation of mutationList) {
        if ((mutation.target as HTMLElement).classList.contains('b3-list-item--focus')) {
            debouncedFormatIndentGuidesForFocusedItems();
            debouncedFormatProtyleWithBgImageOnly();
        }
    }
}

function lytCenterRoCallback(entries: ResizeObserverEntry[], observer: ResizeObserver) {
    for (let entry of entries) {
        // get current element's size
        const { inlineSize } = entry.contentBoxSize[0];

        // check if it's the first time to trigger resize event, if so, skip the calculation
        if (entry.target instanceof HTMLElement) {

            if (!entry.target.dataset.prevWidth) {
                entry.target.dataset.prevWidth = inlineSize + '';
                continue;
            }

            // get previous width
            const prevWidth = parseFloat(entry.target.dataset.prevWidth);
            const widthChange = inlineSize - prevWidth;
            entry.target.dataset.prevWidth = inlineSize + '';

            debouncedHandleWinResize();
            calcTopbarSpacings(widthChange, isWinResizing).then(calcTabbarSpacings);
            debouncedCalcProtyleSpacings();
            // calcTabbarSpacings(true);
            // console.log(widthChange)
            protyleWidthChange = widthChange;
        }
    }

    console.log('lytCenterRoCallback')
}

function winRoCallback(entries: ResizeObserverEntry[], observer: ResizeObserver) {
    isWinResizing = true;
    debouncedHandleWinResize();
    console.log('winRoCallback')
}

const debouncedHandleWinResize = debounce(() => {
    isWinResizing = false;
    handleMacFullScreen();
    debouncedUpdateTopbarOverflow();
    calcTopbarSpacings(protyleWidthChange, isWinResizing).then(calcTabbarSpacings);
    // console.log('debouncedwinRoCallback', protyleWidthChange);
}, 200);

