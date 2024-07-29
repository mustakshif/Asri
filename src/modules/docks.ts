import fastdom from "fastdom";
import { querySelectorPromise } from "../util/misc";
import { asriDoms as doms } from "../util/rsc";
import { isDockLytExpanded, isDockLytPinned } from "../util/state";

export async function updateDockLBgAndBorder() {
    const dockL = doms.dockL ? doms.dockL : await querySelectorPromise('#dockLeft');
    if (!doms.layoutDockL) await querySelectorPromise('.layout__dockl');
    const dockR = doms.dockR;

    for (let dock of [dockL, dockR]) {
        fastdom.measure(() => {
            let isDockLLytPinned = isDockLytPinned(dock === dockL ? 'L' : 'R'),
                isDockLLytExpanded = isDockLytExpanded(dock === dockL ? 'L' : 'R');

            fastdom.mutate(() => {
                if (isDockLLytPinned && isDockLLytExpanded) {
                    dock?.classList.add('dock-layout-expanded');
                } else {
                    dock?.classList.remove('dock-layout-expanded');
                }
            });
        })
    }
}

export function destroyDockBg() {
    document.querySelector('.dock-layout-expanded')?.classList.remove('dock-layout-expanded');
}