<<<<<<< HEAD
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
const misc_1 = __webpack_require__(629);
const modules_1 = __webpack_require__(2);
setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, modules_1.loadAsriJSModules)();
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
        (0, modules_1.unloadAsriJSModules)();
        (0, misc_1.modeTransition)();
    };
}), 0);


/***/ }),

/***/ 344:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.docBodyMoCallback = void 0;
function docBodyMoCallback(mutationList, observer) {
    addExportImgClassName();
}
exports.docBodyMoCallback = docBodyMoCallback;
function addExportImgClassName() {
    document.body.classList.toggle('has-exportimg', !!document.querySelector('[data-key="dialog-exportimage"]'));
}


/***/ }),

/***/ 818:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.destroyDockBg = exports.dockLBg = void 0;
const rsc_1 = __webpack_require__(49);
const state_1 = __webpack_require__(216);
const { isMobile, isMiniWindow } = rsc_1.environment;
let isDockLLytPinnedOld = false, isDockLLytExpandedOld = false;
function dockLBg() {
    const dock = rsc_1.asriDoms.dockL;
    let isDockLLytPinned = (0, state_1.isDockLytPinned)('L'), isDockLLytExpanded = (0, state_1.isDockLytExpanded)('L');
    if (isDockLLytExpanded === isDockLLytExpandedOld && isDockLLytPinned === isDockLLytPinnedOld)
        return;
    if (isDockLLytPinned && isDockLLytExpanded) {
        dock === null || dock === void 0 ? void 0 : dock.classList.add('dock-layout-expanded');
    }
    else {
        dock === null || dock === void 0 ? void 0 : dock.classList.remove('dock-layout-expanded');
    }
    isDockLLytExpandedOld = isDockLLytExpanded;
    isDockLLytPinnedOld = isDockLLytPinned;
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
exports.dockLBg = dockLBg;
function destroyDockBg() {
    var _a;
    (_a = document.querySelector('.dock-layout-expanded')) === null || _a === void 0 ? void 0 : _a.classList.remove('dock-layout-expanded');
}
exports.destroyDockBg = destroyDockBg;


/***/ }),

/***/ 937:
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
exports.removeProtyleWithBgImageOnlyClassName = exports.formatProtyleWithBgImageOnly = void 0;
const rsc_1 = __webpack_require__(49);
function formatProtyleWithBgImageOnly() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let protyleBgs = (_a = rsc_1.asriDoms.layouts) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.protyle .protyle-background');
        protyleBgs === null || protyleBgs === void 0 ? void 0 : protyleBgs.forEach(protyleBg => {
            var _a;
            if (!((_a = protyleBg.querySelector('.protyle-background__img img')) === null || _a === void 0 ? void 0 : _a.classList.contains('fn__none')) && protyleBg.querySelector('.protyle-background__icon.fn__none')) {
                protyleBg.classList.add('without-icon');
            }
            else {
                protyleBg.classList.remove('without-icon');
            }
        });
    });
}
exports.formatProtyleWithBgImageOnly = formatProtyleWithBgImageOnly;
function removeProtyleWithBgImageOnlyClassName() {
    return __awaiter(this, void 0, void 0, function* () {
        document.querySelectorAll('.protyle .protyle-background.without-icon').forEach(el => {
            el.classList.remove('without-icon');
        });
    });
}
exports.removeProtyleWithBgImageOnlyClassName = removeProtyleWithBgImageOnlyClassName;


/***/ }),

/***/ 261:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.removeEnvClassNames = exports.addEnvClassNames = void 0;
const rsc_1 = __webpack_require__(49);
const envClassifiers = [
    { condition: rsc_1.environment.isMacOS, className: 'body-asri--mac' },
    { condition: rsc_1.environment.isLinux, className: 'body-asri--linux' },
    { condition: rsc_1.environment.isMobile, className: 'body-asri--mobile' },
    { condition: rsc_1.environment.isInBrowser, className: 'body-asri--browser' },
    { condition: rsc_1.environment.isAndroid, className: 'body-asri--android' },
    { condition: rsc_1.environment.isIOSApp, className: 'body-asri--iosApp' },
    { condition: rsc_1.environment.isReadOnly, className: 'body-asri--readOnly' }
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
exports.unloadAsriJSModules = exports.loadAsriJSModules = void 0;
const eventListeners_1 = __webpack_require__(796);
const misc_1 = __webpack_require__(629);
const observers_1 = __webpack_require__(766);
const dialog_1 = __webpack_require__(344);
const docks_1 = __webpack_require__(818);
const editor_1 = __webpack_require__(937);
const env_1 = __webpack_require__(261);
const scrollbar_1 = __webpack_require__(832);
const sidepanels_1 = __webpack_require__(844);
const status_1 = __webpack_require__(414);
const trafficLights_1 = __webpack_require__(130);
const globClickEventListener = new eventListeners_1.AsriEventListener(mouseupEvents);
const watchImgExportMo = new observers_1.AsriMutationObserver((0, misc_1.debounce)(dialog_1.docBodyMoCallback, 200));
function loadAsriJSModules() {
    (0, env_1.addEnvClassNames)();
    (0, scrollbar_1.useMacSysScrollbar)();
    (0, trafficLights_1.applyTrafficLightPosition)();
    (0, status_1.setStatusHeightVar)();
    updateStyle();
    globClickEventListener.start(document, 'mouseup');
    watchImgExportMo.observe(document.body, { childList: true });
}
exports.loadAsriJSModules = loadAsriJSModules;
function unloadAsriJSModules() {
    (0, env_1.removeEnvClassNames)();
    (0, scrollbar_1.restoreDefaultSiyuanScrollbar)();
    (0, trafficLights_1.restoreTrafficLightPosition)();
    (0, status_1.removeStatusHeightVar)();
    destroyStyleUpdates();
    globClickEventListener.remove(document, 'mouseup');
    watchImgExportMo.disconnect(() => document.body.classList.remove("has-exportimg"));
}
exports.unloadAsriJSModules = unloadAsriJSModules;
function mouseupEvents(e) {
    // console.log(e);
    updateStyle(e);
}
function updateStyle(e) {
    setTimeout(() => {
        (0, docks_1.dockLBg)();
    }, 0);
    setTimeout(() => {
        (0, sidepanels_1.formatIndentGuidesForFocusedItems)();
        (0, editor_1.formatProtyleWithBgImageOnly)();
    }, 200);
    if (e) {
        console.log(e);
    }
}
function destroyStyleUpdates() {
    (0, docks_1.destroyDockBg)();
    (0, sidepanels_1.removeIndentGuidesFormatClassName)();
    (0, editor_1.removeProtyleWithBgImageOnlyClassName)();
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
exports.restoreDefaultSiyuanScrollbar = exports.useMacSysScrollbar = void 0;
const rsc_1 = __webpack_require__(49);
const { isMacOS, isMobile } = rsc_1.environment;
const asriDeletedRules = [];
function useMacSysScrollbar() {
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
exports.useMacSysScrollbar = useMacSysScrollbar;
function restoreDefaultSiyuanScrollbar() {
    return __awaiter(this, void 0, void 0, function* () {
        if (asriDeletedRules) {
            for (let i = 0; i < asriDeletedRules.length; i++) {
                let rule = asriDeletedRules[i];
                rule.styleSheet.insertRule(rule.rule, rule.styleSheet.cssRules.length);
            }
        }
    });
}
exports.restoreDefaultSiyuanScrollbar = restoreDefaultSiyuanScrollbar;


/***/ }),

/***/ 844:
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
exports.removeIndentGuidesFormatClassName = exports.formatIndentGuidesForFocusedItems = void 0;
const rsc_1 = __webpack_require__(49);
const { isMobile } = rsc_1.environment;
// 可尝试点击后启动 MutationObserver，监测到相关变动后再执行，然后 disconnect
// ...
function formatIndentGuidesForFocusedItems() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isMobile) {
            let listItemsFocus = document.querySelectorAll('.file-tree .b3-list-item--focus');
            document.querySelectorAll('.file-tree .has-focus').forEach(oldUl => oldUl.classList.remove('has-focus'));
            if (listItemsFocus.length === 0)
                return;
            listItemsFocus.forEach(li => {
                if (!li.nextElementSibling || (li.nextElementSibling.tagName !== 'UL' || li.nextElementSibling.classList.contains('fn__none'))) {
                    if (li.parentNode instanceof Element) {
                        li.parentNode.classList.add('has-focus');
                    }
                }
            });
        }
    });
}
exports.formatIndentGuidesForFocusedItems = formatIndentGuidesForFocusedItems;
function removeIndentGuidesFormatClassName() {
    return __awaiter(this, void 0, void 0, function* () {
        document.querySelectorAll('.file-tree .has-focus').forEach(el => el.classList.remove('has-focus'));
    });
}
exports.removeIndentGuidesFormatClassName = removeIndentGuidesFormatClassName;


/***/ }),

/***/ 414:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.removeStatusHeightVar = exports.setStatusHeightVar = void 0;
const fastdom_1 = __importDefault(__webpack_require__(551));
const state_1 = __webpack_require__(216);
function setStatusHeightVar() {
    const statusHeight = (0, state_1.isStatusHidden)() ? 0 : 32;
    fastdom_1.default.mutate(() => {
        document.body.style.setProperty('--status-height', `${statusHeight}px`);
    });
}
exports.setStatusHeightVar = setStatusHeightVar;
function removeStatusHeightVar() {
    document.body.style.removeProperty('--status-height');
}
exports.removeStatusHeightVar = removeStatusHeightVar;
// export function avoidOverlappingWithStatus() {
//     if (!isStatusHidden()) {
//         let layoutTabContainers = doms.layouts?.querySelectorAll('.layout__center .layout-tab-container');
//         let statusRect = doms.status?.getBoundingClientRect();
//         layoutTabContainers?.forEach(layoutTabContainer => {
//             let fileTree = layoutTabContainer.querySelector('.file-tree');
//             if (fileTree && !fileTree.classList.contains('fn__none')) {
//                 let containerRect = layoutTabContainer.getBoundingClientRect();
//                 if (isOverlapping(containerRect, statusRect)) {
//                     layoutTabContainer.style.paddingBottom = '35px'
//                 } else {
//                     layoutTabContainer.style.removeProperty('padding-bottom');
//                 }
//             } else {
//                 layoutTabContainer.style.removeProperty('padding-bottom');
//             }
//         })
//         let searchList = document.getElementById('searchList');
//         let searchPreview = document.getElementById('searchPreview');
//         if (searchList || searchPreview) {
//             let searchListRect = searchList.getBoundingClientRect();
//             let searchPreviewRect = searchPreview.getBoundingClientRect();
//             if (isOverlapping(searchListRect, statusRect)) {
//                 searchList.style.paddingBottom = '35px'
//             } else {
//                 searchList.style.removeProperty('padding-bottom')
//             }
//             if (isOverlapping(searchPreviewRect, statusRect)) {
//                 searchPreview.style.paddingBottom = '35px'
//             } else {
//                 searchPreview.style.removeProperty('padding-bottom')
//             }
//         }
//         // pdfviewer
//         let viewerContainer = document.getElementById('viewerContainer');
//         if (viewerContainer) {
//             let viewerContainerRect = viewerContainer.getBoundingClientRect();
//             if (isOverlapping(viewerContainerRect, statusRect)) {
//                 viewerContainer.style.paddingBottom = '35px';
//             } else {
//                 viewerContainer.style.removeProperty('padding-bottom')
//             }
//         }
//         // flashcard in tabbar
//         asriDoms.layouts?.querySelectorAll('.card__main').forEach(card => {
//             if (card) {
//                 let cardRect = card.getBoundingClientRect();
//                 if (isOverlapping(cardRect, statusRect)) {
//                     card.style.paddingBottom = '35px';
//                 } else {
//                     card.style.removeProperty('padding-bottom')
//                 }
//             }
//         });
//     }
// }


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
    start(target, eventName, option) {
        target.addEventListener(eventName, this.callback, option);
    }
    remove(target, eventName, option) {
        target.removeEventListener(eventName, this.callback, option);
    }
}
exports.AsriEventListener = AsriEventListener;


/***/ }),

/***/ 629:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nodeListsHaveSameElements = exports.isOverlapping = exports.modeTransition = exports.hexToHSL = exports.debounce = exports.pushUnique = void 0;
const fastdom_1 = __importDefault(__webpack_require__(551));
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
function modeTransition() {
    document.body.classList.add('asri-mode-transition');
    setTimeout(() => {
        document.body.classList.remove('asri-mode-transition');
    }, 350);
}
exports.modeTransition = modeTransition;
/**
* Check if two elements have overlapping parts.
*/
function isOverlapping(el1, el2) {
    if (!el1 || !el2) {
        console.warn('isOverlapping called with null element');
        return false;
    }
    let el1Rect, el2Rect;
    if (typeof fastdom_1.default !== 'undefined') {
        fastdom_1.default.measure(() => {
            el1Rect = el1.getBoundingClientRect();
            el2Rect = el2.getBoundingClientRect();
        });
    }
    else {
        el1Rect = el1.getBoundingClientRect();
        el2Rect = el2.getBoundingClientRect();
    }
    if (!el1Rect || !el2Rect) {
        console.error('Failed to get boundingClientRect for one or both elements');
        return false;
    }
    try {
        return isRectOverlapping(el1Rect, el2Rect);
    }
    catch (error) {
        console.error('Error checking if rectangles are overlapping:', error);
        return false;
    }
}
exports.isOverlapping = isOverlapping;
function isRectOverlapping(elementRect, targetRect) {
    let result = false;
    if (elementRect && targetRect) {
        result = (elementRect.right > targetRect.left &&
            elementRect.bottom > targetRect.top &&
            elementRect.left < targetRect.left + targetRect.width &&
            elementRect.top < targetRect.top + targetRect.height);
    }
    return result;
}
function nodeListsHaveSameElements(list1, list2) {
    if (!list1 || !list2) {
        return false;
    }
    const set1 = new Set(list1);
    const set2 = new Set(list2);
    if (set1.size !== set2.size) {
        return false;
    }
    for (const item of set1) {
        if (!set2.has(item)) {
            return false;
        }
    }
    // console.log(list1+' and '+list2 + ' have same elements');
    return true;
}
exports.nodeListsHaveSameElements = nodeListsHaveSameElements;


/***/ }),

/***/ 766:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MOConfigForClassNames = exports.AsriMutationObserver = exports.AsriResizeObserver = void 0;
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
exports.MOConfigForClassNames = {
    attributes: true, // 监视属性变化
    subtree: true, // 包含目标节点的后代节点
    attributeFilter: ['class'] // 只关注"class"属性的变化
};


/***/ }),

/***/ 49:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = exports.asriDoms = void 0;
const ua = navigator.userAgent;
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
    isAndroid: /Android/.test(ua),
    isMobile: !!document.getElementById('sidebar'),
    isInBrowser: !ua.startsWith("SiYuan") || ua.indexOf("iPad") > -1 || (/Android/.test(ua) && !/(?:Mobile)/.test(ua)), // tablets use this too
    isMiniWindow: document.body.classList.contains('body--window'),
    isIOSApp: (/iOS/i.test(ua) || /iPad/i.test(ua)) && /AppleWebKit/i.test(ua) && ua.startsWith("SiYuan/"),
    lang: window.siyuan.config.lang,
    supportsOklch: CSS.supports('color', 'oklch(from red calc(l * 0.5) 0 h)'),
    isReadOnly: window.siyuan.config.readonly
};


/***/ }),

/***/ 216:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isStatusHidden = exports.isFullScreen = exports.hasDockb = exports.isDockHidden = exports.isDockLytExpanded = exports.isDockLytPinned = void 0;
const electron_1 = __webpack_require__(571);
const rsc_1 = __webpack_require__(49);
// docks and panels
function isDockLytPinned(dir) {
    const dockLayoutEl = rsc_1.asriDoms[`layoutDock${dir}`];
    return !!(dockLayoutEl && !dockLayoutEl.classList.contains('layout--float'));
}
exports.isDockLytPinned = isDockLytPinned;
function isDockLytExpanded(dir) {
    const dockLayoutEl = rsc_1.asriDoms[`layoutDock${dir}`];
    let size;
    if (!dockLayoutEl)
        return false;
    if (dir === 'B') {
        size = dockLayoutEl.style.height;
    }
    else {
        size = dockLayoutEl.style.width;
    }
    return !!(size && size !== '0px');
}
exports.isDockLytExpanded = isDockLytExpanded;
function isDockHidden(dir = 'L') {
    const dock = rsc_1.asriDoms[`dock${dir}`];
    return !!(dock && dock.classList.contains('fn__none'));
    // uses right dock to calculate status bar position: https://github.com/mustakshif/Asri/issues/16
}
exports.isDockHidden = isDockHidden;
// export function isFloatDockLytHidden(el: HTMLElement): boolean {
//     return !isDockLytPinned(el) && el?.style.cssText.includes('transform: translate');
// }
// bottom dock
function hasDockb() {
    return !!(rsc_1.asriDoms.dockB && !rsc_1.asriDoms.dockB.classList.contains('fn__none'));
}
exports.hasDockb = hasDockb;
// export function isLytDockbFloating() {
//     let result = false;
//     if (!env.isMobile) {
//         const layouts = doms.layouts;
//         const lytDockb = layouts?.querySelector('.layout__dockb') as AsriDomsExtended;
//         result = !!(layouts && lytDockb?.classList.contains('layout--float') && lytDockb?.style.height !== "0px");
//     }
//     return result;
// }
// fullscreen state in macOS
function isFullScreen() {
    return !!(electron_1.remote && electron_1.remote.getCurrentWindow().isFullScreen());
}
exports.isFullScreen = isFullScreen;
// status bar
function isStatusHidden() {
    return !!(rsc_1.asriDoms.status && rsc_1.asriDoms.status.classList.contains('fn__none'));
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
=======
!function(){const u={layouts:document.getElementById("layouts"),status:document.getElementById("status"),dockl:document.getElementById("dockLeft"),dockr:document.getElementById("dockRight"),dockb:document.getElementById("dockBottom"),layoutDockl:document.querySelector(".layout__dockl"),layoutDockr:document.querySelector(".layout__dockr"),layoutDockb:document.querySelector(".layout__dockb"),toolbar:document.getElementById("toolbar"),barSync:document.getElementById("barSync"),barForward:document.getElementById("barForward"),toolbarVIP:document.getElementById("toolbarVIP"),drag:document.getElementById("drag"),barPlugins:document.getElementById("barPlugins"),barSearch:document.getElementById("barSearch"),barMode:document.getElementById("barMode"),barMore:document.getElementById("barMore")},t=navigator.userAgent,d=-1<navigator.platform.indexOf("Mac"),c=-1<navigator.platform.indexOf("Linux");var e=/Android/.test(t),n=e&&!/(?:Mobile)/.test(t);const r=!!document.getElementById("sidebar")&&!n,l=!t.startsWith("SiYuan")||-1<t.indexOf("iPad")||n,a=document.body.classList.contains("body--window"),o=(/iOS/i.test(t)||/iPad/i.test(t))&&/AppleWebKit/i.test(t)&&t.startsWith("SiYuan/");n=window.siyuan.config.readonly;const s=window.siyuan.config.lang,R=CSS.supports("color","oklch(from red calc(l * 0.5) 0 h)"),m=[],i=[],b=[],p=(d&&(document.body.classList.add("body-asri--mac"),m.push(".body-asri--mac")),c&&(document.body.classList.add("body-asri--linux"),m.push(".body-asri--linux")),r&&(document.body.classList.add("body-asri--mobile"),m.push(".body-asri--mobile")),l&&(document.body.classList.add("body-asri--browser"),m.push(".body-asri--browser")),e&&(document.body.classList.add("body-asri--android"),m.push(".body-asri--android")),o&&(document.body.classList.add("body-asri--iosApp"),m.push(".body-asri--iosApp")),n&&(document.body.classList.add("body-asri--readOnly"),m.push(".body-asri--readOnly")),!r&&u.toolbar&&(x("AsriPluginsIconsDivider",void 0,u.drag),d&&!l?x("AsriTopbarLeftSpacing",void 0,u.barSync):x("AsriTopbarLeftSpacing",void 0,u.barForward),d||l?x("AsriTopbarRightSpacing"):x("AsriTopbarRightSpacing",u.barSearch)),document.getElementById("AsriPluginsIconsDivider")),N=document.getElementById("AsriTopbarLeftSpacing"),$=document.getElementById("AsriTopbarRightSpacing"),f=u.toolbar,H=document.createElementNS("http://www.w3.org/2000/svg","svg");function h(t,o){t.includes(o)||t.push(o)}$?.appendChild(H.cloneNode(!0)),p?.appendChild(H.cloneNode(!0)),N?.appendChild(H.cloneNode(!0));const _={followSysAccentColor:"1",chroma:"1",userCustomColor:""},g={zh_CN:{followSysAccent:"跟随系统强调色",pickColor:"自定义主题色",asriChroma:"色度："},zh_CHT:{followSysAccent:"跟隨系統強調色",pickColor:"自定義主題色",asriChroma:"色度："},en_US:{followSysAccent:"Follow system accent color",pickColor:"Customize theme color",asriChroma:"Chroma: "}},Y=("zh_CN"===s||"zh_CHT"===s?g[s]:g.en_US).asriChroma;let j,y,q,B;{async function w(){await async function(t,o,e=!1,n=Date.now()){o=new Blob([o]),o=new File([o],t.split("/").pop());let i=new FormData;i.append("path",t),i.append("file",o),i.append("isDir",e),i.append("modTime",n);const a=await fetch("/api/file/putFile",{body:i,method:"POST",headers:{Authorization:"Token ''"}});return 200===a.status?a.json():null}("/data/snippets/Asri.config.json",JSON.stringify(_,void 0,4))}function V(){let n,i,a;setTimeout(()=>{if(!document.querySelector(".asri-config")){const o=document.querySelector('#commonMenu[data-name="barmode"] .b3-menu__items');if(o){var t=`<button class="b3-menu__separator asri-config"></button><button class="b3-menu__item asri-config" id="pickColor"><svg class="b3-menu__icon"></svg><label for="asriColorPicker" class="be-menu__label">${("zh_CN"===s||"zh_CHT"===s?g[s]:g.en_US).pickColor}</label><input id="asriColorPicker" type="color" value="${_.userCustomColor}"></button><button class="b3-menu__item asri-config" id="followSysAccent"><svg class="b3-menu__icon"></svg><label for="" class="be-menu__label">${("zh_CN"===s||"zh_CHT"===s?g[s]:g.en_US).followSysAccent}</label></button><button class="b3-menu__item asri-config" data-type="nobg" id="asriChroma"><svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"d="m19 11l-8-8l-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0zM5 2l5 5m-8 6h15m5 7a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4c.3 1.6 2 2.4 2 4" /></svg><div aria-label="${Y+a?.value||"1"}"class="b3-tooltips b3-tooltips__n"><input style="box-sizing: border-box" type="range" id="asriChromaSlider" class="b3-slider fn__block" min="0"max="5" step="0.1" value="1"></div></button>`,t=document.createRange().createContextualFragment(t);o.appendChild(t),h(m,".asri-config"),n=document.getElementById("followSysAccent"),i=document.getElementById("pickColor"),a=document.getElementById("asriChromaSlider"),colorPicker=i.lastElementChild,n.classList.toggle("b3-menu__item--selected",y),i.classList.toggle("b3-menu__item--selected",!y),a.value=_.chroma||"1",a.parentElement.ariaLabel=Y+_.chroma,l||r||c?n.classList.add("fn__none"):n.addEventListener("click",()=>{y?(y=!1,n.classList.remove("b3-menu__item--selected"),i.classList.add("b3-menu__item--selected"),document.documentElement.style.setProperty("--asri-user-custom-accent",_.userCustomColor||j||"#3478f6"),v(_.chroma),_.followSysAccentColor="0"):(y=!0,n.classList.add("b3-menu__item--selected"),i.classList.remove("b3-menu__item--selected"),document.documentElement.style.removeProperty("--asri-user-custom-accent"),_.followSysAccentColor="1",J()),w()}),i.addEventListener("click",()=>{y&&(y=!1,n.classList.remove("b3-menu__item--selected"),i.classList.add("b3-menu__item--selected"),document.documentElement.style.setProperty("--asri-user-custom-accent",_.userCustomColor),v(_.chroma),_.userCustomColor=_.userCustomColor,_.followSysAccentColor="0",w())}),colorPicker.addEventListener("input",()=>{document.documentElement.style.setProperty("--asri-user-custom-accent",colorPicker.value)}),colorPicker.addEventListener("change",()=>{n.classList.remove("b3-menu__item--selected"),i.classList.add("b3-menu__item--selected"),_.userCustomColor=colorPicker.value,y=!1,_.followSysAccentColor="0",w()});const e=pt(()=>w(),200);a.addEventListener("input",function(){var t=this.value;document.documentElement.style.setProperty("--asri-c-factor",t),this.parentElement.ariaLabel=Y+t,_.chroma=t,q="0"===t,v(t),e()})}}},0)}function J(){if(!(l||r||c)){const e=require("@electron/remote").systemPreferences.getAccentColor();var t="#"+e.slice(0,6),o=function(o){if(o){var e=parseInt(o.substring(1,3),16)/255,n=parseInt(o.substring(3,5),16)/255,i=parseInt(o.substring(5,7),16)/255,o=Math.max(e,n,i),a=Math.min(e,n,i),c=(o+a)/2;if(o===a)return{h:0,s:0,l:c};let t;var r=o-a,a=.5<c?r/(2-o-a):r/(o+a);switch(o){case e:t=(n-i)/r+(n<i?6:0);break;case n:t=(i-e)/r+2;break;case i:t=(e-n)/r+4}return{h:t/=6,s:a,l:c}}}(t);j!==t&&(document.documentElement.style.setProperty("--asri-sys-accent",t),.28<o.s?document.documentElement.style.setProperty("--asri-sys-accent-accessible",t):document.documentElement.style.removeProperty("--asri-sys-accent-accessible"),B=0===o.s,document.body.classList.add("asri-mode-transition"),setTimeout(()=>{document.body.classList.remove("asri-mode-transition")},350),j=t),y&&v(o.s)}}o||(async function(){await async function(t){try{var o=await fetch("/api/file/getFile",{method:"POST",headers:{Authorization:"Token ''"},body:JSON.stringify({path:t})});return 200===o.status?o:null}catch(t){return console.error("An error occurred while fetching the file:",t),null}}("/data/snippets/Asri.config.json").then(t=>t&&200===t.status?t.json():null).then(t=>{y=Number(t?.followSysAccentColor||_.followSysAccentColor),_.followSysAccentColor=t?.followSysAccentColor||"1",_.chroma=t?.chroma||"1",_.userCustomColor=t?.userCustomColor||"#3478f6"})}().then(()=>{R&&(!(l||r||c)&&y?document.documentElement.style.removeProperty("--asri-user-custom-accent"):document.documentElement.style.setProperty("--asri-user-custom-accent",_.userCustomColor),document.documentElement.style.setProperty("--asri-c-factor",_.chroma),q="0"===_.chroma,v(_.chroma),J(),V())}),R&&u.barMode?.addEventListener("click",V))}function v(t){"0"===(chromaValue=String(t))||y&&B||q?document.documentElement.style.setProperty("--asri-c-0","0"):document.documentElement.style.removeProperty("--asri-c-0")}function k(t,o=t){require("@electron/remote").getCurrentWindow().setWindowButtonPosition({x:t,y:o})}if(d&&!l&&k(16),d&&a&&k(14),d||r)for(let t=0;t<document.styleSheets.length;t++){let e=document.styleSheets[t];try{for(let o=0;o<e.cssRules.length;o++){let t=e.cssRules[o];t.selectorText&&t.selectorText.includes("::-webkit-scrollbar")&&(t.style.width||t.style.height||t.style.backgroundColor)&&(i.push({styleSheet:e,rule:t.cssText}),e.deleteRule(o),o--)}}catch(t){console.log(t)}}function x(o,e=void 0,n=void 0){if(!document.getElementById(o)){let t=document.createElement("div");t.id=o,e?u.toolbar.insertBefore(t,e):n?u.toolbar.insertBefore(t,n.nextSibling):u.toolbar.appendChild(t)}}let U=!1,X,K,W,T=u.drag?.getBoundingClientRect().left,S=u.drag?.getBoundingClientRect().right,E=u.toolbar?.getBoundingClientRect(),C=!1;function G(){pt(()=>{C=u.toolbar.scrollWidth>u.toolbar.clientWidth+2,u.barMore.classList.contains("fn__none")||(C=!0)},200)()}function Q(){U=!0,G(),clearTimeout(X),X=setTimeout(function(){if(a)P(),setTimeout(()=>{z()},200);else{if(U=!1,d){let t=document.querySelector("#AsriTopbarLeftSpacing");W=!l&&require("@electron/remote").getCurrentWindow().isFullScreen()?(document.body.classList.add("body--fullscreen"),T-=W?0:88,!0):(document.body.classList.remove("body--fullscreen"),t?.style.setProperty("width","0px"),T=u.drag?.getBoundingClientRect().left,t.style.removeProperty("width"),!1)}A(void 0,C),P(),tt(C),setTimeout(()=>{z()},200)}},200)}function A(r,s){if(!a){let t,o,e,n=(t=u.layouts.querySelector(".layout__center")?.getBoundingClientRect(),$.getBoundingClientRect(),o=u.barSync.getBoundingClientRect(),barForwardRect=u.barForward.getBoundingClientRect(),window.innerWidth),i=t.left,a=t.right,c=u.barSearch.getBoundingClientRect().left;U?S+=r:(i>T+8?(f.style.setProperty("--topbar-left-spacing",0),T=W?T:u.drag.getBoundingClientRect().left,N.classList.remove("asri-expanded")):(d&&!l?f.style.setProperty("--topbar-left-spacing",i-o.right+4+"px"):f.style.setProperty("--topbar-left-spacing",i-barForwardRect.right+4+"px"),N.classList.add("asri-expanded")),a<S-8&&!s?(f.style.setProperty("--topbar-right-spacing",0),S=u.drag.getBoundingClientRect().right,u.dockr?.style.removeProperty("--avoid-topbar"),u.layoutDockr?.style.removeProperty("--avoid-topbar")):d||l?(f.style.setProperty("--topbar-right-spacing",window.innerWidth-a+1+"px"),u.dockr?.style.setProperty("--avoid-topbar","4px"),u.layoutDockr?.style.setProperty("--avoid-topbar","4px")):(f.style.setProperty("--topbar-right-spacing",c-a+6+"px"),u.dockr?.style.setProperty("--avoid-topbar","calc(var(--toolbar-height) - 6px)"),u.layoutDockr?.style.setProperty("--avoid-topbar","calc(var(--toolbar-height) - 6px)"))),a<S-8?(p.style.setProperty("--container-bg","var(--b3-list-hover)"),p.style.left=a+"px",p.style.right="0",p.style.removeProperty("height"),p.style.removeProperty("top")):(e=u.drag.getBoundingClientRect(),p.style.setProperty("--container-bg","var(--b3-border-color-trans)"),p.style.left=e.right-10+"px",p.style.right=n-e.right+8+"px",p.style.height="21px",p.style.top="13.5px")}}let Z=[];function P(){Z=u.layouts.querySelectorAll('[data-type="wnd"]')}function tt(){a||Z.forEach(t=>{let o=t.querySelector('.fn__flex-column[data-type="wnd"] > .fn__flex:first-child');var e,n,t=o.getBoundingClientRect(),i=u.drag.getBoundingClientRect();I(t,i)||I(t,E)?(e=t.left<i.left?i.left-t.left-4:0,n=t.right>i.right?t.right-i.right+8:0,o.style.paddingLeft=e+"px",o.style.paddingRight=n+"px",t.right-n-240<i.left&&t.left<i.left||t.left+e+240>i.right&&t.right>i.right?(o.style.paddingTop="42px",o.style.paddingLeft=0,o.style.paddingRight=0):o.style.removeProperty("padding-top")):(o.style.removeProperty("padding-left"),o.style.removeProperty("padding-right"))})}function z(){Z.forEach(t=>{let o=t.querySelector(".file-tree")?[]:t.querySelectorAll(".protyle-wysiwyg");0<o.length&&setTimeout(()=>{o.forEach(t=>{var o=t.style.paddingLeft;o!==t.dataset.prevpadding&&(t.style.setProperty("--protyle-spacing",o),t.dataset.prevpadding=o)})},300)})}if(!r){if(setTimeout(A,200),!a){let e=u.layouts.querySelector(".layout__center");const O=new ResizeObserver(t=>{for(var o of t){var e,n=o.contentBoxSize[0]["inlineSize"];o.target.dataset.prevWidth?(e=n-parseFloat(o.target.dataset.prevWidth),o.target.dataset.prevWidth=n,P(),G(),clearTimeout(K),K=setTimeout(()=>{st(),z()},200),A(e,C),tt(C),D()):o.target.dataset.prevWidth=n}});if(e)O.observe(e),b.push(O);else{let t=0,o;function ot(){u.layouts=document.getElementById("layouts"),e=u.layouts.querySelector(".layout__center"),10!==++t&&!e||(clearInterval(o),O.observe(e),b.push(O))}setTimeout(()=>{o=setInterval(ot,1e3)},0)}}window.addEventListener("resize",Q)}function et(t="l"){return u["dock"+t]&&u["dock"+t].classList.contains("fn__none")}function nt(){return u.dockb&&!u.dockb.classList.contains("fn__none")}function it(){var t=nt(),o=function(){if(!r){const t=u.layouts,o=t.querySelector(".layout__dockb");return t&&o?.classList.contains("layout--float")&&"0px"!==o?.style.height}}();u.toolbar?.nextElementSibling.classList.toggle("has-dockb",t),u.toolbar?.nextElementSibling.classList.toggle("has-layout-dockb-float",o),u.dockb?.classList.toggle("has-layout-dockb-float",o),h(m,".has-dockb"),h(m,".has-layout-dockb-float")}function at(){return u.status&&u.status.classList.contains("fn__none")}function ct(t){return t&&!t.classList.contains("layout--float")}function rt(t){return"0px"!==t?.style.width}function D(){if(u.dockl&&!r&&!a)for(var e of["l","r"]){let t=u["layoutDock"+e],o=u["dock"+e];if(ct(t)&&rt(t)?(o.classList.add("dock-layout-expanded"),h(m,".dock-layout-expanded")):o.classList.remove("dock-layout-expanded"),!et()&&(ct(n=t)||!n?.style.cssText.includes("transform: translate"))&&rt(t))switch(e){case"l":case"r":o.style.setProperty("--border-clr","transparent")}else o.style.removeProperty("--border-clr")}var n}function st(){function t(t,o){u.status.style.transform=`translate(${t}px, ${o}px)`}var o,e,n,i;r||a||(nt()?(u.status?.style.removeProperty("max-width"),u.status?.style.removeProperty("transform")):(n=u.layouts.querySelector(".layout__center"))&&u.layoutDockr&&!u.status.classList.contains(".fn__none")&&(o=u.layoutDockr.clientWidth,n=n.clientWidth,u.layoutDockb=u.layouts.querySelector(".layout__dockb"),e=u.layoutDockb&&!u.layoutDockb.classList.contains(".fn__none")&&ct(u.layoutDockb)?-1*u.layoutDockb.clientHeight:0,u.status.style.maxWidth=n-12+"px",n=et("r"),i=function(t){let o=u["layoutDock"+t];return o&&(o.classList.contains("layout--float")||o.style.cssText.includes("width: 0px"))}("r"),n&&i?t(0,e):!n&&i?t(-40,e):n||i?n&&!i&&t(-1*o,e):t(-1*(o+40),e),u.status=document.getElementById("status")))}function ut(){at()?document.body.style.setProperty("--status-height","0px"):document.body.style.setProperty("--status-height","32px")}function M(){if(!at()){let t=u.layouts?.querySelectorAll(".layout__center .layout-tab-container"),e=u.status.getBoundingClientRect(),o=(t?.forEach(t=>{let o=t.querySelector(".file-tree");o&&!o.classList.contains("fn__none")&&I(t.getBoundingClientRect(),e)?t.style.paddingBottom="35px":t.style.removeProperty("padding-bottom")}),document.getElementById("searchList")),n=document.getElementById("searchPreview");var a,c;(o||n)&&(a=o.getBoundingClientRect(),c=n.getBoundingClientRect(),I(a,e)?o.style.paddingBottom="35px":o.style.removeProperty("padding-bottom"),I(c,e)?n.style.paddingBottom="35px":n.style.removeProperty("padding-bottom"));let i=document.getElementById("viewerContainer");i&&(I(i.getBoundingClientRect(),e)?i.style.paddingBottom="35px":i.style.removeProperty("padding-bottom")),u.layouts?.querySelectorAll(".card__main").forEach(t=>{t&&(I(t.getBoundingClientRect(),e)?t.style.paddingBottom="35px":t.style.removeProperty("padding-bottom"))})}}function I(t,o){return t&&o&&(t.right>o.left&&t.bottom>o.top&&t.left<o.left+o.width&&t.top<o.top+o.height)}function dt(){if(!r){let t=document.querySelectorAll(".file-tree .b3-list-item--focus");document.querySelectorAll(".file-tree .has-focus").forEach(t=>t.classList.remove("has-focus")),t.forEach(t=>{t.nextElementSibling&&"UL"===t.nextElementSibling.tagName&&!t.nextElementSibling.classList.contains("fn__none")||(t.parentNode.classList.add("has-focus"),h(m,".has-focus"))})}}function lt(e,n){return new MutationObserver(function(t,o){t.forEach(t=>{t.type===e&&n(t,o)})})}function mt(e,n=void 0,i=void 0){return new MutationObserver(function(t,o){t.forEach(t=>{e&&"childList"===t.type?e(t,o):n&&"attributes"===t.type?n(t,o):i&&"characterData"===t.type&&i(t,o)})})}function bt(e,t,o=void 0,n=void 0,i=!1){let a={},c=(t&&(a.childList=!0),o&&(a.attributes=!0),n&&(a.characterData=!0),t&&i&&(a.subtree=!0),u["layoutDock"+e]),r=mt(t,o,n);if(c)r.observe(c,a),b.push(r);else{let t=0,o;function s(){c=u.layouts.querySelector(".layout__dock"+e),10!==++t&&!c||(clearInterval(o),u["layoutDock"+e]=c,D(),r.observe(c,a),b.push(r))}setTimeout(()=>{o=setInterval(s,1e3)},0)}}it(),D(),ut(),M(),dt();{var[e,n=void 0,L=!1]=[()=>{document.body.classList.toggle("has-exportimg",document.querySelector('[data-key="dialog-exportimage"]')),h(m,".has-exportimg")}];let t={},o=(e&&(t.childList=!0),n&&(t.attributes=!0),e&&L&&(t.subtree=!0),mt(e,n));o.observe(document.body,t),b.push(o)}if(!r&&!a){bt("l",void 0,()=>{setTimeout(()=>{M()},200),D()}),bt("r",void 0,()=>{setTimeout(()=>{M()},200),D()});{L="attributes";e=ut;n=u.status;let t=lt(L,e);n&&(t.observe(n,{[L]:!0}),b.push(t))}}function pt(o,e){let n=null;return(...t)=>{n&&clearTimeout(n),n=setTimeout(()=>{o(...t)},e)}}function F(){r||setTimeout(()=>{G(),P();{let t=document.querySelector("#AsriTopbarLeftSpacing"),o=document.querySelector("#AsriTopbarRightSpacing");t?.style.setProperty("width","0px"),o?.style.setProperty("width","0px"),T=u.drag?.getBoundingClientRect().left,S=u.drag?.getBoundingClientRect().right,t?.style.removeProperty("width"),o?.style.removeProperty("width")}A(void 0,C),tt(C),z(),dt();{let t=u.layouts?.querySelectorAll(".protyle .protyle-background");t.forEach(t=>{!t.querySelector(".protyle-background__img img")?.classList.contains("fn__none")&&t.querySelector(".protyle-background__icon.fn__none")?(t.classList.add("without-icon"),h(m,".without-icon")):t.classList.remove("without-icon")})}M(),it(),st(),!o&&y&&R&&J()},200)}function ft(t){"Control"!==t.key&&"Alt"!==t.key&&"Shift"!==t.key&&"Meta"!==t.key||F()}function ht(t){document.body.style.setProperty("--mouseX",t.clientX+"px"),document.body.style.setProperty("--mouseY",t.clientY+"px")}F(),window.addEventListener("mouseup",F),window.addEventListener("dragend",F),window.addEventListener("keyup",ft),window.addEventListener("dblclick",ht),window.destroyTheme=()=>{if(window.removeEventListener("mouseup",F),window.removeEventListener("keyup",ft),window.removeEventListener("dragend",F),window.removeEventListener("dblclick",ht),window.removeEventListener("resize",Q),u.barMode?.removeEventListener("click",V),b.forEach(t=>t.disconnect()),d&&!l&&k(8),d&&a&&k(8,13),m.forEach(o=>{document.querySelectorAll(o).forEach(t=>t.classList.remove(o.slice(1)))}),document.querySelector("#AsriTopbarLeftSpacing")?.remove(),document.querySelector("#AsriTopbarRightSpacing")?.remove(),document.querySelector("#AsriPluginsIconsDivider")?.remove(),document.body.style.removeProperty("--mouseX"),document.body.style.removeProperty("--mouseY"),document.body.style.removeProperty("--status-height"),document.documentElement.style.removeProperty("--asri-sys-accent"),document.documentElement.style.removeProperty("--asri-sys-accent-accessible"),document.documentElement.style.removeProperty("--asri-sys-accent-grayscale"),document.documentElement.style.removeProperty("--asri-user-custom-accent"),document.documentElement.style.removeProperty("--asri-c-factor"),document.documentElement.style.removeProperty("--asri-c-0"),document.querySelectorAll(".dock").forEach(t=>{t.style.removeProperty("--border-clr")}),setTimeout(()=>{u.toolbar?.style.removeProperty("--topbar-left-spacing"),u.toolbar?.style.removeProperty("--topbar-right-spacing"),u.dockr?.style.removeProperty("--avoid-topbar"),u.layoutDockr?.style.removeProperty("--avoid-topbar"),u.status?.style.removeProperty("max-width"),u.status?.style.removeProperty("transform");const t=document.body.querySelectorAll('[data-type="wnd"]'),o=(t.forEach(t=>{const o=t.firstElementChild,e=t.querySelectorAll(".protyle-wysiwyg");o?.style.removeProperty("padding-left"),o?.style.removeProperty("padding-right"),o?.style.removeProperty("padding-top"),e.forEach(t=>{t.style.removeProperty("--protyle-spacing"),t.dataset.prevpadding=void 0})}),u.layouts?.querySelectorAll(".layout__center .layout-tab-container"));o.forEach(t=>{t.style.removeProperty("padding-bottom")})},200),document.getElementById("searchList")?.style.removeProperty("padding-bottom"),document.getElementById("searchPreview")?.style.removeProperty("padding-bottom"),document.getElementById("viewerContainer")?.style.removeProperty("padding-bottom"),u.layouts.querySelectorAll(".card__main").forEach(t=>{t.style.removeProperty("padding-bottom")}),i)for(let o=0;o<i.length;o++){let t=i[o];t.styleSheet.insertRule(t.rule,t.styleSheet.cssRules.length)}document.body.classList.add("asri-mode-transition"),setTimeout(()=>{document.body.classList.remove("asri-mode-transition")},350)}}();
>>>>>>> 20b70a5bd33df9d86e8e29dd83c608b5d29ede64
