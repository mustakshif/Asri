import { AsriEventListener } from "../util/eventListeners";
import { doesTopBarOverflow, updateTopbarOverflow, updateWndEls } from "../util/interfaceState";
import { debounce, isProtyle, querySelectorAsync } from "../util/misc";
import { AsriMutationObserver, AsriResizeObserver, MOConfigForClassNames } from "../util/observers";
import { asriDoms, environment as env } from "../util/rsc";
import { addAfwdMenuItems, calcProtyleSpacings, debouncedCalcProtyleSpacings, removeProtyleSpacings } from "./afwd";
import { createBarModeMenuItems, followSysAccentColor, getSystemAccentColor, loadI18n, loadThemePalette, paletteMenuItemClickEventListener, unloadThemePalette } from "./asriPalettes";
import { docBodyMoCallback } from "./dialog";
import { addDockbClassName, destroyDockBg, removeDockbClassName, updateDockLBgAndBorder } from "./docks";
import { addEnvClassNames, removeEnvClassNames } from "./env";
import { removeFocusedBlockClass as removeFocusedBlockClassName, selectionChangeCallback } from "./focusedBlock";
import { darkModeMediaQuery, modeTransitionOnClick, startFadeInFadeOutTranstition } from "./modeTransition";
import { removeProtyleStatusClassName, toggleProtyleStatus } from "./protyleStatus";
import { restoreDefaultSiyuanScrollbar, useMacSysScrollbar } from "./scrollbar";
import { debouncedFormatIndentGuidesForFocusedItems, removeIndentGuidesFormatClassName } from "./sidepanels";
import { avoidOverlappingWithStatus, debouncedStatusPosition, removeStatusStyles, setStatusHeightVar, unloadAvoidOverlappingWithStatus } from "./status";
import { calcTabbarSpacings, calcTopbarSpacings, createTopbarFusionElements, handleMacFullScreen, recalcDragInitials, unloadTopbarFusion, updateDragRect } from "./topbarFusion";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./trafficLights";

const globalClickEventListener = new AsriEventListener(lowFreqEventsCallback);
const globalDragEventListener = new AsriEventListener(lowFreqEventsCallback);
const globalKeyupEventListener = new AsriEventListener(lowFreqEventsCallback);
const winFocusChangeEventListener = new AsriEventListener(winFocusChangeCallback);
const selectionChangeEventListener = new AsriEventListener(selectionChangeCallback);
// const watchImgExportMo = new AsriMutationObserver(debounce(docBodyMoCallback));
const globalClassNameMo = new AsriMutationObserver(globalClassNameMoCallback);
const lytCenterRo = new AsriResizeObserver(lytCenterRoCallback);
const winRo = new AsriResizeObserver(winRoCallback);
const themeUpdateListener = new AsriEventListener(themeUpdateCallback);

let isWinResizing = false, fromFullscreen: boolean;
let protyleWidthChange = 0;

export async function loadAsriJSModules() {
    addEnvClassNames();
    useMacSysScrollbar();
    applyTrafficLightPosition();
    setStatusHeightVar();
    // startDefaultTranstition(loadThemePalette); 
    loadThemePalette(); // https://github.com/mustakshif/Asri/issues/85
    toggleProtyleStatus();
    await loadI18n();
    if (!env.isMobile) {
        await updateWndEls();
        await updateDragRect('initials');
        createTopbarFusionElements();
    }
    updateStyles();
    addDockbClassName();
    avoidOverlappingWithStatus();
    globalClickEventListener.start(document, 'mouseup');
    globalDragEventListener.start(document, 'dragend');
    globalKeyupEventListener.start(document, 'keyup', true);
    winFocusChangeEventListener.start(window, 'focus');
    winFocusChangeEventListener.start(window, 'blur');
    selectionChangeEventListener.start(document, 'selectionchange');
    globalClassNameMo.observe(document.body, MOConfigForClassNames);
    // watchImgExportMo.observe(document.body, { childList: true });
    themeUpdateListener.start(darkModeMediaQuery, 'change');
    paletteMenuItemClickEventListener.start(document, 'mouseup');
    asriDoms.layoutCenter || await querySelectorAsync('.layout__center');
    if (!env.isMobile) {
        lytCenterRo.observe(asriDoms.layoutCenter);
        winRo.observe(document.body);
    }
}

export async function unloadAsriJSModules(completeUnload = true) {

    if (completeUnload) {
        if (!env.isMobile) await unloadTopbarFusion();
        destroyDockBg();
        removeIndentGuidesFormatClassName();
        removeProtyleSpacings();
        removeDockbClassName();
        removeProtyleStatusClassName();
        removeFocusedBlockClassName();
        unloadAvoidOverlappingWithStatus();
        removeStatusStyles();
        removeEnvClassNames();
        restoreDefaultSiyuanScrollbar();
        restoreTrafficLightPosition();
        document.body.classList.remove('body-asri--fullscreen');
        unloadThemePalette();
    }

    globalClickEventListener.remove(document, 'mouseup');
    globalDragEventListener.remove(document, 'dragend');
    globalKeyupEventListener.remove(document, 'keyup', true);
    winFocusChangeEventListener.remove(window, 'focus');
    winFocusChangeEventListener.remove(window, 'blur');
    selectionChangeEventListener.remove(document, 'selectionchange');
    globalClassNameMo.disconnect();
    themeUpdateListener.remove(darkModeMediaQuery, 'change');
    paletteMenuItemClickEventListener.remove(document, 'mouseup');
    // watchImgExportMo.disconnect(() => {
    //     document.body.classList.remove("has-exportimg")
    // });

    if (!env.isMobile) {
        lytCenterRo.disconnect();
        winRo.disconnect();
    }
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
            // debouncedFormatProtyleWithBgImageOnly();
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

async function globalClassNameMoCallback(mutationList: MutationRecord[], observer: MutationObserver) {
    for (let mutation of mutationList) {
        const target = mutation.target as HTMLElement;

        if (target.classList.contains('body--blur')) return; // ⚠️ ignore constant classname change when app window blurs which cause unnecessary re-render and high cpu usage.
        // console.log(mutation.target, mutation.type, mutation.attributeName, mutation.oldValue);

        // filetree list item switch
        if (target.classList.contains('b3-list-item--focus')) {
            debouncedFormatIndentGuidesForFocusedItems();
            // debouncedFormatProtyleWithBgImageOnly();
            // console.log('focus');
        }

        // tab switch
        if (target.classList.contains('item--focus')) {
            
            const docId = target.getAttribute('data-id') ?? undefined;
            // if (!docId) return;
            toggleProtyleStatus(docId);
        }

        if (target.classList.contains('layout__wnd--active')) {
            // console.log(target, mutation.type, mutation.attributeName, mutation.oldValue)
            const targetDoc = target.querySelector('.layout__center .layout-tab-container>[data-id]:not(.fn__none)')
            // console.log(targetDoc)

            if (!targetDoc) return;

            const docId = targetDoc.getAttribute('data-id') ?? undefined;
            // if (!docId) return;
            toggleProtyleStatus(docId);
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
    // console.log('系统主题变化:', e.matches ? '暗色' : '亮色')
    startFadeInFadeOutTranstition(600, () => { }, 200);
}