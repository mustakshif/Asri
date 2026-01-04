import { isOverlapping, querySelectorAsync } from "../utils/misc";
import { asriDoms as doms, environment as env } from "../utils/rsc";
import { isFullScreen, updateWndEls, wndElements } from "../utils/interfaceState";

// added toolbar elements
let pluginsDivider: AsriDomsExtended, leftSpacing: AsriDomsExtended, rightSpacing: AsriDomsExtended;

let topbar = doms.toolbar as HTMLElement;

let topbarRect: DOMRect, dragRect: DOMRect, layoutsCenterRect: DOMRect, barForwardRect: DOMRect, barSyncRect: DOMRect;
let dragRectInitialLeft: number, dragRectInitialRight: number;

let fromFullscreen = false;

export async function updateDragRect(mode: "rect" | "initials" = "rect", ...dir: ElDir[]): Promise<number | DOMRect> {
  const drag = doms.drag || (await querySelectorAsync("#drag"));
  if (!drag || env.isMiniWindow) {
    return -1;
  }
  return new Promise((resolve) => {
    if (mode === "initials") {
      if (!dir.length || dir.includes("L")) {
        dragRectInitialLeft = drag.getBoundingClientRect().left;
        resolve(dragRectInitialLeft);
      }
      if (!dir.length || dir.includes("R")) {
        dragRectInitialRight = drag.getBoundingClientRect().right;
        resolve(dragRectInitialRight);
      }
    } else {
      dragRect = drag.getBoundingClientRect();
      resolve(dragRect);
    }
  });
}

export async function handleMacFullScreen() {
  if (!env.isMacOS) return;

  if (isFullScreen()) {
    document.body.classList.add("body-asri--fullscreen");
    dragRectInitialLeft -= fromFullscreen ? 0 : 80 + 8;
    fromFullscreen = true;
  } else {
    document.body.classList.remove("body-asri--fullscreen");
    leftSpacing?.style.setProperty("width", "0px");
    dragRectInitialLeft = (await updateDragRect("initials", "L")) as number;
    leftSpacing?.style.removeProperty("width");
    fromFullscreen = false;
  }
}

export async function calcTopbarSpacings(widthChange = 0, isWinResizing = false, doesTopBarOverflow = false) {
  if (env.isMiniWindow || env.isMobile) {
    return {
      execute: false,
      centerRectRight: 0,
    };
  }
  let layoutsCenter = doms.layoutCenter || (await querySelectorAsync(".layout__center"));

  return new Promise<{ execute: boolean; centerRectRight: number }>(async (resolve) => {
    if (isWinResizing) dragRectInitialRight += widthChange;
    if (!dragRectInitialLeft || !dragRectInitialRight) await updateDragRect("initials");

    layoutsCenterRect = layoutsCenter!.getBoundingClientRect();
    barSyncRect = doms.barSync!.getBoundingClientRect();
    barForwardRect = doms.barForward!.getBoundingClientRect();

    let centerRectLeft = layoutsCenterRect.left,
      centerRectRight = layoutsCenterRect.right,
      barSearchRectLeft = doms.barSearch!.getBoundingClientRect().left;

    if (!isWinResizing) {
      // left side
      if (centerRectLeft > dragRectInitialLeft + 8) {
        topbar?.style.setProperty("--topbar-left-spacing", "0");
        if (!(env.isMacOS && fromFullscreen)) {
          await updateDragRect("initials", "L");
        }
        leftSpacing?.classList.remove("asri-expanded");
      } else if (env.isMacOS && !env.isInBrowser) {
        topbar.style.setProperty("--topbar-left-spacing", centerRectLeft - barSyncRect.right + 4 + "px");
        leftSpacing?.classList.add("asri-expanded");
      } else {
        topbar.style.setProperty("--topbar-left-spacing", centerRectLeft - barForwardRect.right + 4 + "px");
        leftSpacing?.classList.add("asri-expanded");
      }

      // right side
      if (centerRectRight < dragRectInitialRight - 8 && !doesTopBarOverflow) {
        topbar.style.setProperty("--topbar-right-spacing", "0");

        await updateDragRect("initials", "R");

        doms.dockR?.style.removeProperty("--avoid-topbar");
        doms.layoutDockR?.style.removeProperty("--avoid-topbar");
      } else {
        if (env.isMacOS || env.isInBrowser) {
          topbar.style.setProperty("--topbar-right-spacing", window.innerWidth - centerRectRight + 1 + "px");

          doms.dockR?.style.setProperty("--avoid-topbar", "4px");
          doms.layoutDockR?.style.setProperty("--avoid-topbar", "4px");
        } else {
          topbar.style.setProperty("--topbar-right-spacing", barSearchRectLeft - centerRectRight + 6 + "px");

          doms.dockR?.style.setProperty("--avoid-topbar", "calc(var(--toolbar-height) - 6px)");
          doms.layoutDockR?.style.setProperty("--avoid-topbar", "calc(var(--toolbar-height) - 6px)");
        }
      }
    }

    resolve({
      execute: true,
      centerRectRight: centerRectRight,
    });
  });
}

/**
 * calculates tabbar spacings & positions, always comes after topbar spacings calculation
 */
export async function calcTabbarSpacings({ execute, centerRectRight } = { execute: false, centerRectRight: 0 }) {
  if (!execute) return;
  topbarRect = doms.toolbar?.getBoundingClientRect() as DOMRect;
  (await updateDragRect("rect")) as DOMRect;
  layoutsCenterRect = doms.layoutCenter?.getBoundingClientRect() as DOMRect;

  // set divider style
  (() => {
    if (!pluginsDivider && !(pluginsDivider = document.getElementById("AsriPluginsIconsDivider"))) return;

    if (centerRectRight < dragRectInitialRight - 8) {
      // horisontal divider
      pluginsDivider.style.setProperty("--container-bg", "var(--b3-border-color-trans))");
      pluginsDivider.style.left = centerRectRight + "px";
      pluginsDivider.style.right = "0";
      pluginsDivider.style.removeProperty("height");
      pluginsDivider.style.removeProperty("top");
      pluginsDivider.style.removeProperty("width");
    } else {
      // vertical divider
      pluginsDivider.style.setProperty("--container-bg", "var(--b3-border-color-trans)");
      pluginsDivider.style.left = dragRect.right - 10 + "px";
      pluginsDivider.style.width = "2px";
      pluginsDivider.style.height = "21px";
      pluginsDivider.style.top = "13.5px";
    }
  })();

  wndElements?.forEach(async (wnd) => {
    let tabbarContainer = wnd.querySelector('.fn__flex-column[data-type="wnd"] > .fn__flex:first-child') as HTMLElement;
    let tabbarContainerRect: DOMRect;
    if (tabbarContainer.classList.contains("fn__none")) {
      // fix https://github.com/mustakshif/Asri/issues/117
      tabbarContainer = (await querySelectorAsync('.fn__flex-column[data-type="wnd"] > .fn__flex:first-child:not(.fn__none)', wnd, 3)) as HTMLElement;
    }
    tabbarContainerRect = tabbarContainer?.getBoundingClientRect() as DOMRect;
    if (!tabbarContainerRect) return;

    let paddingLeftValue = tabbarContainerRect.left < dragRect.left ? dragRect.left - tabbarContainerRect.left - 4 : 0;
    let paddingRightValue = tabbarContainerRect.right > dragRect.right ? tabbarContainerRect.right - dragRect.right + 8 : 0;

    if (isOverlapping(tabbarContainer, doms.drag) || isOverlapping(tabbarContainer, doms.toolbar)) {
      tabbarContainer.style.paddingLeft = paddingLeftValue + "px";
      tabbarContainer.style.paddingRight = paddingRightValue + "px";

      // add top padding in extremely narrow width
      if ((tabbarContainerRect.right - paddingRightValue - 240 < dragRect.left && tabbarContainerRect.left < dragRect.left) || (tabbarContainerRect.left + paddingLeftValue + 240 > dragRect.right && tabbarContainerRect.right > dragRect.right)) {
        tabbarContainer.style.paddingTop = "42px";
        tabbarContainer.style.paddingLeft = "0";
        tabbarContainer.style.paddingRight = "0";
      } else {
        tabbarContainer.style.removeProperty("padding-top");
      }
    } else {
      tabbarContainer.style.removeProperty("padding-left");
      tabbarContainer.style.removeProperty("padding-right");
      tabbarContainer.style.removeProperty("padding-top");
    }
  });
}

export async function unloadTopbarFusion() {
  await updateWndEls();
  removeTopbarElements();

  wndElements?.forEach((wnd) => {
    let tabbarContainer = wnd.firstElementChild as HTMLElement;

    tabbarContainer.style.removeProperty("padding-top");
    tabbarContainer.style.removeProperty("padding-left");
    tabbarContainer.style.removeProperty("padding-right");
  });
  doms.layoutCenter!.dataset.prevWidth = undefined;
  document.body.dataset.prevWidth = undefined;

  doms.dockR?.style.removeProperty("--avoid-topbar");
  doms.layoutDockR?.style.removeProperty("--avoid-topbar");
}

export function createTopbarFusionElements() {
  if (env.isMobile) return;
  pluginsDivider = createTopbarElementById("AsriPluginsIconsDivider", undefined, doms.drag);

  leftSpacing = env.isMacOS && !env.isInBrowser ? createTopbarElementById("AsriTopbarLeftSpacing", undefined, doms.barSync) : createTopbarElementById("AsriTopbarLeftSpacing", undefined, doms.barForward);

  rightSpacing = env.isMacOS || env.isInBrowser ? createTopbarElementById("AsriTopbarRightSpacing") : createTopbarElementById("AsriTopbarRightSpacing", doms.barSearch);

  // add svg to toolbar elements to fix barMore menu issue
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  rightSpacing?.appendChild(svg.cloneNode(true));
  pluginsDivider?.appendChild(svg.cloneNode(true));
  leftSpacing?.appendChild(svg.cloneNode(true));
}

function createTopbarElementById(newId: string, before: AsriDomsExtended = undefined, after: AsriDomsExtended = undefined) {
  if (document.getElementById(newId)) return;
  if (!doms.toolbar) return;

  let newDiv = document.createElement("div");
  newDiv.id = newId;
  if (before) {
    doms.toolbar.insertBefore(newDiv, before);
  } else if (after) {
    doms.toolbar.insertBefore(newDiv, after.nextSibling);
  } else {
    doms.toolbar.appendChild(newDiv);
  }

  return newDiv;
}

export async function recalcDragInitials() {
  if (!leftSpacing || !rightSpacing) return;
  leftSpacing.style.setProperty("width", "0px");
  rightSpacing.style.setProperty("width", "0px");
  await updateDragRect("initials");
  leftSpacing.style.removeProperty("width");
  rightSpacing.style.removeProperty("width");
}

function removeTopbarElements() {
  if (pluginsDivider) {
    pluginsDivider.remove();
  }
  if (leftSpacing) {
    leftSpacing.remove();
    leftSpacing = undefined;
  }
  if (rightSpacing) {
    rightSpacing.remove();
    rightSpacing = undefined;
  }
}
