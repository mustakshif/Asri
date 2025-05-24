type EventListenerTarget = HTMLElement | Document | Window | MediaQueryList;

export class AsriEventListener<T extends Event> {
  callback: (e: T) => void;
  constructor(callback: (e: T) => void) {
    this.callback = callback;
  }

  start<E extends EventListenerTarget>(target: E, eventName: string, option = false) {
    target.addEventListener(eventName, this.callback as (e: Event) => void, option);
  }

  remove<E extends EventListenerTarget>(target: E, eventName: string, option = false) {
    target.removeEventListener(eventName, this.callback as (e: Event) => void, option);
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
