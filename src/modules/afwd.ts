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
    setTimeout(makeItems, 100);
}

export function makeItems() {
    const commonMenuEl = document.getElementById('commonMenu');
    if (!commonMenuEl) return;
    
    const commonMenuBtnList = commonMenuEl.lastChild as HTMLDivElement;
    console.log('commonMenuBtnList:', commonMenuBtnList);

    const mainBtn = document.createElement('button');
    mainBtn.className = 'b3-menu__item';

    const menuBtnHtml = `
        <svg class="b3-menu__icon"></svg>
        <span class="b3-menu__label">${i18n['afwdDocMenuLabel']}</span>
        <svg class="b3-menu__icon b3-menu__icon--small">
            <use xlink:href="#iconRight"></use>
        </svg>
        <div class="b3-menu__submenu">
            <div class="b3-menu__items">
                <button class="b3-menu__item b3-menu__item--custom">
                    <span class="b3-menu__label">
                        <div class="fn__flex">
                            <span>${i18n['afwdDocMenuItem-all']}</span>
                            <span class="fn__space fn__flex-1"></span>
                            <input type="checkbox" class="b3-switch fn__flex-center">
                        </div>
                    </span>
                </button>
            </div>
        </div>
    `;

    mainBtn.innerHTML = menuBtnHtml;
    console.log('mainBtn:', mainBtn);

    commonMenuBtnList.insertBefore(mainBtn, commonMenuBtnList.lastChild?.previousSibling!);
    console.log('commonMenuBtnList after appendChild:', commonMenuBtnList);
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