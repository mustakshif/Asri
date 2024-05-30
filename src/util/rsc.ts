export const asriDoms = {
    layouts: document.getElementById('layouts'),
    status: document.getElementById('status'),
    dockl: document.getElementById('dockLeft'),
    dockr: document.getElementById('dockRight'),
    dockb: document.getElementById('dockBottom'),
    layoutDockl: document.querySelector('.layout__dockl'),
    layoutDockr: document.querySelector('.layout__dockr'),
    layoutDockb: document.querySelector('.layout__dockb'),
    toolbar: document.getElementById('toolbar'),
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
    isInBrowser: asriDoms.toolbar?.classList.contains('toolbar--browser'), // iPad uses this too
    isMiniWindow: document.body.classList.contains('body--window'),
    isAndroid: window.siyuan.config.system.container === "android",
    isIOSApp: (/iOS/i.test(navigator.userAgent) || /iPad/i.test(navigator.userAgent)) && /AppleWebKit/i.test(navigator.userAgent),
    lang: window.siyuan.config.lang as string,
    supportsOklch: CSS.supports('color', 'oklch(from red calc(l * 0.5) 0 h)'),
};

export const prefix = 'asri';