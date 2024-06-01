import { AsriMutationObserver } from "../util/observers";

export const watchImgExportMo = new AsriMutationObserver(docBodyMoCallback);

function docBodyMoCallback(mutationList: MutationRecord[], observer: MutationObserver) {
    // console.log(mutationList);
    addExportImgClassName();
}

function addExportImgClassName() {
    document.body.classList.toggle('has-exportimg', !!document.querySelector('[data-key="dialog-exportimage"]'));
}