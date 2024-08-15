import { debounce, querySelectorAllAsync } from "../util/misc";

export const debouncedFormatProtyleWithBgImageOnly = debounce(formatProtyleWithBgImageOnly);
export async function formatProtyleWithBgImageOnly() {
    // await updateWndEls();
    let protyleBgs = await querySelectorAllAsync('.protyle-top>.protyle-background');

    protyleBgs?.forEach(protyleBg => {
        if (!protyleBg.querySelector('.protyle-background__img img')?.classList.contains('fn__none') && protyleBg.querySelector('.protyle-background__icon.fn__none')) {
            protyleBg.classList.add('without-icon');
        } else {
            protyleBg.classList.remove('without-icon');
        }
    })
}

export function removeProtyleWithBgImageOnlyClassName() {
    document.querySelectorAll('.protyle .protyle-background.without-icon').forEach(el => {
        el.classList.remove('without-icon');
    })
}