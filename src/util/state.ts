import { remote } from "./electron";
import { debounce, querySelectorAllPromise, querySelectorPromise } from "./misc";
import { asriDoms as doms } from "./rsc";

// top bar 
export let doesTopBarOverflow = false;
export const debouncedUpdateTopbarOverflow = debounce(updateTopbarOverflow);

export function updateTopbarOverflow() {
    if (!doms.toolbar) return;

    doesTopBarOverflow = doms.toolbar?.scrollWidth > doms.toolbar.clientWidth;
    if (!doms.barMore?.classList.contains('fn__none')) {
        doesTopBarOverflow = true;
    };
    // console.log('measure top bar overflow')
}

// docks and panels
export function isDockLytPinned(dir: ElDir) {
    const dockLayoutEl = dir === 'B' ? doms.layoutDockB : dir === 'L' ? doms.layoutDockL : doms.layoutDockR; // read properties directly to prevent 'undefined' result after minimizing js

    return !!(dockLayoutEl && !dockLayoutEl.classList.contains('layout--float'));
}
export function isDockLytExpanded(dir: ElDir) {
    const dockLayoutEl = dir === 'B' ? doms.layoutDockB : dir === 'L' ? doms.layoutDockL : doms.layoutDockR; // read properties directly to prevent 'undefined' result after minimizing js
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
    const dock = dir === 'B' ? doms.dockB : dir === 'L' ? doms.dockL : doms.dockR; // read properties directly to prevent 'undefined' result after minimizing js
    return !!(dock && dock.classList.contains('fn__none'));
    // uses right dock to calculate status bar position: https://github.com/mustakshif/Asri/issues/16
}
// export function isFloatDockLytHidden(el: HTMLElement): boolean {
//     return !isDockLytPinned(el) && el?.style.cssText.includes('transform: translate');
// }


// bottom dock
export async function hasDockb() {
    if (!doms.dockB) await querySelectorPromise('.layout__dockb')
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

export let wndElements: NodeListOf<Element> | undefined = document.querySelectorAll('.layout__center [data-type="wnd"]');

/**
 * update wnd elements, use before calcTabbarSpacings() and calcProtyleSpacings()
 */
export async function updateWndEls(): Promise<NodeListOf<Element> | undefined> {
    await querySelectorAllPromise('.layout__center [data-type="wnd"]').then(els => {
        wndElements = els;
    });
    return wndElements;
}