import fastdom from "fastdom";
import { debounce, querySelectorPromise } from "../util/misc";
import { environment, asriDoms as doms } from "../util/rsc";

const { isMobile } = environment;

export const debouncedFormatIndentGuidesForFocusedItems = debounce(formatIndentGuidesForFocusedItems);
export async function formatIndentGuidesForFocusedItems() {
    if (isMobile) return;

    if (!doms.layoutDockL) await querySelectorPromise('.layout__dockl');

    let listItemsFocus = document.querySelectorAll('.file-tree .b3-list-item--focus');

    if (!listItemsFocus.length) return;

    document.querySelectorAll('.file-tree .has-focus').forEach(oldUl => oldUl.classList.remove('has-focus'));

    listItemsFocus.forEach(li => {
        if (!li.nextElementSibling || (li.nextElementSibling.tagName !== 'UL' || li.nextElementSibling.classList.contains('fn__none'))) {
            if (li.parentNode instanceof Element) {
                li.parentNode.classList.add('has-focus');
            }
        }
    })
}

export function removeIndentGuidesFormatClassName() {
    document.querySelectorAll('.file-tree .has-focus').forEach(el => el.classList.remove('has-focus'));
}