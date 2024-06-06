import { asriDoms as doms, environment as env } from "../util/rsc";

const { isMobile, isMiniWindow } = env;
export function dockBg() {
    if (doms.dockl && !isMobile && !isMiniWindow) {
        // for (let dir of ['l', 'r']) {

        //     const lyt = doms[layoutDock + dir] as HTMLElement;
        //     const dock = doms[dock + dir] as HTMLElement;

        //     if (isDockLytPinned(lyt) && isDockLytExpanded(lyt)) {
        //         dock.classList.add('dock-layout-expanded');
        //         // pushUnique(asriClassNames, '.dock-layout-expanded');
        //     } else {
        //         dock.classList.remove('dock-layout-expanded');
        //     }

        //     if (!isSideDockHidden() && !isFloatDockLytHidden(lyt) && isDockLytExpanded(lyt)) {
        //         switch (dir) {
        //             case 'l':
        //                 // dock.style.borderRightColor = 'transparent';
        //                 dock.style.setProperty('--border-clr', 'transparent');
        //                 break;
        //             case 'r':
        //                 // dock.style.borderLeftColor = 'transparent';
        //                 dock.style.setProperty('--border-clr', 'transparent');
        //                 break;
        //         }
        //     } else {
        //         dock.style.removeProperty('--border-clr');
        //     }
        // }
    }

}

function isDockLytPinned(el: HTMLElement) {
    return el && !el.classList.contains('layout--float');
}

function isDockLytExpanded(el: HTMLElement) {
    return el?.style.width !== '0px';
}

function isSideDockHidden(dir: 'l' | 'r' = 'l') {
    return doms[`dock${dir}`] && doms[`dock${dir}`]!.classList.contains('fn__none')
    // uses right dock to calculate status bar position: https://github.com/mustakshif/Asri-for-SiYuan/issues/16
}

function isFloatDockLytHidden(el: HTMLElement) {
    return !isDockLytPinned(el) && el?.style.cssText.includes('transform: translate');
}