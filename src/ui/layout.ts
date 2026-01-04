/**
 * 布局管理
 * 处理样式更新、响应式布局和窗口调整
 */

import { doesTopBarOverflow, updateTopbarOverflow, updateWndEls } from "../utils/interfaceState";
import { debounce } from "../utils/misc";
import { asriDoms, environment as env } from "../utils/rsc";
import { createBarModeMenuItems } from "../ui/configMenuItems";
import { addAfwdMenuItems } from "../features/afwd";
import { asriConfigs, runtime, getSystemAccentColor } from "../core";
import { updateCoverImgColor } from "../core";
import { addDockbClassName, updateDockLBgAndBorder } from "../ui/docks";
import { debouncedFormatIndentGuidesForFocusedItems } from "../ui/sidepanels";
import { calcTabbarSpacings, calcTopbarSpacings, handleMacFullScreen, recalcDragInitials } from "../ui/topbar";
import { modeTransitionOnClick } from "../features/modeTransition";
import { toggleProtyleStatus } from "../features/protyleStatus";

let isWinResizing = false;
let protyleWidthChange = 0;

export function setupLayoutObservers(
  globalClassNameMoCallback: MutationCallback,
  lytCenterRoCallback: ResizeObserverCallback,
  winRoCallback: ResizeObserverCallback
) {
  const globalClassNameMo = new MutationObserver(globalClassNameMoCallback);
  const lytCenterRo = new ResizeObserver(lytCenterRoCallback);
  const winRo = new ResizeObserver(winRoCallback);

  return { globalClassNameMo, lytCenterRo, winRo };
}

export function observeLayout(globalClassNameMo: MutationObserver, lytCenterRo: ResizeObserver, winRo: ResizeObserver) {
  globalClassNameMo.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ["class"],
    attributeOldValue: true,
  });

  if (!env.isMobile) {
    lytCenterRo.observe(asriDoms.layoutCenter!);
    winRo.observe(document.body);
  }
}

export function unobserveLayout(globalClassNameMo: MutationObserver, lytCenterRo: ResizeObserver, winRo: ResizeObserver) {
  globalClassNameMo.disconnect();

  if (!env.isMobile) {
    lytCenterRo.disconnect();
    winRo.disconnect();
  }
}

export function updateStyles(e?: Event | KeyboardEvent) {
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
      !env.isIOSApp && runtime.followSysAccentColor && env.supportOklch && getSystemAccentColor();
    }, 0);
  }
}

export function createLowFreqEventsCallback() {
  return (e: Event) => {
    createBarModeMenuItems(e);
    addAfwdMenuItems(e);
    updateStyles(e);
    modeTransitionOnClick(e);
  };
}

export function createWinFocusChangeCallback() {
  return (e: Event) => {
    updateWndEls().then(() => {
      updateStyles();
      !env.isIOSApp && runtime.followSysAccentColor && env.supportOklch && getSystemAccentColor();
    });
  };
}

export function createLayoutCenterRoCallback() {
  return (_entries: ResizeObserverEntry[], _observer: ResizeObserver) => {
    calcTopbarSpacings(0, isWinResizing, doesTopBarOverflow).then(calcTabbarSpacings);
  };
}

export function createWinRoCallback() {
  return (entries: ResizeObserverEntry[], _observer: ResizeObserver) => {
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
  };
}

const debouncedHandleWinResizeEnd = debounce(() => {
  isWinResizing = false;
  handleMacFullScreen();

  updateTopbarOverflow();
  if (!doesTopBarOverflow) recalcDragInitials();
  calcTopbarSpacings(protyleWidthChange, isWinResizing, doesTopBarOverflow).then(calcTabbarSpacings);
  protyleWidthChange = 0;
}, 200);
