const ua = navigator.userAgent;

// DOM cache using Map for better performance
const domCache = new Map<string, HTMLElement>();

/**
 * Factory function to get DOM elements with caching
 * @param selector - CSS selector or element ID
 * @param useQuerySelector - Whether to use querySelector instead of getElementById
 * @returns Cached DOM element
 */
function getDom(selector: string, useQuerySelector = false): HTMLElement | null {
  if (!domCache.has(selector)) {
    const element = useQuerySelector
      ? document.querySelector(selector) as HTMLElement
      : document.getElementById(selector);
    if (!element) {
      // throw new Error(`DOM element not found: ${selector}`);
      return null;
    }
    domCache.set(selector, element);
  }
  return domCache.get(selector)!;
}

export const asriDoms = {
  get layouts() { return getDom("layouts"); },
  get layoutCenter() { return getDom(".layout__center", true); },
  get toolbar() { return getDom("toolbar"); },
  get dockL() { return getDom("dockLeft"); },
  get dockR() { return getDom("dockRight"); },
  get dockB() { return getDom("dockBottom"); },
  get status() { return getDom("status"); },
  get layoutDockL() { return getDom(".layout__dockl", true); },
  get layoutDockR() { return getDom(".layout__dockr", true); },
  get layoutDockB() { return getDom(".layout__dockb", true); },
  get barSync() { return getDom("barSync"); },
  get barForward() { return getDom("barForward"); },
  get toolbarVIP() { return getDom("toolbarVIP"); },
  get drag() { return getDom("drag"); },
  get barPlugins() { return getDom("barPlugins"); },
  get barSearch() { return getDom("barSearch"); },
  get barMode() { return getDom("barMode"); },
  get barMore() { return getDom("barMore"); },
};

export const environment = {
  isMacOS: navigator.platform.indexOf("Mac") > -1,
  isWindows: window.siyuan.config.system.os === "windows",
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
