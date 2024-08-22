import { debounce } from "../util/misc";
import { wndElements } from "../util/state";
import { i18n, loadI18n } from "./configsMenu/makeItems";

export const debouncedCalcProtyleSpacings = debounce(calcProtyleSpacings, 200);

export function calcProtyleSpacings() {
    wndElements?.forEach(wnd => {
        let protyles = wnd.querySelector('.file-tree') ? [] : wnd.querySelectorAll('.protyle-wysiwyg') as unknown as HTMLElement[];

        setTimeout(() => {
            protyles.forEach(protyle => {
                let protylePadding: string;
                // let protylePadding = Math.round(parseFloat(window.getComputedStyle(protyle).paddingLeft)) + 'px';

                protylePadding = protyle.style.paddingLeft;
                if (protylePadding !== protyle.dataset.prevpadding) {
                    protyle.style.setProperty('--protyle-spacing', protylePadding);
                    protyle.dataset.prevpadding = protylePadding;
                    // console.log(protylePadding);
                }
            })
        }, 300); // protyle transition time
    })
}

export async function addAfwdMenuItems(e: Event) {
    const target = e.target as HTMLElement;
    const targetLabel = target.closest('.ariaLabel') as HTMLElement
    if (!targetLabel) return;
    // const gutterSubtype = targetLabel.dataset.subtype; // block types, 'u', 'h1'...
    const nonGutterType = target.closest('.protyle-title__icon')
        ? 'doc'
        : targetLabel.dataset.type; // 'doc' | 'more' | ... | undefined
    const type = /* gutterSubtype ?? */ nonGutterType;
    if (type !== 'doc') return;
    setTimeout(makeItems, 0);
}

export async function makeItems() {
    const commonMenuEl = document.getElementById('commonMenu');
    if (!commonMenuEl) return;
    if (!i18n) await loadI18n();
    const commonMenuBtnList = commonMenuEl.lastChild as HTMLUListElement;
    const menuBtn = `
        <button class="b3-menu__item">
            <svg class="b3-menu__icon"></svg>
            <span class="b3-menu__label">${i18n['afwdDocMenuLabel']}</span>
            <svg class="b3-menu__icon b3-menu__icon--small">
                <use xlink:href="#iconRight"></use>
            </svg>
            <div class="b3-menu__submenu">
                <div class="b3-menu__items">
                    <button class="b3-menu__item">
                        <span class="b3-menu__label">${i18n['afwdDocMenuItem-all']}</span>
                    </button>
                    <button class="b3-menu__item">
                        <span class="b3-menu__label">${i18n['afwdDocMenuItem-db']}</span>
                    </button>
                    <button class="b3-menu__item">
                        <span class="b3-menu__label">${i18n['afwdDocMenuItem-t']}</span>
                    </button>
                    <button class="b3-menu__item">
                        <span class="b3-menu__label">${i18n['afwdDocMenuItem-p']}</span>
                    </button>
                    <button class="b3-menu__item">
                        <span class="b3-menu__label">${i18n['afwdDocMenuItem-iframe']}</span>
                    </button>
                    <button class="b3-menu__item">
                        <span class="b3-menu__label">${i18n['afwdDocMenuItem-sb']}</span>
                    </button>
                </div>
            </div>
        </button>
    `
}

export function removeProtyleSpacings() {
    wndElements?.forEach(wnd => {
        let protyles = wnd.querySelector('.file-tree') ? [] : wnd.querySelectorAll('.protyle-wysiwyg') as unknown as HTMLElement[];

        protyles.forEach(protyle => {
            protyle.style.removeProperty('--protyle-spacing');
            protyle.dataset.prevpadding = undefined;
        })
    })
}