export const asriDoms = {
    // get as needed
    layouts: () => document.getElementById('layouts'),
    layoutCenter: () => document.getElementsByClassName('layout__center'),
    toolbar: () => document.getElementById('toolbar'),

    // load once at init
    status: document.getElementById('status'),
    dockl: document.getElementById('dockLeft'),
    dockr: document.getElementById('dockRight'),
    dockb: document.getElementById('dockBottom'),
    layoutDockl: document.getElementsByClassName('.layout__dockl'),
    layoutDockr: document.getElementsByClassName('.layout__dockr'),
    layoutDockb: document.getElementsByClassName('.layout__dockb'),   
    barSync: document.getElementById('barSync'),
    barForward: document.getElementById('barForward'),
    toolbarVIP: document.getElementById('toolbarVIP'),
    drag: document.getElementById('drag'),
    barPlugins: document.getElementById('barPlugins'),
    barSearch: document.getElementById('barSearch'),
    barMode: document.getElementById('barMode')
};

export const environment = {
    isMacOS: navigator.platform.indexOf("Mac") > -1,
    isLinux: navigator.platform.indexOf("Linux") > -1,
    isMobile: !!document.getElementById('sidebar'),
    isInBrowser: asriDoms.toolbar()?.classList.contains('toolbar--browser'), // also applies to iPadOS
    isMiniWindow: document.body.classList.contains('body--window'),
    isAndroid: window.siyuan.config.system.container === "android",
    isIOSApp: (/iOS/i.test(navigator.userAgent) || /iPad/i.test(navigator.userAgent)) && /AppleWebKit/i.test(navigator.userAgent),
    lang: window.siyuan.config.lang as string,
    supportsOklch: CSS.supports('color', 'oklch(from red calc(l * 0.5) 0 h)'),
};