import { AsriEventListener } from "../util/eventListeners";
import { debounce, querySelectorAsync } from "../util/misc";
import { AsriMutationObserver, AsriResizeObserver, MOConfigForClassNames } from "../util/observers";
import { asriDoms, environment as env } from "../util/rsc";
import { doesTopBarOverflow, updateTopbarOverflow, updateWndEls } from "../util/state";
import { addAfwdMenuItems, calcProtyleSpacings, debouncedCalcProtyleSpacings, removeProtyleSpacings } from "./afwd";
import { createBarModeMenuItems, followSysAccentColor, getSystemAccentColor, loadThemePalette, unloadThemePalette } from "./configsMenu/makeItems";
import { docBodyMoCallback } from "./dialog";
import { addDockbClassName, destroyDockBg, removeDockbClassName, updateDockLBgAndBorder } from "./docks";
import { debouncedFormatProtyleWithBgImageOnly, removeProtyleWithBgImageOnlyClassName } from "./editor";
import { addEnvClassNames, removeEnvClassNames } from "./env";
import { darkModeMediaQuery, modeTransitionOnClick, startFadeInFadeOutTranstition } from "./modeTransition";
import { restoreDefaultSiyuanScrollbar, useMacSysScrollbar } from "./scrollbar";
import { debouncedFormatIndentGuidesForFocusedItems, removeIndentGuidesFormatClassName } from "./sidepanels";
import { avoidOverlappingWithStatus, debouncedStatusPosition, removeStatusStyles, setStatusHeightVar, unloadAvoidOverlappingWithStatus } from "./status";
import { calcTabbarSpacings, calcTopbarSpacings, handleMacFullScreen, loadTopbarFusion, recalcDragInitials, unloadTopbarFusion, updateDragRect } from "./topbarFusion";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./trafficLights";

const globalClickEventListener = new AsriEventListener(lowFreqEventsCallback);
const globalDragEventListener = new AsriEventListener(lowFreqEventsCallback);
const globalKeyupEventListener = new AsriEventListener(lowFreqEventsCallback);
const winFocusChangeEventListener = new AsriEventListener(winFocusChangeCallback);
const selectionChangeEventListener = new AsriEventListener(selectionChangeCallback);
const watchImgExportMo = new AsriMutationObserver(debounce(docBodyMoCallback));
const globalClassNameMo = new AsriMutationObserver(globalClassNameMoCallback);
const lytCenterRo = new AsriResizeObserver(lytCenterRoCallback);
const winRo = new AsriResizeObserver(winRoCallback);
const themeUpdateListener = new AsriEventListener(themeUpdateCallback);

export let isWinResizing = false, fromFullscreen: boolean;
export let protyleWidthChange = 0;

export async function loadAsriJSModules() {
    addEnvClassNames();
    useMacSysScrollbar();
    applyTrafficLightPosition();
    setStatusHeightVar();
    // startDefaultTranstition(loadThemePalette); 
    loadThemePalette(); // https://github.com/mustakshif/Asri/issues/85
    if (!env.isMobile) {
        await updateWndEls();
        await updateDragRect('initials');
        loadTopbarFusion();
    }
    updateStyles();
    addDockbClassName();
    avoidOverlappingWithStatus();
    globalClickEventListener.start(document, 'mouseup');
    globalDragEventListener.start(document, 'dragend');
    globalKeyupEventListener.start(document, 'keyup');
    winFocusChangeEventListener.start(window, 'focus');
    winFocusChangeEventListener.start(window, 'blur');
    selectionChangeEventListener.start(document, 'selectionchange');
    globalClassNameMo.observe(document.body, MOConfigForClassNames);
    watchImgExportMo.observe(document.body, { childList: true });
    themeUpdateListener.start(darkModeMediaQuery, 'change');
    asriDoms.layoutCenter || await querySelectorAsync('.layout__center');
    if (!env.isMobile) {
        lytCenterRo.observe(asriDoms.layoutCenter);
        winRo.observe(document.body);
    }
}

export async function unloadAsriJSModules() {
    removeEnvClassNames();
    restoreDefaultSiyuanScrollbar();
    restoreTrafficLightPosition();
    removeStatusStyles();
    if (!env.isMobile) await unloadTopbarFusion();
    destroyStyleUpdates();
    removeDockbClassName();
    unloadAvoidOverlappingWithStatus();
    globalClickEventListener.remove(document, 'mouseup');
    globalDragEventListener.remove(document, 'dragend');
    globalKeyupEventListener.remove(document, 'keyup');
    winFocusChangeEventListener.remove(window, 'focus');
    winFocusChangeEventListener.remove(window, 'blur');
    selectionChangeEventListener.remove(document, 'selectionchange');
    globalClassNameMo.disconnect();
    themeUpdateListener.remove(darkModeMediaQuery, 'change');
    watchImgExportMo.disconnect(() => {
        document.body.classList.remove("has-exportimg")
    });
    document.body.classList.remove('body-asri--fullscreen');
    if (!env.isMobile) {
        lytCenterRo.disconnect();
        winRo.disconnect();
    }
    unloadThemePalette();
}
function lowFreqEventsCallback(e: Event) {
    // console.log(e);
    createBarModeMenuItems(e);
    addAfwdMenuItems(e);
    updateStyles(e);
    // if (!env.isIOSApp)
    modeTransitionOnClick(e);
}

function winFocusChangeCallback(e: Event) {
    updateWndEls().then(() => {
        updateStyles();
        !env.isIOSApp && followSysAccentColor && env.supportOklch && getSystemAccentColor();
    });
}

function selectionChangeCallback(e: Event) {
    const selection = window.getSelection();
    const range = selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    if (!range) return;

    const curNode = range.commonAncestorContainer;
    const curBlock = curNode.parentElement ? curNode.parentElement.closest('[data-node-id]') : null;
    if (!curBlock) return;

    const curBlockType = curBlock.getAttribute('data-type');
    document.querySelectorAll('.asri-selected-block').forEach(block => block.classList.remove('asri-selected-block'));
    if (curBlockType === 'NodeAttributeView' || !curBlockType || curBlockType === 'NodeCodeBlock') return;

    curBlock.classList.add('asri-selected-block');

    // console.log(selection, range, curNode, curBlock, curBlockType);
}

async function updateStyles(e?: Event | KeyboardEvent) {

    // run on first load
    if (!e) {
        lowFreqStyleUpdates();
        calcTopbarSpacings().then(calcTabbarSpacings);
    }

    // run on mouse events
    else if (
        (e.type.startsWith('mouse') || e.type.startsWith('drag')) ||
        (e instanceof KeyboardEvent && (e.key === 'Control' || e.key === 'Alt' || e.key === 'Shift' || e.key === 'Meta'))
    ) {
        lowFreqStyleUpdates();

        setTimeout(() => {
            recalcDragInitials();
            calcTopbarSpacings(0, false, doesTopBarOverflow).then(calcTabbarSpacings);
        }, 0);
    }

    function lowFreqStyleUpdates() {
        setTimeout(async () => {
            updateDockLBgAndBorder();
            debouncedFormatProtyleWithBgImageOnly();
            debouncedStatusPosition();
            setStatusHeightVar();
            await updateWndEls();
            calcProtyleSpacings();
            addDockbClassName();
            avoidOverlappingWithStatus();
            !env.isIOSApp && followSysAccentColor && env.supportOklch && getSystemAccentColor();
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
        if ((mutation.target as HTMLElement).classList.contains('body--blur')) return; // ⚠️ ignore constant classname change when app window blurs which cause unnecessary re-render and high cpu usage.
        // console.log(mutation.target, mutation.type, mutation.attributeName, mutation.oldValue);
        if ((mutation.target as HTMLElement).classList.contains('b3-list-item--focus')) {
            debouncedFormatIndentGuidesForFocusedItems();
            debouncedFormatProtyleWithBgImageOnly();
            // console.log('focus');
        }
    }
}

function lytCenterRoCallback(entries: ResizeObserverEntry[], observer: ResizeObserver) {
    // debouncedHandleWinResizeEnd();
    calcTopbarSpacings(0, isWinResizing, doesTopBarOverflow).then(calcTabbarSpacings);
    debouncedCalcProtyleSpacings();
    debouncedStatusPosition();
    // console.log('lytCenterRoCallback', isWinResizing)
}

function winRoCallback(entries: ResizeObserverEntry[], observer: ResizeObserver) {
    for (let entry of entries) {
        isWinResizing = true;
        debouncedHandleWinResizeEnd();

        const { inlineSize } = entry.contentBoxSize[0];

        if (entry.target instanceof HTMLElement) {
            // check if it's the first time to trigger resize event, if so, skip the calculation
            if (!entry.target.dataset.prevWidth) {
                entry.target.dataset.prevWidth = inlineSize + '';
                continue;
            }
            // get previous width
            const prevWidth = parseFloat(entry.target.dataset.prevWidth);
            const widthChange = inlineSize - prevWidth;
            entry.target.dataset.prevWidth = inlineSize + '';
            protyleWidthChange = widthChange;
        };  // make sure to capture width change after the size change is completely done
        // console.log('winRoCallback', isWinResizing)
    }
}

const debouncedHandleWinResizeEnd = debounce(() => {
    isWinResizing = false;
    handleMacFullScreen();

    updateTopbarOverflow();
    if (!doesTopBarOverflow) recalcDragInitials();
    calcTopbarSpacings(protyleWidthChange, isWinResizing, doesTopBarOverflow).then(calcTabbarSpacings);
    protyleWidthChange = 0;
    // console.log('debouncedwinRoCallback', isWinResizing);
}, 200);

function themeUpdateCallback(e: MediaQueryListEvent) {
    console.log('系统主题变化:', e.matches ? '暗色' : '亮色')
    startFadeInFadeOutTranstition(() => {}, 200);
}