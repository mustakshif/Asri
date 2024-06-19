import { environment } from "../util/rsc";

const { isMobile } = environment;

// 可尝试点击后启动 MutationObserver，监测到相关变动后再执行，然后 disconnect
export async function formatIndentGuidesForFocusedItems() {
    if (!isMobile) {
        let listItemsFocus = document.querySelectorAll('.file-tree .b3-list-item--focus');

        document.querySelectorAll('.file-tree .has-focus').forEach(oldUl => oldUl.classList.remove('has-focus'));

        if (listItemsFocus.length === 0)  return;

        listItemsFocus.forEach(li => {
            if (!li.nextElementSibling || (li.nextElementSibling.tagName !== 'UL' || li.nextElementSibling.classList.contains('fn__none'))) {
                if (li.parentNode instanceof Element) {
                    li.parentNode.classList.add('has-focus');
                }
            }
        })
    }
}

export async function removeIndentGuidesFormatClassName() {
    document.querySelectorAll('.file-tree .has-focus').forEach(el => el.classList.remove('has-focus'));
}