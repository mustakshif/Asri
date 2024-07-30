import { debounce } from "../util/misc";
import { wndElements } from "../util/state";


export const debouncedCalcProtyleSpacings = debounce(calcProtyleSpacings, 200);

export function calcProtyleSpacings() {
    // calc & apply protyleSpacing
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

export function removeProtyleSpacings() {
    wndElements?.forEach(wnd => {
        let protyles = wnd.querySelector('.file-tree') ? [] : wnd.querySelectorAll('.protyle-wysiwyg') as unknown as HTMLElement[];

        protyles.forEach(protyle => {
            protyle.style.removeProperty('--protyle-spacing');
            protyle.dataset.prevpadding = undefined;
        })
    })
}