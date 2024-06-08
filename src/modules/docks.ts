import { asriDoms, environment as env } from "../util/rsc";
import { isDockLytPinned, isDockLytExpanded, isSideDockHidden, isFloatDockLytHidden } from "../util/styles";

const { isMobile, isMiniWindow } = env;
export const doms: AsriDomsExtended = asriDoms as AsriDomsExtended;
export function dockBg() {
    for (let dir of ['l', 'r']) {
        const lyt = doms['layoutDock' + dir];
        const dock = doms['dock' + dir];

        if (isDockLytPinned(lyt) && isDockLytExpanded(lyt)) {
            dock.classList.add('dock-layout-expanded');
            // pushUnique(asriClassNames, '.dock-layout-expanded');
        } else {
            dock.classList.remove('dock-layout-expanded');
        }

        if (!isSideDockHidden() && !isFloatDockLytHidden(lyt) && isDockLytExpanded(lyt)) {
            switch (dir) {
                case 'l':
                    // dock.style.borderRightColor = 'transparent';
                    dock.style.setProperty('--border-clr', 'transparent');
                    break;
                case 'r':
                    // dock.style.borderLeftColor = 'transparent';
                    dock.style.setProperty('--border-clr', 'transparent');
                    break;
            }
        } else {
            dock.style.removeProperty('--border-clr');
        }
    }
}