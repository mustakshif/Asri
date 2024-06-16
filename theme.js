/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!(function(win) {

/**
 * FastDom
 *
 * Eliminates layout thrashing
 * by batching DOM read/write
 * interactions.
 *
 * @author Wilson Page <wilsonpage@me.com>
 * @author Kornel Lesinski <kornel.lesinski@ft.com>
 */

'use strict';

/**
 * Mini logger
 *
 * @return {Function}
 */
var debug =  false ? 0 : function() {};

/**
 * Normalized rAF
 *
 * @type {Function}
 */
var raf = win.requestAnimationFrame
  || win.webkitRequestAnimationFrame
  || win.mozRequestAnimationFrame
  || win.msRequestAnimationFrame
  || function(cb) { return setTimeout(cb, 16); };

/**
 * Initialize a `FastDom`.
 *
 * @constructor
 */
function FastDom() {
  var self = this;
  self.reads = [];
  self.writes = [];
  self.raf = raf.bind(win); // test hook
  debug('initialized', self);
}

FastDom.prototype = {
  constructor: FastDom,

  /**
   * We run this inside a try catch
   * so that if any jobs error, we
   * are able to recover and continue
   * to flush the batch until it's empty.
   *
   * @param {Array} tasks
   */
  runTasks: function(tasks) {
    debug('run tasks');
    var task; while (task = tasks.shift()) task();
  },

  /**
   * Adds a job to the read batch and
   * schedules a new frame if need be.
   *
   * @param  {Function} fn
   * @param  {Object} ctx the context to be bound to `fn` (optional).
   * @public
   */
  measure: function(fn, ctx) {
    debug('measure');
    var task = !ctx ? fn : fn.bind(ctx);
    this.reads.push(task);
    scheduleFlush(this);
    return task;
  },

  /**
   * Adds a job to the
   * write batch and schedules
   * a new frame if need be.
   *
   * @param  {Function} fn
   * @param  {Object} ctx the context to be bound to `fn` (optional).
   * @public
   */
  mutate: function(fn, ctx) {
    debug('mutate');
    var task = !ctx ? fn : fn.bind(ctx);
    this.writes.push(task);
    scheduleFlush(this);
    return task;
  },

  /**
   * Clears a scheduled 'read' or 'write' task.
   *
   * @param {Object} task
   * @return {Boolean} success
   * @public
   */
  clear: function(task) {
    debug('clear', task);
    return remove(this.reads, task) || remove(this.writes, task);
  },

  /**
   * Extend this FastDom with some
   * custom functionality.
   *
   * Because fastdom must *always* be a
   * singleton, we're actually extending
   * the fastdom instance. This means tasks
   * scheduled by an extension still enter
   * fastdom's global task queue.
   *
   * The 'super' instance can be accessed
   * from `this.fastdom`.
   *
   * @example
   *
   * var myFastdom = fastdom.extend({
   *   initialize: function() {
   *     // runs on creation
   *   },
   *
   *   // override a method
   *   measure: function(fn) {
   *     // do extra stuff ...
   *
   *     // then call the original
   *     return this.fastdom.measure(fn);
   *   },
   *
   *   ...
   * });
   *
   * @param  {Object} props  properties to mixin
   * @return {FastDom}
   */
  extend: function(props) {
    debug('extend', props);
    if (typeof props != 'object') throw new Error('expected object');

    var child = Object.create(this);
    mixin(child, props);
    child.fastdom = this;

    // run optional creation hook
    if (child.initialize) child.initialize();

    return child;
  },

  // override this with a function
  // to prevent Errors in console
  // when tasks throw
  catch: null
};

/**
 * Schedules a new read/write
 * batch if one isn't pending.
 *
 * @private
 */
function scheduleFlush(fastdom) {
  if (!fastdom.scheduled) {
    fastdom.scheduled = true;
    fastdom.raf(flush.bind(null, fastdom));
    debug('flush scheduled');
  }
}

/**
 * Runs queued `read` and `write` tasks.
 *
 * Errors are caught and thrown by default.
 * If a `.catch` function has been defined
 * it is called instead.
 *
 * @private
 */
function flush(fastdom) {
  debug('flush');

  var writes = fastdom.writes;
  var reads = fastdom.reads;
  var error;

  try {
    debug('flushing reads', reads.length);
    fastdom.runTasks(reads);
    debug('flushing writes', writes.length);
    fastdom.runTasks(writes);
  } catch (e) { error = e; }

  fastdom.scheduled = false;

  // If the batch errored we may still have tasks queued
  if (reads.length || writes.length) scheduleFlush(fastdom);

  if (error) {
    debug('task errored', error.message);
    if (fastdom.catch) fastdom.catch(error);
    else throw error;
  }
}

/**
 * Remove an item from an Array.
 *
 * @param  {Array} array
 * @param  {*} item
 * @return {Boolean}
 */
function remove(array, item) {
  var index = array.indexOf(item);
  return !!~index && !!array.splice(index, 1);
}

/**
 * Mixin own properties of source
 * object into the target.
 *
 * @param  {Object} target
 * @param  {Object} source
 */
function mixin(target, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) target[key] = source[key];
  }
}

// There should never be more than
// one instance of `FastDom` in an app
var exports = win.fastdom = (win.fastdom || new FastDom()); // jshint ignore:line

// Expose to CJS & AMD
if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return exports; }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
else {}

})( typeof window !== 'undefined' ? window : typeof this != 'undefined' ? this : globalThis);


/***/ }),

/***/ 927:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const fastdom_1 = __importDefault(__webpack_require__(551));
const rsc_1 = __webpack_require__(49);
const styles_1 = __webpack_require__(495);
const modules_1 = __webpack_require__(2);
setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, modules_1.loadModules)();
    fastdom_1.default.measure(() => {
        var _a;
        if (rsc_1.asriDoms.layoutCenter) {
            const centerWidth = (_a = rsc_1.asriDoms.layoutCenter) === null || _a === void 0 ? void 0 : _a.clientWidth;
            if (centerWidth) {
                console.log(`centerWidth: ${centerWidth}`);
            }
            else {
                console.log("centerWidth: undefined");
            }
        }
    });
    window.destroyTheme = () => {
        (0, modules_1.unloadModules)();
        (0, styles_1.modeTransition)();
    };
}), 0);


/***/ }),

/***/ 344:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.watchImgExportMo = void 0;
const misc_1 = __webpack_require__(629);
const observers_1 = __webpack_require__(766);
exports.watchImgExportMo = new observers_1.AsriMutationObserver((0, misc_1.debounce)(docBodyMoCallback, 200));
function docBodyMoCallback(mutationList, observer) {
    addExportImgClassName();
}
function addExportImgClassName() {
    document.body.classList.toggle('has-exportimg', !!document.querySelector('[data-key="dialog-exportimage"]'));
}


/***/ }),

/***/ 818:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.destroyDockBg = exports.docklBg = void 0;
const rsc_1 = __webpack_require__(49);
const styles_1 = __webpack_require__(495);
const { isMobile, isMiniWindow } = rsc_1.environment;
function docklBg() {
    const lyt = rsc_1.asriDoms.layoutDockL;
    const dock = rsc_1.asriDoms.dockL;
    if ((0, styles_1.isDockLytPinned)(lyt) && (0, styles_1.isDockLytExpanded)(lyt)) {
        dock === null || dock === void 0 ? void 0 : dock.classList.add('dock-layout-expanded');
        // pushUnique(asriClassNames, '.dock-layout-expanded');
    }
    else {
        dock === null || dock === void 0 ? void 0 : dock.classList.remove('dock-layout-expanded');
    }
    // if (!isSideDockHidden() && !isFloatDockLytHidden(lyt) && isDockLytExpanded(lyt)) {
    //     switch (dir) {
    //         case 'l':
    //             // dock.style.borderRightColor = 'transparent';
    //             dock.style.setProperty('--border-clr', 'transparent');
    //             break;
    //         case 'r':
    //             // dock.style.borderLeftColor = 'transparent';
    //             dock.style.setProperty('--border-clr', 'transparent');
    //             break;
    //     }
    // } else {
    //     dock.style.removeProperty('--border-clr');
    // }
}
exports.docklBg = docklBg;
function destroyDockBg() {
    var _a;
    (_a = document.querySelector('.dock-layout-expanded')) === null || _a === void 0 ? void 0 : _a.classList.remove('dock-layout-expanded');
}
exports.destroyDockBg = destroyDockBg;


/***/ }),

/***/ 261:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.removeEnvClassNames = exports.addEnvClassNames = void 0;
const rsc_1 = __webpack_require__(49);
const envClassifiers = [
    { condition: rsc_1.environment.isMacOS, className: 'body--mac' },
    { condition: rsc_1.environment.isLinux, className: 'body--linux' },
    { condition: rsc_1.environment.isMobile, className: 'body--mobile' },
    { condition: rsc_1.environment.isInBrowser, className: 'body--browser' },
    { condition: rsc_1.environment.isAndroid, className: 'body--android' },
    { condition: rsc_1.environment.isIOSApp, className: 'body--iosApp' },
];
function addEnvClassNames() {
    envClassifiers.forEach(({ condition, className }) => {
        if (condition) {
            document.body.classList.add(className);
        }
    });
}
exports.addEnvClassNames = addEnvClassNames;
function removeEnvClassNames() {
    envClassifiers.forEach(({ className }) => {
        document.body.classList.remove(className);
    });
}
exports.removeEnvClassNames = removeEnvClassNames;


/***/ }),

/***/ 2:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unloadModules = exports.loadModules = void 0;
const eventListeners_1 = __webpack_require__(796);
const dialog_1 = __webpack_require__(344);
const docks_1 = __webpack_require__(818);
const env_1 = __webpack_require__(261);
const scrollbar_1 = __webpack_require__(832);
const trafficLights_1 = __webpack_require__(130);
const asriClickEventListener = new eventListeners_1.AsriEventListener(listenClickEvents);
function loadModules() {
    (0, env_1.addEnvClassNames)();
    (0, scrollbar_1.useSysScrollbar)();
    (0, trafficLights_1.applyTrafficLightPosition)();
    (0, docks_1.docklBg)();
    asriClickEventListener.start(document, 'click');
    dialog_1.watchImgExportMo.observe(document.body, { childList: true });
}
exports.loadModules = loadModules;
function unloadModules() {
    (0, env_1.removeEnvClassNames)();
    (0, scrollbar_1.restoreDefaultScrollbar)();
    (0, trafficLights_1.restoreTrafficLightPosition)();
    (0, docks_1.destroyDockBg)();
    asriClickEventListener.remove(document, 'click');
    dialog_1.watchImgExportMo.disconnect(() => document.body.classList.remove("has-exportimg"));
}
exports.unloadModules = unloadModules;
function listenClickEvents(e) {
    console.log(e);
    (0, docks_1.docklBg)();
}


/***/ }),

/***/ 832:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.restoreDefaultScrollbar = exports.useSysScrollbar = void 0;
const rsc_1 = __webpack_require__(49);
const { isMacOS, isMobile } = rsc_1.environment;
const asriDeletedRules = [];
function useSysScrollbar() {
    return __awaiter(this, void 0, void 0, function* () {
        if (isMacOS || isMobile) {
            for (let i = 0; i < document.styleSheets.length; i++) {
                let styleSheet = document.styleSheets[i];
                try {
                    for (let j = 0; j < styleSheet.cssRules.length; j++) {
                        let rule = styleSheet.cssRules[j];
                        if (rule.selectorText && rule.selectorText.includes('::-webkit-scrollbar')) {
                            if (rule.style.width || rule.style.height || rule.style.backgroundColor) {
                                asriDeletedRules.push({ styleSheet: styleSheet, rule: rule.cssText });
                                styleSheet.deleteRule(j);
                                j--;
                            }
                        }
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
    });
}
exports.useSysScrollbar = useSysScrollbar;
function restoreDefaultScrollbar() {
    return __awaiter(this, void 0, void 0, function* () {
        if (asriDeletedRules) {
            for (let i = 0; i < asriDeletedRules.length; i++) {
                let rule = asriDeletedRules[i];
                rule.styleSheet.insertRule(rule.rule, rule.styleSheet.cssRules.length);
            }
        }
    });
}
exports.restoreDefaultScrollbar = restoreDefaultScrollbar;


/***/ }),

/***/ 130:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.restoreTrafficLightPosition = exports.applyTrafficLightPosition = void 0;
const electron_1 = __webpack_require__(571);
const rsc_1 = __webpack_require__(49);
const { isMacOS, isInBrowser, isMiniWindow } = rsc_1.environment;
function setTrafficLightPosition(x, y = x) {
    if (electron_1.remote) {
        electron_1.remote.getCurrentWindow().setWindowButtonPosition({ x: x, y: y });
    }
}
function applyTrafficLightPosition() {
    if (isMacOS) {
        if (!isInBrowser)
            setTrafficLightPosition(16);
        else if (isMiniWindow)
            setTrafficLightPosition(14);
    }
}
exports.applyTrafficLightPosition = applyTrafficLightPosition;
function restoreTrafficLightPosition() {
    if (isMacOS) {
        if (!isInBrowser)
            setTrafficLightPosition(8);
        else if (isMiniWindow)
            setTrafficLightPosition(8, 13);
    }
}
exports.restoreTrafficLightPosition = restoreTrafficLightPosition;


/***/ }),

/***/ 571:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.remote = void 0;
const rsc_1 = __webpack_require__(49);
exports.remote = (rsc_1.environment.isInBrowser || rsc_1.environment.isMobile) ? null : __webpack_require__(21);


/***/ }),

/***/ 796:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsriEventListener = void 0;
class AsriEventListener {
    constructor(callback) {
        this.callback = callback;
    }
    start(target, eventName) {
        target.addEventListener(eventName, this.callback);
    }
    remove(target, eventName) {
        target.removeEventListener(eventName, this.callback);
    }
}
exports.AsriEventListener = AsriEventListener;


/***/ }),

/***/ 629:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hexToHSL = exports.debounce = exports.pushUnique = void 0;
/**
 * Pushes an item to the array if it is not already present.
 * @param {Array} arr - The array to push the item to.
 * @param {*} item - The item to push to the array.
 */
function pushUnique(arr, item) {
    if (!arr.includes(item)) {
        arr.push(item);
    }
}
exports.pushUnique = pushUnique;
function debounce(func, delay) {
    let timeoutId = null;
    return ((...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
            timeoutId = null;
        }, delay);
    });
}
exports.debounce = debounce;
function hexToHSL(hex) {
    if (!hex) {
        return;
    }
    const r = parseInt(hex.substring(1, 3), 16) / 255;
    const g = parseInt(hex.substring(3, 5), 16) / 255;
    const b = parseInt(hex.substring(5, 7), 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const lightness = (max + min) / 2;
    if (max === min) {
        return {
            h: 0,
            s: 0,
            l: lightness
        };
    }
    let hue = 0;
    const delta = max - min;
    const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    switch (max) {
        case r:
            hue = (g - b) / delta + (g < b ? 6 : 0);
            break;
        case g:
            hue = (b - r) / delta + 2;
            break;
        case b:
            hue = (r - g) / delta + 4;
            break;
    }
    hue /= 6;
    return {
        h: hue,
        s: saturation,
        l: lightness
    };
}
exports.hexToHSL = hexToHSL;


/***/ }),

/***/ 766:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AsriMutationObserver = exports.AsriResizeObserver = void 0;
class AsriResizeObserver {
}
exports.AsriResizeObserver = AsriResizeObserver;
class AsriMutationObserver {
    constructor(callback) {
        this.callback = (mutationList, observer) => callback(mutationList, observer);
        this.mo = new MutationObserver(this.callback);
    }
    observe(target, options) {
        this.mo.observe(target, options);
    }
    disconnect(fn) {
        // const mutations = this.mo.takeRecords();
        // if (mutations) {
        //     this.callback(mutations, this.mo);
        // }
        this.mo.disconnect();
        if (fn)
            fn();
    }
}
exports.AsriMutationObserver = AsriMutationObserver;


/***/ }),

/***/ 49:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = exports.asriDoms = void 0;
let _layouts = null;
let _layoutCenter = null;
let _toolbar = null;
let _dockL = null;
let _dockR = null;
let _dockB = null;
let _status = null;
let _layoutDockL = null;
let _layoutDockR = null;
let _layoutDockB = null;
let _barSync = null;
let _barForward = null;
let _toolbarVIP = null;
let _drag = null;
let _barPlugins = null;
let _barSearch = null;
let _barMode = null;
exports.asriDoms = {
    get layouts() { return _layouts !== null && _layouts !== void 0 ? _layouts : (_layouts = document.getElementById('layouts')); },
    get layoutCenter() { return _layoutCenter !== null && _layoutCenter !== void 0 ? _layoutCenter : (_layoutCenter = document.querySelector('.layout__center')); },
    get toolbar() { return _toolbar !== null && _toolbar !== void 0 ? _toolbar : (_toolbar = document.getElementById('toolbar')); },
    get dockL() { return _dockL !== null && _dockL !== void 0 ? _dockL : (_dockL = document.getElementById('dockLeft')); },
    get dockR() { return _dockR !== null && _dockR !== void 0 ? _dockR : (_dockR = document.getElementById('dockRight')); },
    get dockB() { return _dockB !== null && _dockB !== void 0 ? _dockB : (_dockB = document.getElementById('dockBottom')); },
    get status() { return _status !== null && _status !== void 0 ? _status : (_status = document.getElementById('status')); },
    get layoutDockL() { return _layoutDockL !== null && _layoutDockL !== void 0 ? _layoutDockL : (_layoutDockL = document.querySelector('.layout__dockl')); },
    get layoutDockR() { return _layoutDockR !== null && _layoutDockR !== void 0 ? _layoutDockR : (_layoutDockR = document.querySelector('.layout__dockr')); },
    get layoutDockB() { return _layoutDockB !== null && _layoutDockB !== void 0 ? _layoutDockB : (_layoutDockB = document.querySelector('.layout__dockb')); },
    get barSync() { return _barSync !== null && _barSync !== void 0 ? _barSync : (_barSync = document.getElementById('barSync')); },
    get barForward() { return _barForward !== null && _barForward !== void 0 ? _barForward : (_barForward = document.getElementById('barForward')); },
    get toolbarVIP() { return _toolbarVIP !== null && _toolbarVIP !== void 0 ? _toolbarVIP : (_toolbarVIP = document.getElementById('toolbarVIP')); },
    get drag() { return _drag !== null && _drag !== void 0 ? _drag : (_drag = document.getElementById('drag')); },
    get barPlugins() { return _barPlugins !== null && _barPlugins !== void 0 ? _barPlugins : (_barPlugins = document.getElementById('barPlugins')); },
    get barSearch() { return _barSearch !== null && _barSearch !== void 0 ? _barSearch : (_barSearch = document.getElementById('barSearch')); },
    get barMode() { return _barMode !== null && _barMode !== void 0 ? _barMode : (_barMode = document.getElementById('barMode')); },
};
exports.environment = {
    isMacOS: navigator.platform.indexOf("Mac") > -1,
    isLinux: navigator.platform.indexOf("Linux") > -1,
    isMobile: !!document.getElementById('sidebar'),
    isInBrowser: navigator.userAgent.toLowerCase().indexOf('electron') === -1, // also applies to iPadOS
    isMiniWindow: document.body.classList.contains('body--window'),
    isAndroid: window.siyuan.config.system.container === "android",
    isIOSApp: (/iOS/i.test(navigator.userAgent) || /iPad/i.test(navigator.userAgent)) && /AppleWebKit/i.test(navigator.userAgent),
    lang: window.siyuan.config.lang,
    supportsOklch: CSS.supports('color', 'oklch(from red calc(l * 0.5) 0 h)'),
};
// export const asriClassNames: string[] = [];


/***/ }),

/***/ 495:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isStatusHidden = exports.isFullScreen = exports.isSideDockHidden = exports.isDockLytExpanded = exports.isDockLytPinned = exports.modeTransition = void 0;
const rsc_1 = __webpack_require__(49);
const rsc_2 = __webpack_require__(49);
const electron_1 = __webpack_require__(571);
function modeTransition() {
    document.body.classList.add('asri-mode-transition');
    setTimeout(() => {
        document.body.classList.remove('asri-mode-transition');
    }, 350);
}
exports.modeTransition = modeTransition;
function isDockLytPinned(el) {
    return !!(el && !el.classList.contains('layout--float'));
}
exports.isDockLytPinned = isDockLytPinned;
function isDockLytExpanded(el) {
    return !!(el && el.style.width !== '0px');
}
exports.isDockLytExpanded = isDockLytExpanded;
function isSideDockHidden(dir = 'L') {
    const dock = rsc_1.asriDoms[`dock${dir}`];
    return !!(dock && dock.classList.contains('fn__none'));
    // uses right dock to calculate status bar position: https://github.com/mustakshif/Asri-for-SiYuan/issues/16
}
exports.isSideDockHidden = isSideDockHidden;
// export function isFloatDockLytHidden(el: HTMLElement): boolean {
//     return !isDockLytPinned(el) && el?.style.cssText.includes('transform: translate');
// }
function isFullScreen() {
    return !rsc_2.environment.isInBrowser && electron_1.remote.getCurrentWindow().isFullScreen();
}
exports.isFullScreen = isFullScreen;
function isStatusHidden() {
    return rsc_1.asriDoms.status && rsc_1.asriDoms.status.classList.contains('fn__none');
}
exports.isStatusHidden = isStatusHidden;


/***/ }),

/***/ 21:
/***/ ((module) => {

"use strict";
module.exports = require("@electron/remote");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(927);
/******/ 	
/******/ })()
;