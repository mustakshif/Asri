const ua = navigator.userAgent;

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
let _barMore: AsriDomsExtended = null;

export const asriDoms = {
  get layouts() {
    return (_layouts ??= document.getElementById("layouts"));
  },
  get layoutCenter() {
    return (_layoutCenter ??= document.querySelector(".layout__center") as HTMLElement);
  },
  get toolbar() {
    return (_toolbar ??= document.getElementById("toolbar"));
  },
  get dockL() {
    return (_dockL ??= document.getElementById("dockLeft"));
  },
  get dockR() {
    return (_dockR ??= document.getElementById("dockRight"));
  },
  get dockB() {
    return (_dockB ??= document.getElementById("dockBottom"));
  },
  get status() {
    return (_status ??= document.getElementById("status"));
  },
  get layoutDockL() {
    return (_layoutDockL ??= document.querySelector(".layout__dockl") as HTMLElement);
  },
  get layoutDockR() {
    return (_layoutDockR ??= document.querySelector(".layout__dockr") as HTMLElement);
  },
  get layoutDockB() {
    return (_layoutDockB ??= document.querySelector(".layout__dockb") as HTMLElement);
  },
  get barSync() {
    return (_barSync ??= document.getElementById("barSync"));
  },
  get barForward() {
    return (_barForward ??= document.getElementById("barForward"));
  },
  get toolbarVIP() {
    return (_toolbarVIP ??= document.getElementById("toolbarVIP"));
  },
  get drag() {
    return (_drag ??= document.getElementById("drag"));
  },
  get barPlugins() {
    return (_barPlugins ??= document.getElementById("barPlugins"));
  },
  get barSearch() {
    return (_barSearch ??= document.getElementById("barSearch"));
  },
  get barMode() {
    return (_barMode ??= document.getElementById("barMode"));
  },
  get barMore() {
    return (_barMore ??= document.getElementById("barMore"));
  },
};

export const environment = {
  isMacOS: navigator.platform.indexOf("Mac") > -1,
  isWindows: window.siyuan.config.system.os.name === "windows",
  isLinux: navigator.platform.indexOf("Linux") > -1,
  isAndroid: /Android/.test(ua),
  isMobile: !!document.getElementById("sidebar"),
  isInBrowser: !ua.startsWith("SiYuan") || ua.indexOf("iPad") > -1 || (/Android/.test(ua) && !/(?:Mobile)/.test(ua)), // tablets use this too
  isMiniWindow: document.body.classList.contains("body--window"),
  isIOSApp: (/iOS/i.test(ua) || /iPad/i.test(ua)) && /AppleWebKit/i.test(ua) && ua.startsWith("SiYuan/"),
  lang: window.siyuan.config.lang as string,
  supportOklch: CSS.supports("color", "oklch(from red calc(l * 0.5) 0 h)"),
  isReadOnly: window.siyuan.config.readonly as boolean,
  appSchemeMode: window.siyuan.config.appearance.mode > 0 ? "dark" : ("light" as "dark" | "light"),
  isFollowSysMode: window.siyuan.config.appearance.modeOS,
  isSafari: /^((?!chrome|android).)*safari/i.test(ua),
};
