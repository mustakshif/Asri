import { loadAsriTheme, unloadAsriTheme } from "./core/theme";
import { setupLayoutObservers, observeLayout, unobserveLayout, createLowFreqEventsCallback, createWinFocusChangeCallback, createLayoutCenterRoCallback, createWinRoCallback } from "./ui/layout";
import { createGlobalClassNameMoCallback } from "./features/eventManager";

// Setup observers
const globalClassNameMoCallback = createGlobalClassNameMoCallback();
const lytCenterRoCallback = createLayoutCenterRoCallback();
const winRoCallback = createWinRoCallback();
const { globalClassNameMo, lytCenterRo, winRo } = setupLayoutObservers(
  globalClassNameMoCallback,
  lytCenterRoCallback,
  winRoCallback
);

// 将回调函数保存为模块级变量，确保添加和移除时使用同一个引用
let lowFreqEventsCallback: EventListener | null = null;
let winFocusChangeCallback: EventListener | null = null;

async function loadAsriJSModules() {
  await loadAsriTheme();

  // 只在第一次加载时创建回调函数
  if (!lowFreqEventsCallback) {
    lowFreqEventsCallback = createLowFreqEventsCallback();
  }
  if (!winFocusChangeCallback) {
    winFocusChangeCallback = createWinFocusChangeCallback();
  }

  document.addEventListener("mouseup", lowFreqEventsCallback);
  document.addEventListener("dragend", lowFreqEventsCallback);
  document.addEventListener("keyup", lowFreqEventsCallback, true);
  window.addEventListener("focus", winFocusChangeCallback);
  window.addEventListener("blur", winFocusChangeCallback);

  observeLayout(globalClassNameMo, lytCenterRo, winRo);
}

async function unloadAsriJSModules(completeUnload = true) {
  // 使用保存的回调函数引用进行移除
  if (lowFreqEventsCallback) {
    document.removeEventListener("mouseup", lowFreqEventsCallback);
    document.removeEventListener("dragend", lowFreqEventsCallback);
    document.removeEventListener("keyup", lowFreqEventsCallback, true);
  }
  if (winFocusChangeCallback) {
    window.removeEventListener("focus", winFocusChangeCallback);
    window.removeEventListener("blur", winFocusChangeCallback);
  }

  unobserveLayout(globalClassNameMo, lytCenterRo, winRo);
  await unloadAsriTheme(completeUnload);
}

window.destroyTheme = () => {
  let completeUnload = true;

  setTimeout(() => {
    const themePairOnDestroy = {
      "light": window.siyuan.config.appearance.themeLight,
      "dark": window.siyuan.config.appearance.themeDark,
    };
    console.log("destroy", themePairOnDestroy);
    if (themePairOnDestroy.light === "Asri" && themePairOnDestroy.dark === "Asri") completeUnload = false;

    console.log(`\x1b[31m\x1b[1m\x1b[47mTheme destroy mode: ${completeUnload ? "complete" : "incomplete"}\x1b[0m`);
    unloadAsriJSModules(completeUnload);
  }, 0);
};

loadAsriJSModules();