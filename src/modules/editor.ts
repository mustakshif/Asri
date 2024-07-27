import fastdom from "fastdom";
import { asriDoms } from "../util/rsc";
import { querySelectorAllPromise } from "../util/misc";

export async function formatProtyleWithBgImageOnly() {
    let protyleBgs = await querySelectorAllPromise('.protyle-top>.protyle-background');

    protyleBgs?.forEach(protyleBg => {
        fastdom.mutate(() => {
            if (!protyleBg.querySelector('.protyle-background__img img')?.classList.contains('fn__none') && protyleBg.querySelector('.protyle-background__icon.fn__none')) {
                protyleBg.classList.add('without-icon');
            } else {
                protyleBg.classList.remove('without-icon');
            }
        })        
    })
}

export function removeProtyleWithBgImageOnlyClassName() {
    document.querySelectorAll('.protyle .protyle-background.without-icon').forEach(el => {
        el.classList.remove('without-icon');
    })
}