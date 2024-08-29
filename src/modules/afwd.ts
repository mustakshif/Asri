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
    if (e.type !== 'mouseup') return;
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

    const mainBtn = document.createElement('button');
    mainBtn.className = 'b3-menu__item';
    const separator = document.createElement('button');
    separator.className = 'b3-menu__separator';

    const menuBtnHtml = `
        <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 18 18">
            <path fill="currentColor" d="m15.503 15.003l-.735.71a.75.75 0 1 0 1.042 1.078l1.886-1.82a1 1 0 0 0 0-1.44l-1.886-1.82a.75.75 0 0 0-1.042 1.079l.739.713H12.75a.75.75 0 0 0 0 1.5zM15 3a2 2 0 0 1 2 2v4.25a.75.75 0 0 1-1.5 0V5a.5.5 0 0 0-.5-.5H5a.5.5 0 0 0-.5.5v4.25a.75.75 0 0 1-1.5 0V5a2 2 0 0 1 2-2zM5.234 15.712l-.735-.71h2.752a.75.75 0 1 0 0-1.5H4.495l.739-.713a.75.75 0 0 0-1.042-1.078l-1.886 1.82a1 1 0 0 0 0 1.44l1.886 1.82a.75.75 0 0 0 1.042-1.079"/>
        </svg>
        <span class="b3-menu__label">${i18n['afwdDocMenuLabel']}</span>
        <svg class="b3-menu__icon b3-menu__icon--small">
            <use xlink:href="#iconRight"></use>
        </svg>
        <div class="b3-menu__submenu">
            <div class="b3-menu__items">
                <button class="b3-menu__item b3-menu__item--custom" id="afwdDocMenuItem-all">
                    <span class="b3-menu__label">
                        <div class="fn__flex">
                            <span>${i18n['afwdDocMenuItem-all']}</span>
                            <span class="fn__space fn__flex-1"></span>
                            <input type="checkbox" class="b3-switch fn__flex-center">
                        </div>
                    </span>
                </button>
                <button class="b3-menu__item b3-menu__item--custom" id="afwdDocMenuItem-db">
                    <span class="b3-menu__label">
                        <div class="fn__flex">
                            <span>${i18n['afwdDocMenuItem-db']}</span>
                            <span class="fn__space fn__flex-1"></span>
                            <input type="checkbox" class="b3-switch fn__flex-center">
                        </div>
                    </span>
                </button>
                <button class="b3-menu__item b3-menu__item--custom" id="afwdDocMenuItem-t">
                    <span class="b3-menu__label">
                        <div class="fn__flex">
                            <span>${i18n['afwdDocMenuItem-t']}</span>
                            <span class="fn__space fn__flex-1"></span>
                            <input type="checkbox" class="b3-switch fn__flex-center">
                        </div>
                    </span>
                </button>
                <button class="b3-menu__item b3-menu__item--custom" id="afwdDocMenuItem-p">
                    <span class="b3-menu__label">
                        <div class="fn__flex">
                            <span>${i18n['afwdDocMenuItem-p']}</span>
                            <span class="fn__space fn__flex-1"></span>
                            <input type="checkbox" class="b3-switch fn__flex-center">
                        </div>
                    </span>
                </button>
                <button class="b3-menu__item b3-menu__item--custom" id="afwdDocMenuItem-iframe">
                    <span class="b3-menu__label">
                        <div class="fn__flex">
                            <span>${i18n['afwdDocMenuItem-iframe']}</span>
                            <span class="fn__space fn__flex-1"></span>
                            <input type="checkbox" class="b3-switch fn__flex-center">
                        </div>
                    </span>
                </button>
                <button class="b3-menu__item b3-menu__item--custom" id="afwdDocMenuItem-sb">
                    <span class="b3-menu__label">
                        <div class="fn__flex">
                            <span>${i18n['afwdDocMenuItem-sb']}</span>
                            <span class="fn__space fn__flex-1"></span>
                            <input type="checkbox" class="b3-switch fn__flex-center">
                        </div>
                    </span>
                </button>
            </div>
        </div>
    `;

    mainBtn.innerHTML = menuBtnHtml;
    commonMenuBtnList.insertBefore(mainBtn, commonMenuBtnList.lastChild?.previousSibling!);
    commonMenuBtnList.insertBefore(separator, mainBtn);
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