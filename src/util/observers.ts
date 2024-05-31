export class AsriResizeObserver {

}

export class AsriMutationObserver {

    public mo: MutationObserver;
    public callback: MutationCallback;

    constructor(callback: MutationCallback) {
        this.callback = (mutationList, observer) => callback(mutationList, observer);
        this.mo = new MutationObserver(this.callback);
    }

    observe(target: Node, options?: MutationObserverInit) {
        this.mo.observe(target, options);
    }

    disconnect() {
        const mutations = this.mo.takeRecords();
        if (mutations) {
            this.callback(mutations, this.mo);
        }
        this.mo.disconnect();
    }
}