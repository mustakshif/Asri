import { addExportImgClassName } from "../modules/dialog";
import { debouncedFormatProtyleWithBgImageOnly, formatProtyleWithBgImageOnly } from "../modules/editor";
import { debouncedFormatIndentGuidesForFocusedItems, formatIndentGuidesForFocusedItems } from "../modules/sidepanels";
import { debounce } from "./misc";

export class AsriResizeObserver {
    ro: ResizeObserver;
    callback: ResizeObserverCallback;
    constructor(callback: ResizeObserverCallback) {
        this.callback = (entries, observer) => callback(entries, observer);
        this.ro = new ResizeObserver(this.callback);
    }
    observe(target: Element, options?: ResizeObserverOptions) {
        this.ro.observe(target, options);
    }

    disconnect(callback?: () => any) {
        this.ro.disconnect();
        if (callback) callback();
    }

    unobserve(target: Element) {
        this.ro.unobserve(target);
    }
}

export class AsriMutationObserver {

    mo: MutationObserver;
    callback: MutationCallback;

    constructor(callback: MutationCallback) {
        this.callback = (mutationList, observer) => callback(mutationList, observer);
        this.mo = new MutationObserver(this.callback);
    }

    observe(target: Node, options?: MutationObserverInit) {
        this.mo.observe(target, options);
    }

    disconnect(callback?: () => any) {
        // const mutations = this.mo.takeRecords();
        // if (mutations) {
        //     this.callback(mutations, this.mo);
        // }
        this.mo.disconnect();
        if (callback) callback();
    }
}

export const MOConfigForClassNames: MutationObserverInit = {
    attributes: true, // 监视属性变化
    subtree: true, // 包含目标节点的后代节点
    attributeFilter: ['class'] // 只关注"class"属性的变化
};

export function globalClassNameMoCallback(mutationList: MutationRecord[], observer: MutationObserver) {
    for (let mutation of mutationList) {
        if ((mutation.target as HTMLElement).classList.contains('b3-list-item--focus') ) {
            debouncedFormatIndentGuidesForFocusedItems();
        }
    }
}