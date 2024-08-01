import { AsriEventListener } from "../util/eventListeners";
import { debounce, querySelectorPromise } from "../util/misc";
import { AsriMutationObserver, AsriResizeObserver, MOConfigForClassNames } from "../util/observers";
import { asriDoms } from "../util/rsc";
import { doesTopBarOverflow, updateTopbarOverflow, updateWndEls } from "../util/state";
import { calcProtyleSpacings, debouncedCalcProtyleSpacings, removeProtyleSpacings } from "./afwd";
import { docBodyMoCallback } from "./dialog";
import { destroyDockBg, updateDockLBgAndBorder } from "./docks";
import { debouncedFormatProtyleWithBgImageOnly, removeProtyleWithBgImageOnlyClassName } from "./editor";
import { addEnvClassNames, removeEnvClassNames } from "./env";
import { restoreDefaultSiyuanScrollbar, useMacSysScrollbar } from "./scrollbar";
import { debouncedFormatIndentGuidesForFocusedItems, removeIndentGuidesFormatClassName } from "./sidepanels";
import { removeStatusHeightVar, setStatusHeightVar } from "./status";
import { calcTabbarSpacings, calcTopbarSpacings, handleMacFullScreen, loadTopbarFusion, recalcDragInitials, unloadTopbarFusion, updateDragRect } from "./topbarFusion";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./trafficLights";

const globalClickEventListener = new AsriEventListener(mouseupEventsCallback);
const globalDragEventListener = new AsriEventListener(mouseupEventsCallback);
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
    globalClickEventListener.start(document, 'mouseup');
    globalDragEventListener.start(document, 'dragend');
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
    globalDragEventListener.remove(document, 'dragend');
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
    else if (e.type.startsWith('mouse') || e.type.startsWith('drag')) {
        mouseTriggeredUpdates();

        setTimeout(() => {
            recalcDragInitials();
            calcTopbarSpacings(0, false, doesTopBarOverflow).then(calcTabbarSpacings);
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

        if (mutation.target === document.body && (mutation.oldValue?.includes('body--blur') || (mutation.target as HTMLElement).className.includes('body--blur'))) {
            updateWndEls().then(() => {
                updateStyles();
                // console.log(mutation, 'Class changed from', mutation.oldValue?.split(' '), 'to', (mutation.target as HTMLElement).className.split(' '), isWinResizing)
            });
        } // make sure to only update styles when the body class changes; don't know why window resizing also cause class mutations on body element
    }
}

function lytCenterRoCallback(entries: ResizeObserverEntry[], observer: ResizeObserver) {
    // debouncedHandleWinResizeEnd();
    calcTopbarSpacings(0, isWinResizing, doesTopBarOverflow)
        .then(args => {
            calcTabbarSpacings(args)
        });
    debouncedCalcProtyleSpacings();
    console.log('lytCenterRoCallback', isWinResizing)
}

function winRoCallback(entries: ResizeObserverEntry[], observer: ResizeObserver) {
    for (let entry of entries) {
        isWinResizing = true;
        debouncedHandleWinResizeEnd();

        const { inlineSize } = entry.contentBoxSize[0];
        setTimeout(() => {
            // check if it's the first time to trigger resize event, if so, skip the calculation
            if (entry.target instanceof HTMLElement) {
                if (!entry.target.dataset.prevWidth) {
                    entry.target.dataset.prevWidth = inlineSize + '';
                    return;
                }
                // get previous width
                const prevWidth = parseFloat(entry.target.dataset.prevWidth);
                const widthChange = inlineSize - prevWidth;
                entry.target.dataset.prevWidth = inlineSize + '';
                protyleWidthChange = widthChange;
            }

        }, 0);  // make sure to capture width change after the size change is completely done
        console.log('winRoCallback', isWinResizing)
    }
}

const debouncedHandleWinResizeEnd = debounce(() => {
    isWinResizing = false;
    handleMacFullScreen();

    setTimeout(() => {
        updateTopbarOverflow();
        if (!doesTopBarOverflow) recalcDragInitials();
        calcTopbarSpacings(protyleWidthChange, isWinResizing, doesTopBarOverflow).then(calcTabbarSpacings);
        protyleWidthChange = 0;
    }, 200);
    // console.log('debouncedwinRoCallback', isWinResizing);
}, 200);