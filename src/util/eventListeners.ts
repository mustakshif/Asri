export class AsriClickEventListener {

    public callback: (e: MouseEvent) => void
    constructor(callback: (e: MouseEvent) => void) {
        this.callback = callback.bind(this);
    }

    start() {
        document.addEventListener('click', this.callback);
    }

    stop() {
        document.removeEventListener('click', this.callback);
    }
    // init() {
    //     document.addEventListener('click', (e) => {
    //         const target = e.target as HTMLElement
    //         if (target.classList.contains('b3-dialog__close')) {
    //             const dialog = target.closest('.b3-dialog')
    //             if (dialog) {
    //                 dialog.classList.remove('b3-dialog--open')
    //             }
    //         }
    //     })
    // }
}