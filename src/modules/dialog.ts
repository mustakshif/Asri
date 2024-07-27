// export function docBodyMoCallback(mutationList: MutationRecord[], observer: MutationObserver) {
//     addExportImgClassName()
// }

export function addExportImgClassName() {
    document.body.classList.toggle('has-exportimg', !!document.querySelector('[data-key="dialog-exportimage"]'));
}