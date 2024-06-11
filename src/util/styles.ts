import { asriDoms as doms } from "./rsc";
import { environment as env } from "./rsc";
import { remote } from "./electron";

export function modeTransition() {
    document.body.classList.add('asri-mode-transition');
    setTimeout(() => {
        document.body.classList.remove('asri-mode-transition');
    }, 350);
}
export function isDockLytPinned(el: HTMLElement): boolean {
    return el && !el.classList.contains('layout--float');
}
export function isDockLytExpanded(el: HTMLElement): boolean {
    return el?.style.width !== '0px';
}
export function isSideDockHidden(dir: 'l' | 'r' = 'l') {
    return doms[`dock${dir}`] && doms[`dock${dir}`]!.classList.contains('fn__none');
    // uses right dock to calculate status bar position: https://github.com/mustakshif/Asri-for-SiYuan/issues/16
}
// export function isFloatDockLytHidden(el: HTMLElement): boolean {
//     return !isDockLytPinned(el) && el?.style.cssText.includes('transform: translate');
// }

export function isFullScreen() {
    return !env.isInBrowser && remote.getCurrentWindow().isFullScreen();
}

export function isStatusHidden() {
    return doms.status && doms.status.classList.contains('fn__none');
}