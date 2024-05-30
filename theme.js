/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 13:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<button class=\"b3-menu__separator asri-config\"></button> <button class=\"b3-menu__item asri-config\" id=\"pickColor\"> <svg class=\"b3-menu__icon\"></svg> <label for=\"asriColorPicker\" class=\"be-menu__label\">${(lang === 'zh_CN' || lang === 'zh_CHT') ? i18nMenuItems[lang]['pickColor'] : i18nMenuItems['en_US']['pickColor']} </label> <input id=\"asriColorPicker\" type=\"color\" value=\"${asriConfigs.userCustomColor}\"> </button> <button class=\"b3-menu__item asri-config\" id=\"followSysAccent\"> <svg class=\"b3-menu__icon\"></svg> <label for=\"\" class=\"be-menu__label\">${(lang === 'zh_CN' || lang === 'zh_CHT') ? i18nMenuItems[lang]['followSysAccent'] : i18nMenuItems['en_US']['followSysAccent']} </label> </button> <button class=\"b3-menu__item asri-config\" data-type=\"nobg\" id=\"asriChroma\"> <svg class=\"b3-menu__icon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" viewBox=\"0 0 24 24\"> <path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m19 11l-8-8l-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0zM5 2l5 5m-8 6h15m5 7a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4c.3 1.6 2 2.4 2 4\"/> </svg> <div aria-label=\"${asriChromaAriaLabelPrefix + asriChromaSlider?.value || '1'}\" class=\"b3-tooltips b3-tooltips__n\"> <input style=\"box-sizing:border-box\" type=\"range\" id=\"asriChromaSlider\" class=\"b3-slider fn__block\" min=\"0\" max=\"5\" step=\"0.1\" value=\"1\"> </div> </button>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ 927:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const env_1 = __webpack_require__(261);
const sysScrollbar = __importStar(__webpack_require__(832));
const trafficLights_1 = __webpack_require__(130);
__webpack_require__(129);
setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, env_1.addEnvClassNames)();
    sysScrollbar.useSysScrollbar();
    (0, trafficLights_1.applyTrafficLightPosition)();
    window.destroyTheme = () => {
        (0, env_1.removeEnvClassNames)();
        sysScrollbar.restoreDeletedRules(); // restore scrollbar styles
        (0, trafficLights_1.restoreTrafficLightPosition)();
    };
}), 0);


/***/ }),

/***/ 129:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const index_html_1 = __importDefault(__webpack_require__(13));
console.log(index_html_1.default);


/***/ }),

/***/ 261:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
exports.restoreDeletedRules = exports.useSysScrollbar = exports.asriDeletedRules = void 0;
const rsc_1 = __webpack_require__(49);
exports.asriDeletedRules = [];
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
                                exports.asriDeletedRules.push({ styleSheet: styleSheet, rule: rule.cssText });
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
function restoreDeletedRules() {
    return __awaiter(this, void 0, void 0, function* () {
        if (exports.asriDeletedRules) {
            for (let i = 0; i < exports.asriDeletedRules.length; i++) {
                let rule = exports.asriDeletedRules[i];
                rule.styleSheet.insertRule(rule.rule, rule.styleSheet.cssRules.length);
            }
        }
    });
}
exports.restoreDeletedRules = restoreDeletedRules;


/***/ }),

/***/ 130:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.restoreTrafficLightPosition = exports.applyTrafficLightPosition = exports.setTrafficLightPosition = void 0;
const electron_1 = __webpack_require__(571);
const rsc_1 = __webpack_require__(49);
function setTrafficLightPosition(x, y = x) {
    if (electron_1.remote === null)
        return;
    electron_1.remote.getCurrentWindow().setWindowButtonPosition({ x: x, y: y });
}
exports.setTrafficLightPosition = setTrafficLightPosition;
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


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.remote = void 0;
const rsc_1 = __webpack_require__(49);
exports.remote = (rsc_1.environment.isMobile || rsc_1.environment.isInBrowser) ? null : __webpack_require__(21);


/***/ }),

/***/ 49:
/***/ ((__unused_webpack_module, exports) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = exports.asriDoms = void 0;
exports.asriDoms = {
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
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