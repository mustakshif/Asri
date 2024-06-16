let _layouts: AsriDomsExtended = null;
let _layoutCenter: AsriDomsExtended = null;
let _toolbar: AsriDomsExtended = null;
let _dockL: AsriDomsExtended = null;
let _dockR: AsriDomsExtended = null;
let _dockB: AsriDomsExtended = null;
let _status: AsriDomsExtended = null;
let _layoutDockL: AsriDomsExtended = null;
let _layoutDockR: AsriDomsExtended = null;
let _layoutDockB: AsriDomsExtended = null;
let _barSync: AsriDomsExtended = null;
let _barForward: AsriDomsExtended = null;
let _toolbarVIP: AsriDomsExtended = null;
let _drag: AsriDomsExtended = null;
let _barPlugins: AsriDomsExtended = null;
let _barSearch: AsriDomsExtended = null;
let _barMode: AsriDomsExtended = null;

export const asriDoms = {
    get layouts() { return _layouts ??= document.getElementById('layouts'); },
    get layoutCenter() { return _layoutCenter ??= document.querySelector('.layout__center'); },
    get toolbar() { return _toolbar ??= document.getElementById('toolbar'); },
    get dockL() { return _dockL ??= document.getElementById('dockLeft'); },
    get dockR() { return _dockR ??= document.getElementById('dockRight'); },
    get dockB() { return _dockB ??= document.getElementById('dockBottom'); },
    get status() { return _status ??= document.getElementById('status'); },
    get layoutDockL() { return _layoutDockL ??= document.querySelector('.layout__dockl'); },
    get layoutDockR() { return _layoutDockR ??= document.querySelector('.layout__dockr'); },
    get layoutDockB() { return _layoutDockB ??= document.querySelector('.layout__dockb'); },
    get barSync() { return _barSync ??= document.getElementById('barSync'); },
    get barForward() { return _barForward ??= document.getElementById('barForward'); },
    get toolbarVIP() { return _toolbarVIP ??= document.getElementById('toolbarVIP'); },
    get drag() { return _drag ??= document.getElementById('drag'); },
    get barPlugins() { return _barPlugins ??= document.getElementById('barPlugins'); },
    get barSearch() { return _barSearch ??= document.getElementById('barSearch'); },
    get barMode() { return _barMode ??= document.getElementById('barMode'); },
};

export const environment = {
    isMacOS: navigator.platform.indexOf("Mac") > -1,
    isLinux: navigator.platform.indexOf("Linux") > -1,
    isMobile: !!document.getElementById('sidebar'),
    isInBrowser: navigator.userAgent.toLowerCase().indexOf('electron') === -1, // also applies to iPadOS
    isMiniWindow: document.body.classList.contains('body--window'),
    isAndroid: window.siyuan.config.system.container === "android",
    isIOSApp: (/iOS/i.test(navigator.userAgent) || /iPad/i.test(navigator.userAgent)) && /AppleWebKit/i.test(navigator.userAgent),
    lang: window.siyuan.config.lang as string,
    supportsOklch: CSS.supports('color', 'oklch(from red calc(l * 0.5) 0 h)'),
};

// export const asriClassNames: string[] = [];