import { remote } from "./electron";
import { asriDoms as doms, environment as env } from "./rsc";

// side panels
export function isDockLytPinned(dockLayoutEl: AsriDomsExtended) {
    return !!(dockLayoutEl && !dockLayoutEl.classList.contains('layout--float'));
}
export function isDockLytExpanded(dockLayoutEl: AsriDomsExtended) {
    return !!(dockLayoutEl && dockLayoutEl.style.width !== '0px');
}
export function isSideDockHidden(dir: 'L' | 'R' = 'L') {
    const dock = doms[`dock${dir}`] as AsriDomsExtended;
    return !!(dock && dock.classList.contains('fn__none'));
    // uses right dock to calculate status bar position: https://github.com/mustakshif/Asri-for-SiYuan/issues/16
}
// export function isFloatDockLytHidden(el: HTMLElement): boolean {
//     return !isDockLytPinned(el) && el?.style.cssText.includes('transform: translate');
// }

// fullscreen state in macOS
export function isFullScreen() {
    return !!(!env.isInBrowser && remote.getCurrentWindow().isFullScreen());
}

// status bar
export function isStatusHidden() {
    return !!(doms.status && doms.status.classList.contains('fn__none'));
}

// bottom dock
export function hasDockb() {
    return !!(doms.dockB && !doms.dockB.classList.contains('fn__none'));
}

export function isLytDockbFloating() {
    let result = false;
    if (!env.isMobile) {
        const layouts = doms.layouts;
        const lytDockb = layouts?.querySelector('.layout__dockb') as AsriDomsExtended;

        result = !!(layouts && lytDockb?.classList.contains('layout--float') && lytDockb?.style.height !== "0px");
    }
    return result;
}
