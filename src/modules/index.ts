import { doesTopBarOverflow, updateTopbarOverflow, updateWndEls } from "../util/interfaceState";
import { debounce, querySelectorAsync } from "../util/misc";
import { asriDoms, environment as env } from "../util/rsc";

const MOConfigForClassNames: MutationObserverInit = {
  attributes: true,
  subtree: true,
  attributeFilter: ["class"],
  attributeOldValue: true,
};
import { addAfwdMenuItems, removeProtyleSpacings } from "./afwd";
import {
  asriConfigs,
  createBarModeMenuItems,
  curMode,
  followSysAccentColor,
  getI18n,
  getSystemAccentColor,
  loadThemePalette,
  setupPaletteMenuItemClick,
  setupTfpMenuItemCallback,
  removePaletteMenuItemClick,
  removeTfpMenuItemCallback,
  unloadThemePalette
} from "./asriConfigs";
import { updateCoverImgColor } from "./asriConfigs/coverImgColor";
import { removeHdrSupportImage } from "./asriConfigs/util";
import { addDockbClassName, destroyDockBg, removeDockbClassName, updateDockLBgAndBorder } from "./docks";
import { addEnvClassNames, removeEnvClassNames } from "./env";
import { removeFocusedBlockClass as removeFocusedBlockClassName, selectionChangeCallback } from "./focusedBlock";
import { darkModeMediaQuery, modeTransitionOnClick, startFadeInFadeOutTranstition } from "./modeTransition";
import { removeProtyleStatusClassName, toggleProtyleStatus } from "./protyleStatus";
import { restoreDefaultSiyuanScrollbar, useMacSysScrollbar } from "./scrollbar";
import { debouncedFormatIndentGuidesForFocusedItems, removeIndentGuidesFormatClassName } from "./sidepanels";
import { calcTabbarSpacings, calcTopbarSpacings, createTopbarFusionElements, handleMacFullScreen, recalcDragInitials, unloadTopbarFusion, updateDragRect } from "./topbarFusion";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./trafficLights";
import { setVibrancy, removeVibrancy, setThemeSource } from "./vibrancy";

const globalClassNameMo = new MutationObserver(globalClassNameMoCallback);
const lytCenterRo = new ResizeObserver(lytCenterRoCallback);
const winRo = new ResizeObserver(winRoCallback);

let isWinResizing = false;
let protyleWidthChange = 0;

export async function loadAsriJSModules() {
  addEnvClassNames();
  useMacSysScrollbar();
  applyTrafficLightPosition();
  toggleProtyleStatus();
  await getI18n();

  loadThemePalette(); // https://github.com/mustakshif/Asri/issues/85
  setVibrancy();

  if (!env.isMobile) {
    await updateWndEls();
    await updateDragRect("initials");
    createTopbarFusionElements();
  }
  updateStyles();
  addDockbClassName();
  document.addEventListener("mouseup", lowFreqEventsCallback);
  document.addEventListener("dragend", lowFreqEventsCallback);
  document.addEventListener("keyup", lowFreqEventsCallback, true);
  window.addEventListener("focus", winFocusChangeCallback);
  window.addEventListener("blur", winFocusChangeCallback);
  document.addEventListener("selectionchange", selectionChangeCallback);
  globalClassNameMo.observe(document.body, MOConfigForClassNames);
  setupPaletteMenuItemClick();
  setupTfpMenuItemCallback();
  asriDoms.layoutCenter || (await querySelectorAsync(".layout__center"));
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
    removeEnvClassNames();
    restoreDefaultSiyuanScrollbar();
    restoreTrafficLightPosition();
    document.body.classList.remove("body-asri--fullscreen", "asri-tfp", "asri-tfp-acrylic", "asri-tfp-progressive", "asri-c-0");
    unloadThemePalette();
    removeHdrSupportImage();
    removeVibrancy();
  }

  setThemeSource();
  document.removeEventListener("mouseup", lowFreqEventsCallback);
  document.removeEventListener("dragend", lowFreqEventsCallback);
  document.removeEventListener("keyup", lowFreqEventsCallback, true);
  window.removeEventListener("focus", winFocusChangeCallback);
  window.removeEventListener("blur", winFocusChangeCallback);
  document.removeEventListener("selectionchange", selectionChangeCallback);
  globalClassNameMo.disconnect();
  removePaletteMenuItemClick();
  removeTfpMenuItemCallback();

  if (!env.isMobile) {
    lytCenterRo.disconnect();
    winRo.disconnect();
  }
}
function lowFreqEventsCallback(e: Event) {
  createBarModeMenuItems(e);
  addAfwdMenuItems(e);
  updateStyles(e);
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
  else if (e.type.startsWith("mouseup") || e.type.startsWith("drag") || (e instanceof KeyboardEvent && (e.key === "Control" || e.key === "Alt" || e.key === "Shift" || e.key === "Meta"))) {
    lowFreqStyleUpdates();
    Promise.resolve()
      .then(() => {
        recalcDragInitials();
        return calcTopbarSpacings(0, false, doesTopBarOverflow);
      })
      .then(calcTabbarSpacings);
  }

  function lowFreqStyleUpdates() {
    setTimeout(async () => {
      updateDockLBgAndBorder();
      await updateWndEls();
      addDockbClassName();
      !env.isIOSApp && followSysAccentColor && env.supportOklch && getSystemAccentColor();
    }, 0);
  }
}

async function globalClassNameMoCallback(mutationList: MutationRecord[], observer: MutationObserver) {
  for (let mutation of mutationList) {
    const target = mutation.target as HTMLElement;

    if (target.classList.contains("body--blur")) return; // ⚠️ ignore constant classname change when app window blurs which cause unnecessary re-render and high cpu usage.

    // filetree list item switch
    if (target.classList.contains("b3-list-item--focus")) {
      debouncedFormatIndentGuidesForFocusedItems();
    }

    // tab switch
    if (target.classList.contains("item--focus")) {
      const docId = target.getAttribute("data-id") ?? undefined;
      toggleProtyleStatus(docId);

      docId && asriConfigs[curMode].followCoverImgColor && updateCoverImgColor(docId);
    }

    if (target.classList.contains("layout__wnd--active")) {
      const targetDoc = target.querySelector(".layout__center .layout-tab-container>[data-id]:not(.fn__none)");

      if (!targetDoc) return;

      const docId = targetDoc.getAttribute("data-id") ?? undefined;
      toggleProtyleStatus(docId);

      docId && asriConfigs[curMode].followCoverImgColor && updateCoverImgColor(docId);
    }
  }
}

function lytCenterRoCallback(entries: ResizeObserverEntry[], observer: ResizeObserver) {
  calcTopbarSpacings(0, isWinResizing, doesTopBarOverflow).then(calcTabbarSpacings);
}

function winRoCallback(entries: ResizeObserverEntry[], observer: ResizeObserver) {
  for (let entry of entries) {
    isWinResizing = true;
    debouncedHandleWinResizeEnd();

    const { inlineSize } = entry.contentBoxSize[0];

    if (entry.target instanceof HTMLElement) {
      // check if it's the first time to trigger resize event, if so, skip the calculation
      if (!entry.target.dataset.prevWidth) {
        entry.target.dataset.prevWidth = inlineSize + "";
        continue;
      }
      // get previous width
      const prevWidth = parseFloat(entry.target.dataset.prevWidth);
      const widthChange = inlineSize - prevWidth;
      entry.target.dataset.prevWidth = inlineSize + "";
      protyleWidthChange = widthChange;
    }
  }
}

const debouncedHandleWinResizeEnd = debounce(() => {
  isWinResizing = false;
  handleMacFullScreen();

  updateTopbarOverflow();
  if (!doesTopBarOverflow) recalcDragInitials();
  calcTopbarSpacings(protyleWidthChange, isWinResizing, doesTopBarOverflow).then(calcTabbarSpacings);
  protyleWidthChange = 0;
}, 200);

function appearanceModeUpdateCallback(_e: MediaQueryListEvent) {
  startFadeInFadeOutTranstition(600, () => {}, 200);
}
