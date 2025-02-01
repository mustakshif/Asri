import { getBlockAttrs, setBlockAttrs } from "../util/api";
import { debounce, querySelectorAsync } from "../util/misc";
import { wndElements } from "../util/interfaceState";
import { i18n as _i18n, loadI18n } from "./asriPalettes";

export const debouncedCalcProtyleSpacings = debounce(calcProtyleSpacings, 200);
const afwdBlockTypes = [
    'NodeParagraph',
    'NodeTable',
    'NodeAttributeView',
    'NodeSuperBlock',
    'NodeVideo',
    'NodeWidget',
    'NodeIFrame',
];

let commonMenuEl: Element | undefined;
let i18n = _i18n;

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
    if (!i18n) i18n = await loadI18n();
    const target = e.target as HTMLElement;
    const targetLabel = target.closest('.ariaLabel') as HTMLElement;
    if (!targetLabel) return;
    const gutterType = targetLabel.dataset.type; // block types, 'NodeSuperBlock', 'NodeParagraph'...
    const nonGutterType = target.closest('.protyle-title__icon')
        ? 'doc'
        : targetLabel.dataset.type === 'doc' // 'doc' | 'more' | ... | undefined
            ? 'doc'
            : undefined;
    const type = afwdBlockTypes.includes(gutterType!)
        ? gutterType
        : nonGutterType;
    if (!type) return;
    // console.log(type);
    const blockId = type === 'doc'
        ? targetLabel.parentElement!.dataset['nodeId'] ?? (targetLabel.closest('.protyle')?.querySelector('.protyle-title') as HTMLElement)?.dataset['nodeId']
        : targetLabel.dataset['nodeId'];
    // console.log(blockId, type);
    commonMenuEl = await querySelectorAsync('#commonMenu:not(.fn__none)');
    initializeCurBlocksAttrs(type, blockId as string);
}

async function initializeCurBlocksAttrs(curBlockType: string, curBlockId: string) {
    const isDoc = curBlockType === 'doc';

    makeItems(curBlockType);

    let attrs = await getBlockAttrs(curBlockId).then(res => res['custom-afwd']);
    if (!attrs) attrs = '';
    attrs = attrs.split(' ');

    // read & set initial states
    // for doc blocks
    if (attrs.length > 0 && isDoc) {
        attrs.forEach((attr: string) => {
            const menuItemEl = document.getElementById(`afwdMenuItem-${attr}`);
            if (menuItemEl) {
                menuItemEl.querySelector('input')!.checked = true;
            }
        })

        if (attrs.includes('all')) {
            const menuItemEls = commonMenuEl?.querySelectorAll('button[id^=afwdMenuItem]:not(#afwdMenuItem-all, #afwdMenuItem-clear)');
            menuItemEls?.forEach(el => {
                el.classList.add('b3-menu__item--disabled');
                el.querySelector('input')!.disabled = true;
            });
        }
    }
    // for indoc content blocks
    else if (attrs.length > 0) {
        const menuItemEl = document.getElementById(`afwdMenuItem-${attrs[0]}`);
        if (menuItemEl) {
            menuItemEl.classList.add('b3-menu__item--selected');
        }
    }

    menuItemsFunctionalities(isDoc, curBlockId, attrs);
}

async function makeItems(blockType: string) {
    if (!commonMenuEl || document.getElementById('afwdMenuItem-clear')) return;

    const commonMenuBtnList = commonMenuEl.lastChild as HTMLDivElement;

    const mainBtn = document.createElement('button');
    mainBtn.className = 'b3-menu__item';
    const separator = document.createElement('button');
    separator.className = 'b3-menu__separator';

    const inDocBlockMenuItems = `
        <button class="b3-menu__item b3-menu__item--custom" id="afwdMenuItem-on">
            <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12l2 2l4-4"/></g>
            </svg>
            <span class="b3-menu__label">${i18n['afwdMenuItem-on']}</span>
        </button>
        <button class="b3-menu__item b3-menu__item--custom" id="afwdMenuItem-off">
            <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m15 9l-6 6m0-6l6 6"/></g>
            </svg>
            <span class="b3-menu__label">${i18n['afwdMenuItem-off']}</span>
        </button>
    `
    const docMenuItems = `
        <button class="b3-menu__item b3-menu__item--custom" id="afwdMenuItem-all">
            <span class="b3-menu__label">
                <div class="fn__flex">
                    <svg class="b3-menu__icon" style=""></svg>
                    <span>${i18n['afwdMenuItem-all']}</span>
                    <span class="fn__space fn__flex-1"></span>
                    <input type="checkbox" class="b3-switch fn__flex-center">
                </div>
            </span>
        </button>
        <button class="b3-menu__item b3-menu__item--custom" id="afwdMenuItem-db">
            <span class="b3-menu__label">
                <div class="fn__flex">
                    <svg class="b3-menu__icon" style=""><use xlink:href="#iconDatabase"></use></svg>
                    <span>${i18n['afwdMenuItem-db']}</span>
                    <span class="fn__space fn__flex-1"></span>
                    <input type="checkbox" class="b3-switch fn__flex-center">
                </div>
            </span>
        </button>
        <button class="b3-menu__item b3-menu__item--custom" id="afwdMenuItem-t">
            <span class="b3-menu__label">
                <div class="fn__flex">
                    <svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg>
                    <span>${i18n['afwdMenuItem-t']}</span>
                    <span class="fn__space fn__flex-1"></span>
                    <input type="checkbox" class="b3-switch fn__flex-center">
                </div>
            </span>
        </button>
        <button class="b3-menu__item b3-menu__item--custom" id="afwdMenuItem-p">
            <span class="b3-menu__label">
                <div class="fn__flex">
                    <svg class="b3-menu__icon"><use xlink:href="#iconImage"></use></svg>
                    <span>${i18n['afwdMenuItem-p']}</span>
                    <span class="fn__space fn__flex-1"></span>
                    <input type="checkbox" class="b3-switch fn__flex-center">
                </div>
            </span>
        </button>
        <button class="b3-menu__item b3-menu__item--custom" id="afwdMenuItem-iframe">
            <span class="b3-menu__label">
                <div class="fn__flex">
                    <svg class="b3-menu__icon"><use xlink:href="#iconHTML5"></use></svg>
                    <span>${i18n['afwdMenuItem-iframe']}</span>
                    <span class="fn__space fn__flex-1"></span>
                    <input type="checkbox" class="b3-switch fn__flex-center">
                </div>
            </span>
        </button>
        <button class="b3-menu__item b3-menu__item--custom" id="afwdMenuItem-sb">
            <span class="b3-menu__label">
                <div class="fn__flex">
                    <svg class="b3-menu__icon"><use xlink:href="#iconSuper"></use></svg>
                    <span>${i18n['afwdMenuItem-sb']}</span>
                    <span class="fn__space fn__flex-1"></span>
                    <input type="checkbox" class="b3-switch fn__flex-center">
                </div>
            </span>
        </button>
    `

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
                ${blockType === 'doc' ? docMenuItems : inDocBlockMenuItems}
                <button class="b3-menu__separator"></button>
                <button class="b3-menu__item" id="afwdMenuItem-clear">
                    <svg class="b3-menu__icon " style=""><use xlink:href="#iconTrashcan"></use></svg>
                    <span class="b3-menu__label">${i18n['afwdMenuItem-clear']}
                    </span>
                </button>
            </div>
        </div>
    `;

    mainBtn.innerHTML = menuBtnHtml;
    commonMenuBtnList.insertBefore(mainBtn, commonMenuBtnList.lastChild?.previousSibling!);
    commonMenuBtnList.insertBefore(separator, mainBtn);
}

function menuItemsFunctionalities(isDoc: boolean, curBlockId: string, attrs: string[]) {
    const menuItemEls = commonMenuEl?.querySelectorAll('button[id^=afwdMenuItem]:not(#afwdMenuItem-clear)') as unknown as HTMLButtonElement[];
    let attrsReserved: string[] = []; // save all attrs except 'all', 'on', 'off'

    if (!menuItemEls) return;
    const menuItemElsExceptAll = [...menuItemEls].filter(el => el.id !== 'afwdMenuItem-all');

    // set doc blocks afwd menu funcs
    if (isDoc) {
        menuItemEls?.forEach(el => {
            el.onclick = (ev) => {
                if (el.classList.contains('b3-menu__item--disabled')) return;
                const input = el.querySelector('input')!;
                const curAttr = el['id'].split('-')[1]; // 'all' | 'db' | ...
                let isOn = input.checked; // check initial state

                // clicking on input itself will toggle the checkbox automatically,
                // but when clicking on label, we need to toggle it manually
                if (ev.target === input) isOn = !isOn; // when clicking on input, restore to the state where the checkbox was not clicked
                else input.checked = !isOn; // this is only used to change the state of the checkbox's appearance when clicking on label

                // when menu item is actived
                if (isOn) {
                    if (curAttr === 'all') {
                        menuItemElsExceptAll.forEach(el => {
                            el.classList.remove('b3-menu__item--disabled');
                            el.querySelector('input')!.disabled = false;
                        });

                        attrs = attrsReserved.length > 0 ? attrsReserved : [];
                    } else attrs = attrs.filter(a => a !== curAttr);
                }
                // when menu item is deactived
                else {
                    if (curAttr === 'all') {
                        if (!attrs.includes('all')) attrsReserved = attrs;
                        attrs = ['all'];
                        menuItemElsExceptAll.forEach(el => {
                            el.classList.add('b3-menu__item--disabled');
                            el.querySelector('input')!.disabled = true;
                        });
                    } else attrs.push(curAttr);
                };

                setBlockAttrs(curBlockId, { 'custom-afwd': attrs.join(' ') || '' });
            }
        })
    }
    // set indoc blocks afwd menu funcs
    else {
        menuItemEls?.forEach((el, index, arr) => {
            el.onclick = () => {
                const attr = el['id'].split('-')[1]; // 'on' | 'off'
                const isSelected = el.classList.contains('b3-menu__item--selected');

                if (isSelected) {
                    attrs = [];
                    el.classList.remove('b3-menu__item--selected');
                } else {
                    attrs = [attr];
                    el.classList.add('b3-menu__item--selected');
                    arr[1 - index].classList.remove('b3-menu__item--selected');
                };

                setBlockAttrs(curBlockId, { 'custom-afwd': attrs?.join(' ') || '' });
            }
        })
    }

    // functionality of clear button
    const clearBtn = document.getElementById('afwdMenuItem-clear');
    if (clearBtn) {
        clearBtn.onclick = () => {
            attrs = [];
            attrsReserved = [];
            setBlockAttrs(curBlockId, { 'custom-afwd': '' });
            menuItemEls.forEach(el => {
                el.classList.remove('b3-menu__item--disabled');
                el.classList.remove('b3-menu__item--selected');
                if (isDoc) {
                    const inputEl = el.querySelector('input');
                    inputEl!.disabled = false;
                    inputEl!.checked = false;
                }
            })
        }
    }
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