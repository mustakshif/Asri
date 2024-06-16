export function docBodyMoCallback(mutationList: MutationRecord[], observer: MutationObserver) {
    addExportImgClassName()
}

function addExportImgClassName() {
    document.body.classList.toggle('has-exportimg', !!document.querySelector('[data-key="dialog-exportimage"]'));
}