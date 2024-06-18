import { asriDoms } from "../util/rsc";

export async function formatProtyleWithBgImageOnly() {
    let protyleBgs = asriDoms.layouts?.querySelectorAll('.protyle .protyle-background');

    protyleBgs?.forEach(protyleBg => {
        if (!protyleBg.querySelector('.protyle-background__img img')?.classList.contains('fn__none') && protyleBg.querySelector('.protyle-background__icon.fn__none')) {
            protyleBg.classList.add('without-icon');
        } else {
            protyleBg.classList.remove('without-icon');
        }
    })
}

export async function removeProtyleWithBgImageOnlyClassName() {
    document.querySelectorAll('.protyle .protyle-background.without-icon').forEach(el => {
        el.classList.remove('without-icon');
    })
}