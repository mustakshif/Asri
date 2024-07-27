import fastdom from "fastdom";
import { querySelectorPromise } from "../util/misc";
import { asriDoms as doms } from "../util/rsc";
import { isDockLytExpanded, isDockLytPinned } from "../util/state";

let isDockLLytPinnedOld = false,
    isDockLLytExpandedOld = false;

export async function dockLBg() {
    const dock = doms.dockL ? doms.dockL : await querySelectorPromise('#dockLeft');
    if (!doms.layoutDockL) await querySelectorPromise('.layout__dockl');

    fastdom.measure(() => {
        let isDockLLytPinned = isDockLytPinned('L'),
            isDockLLytExpanded = isDockLytExpanded('L');

        if (isDockLLytExpanded === isDockLLytExpandedOld && isDockLLytPinned === isDockLLytPinnedOld) return;

        fastdom.mutate(() => {
            if (isDockLLytPinned && isDockLLytExpanded) {
                dock?.classList.add('dock-layout-expanded');
            } else {
                dock?.classList.remove('dock-layout-expanded');
            }

            isDockLLytExpandedOld = isDockLLytExpanded;
            isDockLLytPinnedOld = isDockLLytPinned;
        });
    })
}

export function destroyDockBg() {
    document.querySelector('.dock-layout-expanded')?.classList.remove('dock-layout-expanded');
}