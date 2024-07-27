import { remote } from "./electronAPI";
import { debounce, querySelectorAllPromise } from "./misc";
import { asriDoms as doms, environment as env } from "./rsc";
import fastdom from "fastdom";

// top bar 
export let doesTopBarOverflow = false;
export function updateTopBarOverflow() {
    fastdom.measure(() => {
        if (!doms.toolbar) return;

        doesTopBarOverflow = doms.toolbar?.scrollWidth > doms.toolbar.clientWidth;
        if (!doms.barMore?.classList.contains('fn__none')) {
            doesTopBarOverflow = true;
        };
    });
}

// docks and panels
export function isDockLytPinned(dir: ElDir) {
    const dockLayoutEl = doms[`layoutDock${dir}`] as AsriDomsExtended;

    return !!(dockLayoutEl && !dockLayoutEl.classList.contains('layout--float'));
}
export function isDockLytExpanded(dir: ElDir) {
    const dockLayoutEl = doms[`layoutDock${dir}`] as AsriDomsExtended;
    let size: string | undefined;

    if (!dockLayoutEl) return false;

    if (dir === 'B') {
        size = (dockLayoutEl as HTMLElement).style.height;
    } else {
        size = (dockLayoutEl as HTMLElement).style.width;
    }

    return !!(size && size !== '0px');
}

export function isDockHidden(dir: ElDir = 'L') {
    const dock = doms[`dock${dir}`] as AsriDomsExtended;
    return !!(dock && dock.classList.contains('fn__none'));
    // uses right dock to calculate status bar position: https://github.com/mustakshif/Asri/issues/16
}
// export function isFloatDockLytHidden(el: HTMLElement): boolean {
//     return !isDockLytPinned(el) && el?.style.cssText.includes('transform: translate');
// }


// bottom dock
export function hasDockb() {
    return !!(doms.dockB && !doms.dockB.classList.contains('fn__none'));
}

// export function isLytDockbFloating() {
//     let result = false;
//     if (!env.isMobile) {
//         const layouts = doms.layouts;
//         const lytDockb = layouts?.querySelector('.layout__dockb') as AsriDomsExtended;

//         result = !!(layouts && lytDockb?.classList.contains('layout--float') && lytDockb?.style.height !== "0px");
//     }
//     return result;
// }

// fullscreen state in macOS
export function isFullScreen() {
    return !!(remote && remote.getCurrentWindow().isFullScreen());
}

// status bar
export function isStatusHidden() {
    return !!(doms.status && doms.status.classList.contains('fn__none'));
}

export let wndElements:NodeListOf<Element> | undefined = document.querySelectorAll('.layout__center [data-type="wnd"]');

/**
 * update wnd elements, use before calcTabbarSpacings() and calcProtyleSpacings()
 */
export async function updateWndEls(): Promise<NodeListOf<Element> | undefined> {
    await querySelectorAllPromise('.layout__center [data-type="wnd"]').then(els => {
        wndElements = els;
    });
    return wndElements;
}