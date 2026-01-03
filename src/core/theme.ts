/**
 * 主题生命周期管理
 * 负责主题的初始化加载和卸载
 */

import { updateWndEls } from "../utils/interfaceState";
import { querySelectorAsync } from "../utils/misc";
import { asriDoms, environment as env } from "../utils/rsc";
import { calcTopbarSpacings, calcTabbarSpacings as calcTabbarSpacingsAlias } from "../ui/topbar";
import { initI18n as getI18n } from "./config";
import { loadThemePalette, unloadThemePalette } from "./themePalette";
import { setupPaletteMenuItemClick, setupTfpMenuItemCallback, removePaletteMenuItemClick, removeTfpMenuItemCallback } from "../ui/configEventHandlers";
import { addDockbClassName, destroyDockBg, removeDockbClassName, updateDockLBgAndBorder } from "../ui/docks";
import { removeConfigMenuItems } from "../ui/configMenuItems";
import { addEnvClassNames, removeEnvClassNames } from "./env";
import { removeFocusedBlockClass as removeFocusedBlockClassName } from "../features/focus";
import { removeProtyleStatusClassName, toggleProtyleStatus } from "../features/protyleStatus";
import { restoreDefaultSiyuanScrollbar, useMacSysScrollbar } from "../platform/scrollbar";
import { removeIndentGuidesFormatClassName } from "../ui/sidepanels";
import { createTopbarFusionElements, unloadTopbarFusion } from "../ui/topbar";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "../platform/trafficLights";
import { removeHdrSupportImage } from "./colorUtils";
import { removeVibrancy, setVibrancy, setThemeSource } from "../platform/vibrancy";

export async function loadAsriTheme() {
  // 先清理可能存在的旧菜单项
  removeConfigMenuItems();

  addEnvClassNames();
  useMacSysScrollbar();
  applyTrafficLightPosition();
  toggleProtyleStatus();
  await getI18n();

  loadThemePalette();
  setVibrancy();

  if (!env.isMobile) {
    await updateWndEls();
    // await updateDragRect("initials");
    createTopbarFusionElements();
    calcTopbarSpacings().then(calcTabbarSpacingsAlias);
    updateDockLBgAndBorder();
  }
  addDockbClassName();

  setupPaletteMenuItemClick();
  setupTfpMenuItemCallback();

  asriDoms.layoutCenter || (await querySelectorAsync(".layout__center"));
}

export async function unloadAsriTheme(completeUnload = true) {
  if (completeUnload) {
    if (!env.isMobile) await unloadTopbarFusion();
    destroyDockBg();
    removeIndentGuidesFormatClassName();
    removeDockbClassName();
    removeProtyleStatusClassName();
    removeFocusedBlockClassName();
    removeEnvClassNames();
    restoreDefaultSiyuanScrollbar();
    restoreTrafficLightPosition();
    document.body.classList.remove("body-asri--fullscreen", "asri-tfp", "asri-tfp-acrylic", "asri-tfp-progressive", "asri-c-0");
    unloadThemePalette();
    removeHdrSupportImage();
    removeConfigMenuItems();
    removeVibrancy();
  }

  setThemeSource();
  removePaletteMenuItemClick();
  removeTfpMenuItemCallback();
}
