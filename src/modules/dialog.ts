/**
 * Deprecated: 2025-06-22
 * 
 * 监听文档body的mutation，如果存在dialog-exportimage的元素，则添加has-exportimg类名
 * 
 * 
 * 
 * 
 * 
 * @param mutationList
 * @param observer
 */

export function docBodyMoCallback(mutationList: MutationRecord[], observer: MutationObserver) {
  addExportImgClassName();
}

export function addExportImgClassName() {
  document.body.classList.toggle("has-exportimg", !!document.querySelector('[data-key="dialog-exportimage"]'));
}
