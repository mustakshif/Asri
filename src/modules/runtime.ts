import { AsriEventListener } from "../util/eventListeners";
import { doesTopBarOverflow, updateTopbarOverflow, updateWndEls } from "../util/interfaceState";
import { debounce, querySelectorAsync } from "../util/misc";
import { AsriMutationObserver, AsriResizeObserver, MOConfigForClassNames } from "../util/observers";
import { asriDoms, environment as env } from "../util/rsc";
import { addAfwdMenuItems, removeProtyleSpacings } from "./afwd";
import {
  asriConfigs,
  createBarModeMenuItems,
  curMode,
  followSysAccentColor,
  getI18n,
  getSystemAccentColor,
  loadThemePalette,
  paletteMenuItemClickEventListener,
  tfpMenuItemCallbackEventListener,
  unloadThemePalette,
} from "./asriConfigs";
import { updateCoverImgColor } from "./asriConfigs/coverImgColor";
import { removeHdrSupportImage } from "./asriConfigs/util";
import { cssLoaderService } from "./cssLoader";
import { addDockbClassName, destroyDockBg, removeDockbClassName, updateDockLBgAndBorder } from "./docks";
import { addEnvClassNames, removeEnvClassNames } from "./env";
import { removeFocusedBlockClass as removeFocusedBlockClassName, selectionChangeCallback } from "./focusedBlock";
import { modeTransitionOnClick } from "./modeTransition";
import { removeProtyleStatusClassName, toggleProtyleStatus } from "./protyleStatus";
import { restoreDefaultSiyuanScrollbar, useMacSysScrollbar } from "./scrollbar";
import { debouncedFormatIndentGuidesForFocusedItems, removeIndentGuidesFormatClassName } from "./sidepanels";
import {
  calcTabbarSpacings,
  calcTopbarSpacings,
  createTopbarFusionElements,
  handleMacFullScreen,
  recalcDragInitials,
  unloadTopbarFusion,
  updateDragRect,
} from "./topbarFusion";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./trafficLights";
import { removeVibrancy, setThemeSource, setVibrancy } from "./vibrancy";

class AsriRuntime {
  private isWinResizing = false;
  private protyleWidthChange = 0;

  private readonly globalMouseupEventListener = new AsriEventListener((e) => this.lowFreqEventsCallback(e));
  private readonly globalDragEventListener = new AsriEventListener((e) => this.lowFreqEventsCallback(e));
  private readonly globalKeyupEventListener = new AsriEventListener((e) => this.lowFreqEventsCallback(e));
  private readonly winFocusChangeEventListener = new AsriEventListener(() => this.winFocusChangeCallback());
  private readonly selectionChangeEventListener = new AsriEventListener(selectionChangeCallback);
  private readonly globalClassNameMo = new AsriMutationObserver((mutationList) => this.globalClassNameMoCallback(mutationList));
  private readonly lytCenterRo = new AsriResizeObserver((entries) => this.lytCenterRoCallback(entries));
  private readonly winRo = new AsriResizeObserver((entries) => this.winRoCallback(entries));

  private readonly debouncedHandleWinResizeEnd = debounce(() => {
    this.isWinResizing = false;
    handleMacFullScreen();

    updateTopbarOverflow();
    if (!doesTopBarOverflow) recalcDragInitials();
    calcTopbarSpacings(this.protyleWidthChange, this.isWinResizing, doesTopBarOverflow).then(calcTabbarSpacings);
    this.protyleWidthChange = 0;
  }, 200);

  async load() {
    addEnvClassNames();
    useMacSysScrollbar();
    applyTrafficLightPosition();
    toggleProtyleStatus();
    await getI18n();

    loadThemePalette();
    setVibrancy();
    await cssLoaderService.restoreEnabledSnippets();

    if (!env.isMobile) {
      await updateWndEls();
      await updateDragRect("initials");
      createTopbarFusionElements();
    }

    this.updateStyles();
    addDockbClassName();
    this.bindGlobalEvents();

    asriDoms.layoutCenter || (await querySelectorAsync(".layout__center"));
    if (!env.isMobile) {
      if (asriDoms.layoutCenter) this.lytCenterRo.observe(asriDoms.layoutCenter);
      this.winRo.observe(document.body);
    }
  }

  async unload(completeUnload = true) {
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
      document.body.classList.remove(
        "body-asri--fullscreen",
        "asri-tfp",
        "asri-tfp-acrylic",
        "asri-tfp-progressive",
        "asri-c-0"
      );
      unloadThemePalette();
      removeHdrSupportImage();
      removeVibrancy();
      cssLoaderService.unloadAll();
    }

    setThemeSource();
    this.unbindGlobalEvents();

    if (!env.isMobile) {
      this.lytCenterRo.disconnect();
      this.winRo.disconnect();
    }
  }

  private bindGlobalEvents() {
    this.globalMouseupEventListener.start(document, "mouseup");
    this.globalDragEventListener.start(document, "dragend");
    this.globalKeyupEventListener.start(document, "keyup", true);
    this.winFocusChangeEventListener.start(window, "focus");
    this.winFocusChangeEventListener.start(window, "blur");
    this.selectionChangeEventListener.start(document, "selectionchange");
    this.globalClassNameMo.observe(document.body, MOConfigForClassNames);
    paletteMenuItemClickEventListener.start(document, "mouseup");
    tfpMenuItemCallbackEventListener.start(document, "mouseup");
  }

  private unbindGlobalEvents() {
    this.globalMouseupEventListener.remove(document, "mouseup");
    this.globalDragEventListener.remove(document, "dragend");
    this.globalKeyupEventListener.remove(document, "keyup", true);
    this.winFocusChangeEventListener.remove(window, "focus");
    this.winFocusChangeEventListener.remove(window, "blur");
    this.selectionChangeEventListener.remove(document, "selectionchange");
    this.globalClassNameMo.disconnect();
    paletteMenuItemClickEventListener.remove(document, "mouseup");
    tfpMenuItemCallbackEventListener.remove(document, "mouseup");
  }

  private lowFreqEventsCallback(e: Event) {
    createBarModeMenuItems(e);
    addAfwdMenuItems(e);
    this.updateStyles(e);
    modeTransitionOnClick(e);
  }

  private winFocusChangeCallback() {
    updateWndEls().then(() => {
      this.updateStyles();
      !env.isIOSApp && followSysAccentColor && env.supportOklch && getSystemAccentColor();
    });
  }

  private async updateStyles(e?: Event | KeyboardEvent) {
    if (!e) {
      lowFreqStyleUpdates();
      calcTopbarSpacings().then(calcTabbarSpacings);
      return;
    }

    if (
      e.type.startsWith("mouseup") ||
      e.type.startsWith("drag") ||
      (e instanceof KeyboardEvent &&
        (e.key === "Control" || e.key === "Alt" || e.key === "Shift" || e.key === "Meta"))
    ) {
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

  private async globalClassNameMoCallback(mutationList: MutationRecord[]) {
    for (let mutation of mutationList) {
      const target = mutation.target as HTMLElement;

      if (target.classList.contains("body--blur")) return;

      if (target.classList.contains("b3-list-item--focus")) {
        debouncedFormatIndentGuidesForFocusedItems();
      }

      if (target.classList.contains("item--focus")) {
        const docId = target.getAttribute("data-id") ?? undefined;
        toggleProtyleStatus(docId);
        if (docId && asriConfigs[curMode].followCoverImgColor) void updateCoverImgColor(docId);
      }

      if (target.classList.contains("layout__wnd--active")) {
        const targetDoc = target.querySelector(".layout__center .layout-tab-container>[data-id]:not(.fn__none)");
        if (!targetDoc) return;

        const docId = targetDoc.getAttribute("data-id") ?? undefined;
        toggleProtyleStatus(docId);
        if (docId && asriConfigs[curMode].followCoverImgColor) void updateCoverImgColor(docId);
      }
    }
  }

  private lytCenterRoCallback(_entries: ResizeObserverEntry[]) {
    calcTopbarSpacings(0, this.isWinResizing, doesTopBarOverflow).then(calcTabbarSpacings);
  }

  private winRoCallback(entries: ResizeObserverEntry[]) {
    for (let entry of entries) {
      this.isWinResizing = true;
      this.debouncedHandleWinResizeEnd();

      const { inlineSize } = entry.contentBoxSize[0];
      if (entry.target instanceof HTMLElement) {
        if (!entry.target.dataset.prevWidth) {
          entry.target.dataset.prevWidth = inlineSize + "";
          continue;
        }
        const prevWidth = parseFloat(entry.target.dataset.prevWidth);
        const widthChange = inlineSize - prevWidth;
        entry.target.dataset.prevWidth = inlineSize + "";
        this.protyleWidthChange = widthChange;
      }
    }
  }
}

export const asriRuntime = new AsriRuntime();

export async function loadAsriJSModules() {
  await asriRuntime.load();
}

export async function unloadAsriJSModules(completeUnload = true) {
  await asriRuntime.unload(completeUnload);
}
