import { asriDoms as doms, environment as env } from "../util/rsc";
import { isDockLytPinned, isDockLytExpanded } from "../util/state";

const { isMobile, isMiniWindow } = env;

let isDockLLytPinnedOld = false,
    isDockLLytExpandedOld = false;

export function dockLBg() {
    const dock = doms.dockL;
    let isDockLLytPinned = isDockLytPinned('L'),
        isDockLLytExpanded = isDockLytExpanded('L');

    if (isDockLLytExpanded === isDockLLytExpandedOld && isDockLLytPinned === isDockLLytPinnedOld) return;

    if (isDockLLytPinned && isDockLLytExpanded) {
        dock?.classList.add('dock-layout-expanded');
    } else {
        dock?.classList.remove('dock-layout-expanded');
    }

    isDockLLytExpandedOld = isDockLLytExpanded;
    isDockLLytPinnedOld = isDockLLytPinned;

    // if (!isSideDockHidden() && !isFloatDockLytHidden(lyt) && isDockLytExpanded(lyt)) {
    //     switch (dir) {
    //         case 'l':
    //             // dock.style.borderRightColor = 'transparent';
    //             dock.style.setProperty('--border-clr', 'transparent');
    //             break;
    //         case 'r':
    //             // dock.style.borderLeftColor = 'transparent';
    //             dock.style.setProperty('--border-clr', 'transparent');
    //             break;
    //     }
    // } else {
    //     dock.style.removeProperty('--border-clr');
    // }

}

export function destroyDockBg() {
    document.querySelector('.dock-layout-expanded')?.classList.remove('dock-layout-expanded');
}