import { asriDoms as doms, environment as env } from "../util/rsc";
import { isDockLytPinned, isDockLytExpanded } from "../util/styles";

const { isMobile, isMiniWindow } = env;
export function docklBg() {
    const lyt = doms.layoutDockl as HTMLElement | null;
    const dock = doms.dockl as HTMLElement | null;

    if (isDockLytPinned(lyt) && isDockLytExpanded(lyt)) {
        dock?.classList.add('dock-layout-expanded');
        // pushUnique(asriClassNames, '.dock-layout-expanded');
    } else {
        dock?.classList.remove('dock-layout-expanded');
    }

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
    document.querySelectorAll('.dock-layout-expanded').forEach(el => el.classList.remove('dock-layout-expanded'));
}