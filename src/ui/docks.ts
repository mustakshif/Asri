import { querySelectorAsync } from "../utils/misc";
import { asriDoms as doms, environment } from "../utils/rsc";
import { hasDockb, isDockLytExpanded, isDockLytPinned } from "../utils/interfaceState";

export async function updateDockLBgAndBorder() {
  const dockL = doms.dockL ? doms.dockL : await querySelectorAsync("#dockLeft");
  if (!doms.layoutDockL) await querySelectorAsync(".layout__dockl");
  const dockR = doms.dockR;

  for (let dock of [dockL, dockR]) {
    let isDockLLytPinned = isDockLytPinned(dock === dockL ? "L" : "R"),
      isDockLLytExpanded = isDockLytExpanded(dock === dockL ? "L" : "R");

    // console.log('measure: dock' , dock)

    if (isDockLLytPinned && isDockLLytExpanded) {
      dock?.classList.add("dock-layout-expanded");
    } else {
      dock?.classList.remove("dock-layout-expanded");
    }

    // console.log('mutate: dock' , dock)
  }
}

export async function addDockbClassName() {
  if (environment.isMobile) return;
  const dockbExist = await hasDockb();
  const dockbFloat = !isDockLytPinned("B") && isDockLytExpanded("B");

  doms.toolbar?.nextElementSibling!.classList.toggle("has-dockb", dockbExist);
  doms.toolbar?.nextElementSibling!.classList.toggle("has-layout-dockb-float", dockbFloat);
  doms.dockB?.classList.toggle("has-layout-dockb-float", dockbFloat);
}

export function removeDockbClassName() {
  doms.toolbar?.nextElementSibling!.classList.remove("has-dockb");
  doms.toolbar?.nextElementSibling!.classList.remove("has-layout-dockb-float");
}

export function destroyDockBg() {
  document.querySelector(".dock-layout-expanded")?.classList.remove("dock-layout-expanded");
}
