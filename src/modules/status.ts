import { hasDockb, isDockHidden, isDockLytExpanded, isDockLytPinned, isStatusHidden } from "../util/interfaceState";
import { asriDoms as doms, environment as env } from "../util/rsc";
import { debounce, isOverlapping, querySelectorAsync } from "../util/misc";

export const debouncedStatusPosition = debounce(statusPosition);

/**
 * Calculate the position of status bar when there is a change of the display of docks and their layouts.
 */
export async function statusPosition() {
  if (env.isMobile || env.isMiniWindow) return;
  if (!doms.status) await querySelectorAsync("#status");
  if (!(await hasDockb())) {
    function setStatusTransform(x: number, y: number) {
      // doms.status!.style.transform = `translate(${x}px, ${y}px)`;
      doms.status!.style.setProperty("--asri-status-transform-x", `${x}px`);
      doms.status!.style.setProperty("--asri-status-transform-y", `${y}px`);
    }

    let layoutCenter = (doms.layouts || (await querySelectorAsync("#layouts")))!.querySelector(".layout__center");

    if (layoutCenter && doms.layoutDockR && !doms.status!.classList.contains(".fn__none")) {
      let layoutDockrWidth = doms.layoutDockR.clientWidth;
      let layoutCenterWidth = layoutCenter.clientWidth;
      let y = 0;

      doms.layoutDockB || (await querySelectorAsync(".layout__dockb"));

      if (doms.layoutDockB && !doms.layoutDockB.classList.contains(".fn__none") && isDockLytPinned("B")) {
        y = doms.layoutDockB.clientHeight * -1;
      } else {
        y = 0;
      }

      doms.status!.style.maxWidth = layoutCenterWidth - 12 + "px";

      let isDockRightHidden = isDockHidden("R"),
        isLayoutDockRightHidden = !isDockLytPinned("R") && isDockLytExpanded("R");
      if (isDockRightHidden && isLayoutDockRightHidden) setStatusTransform(0, y);
      else if (!isDockRightHidden && isLayoutDockRightHidden) setStatusTransform(-40, y);
      else if (!isDockRightHidden && !isLayoutDockRightHidden) setStatusTransform((layoutDockrWidth + 40) * -1, y);
      else if (isDockRightHidden && !isLayoutDockRightHidden) setStatusTransform(layoutDockrWidth * -1, y);

      // doms.status = document.getElementById('status');
    }
  } else {
    doms.status?.style.removeProperty("max-width");
    doms.status?.style.removeProperty("--asri-status-transform-x");
    doms.status?.style.removeProperty("--asri-status-transform-y");
  }

  // if (!hasDockb() && !isLayoutDockHidden('b')) {
  //     let layoutDockbHeight = asriDoms.layoutDockb?.clientHeight;
  //     asriDoms.status.style.transform = `translateY(-${layoutDockbHeight + 42}px)`;
  // }
}

export function setStatusHeightVar() {
  const statusHeight = isStatusHidden() ? 0 : 32;
  // fastdom.mutate(() => {
  document.body.style.setProperty("--status-height", `${statusHeight}px`);
  // })
}

export function removeStatusStyles() {
  document.body.style.removeProperty("--status-height");
  setTimeout(() => {
    doms.status?.style.removeProperty("max-width");
    doms.status?.style.removeProperty("--asri-status-transform-x");
    doms.status?.style.removeProperty("--asri-status-transform-y");
  }, 200);
}

export function avoidOverlappingWithStatus() {
  if (!isStatusHidden()) {
    const layoutTabContainers = doms.layouts?.querySelectorAll(".layout__center .layout-tab-container");
    const status = doms.status;
    // let statusRect = doms.status?.getBoundingClientRect();

    layoutTabContainers?.forEach((layoutTabContainer) => {
      let fileTree = layoutTabContainer.querySelector(".file-tree");
      if (fileTree && !fileTree.classList.contains("fn__none")) {
        // let containerRect = layoutTabContainer.getBoundingClientRect();
        if (isOverlapping(layoutTabContainer as AsriDomsExtended, status)) {
          (layoutTabContainer as AsriDomsExtended)!.style.paddingBottom = "35px";
        } else {
          (layoutTabContainer as AsriDomsExtended)!.style.removeProperty("padding-bottom");
        }
      } else {
        (layoutTabContainer as AsriDomsExtended)!.style.removeProperty("padding-bottom");
      }
    });

    const searchList = document.getElementById("searchList") as AsriDomsExtended;
    const searchPreview = document.getElementById("searchPreview") as AsriDomsExtended;
    if (searchList || searchPreview) {
      // let searchListRect = searchList.getBoundingClientRect();
      // let searchPreviewRect = searchPreview.getBoundingClientRect();

      if (isOverlapping(searchList, status)) {
        searchList!.style.paddingBottom = "35px";
      } else {
        searchList!.style.removeProperty("padding-bottom");
      }

      if (isOverlapping(searchPreview, status)) {
        searchPreview!.style.paddingBottom = "35px";
      } else {
        searchPreview!.style.removeProperty("padding-bottom");
      }
    }

    // pdfviewer
    const viewerContainer = document.getElementById("viewerContainer");

    if (viewerContainer) {
      // let viewerContainerRect = viewerContainer.getBoundingClientRect();

      if (isOverlapping(viewerContainer, status)) {
        viewerContainer.style.paddingBottom = "35px";
      } else {
        viewerContainer.style.removeProperty("padding-bottom");
      }
    }

    // flashcard in tabbar
    doms.layouts?.querySelectorAll(".card__main").forEach((card) => {
      if (card) {
        // let cardRect = card.getBoundingClientRect();

        if (isOverlapping(card as AsriDomsExtended, status)) {
          (card as AsriDomsExtended)!.style.paddingBottom = "35px";
        } else {
          (card as AsriDomsExtended)!.style.removeProperty("padding-bottom");
        }
      }
    });
  }
}

export function unloadAvoidOverlappingWithStatus() {
  doms.layouts?.querySelectorAll(".layout__center .layout-tab-container").forEach((layoutTabContainer) => {
    (layoutTabContainer as AsriDomsExtended)!.style.removeProperty("padding-bottom");
  });

  doms.layouts?.querySelectorAll(".card__main").forEach((card) => {
    (card as AsriDomsExtended)!.style.removeProperty("padding-bottom");
  });

  const searchList = document.getElementById("searchList");
  const searchPreview = document.getElementById("searchPreview");
  const viewerContainer = document.getElementById("viewerContainer");

  for (const el of [searchList, searchPreview, viewerContainer]) {
    if (el) {
      el.style.removeProperty("padding-bottom");
    }
  }
}
