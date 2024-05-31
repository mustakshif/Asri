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
const env_1 = __webpack_require__(261);
const scrollbar_1 = __webpack_require__(832);
const trafficLights_1 = __webpack_require__(130);
setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, env_1.addEnvClassNames)();
    (0, scrollbar_1.useSysScrollbar)();
    (0, trafficLights_1.applyTrafficLightPosition)();
    fastdom_1.default.measure(() => {
        var _a;
        const centerWidth = (_a = rsc_1.asriDoms.drag) === null || _a === void 0 ? void 0 : _a.clientWidth;
        if (centerWidth) {
            console.log(`centerWidth: ${centerWidth}`);
        }
    });
    window.destroyTheme = () => {
        (0, env_1.removeEnvClassNames)();
        (0, scrollbar_1.restoreDefaultScrollbar)();
        (0, trafficLights_1.restoreTrafficLightPosition)();
    };
}), 0);


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
const asriDeletedRules = [];
function useSysScrollbar() {
    return __awaiter(this, void 0, void 0, function* () {
        if (rsc_1.environment.isMacOS || rsc_1.environment.isMobile) {
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
function setTrafficLightPosition(x, y = x) {
    if (electron_1.remote) {
        electron_1.remote.getCurrentWindow().setWindowButtonPosition({ x: x, y: y });
    }
}
function applyTrafficLightPosition() {
    if (rsc_1.environment.isMacOS && !rsc_1.environment.isInBrowser)
        setTrafficLightPosition(16);
    if (rsc_1.environment.isMacOS && rsc_1.environment.isMiniWindow)
        setTrafficLightPosition(14);
}
exports.applyTrafficLightPosition = applyTrafficLightPosition;
function restoreTrafficLightPosition() {
    if (rsc_1.environment.isMacOS && !rsc_1.environment.isInBrowser)
        setTrafficLightPosition(8);
    if (rsc_1.environment.isMacOS && rsc_1.environment.isMiniWindow)
        setTrafficLightPosition(8, 13);
}
exports.restoreTrafficLightPosition = restoreTrafficLightPosition;


/***/ }),

/***/ 571:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.remote = void 0;
const rsc_1 = __webpack_require__(49);
exports.remote = (rsc_1.environment.isMobile || rsc_1.environment.isInBrowser) ? null : __webpack_require__(21);


/***/ }),

/***/ 49:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = exports.asriDoms = void 0;
exports.asriDoms = {
    // get as needed
    layouts: () => document.getElementById('layouts'),
    layoutCenter: () => document.querySelector('layout__center'),
    toolbar: () => document.getElementById('toolbar'),
    // load once at init
    status: document.getElementById('status'),
    dockl: document.getElementById('dockLeft'),
    dockr: document.getElementById('dockRight'),
    dockb: document.getElementById('dockBottom'),
    layoutDockl: document.querySelector('.layout__dockl'),
    layoutDockr: document.querySelector('.layout__dockr'),
    layoutDockb: document.querySelector('.layout__dockb'),
    barSync: document.getElementById('barSync'),
    barForward: document.getElementById('barForward'),
    toolbarVIP: document.getElementById('toolbarVIP'),
    drag: document.getElementById('drag'),
    barPlugins: document.getElementById('barPlugins'),
    barSearch: document.getElementById('barSearch'),
    barMode: document.getElementById('barMode')
};
exports.environment = {
    isMacOS: navigator.platform.indexOf("Mac") > -1,
    isLinux: navigator.platform.indexOf("Linux") > -1,
    isMobile: !!document.getElementById('sidebar'),
    isInBrowser: (_a = exports.asriDoms.toolbar()) === null || _a === void 0 ? void 0 : _a.classList.contains('toolbar--browser'), // also applies to iPadOS
    isMiniWindow: document.body.classList.contains('body--window'),
    isAndroid: window.siyuan.config.system.container === "android",
    isIOSApp: (/iOS/i.test(navigator.userAgent) || /iPad/i.test(navigator.userAgent)) && /AppleWebKit/i.test(navigator.userAgent),
    lang: window.siyuan.config.lang,
    supportsOklch: CSS.supports('color', 'oklch(from red calc(l * 0.5) 0 h)'),
};


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