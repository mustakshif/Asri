import { debounce } from "../util/misc";
import { AsriMutationObserver } from "../util/observers";

export const watchImgExportMo = new AsriMutationObserver(debounce(docBodyMoCallback, 200));

function docBodyMoCallback(mutationList: MutationRecord[], observer: MutationObserver) {
    addExportImgClassName()
}

function addExportImgClassName() {
    document.body.classList.toggle('has-exportimg', !!document.querySelector('[data-key="dialog-exportimage"]'));
}