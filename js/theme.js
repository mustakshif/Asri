(function () {
    // SiYuan API
    // [cc-baselib/siYuanApi.js at main · leolee9086/cc-baselib](https://github.com/leolee9086/cc-baselib/blob/main/src/siYuanApi.js)
    // Rem Craft/util/api.js

    async function getFile(path) {
        try {
            const response = await fetch('/api/file/getFile', {
                method: 'POST',
                headers: {
                    Authorization: `Token ''`,
                },
                body: JSON.stringify({
                    path: path,
                }),
            });
            if (response.status === 200) return response;
            else return null;
        } catch (e) {
            console.error('An error occurred while fetching the file:', e);
            return null;
        }
    }

    async function putFile(path, filedata, isDir = false, modTime = Date.now()) {
        let blob = new Blob([filedata]);
        let file = new File([blob], path.split('/').pop());
        let formdata = new FormData();
        formdata.append('path', path);
        formdata.append('file', file);
        formdata.append('isDir', isDir);
        formdata.append('modTime', modTime);
        const response = await fetch('/api/file/putFile', {
            body: formdata,
            method: 'POST',
            headers: {
                Authorization: `Token ''`,
            },
        });
        if (response.status === 200) return await response.json();
        else return null;
    }

    const asriDoms = {
        layouts: document.getElementById('layouts'),
        status: document.getElementById('status'),
        dockl: document.getElementById('dockLeft'),
        dockr: document.getElementById('dockRight'),
        dockb: document.getElementById('dockBottom'),
        layoutDockl: document.querySelector('.layout__dockl'),
        layoutDockr: document.querySelector('.layout__dockr'),
        layoutDockb: document.querySelector('.layout__dockb'),
        // toolbarWindow: document.querySelector('.toolbar__window'),
        toolbar: document.getElementById('toolbar'),
        barSync: document.getElementById('barSync'),
        barForward: document.getElementById('barForward'),
        toolbarVIP: document.getElementById('toolbarVIP'),
        drag: document.getElementById('drag'),
        barPlugins: document.getElementById('barPlugins'),
        barSearch: document.getElementById('barSearch'),
        barMode: document.getElementById('barMode')
        // backlinkListItems: layouts.querySelectorAll('.sy__backlink .b3-list-item')
    };

    const isMacOS = navigator.platform.indexOf("Mac") > -1;
    const isLinux = navigator.platform.indexOf("Linux") > -1;
    const isMobile = document.getElementById('sidebar') && document.getElementById('editor');
    const isInBrowser = asriDoms.toolbar?.classList.contains('toolbar--browser') > 0; // iPad uses this too
    const isMiniWindow = document.body.classList.contains('body--window') > 0;
    const isAndroid = window.siyuan.config.system.container === "android";
    const userAgent = navigator.userAgent;
    const isIOSApp = (/iOS/i.test(userAgent) || /iPad/i.test(userAgent)) && /AppleWebKit/i.test(userAgent);

    const lang = window.siyuan.config.lang;

    const supportsOklch = CSS.supports('color', 'oklch(from red calc(l * 0.5) 0 h)');

    const asriClassNames = [];
    const asriDeletedRules = [];
    const asriObservers = [];

    isMacOS && (document.body.classList.add('body--mac'), asriClassNames.push('.body--mac'));
    isLinux && (document.body.classList.add('body--linux'), asriClassNames.push('.body--linux'));
    isMobile && (document.body.classList.add('body--mobile'), asriClassNames.push('.body--mobile'));
    isInBrowser && (document.body.classList.add("body--browser"), asriClassNames.push('.body--browser'));
    isAndroid && (document.body.classList.add("body--android"), asriClassNames.push('.body--android'));
    isIOSApp && (document.body.classList.add("body--iosApp"), asriClassNames.push('.body--iosApp'));

    if (!isMobile && asriDoms.toolbar) {
        createTopbarElementById('AsriPluginsIconsDivider', undefined, asriDoms.drag);
        (isMacOS && !isInBrowser) ? createTopbarElementById('AsriTopbarLeftSpacing', undefined, asriDoms.barSync) : createTopbarElementById('AsriTopbarLeftSpacing', undefined, asriDoms.barForward);
        (isMacOS || isInBrowser) ? createTopbarElementById('AsriTopbarRightSpacing') : createTopbarElementById('AsriTopbarRightSpacing', asriDoms.barSearch);
    }

    const pluginsDivider = document.getElementById('AsriPluginsIconsDivider');
    const leftSpacing = document.getElementById('AsriTopbarLeftSpacing');
    const rightSpacing = document.getElementById('AsriTopbarRightSpacing');
    const topbar = asriDoms.toolbar;

    // Array.prototype.pushUnique = function (item) {
    //     if (!this.includes(item)) {
    //         this.push(item);
    //     }
    // } // may cause errors for other plugins  https://ld246.com/article/1707547966037

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

    const asriConfigs = {
        followSysAccentColor: "1",
        chroma: "1",
        userCustomColor: ""
    };
    const i18nMenuItems = {
        'zh_CN': {
            'followSysAccent': '跟随系统强调色',
            'pickColor': '自定义主题色',
            'asriChroma': '色度：'
        },
        'zh_CHT': {
            'followSysAccent': '跟隨系統強調色',
            'pickColor': '自定義主題色',
            'asriChroma': '色度：'
        },
        'en_US': {
            'followSysAccent': 'Follow system accent color',
            'pickColor': 'Customize theme color',
            'asriChroma': 'Chroma: '
        },
    };
    const asriChromaAriaLabelPrefix = (lang === 'zh_CN' || lang === 'zh_CHT') ?
        i18nMenuItems[lang]['asriChroma'] : i18nMenuItems['en_US']['asriChroma'];

    let sysAccentColor, followSysAccentColor, isUserAccentGray, isSysAccentGray;

    if (!isIOSApp) { // fix crash on iPad
        async function getAsriConfigs() {
            await getFile("/data/snippets/Asri.config.json")
                .then((response) => {
                    if (response && response.status === 200) {
                        return response.json();
                    }
                    return null;
                })
                .then((data) => {
                    followSysAccentColor = Number(data?.followSysAccentColor || asriConfigs.followSysAccentColor);

                    asriConfigs.followSysAccentColor = data?.followSysAccentColor || "1";
                    asriConfigs.chroma = data?.chroma || "1";
                    asriConfigs.userCustomColor = data?.userCustomColor || "#3478f6";
                });
        }

        getAsriConfigs().then(() => {
            if (supportsOklch) {
                // check local configs to set initial theme color
                if (!(isInBrowser || isMobile || isLinux)) {
                    if (followSysAccentColor) document.documentElement.style.removeProperty('--asri-user-custom-accent');
                    else document.documentElement.style.setProperty('--asri-user-custom-accent', asriConfigs.userCustomColor);
                } else {
                    document.documentElement.style.setProperty('--asri-user-custom-accent', asriConfigs.userCustomColor);
                }

                document.documentElement.style.setProperty('--asri-c-factor', asriConfigs.chroma);

                isUserAccentGray = asriConfigs.chroma === '0' ? true : false;

                handleGrayScale(asriConfigs.chroma);

                getSystemAccentColor();
                customizeThemeColor();
            }
        });

        async function updateAsriConfigs() {
            await putFile("/data/snippets/Asri.config.json", JSON.stringify(asriConfigs, undefined, 4));
        }

        function customizeThemeColor() {
            let followSysAccentBtn, pickColorBtn, asriChromaSlider, asriHueShiftSlider;

            // create menu items and handle click events
            setTimeout(() => {
                // use existing menu items if any
                if (document.querySelector('.asri-config')) return;
                // create menu items when there is no existing menu items
                const barModeMenuItems = document.querySelector('#commonMenu[data-name="barmode"] .b3-menu__items');
                if (!barModeMenuItems) return;

                const asriConfigMenuHTML = `<button class="b3-menu__separator asri-config"></button><button class="b3-menu__item asri-config" id="pickColor"><svg class="b3-menu__icon"></svg><label for="asriColorPicker" class="be-menu__label">${(lang === 'zh_CN' || lang === 'zh_CHT') ? i18nMenuItems[lang]['pickColor'] : i18nMenuItems['en_US']['pickColor']}</label><input id="asriColorPicker" type="color" value="${asriConfigs.userCustomColor}"></button><button class="b3-menu__item asri-config" id="followSysAccent"><svg class="b3-menu__icon"></svg><label for="" class="be-menu__label">${(lang === 'zh_CN' || lang === 'zh_CHT') ? i18nMenuItems[lang]['followSysAccent'] : i18nMenuItems['en_US']['followSysAccent']}</label></button><button class="b3-menu__item asri-config" data-type="nobg" id="asriChroma"><svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2"d="m19 11l-8-8l-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0zM5 2l5 5m-8 6h15m5 7a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4c.3 1.6 2 2.4 2 4" /></svg><div aria-label="${asriChromaAriaLabelPrefix + asriChromaSlider?.value || '1'}"class="b3-tooltips b3-tooltips__n"><input style="box-sizing: border-box" type="range" id="asriChromaSlider" class="b3-slider fn__block" min="0"max="5" step="0.1" value="1"></div></button><button class="b3-menu__item asri-config" data-type="nobg" id="asriHueShift"><svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10"/><path d="M12 16a4 4 0 1 1 0-8a4 4 0 0 1 0 8m0-14v6m0 8v6M2 12h6m8 0h6M4.929 4.929L9.172 9.17m5.656 5.659l4.243 4.242m-14.142 0l4.243-4.242m5.656-5.658l4.243-4.242"/></g></svg><div aria-label="${asriHueShiftSlider?.value || '0'}"class="b3-tooltips b3-tooltips__n"><input style="box-sizing: border-box" type="range" id="asriHueShiftSlider" class="b3-slider fn__block" min="-180"max="180" step="1" value="0"></div></button>`;

                const asriConfigFrag = document.createRange().createContextualFragment(asriConfigMenuHTML);

                barModeMenuItems.appendChild(asriConfigFrag);
                pushUnique(asriClassNames, '.asri-config');

                // set funcitons for menu items
                followSysAccentBtn = document.getElementById('followSysAccent');
                pickColorBtn = document.getElementById('pickColor');
                asriChromaSlider = document.getElementById('asriChromaSlider');
                colorPicker = pickColorBtn.lastElementChild;
                asriHueShiftSlider = document.getElementById('asriHueShiftSlider');

                // check local configs to determine the initial state of the menu items
                followSysAccentBtn.classList.toggle('b3-menu__item--selected', followSysAccentColor);
                pickColorBtn.classList.toggle('b3-menu__item--selected', !followSysAccentColor);
                asriChromaSlider.value = asriConfigs.chroma || "1";
                asriChromaSlider.parentElement.ariaLabel = asriChromaAriaLabelPrefix + asriConfigs.chroma;

                // handle click events
                if (isInBrowser || isMobile || isLinux) {
                    // followSysAccentColor = false;
                    followSysAccentBtn.classList.add('fn__none');
                } else {
                    followSysAccentBtn.addEventListener('click', () => {
                        if (!followSysAccentColor) {
                            followSysAccentColor = true;
                            followSysAccentBtn.classList.add('b3-menu__item--selected');
                            pickColorBtn.classList.remove('b3-menu__item--selected');
                            document.documentElement.style.removeProperty('--asri-user-custom-accent');

                            asriConfigs.followSysAccentColor = '1';
                            getSystemAccentColor();
                            updateAsriConfigs();
                        } else {
                            followSysAccentColor = false;
                            followSysAccentBtn.classList.remove('b3-menu__item--selected');
                            pickColorBtn.classList.add('b3-menu__item--selected');
                            document.documentElement.style.setProperty('--asri-user-custom-accent', asriConfigs.userCustomColor || sysAccentColor || '#3478f6');

                            handleGrayScale(asriConfigs.chroma);

                            asriConfigs.followSysAccentColor = '0';
                            updateAsriConfigs();
                        }
                    });
                }

                pickColorBtn.addEventListener('click', () => {
                    if (!followSysAccentColor) return;
                    else {
                        followSysAccentColor = false;
                        followSysAccentBtn.classList.remove('b3-menu__item--selected');
                        pickColorBtn.classList.add('b3-menu__item--selected');

                        document.documentElement.style.setProperty('--asri-user-custom-accent', asriConfigs.userCustomColor);

                        handleGrayScale(asriConfigs.chroma);

                        asriConfigs.userCustomColor = asriConfigs.userCustomColor;

                        asriConfigs.followSysAccentColor = '0';
                        updateAsriConfigs();
                    }
                });
                colorPicker.addEventListener('input', () => {
                    document.documentElement.style.setProperty('--asri-user-custom-accent', colorPicker.value);
                });
                colorPicker.addEventListener('change', () => {
                    followSysAccentBtn.classList.remove('b3-menu__item--selected');
                    pickColorBtn.classList.add('b3-menu__item--selected');

                    asriConfigs.userCustomColor = colorPicker.value;
                    followSysAccentColor = false;
                    asriConfigs.followSysAccentColor = '0';
                    updateAsriConfigs();
                });
                const debounceConfigSaving = debounce(() => updateAsriConfigs(), 200);
                asriChromaSlider.addEventListener('input', function () {
                    let chromaValue = this.value;
                    document.documentElement.style.setProperty('--asri-c-factor', chromaValue);
                    this.parentElement.ariaLabel = asriChromaAriaLabelPrefix + chromaValue;
                    asriConfigs.chroma = chromaValue;

                    isUserAccentGray = chromaValue === '0' ? true : false;

                    handleGrayScale(chromaValue);

                    debounceConfigSaving();
                });

                asriHueShiftSlider.addEventListener('input', function () {
                    let hueShiftValue = this.value;
                    if (hueShiftValue > -10 && hueShiftValue < 10) {
                        hueShiftValue = 0;
                        this.value = 0;
                    }
                    document.documentElement.style.setProperty('--asri-h-shift', hueShiftValue);
                    this.parentElement.ariaLabel = hueShiftValue;
                });
            }, 0);
        }

        supportsOklch && asriDoms.barMode?.addEventListener("click", customizeThemeColor);

        function getSystemAccentColor() {
            if (!(isInBrowser || isMobile || isLinux)) {
                const accent = require("@electron/remote").systemPreferences.getAccentColor();
                const accentHex = '#' + accent.slice(0, 6);
                const accentHSLObj = hexToHSL(accentHex);

                if (sysAccentColor !== accentHex) {
                    document.documentElement.style.setProperty('--asri-sys-accent', accentHex);

                    if (accentHSLObj.s > 0.28) document.documentElement.style.setProperty('--asri-sys-accent-accessible', accentHex);
                    else document.documentElement.style.removeProperty('--asri-sys-accent-accessible');

                    isSysAccentGray = accentHSLObj.s === 0 ? true : false;

                    document.body.classList.add('asri-mode-transition');
                    setTimeout(() => {
                        document.body.classList.remove('asri-mode-transition');
                    }, 350);

                    sysAccentColor = accentHex;
                }

                followSysAccentColor && handleGrayScale(accentHSLObj.s);
            }
        }
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

            let hue;
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
    }

    /**
     * decide if use grayscale or not, if so return true, otherwise return false
     * @param {string | number} chroma 
     * @returns boolean
     */
    function handleGrayScale(chroma) {
        chromaValue = String(chroma);
        if (chromaValue === '0' || (followSysAccentColor && isSysAccentGray) || isUserAccentGray) {
            document.documentElement.style.setProperty('--asri-c-0', '0');
            return true;
        }
        else {
            document.documentElement.style.removeProperty('--asri-c-0');
            return false;
        }
    }

    function isFullScreen() {
        return !isInBrowser && require("@electron/remote").getCurrentWindow().isFullScreen();
    }

    function setTrafficLightPosition(x, y = x) {
        require("@electron/remote").getCurrentWindow().setWindowButtonPosition({ x: x, y: y });
    }

    if (isMacOS && !isInBrowser) setTrafficLightPosition(16);
    if (isMacOS && isMiniWindow) setTrafficLightPosition(14);

    (function useSysScrollbar() {
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
                } catch (e) {
                    console.log(e);
                }
            }
        }
    })();

    /**
     * 
     * @param {string} newid 
     * @param {node} before 
     * @param {node} after 
     */
    function createTopbarElementById(newId, before = undefined, after = undefined) {
        if (document.getElementById(newId)) return;

        let newDiv = document.createElement('div');
        newDiv.id = newId;
        if (before) {
            asriDoms.toolbar.insertBefore(newDiv, before);
        } else if (after) {
            asriDoms.toolbar.insertBefore(newDiv, after.nextSibling);
        } else {
            asriDoms.toolbar.appendChild(newDiv);
        }
    }

    let isWinResizing = false, winResizeTimeout, centerResizeTimeout, fromFullscreen;
    let dragRectLeftInitial = asriDoms.drag?.getBoundingClientRect().left,
        dragRectRightInitial = asriDoms.drag?.getBoundingClientRect().right;
    let topbarRect = asriDoms.toolbar?.getBoundingClientRect();
    function handleWinResize() {
        isWinResizing = true;
        clearTimeout(winResizeTimeout);
        winResizeTimeout = setTimeout(function () {
            if (!isMiniWindow) {
                isWinResizing = false;
                if (isMacOS) {
                    let AsriTopbarLeftSpacing = document.querySelector('#AsriTopbarLeftSpacing');
                    if (isFullScreen()) {
                        document.body.classList.add('body--fullscreen');
                        dragRectLeftInitial -= fromFullscreen ? 0 : 80 + 8;
                        fromFullscreen = true;
                    } else {
                        document.body.classList.remove('body--fullscreen');
                        AsriTopbarLeftSpacing?.style.setProperty('width', '0px');
                        dragRectLeftInitial = asriDoms.drag?.getBoundingClientRect().left;
                        AsriTopbarLeftSpacing.style.removeProperty('width');
                        fromFullscreen = false;
                    }
                }
                calcTopbarSpacings();
                updateWndEls();
                calcTabbarSpacings();
                setTimeout(() => {
                    calcProtyleSpacings();
                }, 200);
            } else {
                updateWndEls();
                setTimeout(() => {
                    calcProtyleSpacings();
                }, 200);
            }
        }, 200);
    }

    function calcTopbarSpacings(widthChange) {
        if (!isMiniWindow) {
            let layoutsCenterRect, leftSpacingRect, rightSpacingRect, barSyncRect, dragRect;

            layoutsCenterRect = asriDoms.layouts.querySelector('.layout__center')?.getBoundingClientRect();
            rightSpacingRect = rightSpacing.getBoundingClientRect();
            barSyncRect = asriDoms.barSync.getBoundingClientRect();
            barForwardRect = asriDoms.barForward.getBoundingClientRect();

            let winWidth = window.innerWidth,
                centerRectLeft = layoutsCenterRect.left,
                centerRectRight = layoutsCenterRect.right;

            function calcAndApply() {
                // left side
                if (centerRectLeft > dragRectLeftInitial + 8) {
                    topbar.style.setProperty('--topbar-left-spacing', 0);
                    dragRectLeftInitial = fromFullscreen ? dragRectLeftInitial : asriDoms.drag.getBoundingClientRect().left;
                    // recalc initial everytime
                    leftSpacing.classList.remove('asri-expanded');
                }

                else if (isMacOS && !isInBrowser) {
                    topbar.style.setProperty('--topbar-left-spacing', centerRectLeft - barSyncRect.right + 4 + 'px');
                    leftSpacing.classList.add('asri-expanded');
                }
                else {
                    topbar.style.setProperty('--topbar-left-spacing', centerRectLeft - barForwardRect.right + 4 + 'px');
                    leftSpacing.classList.add('asri-expanded');
                }

                // right side
                if (centerRectRight < dragRectRightInitial - 8) {
                    topbar.style.setProperty('--topbar-right-spacing', 0);

                    dragRectRightInitial = asriDoms.drag.getBoundingClientRect().right;

                    // css related 
                    asriDoms.dockr?.style.removeProperty('--avoid-topbar');
                    asriDoms.layoutDockr?.style.removeProperty('--avoid-topbar');
                } else {
                    if (isMacOS || isInBrowser) {
                        topbar.style.setProperty('--topbar-right-spacing', rightSpacingRect.right - centerRectRight + 5 + 'px');
                        // windowControls element takes up 2px

                        asriDoms.dockr?.style.setProperty('--avoid-topbar', '4px');
                        asriDoms.layoutDockr?.style.setProperty('--avoid-topbar', '4px')
                    } else {
                        topbar.style.setProperty('--topbar-right-spacing', rightSpacingRect.right - centerRectRight + 7 + 'px');

                        asriDoms.dockr?.style.setProperty('--avoid-topbar', 'calc(var(--toolbar-height) - 6px)');
                        asriDoms.layoutDockr?.style.setProperty('--avoid-topbar', 'calc(var(--toolbar-height) - 6px)')
                    };
                }
            }

            if (!isWinResizing) calcAndApply(); // otherwise would cause dragRightInitial to be at unexpected position 
            else dragRectRightInitial = dragRectRightInitial + widthChange;

            (function dividerSwitch() {
                if (centerRectRight < dragRectRightInitial - 8) {
                    // horisontal divider
                    pluginsDivider.style.setProperty('--container-bg', 'var(--b3-list-hover)');
                    pluginsDivider.style.left = centerRectRight + 'px';
                    pluginsDivider.style.right = '0';
                    pluginsDivider.style.removeProperty('height');
                    pluginsDivider.style.removeProperty('top');
                }
                else {
                    // vertical divider
                    dragRect = asriDoms.drag.getBoundingClientRect();
                    pluginsDivider.style.setProperty('--container-bg', 'var(--b3-border-color-trans)');
                    pluginsDivider.style.left = dragRect.right - 10 + 'px';
                    pluginsDivider.style.right = winWidth - dragRect.right + 8 + 'px';
                    pluginsDivider.style.height = '21px';
                    pluginsDivider.style.top = '13.5px';
                }
            })();

            // console.log(`dragL\t\t${dragRectLeftInitial}\ncenterL\t${centerRectLeft}`)
        }
    }

    let wndElements = [];

    /**
     * update wnd elements, use before calcTabbarSpacings() and calcProtyleSpacings()
     */
    function updateWndEls() {
        wndElements = asriDoms.layouts.querySelectorAll('[data-type="wnd"]');
    }

    /**
     * calculate tabbar left & right & top paddings, use after updateWndEls()
     */
    function calcTabbarSpacings() {
        if (!isMiniWindow) {
            wndElements.forEach(wnd => {
                let tabbarContainer = wnd.querySelector('.fn__flex-column[data-type="wnd"] > .fn__flex:first-child');
                let tabbarContainerRect = tabbarContainer.getBoundingClientRect();
                let dragRect = asriDoms.drag.getBoundingClientRect();

                // calc & apply tabbarSpacing
                if (isOverlapping(tabbarContainerRect, dragRect) || isOverlapping(tabbarContainerRect, topbarRect)) {
                    let paddingLeftValue = (tabbarContainerRect.left < dragRect.left) ? dragRect.left - tabbarContainerRect.left - 4 : 0;
                    let paddingRightValue = (tabbarContainerRect.right > dragRect.right) ? tabbarContainerRect.right - dragRect.right + 8 : 0;

                    tabbarContainer.style.paddingLeft = paddingLeftValue + 'px';
                    tabbarContainer.style.paddingRight = paddingRightValue + 'px';

                    // asriDoms.drag = document.getElementById('drag');

                    // add top padding in extremely narrow width
                    if ((tabbarContainerRect.right - paddingRightValue - 240 < dragRect.left && tabbarContainerRect.left < dragRect.left) || (tabbarContainerRect.left + paddingLeftValue + 240 > dragRect.right && tabbarContainerRect.right > dragRect.right)) {
                        tabbarContainer.style.paddingTop = '42px';
                        tabbarContainer.style.paddingLeft = 0;
                        tabbarContainer.style.paddingRight = 0;
                    } else {
                        tabbarContainer.style.removeProperty('padding-top');
                    }
                } else {
                    tabbarContainer.style.removeProperty('padding-left');
                    tabbarContainer.style.removeProperty('padding-right');
                }
            })
        }
    }

    function calcProtyleSpacings() {
        // calc & apply protyleSpacing
        wndElements.forEach(wnd => {
            let protyles = wnd.querySelector('.file-tree') ? [] : wnd.querySelectorAll('.protyle-wysiwyg');

            if (protyles.length > 0) {
                setTimeout(() => {
                    protyles.forEach(protyle => {
                        // let protylePadding = Math.round(parseFloat(window.getComputedStyle(protyle).paddingLeft)) + 'px';
                        let protylePadding = protyle.style.paddingLeft;
                        if (protylePadding !== protyle.dataset.prevpadding) {
                            protyle.style.setProperty('--protyle-spacing', protylePadding);
                            protyle.dataset.prevpadding = protylePadding;
                            // console.log(protylePadding);
                        }
                    })
                }, 300); // protyle transition time
            }
        })
    }
    function LayoutsCenterResizeObserver() {
        let lytCenter = asriDoms.layouts.querySelector('.layout__center');
        const ro = new ResizeObserver(entries => {
            for (let entry of entries) {
                // get current element's size
                const { inlineSize } = entry.contentBoxSize[0];

                // check if it's the first time to trigger resize event, if so, skip the calculation
                if (!entry.target.dataset.prevWidth) {
                    entry.target.dataset.prevWidth = inlineSize;
                    continue;
                }

                // get previous width
                const prevWidth = parseFloat(entry.target.dataset.prevWidth);

                const widthChange = inlineSize - prevWidth;

                entry.target.dataset.prevWidth = inlineSize;

                // handle center resize
                updateWndEls();
                clearTimeout(centerResizeTimeout);
                centerResizeTimeout = setTimeout(() => {
                    statusPosition();
                    // change it to run after resize, otherwise, it will cause lagging
                    calcProtyleSpacings();
                }, 200);
                calcTopbarSpacings(widthChange);
                calcTabbarSpacings();
                dockBg();
            }
        });

        if (lytCenter) ro.observe(lytCenter), asriObservers.push(ro);
        else {
            let count = 0,
                maxCount = 10;
            let tryGetLytCenter;

            function updateLytCenter() {
                asriDoms.layouts = document.getElementById('layouts');
                lytCenter = asriDoms.layouts.querySelector('.layout__center');
                count++;
                if (count === maxCount || lytCenter) {
                    clearInterval(tryGetLytCenter);
                    // asriDoms.layouts = document.getElementById('layouts');
                    ro.observe(lytCenter), asriObservers.push(ro);
                }
            }
            setTimeout(() => {
                tryGetLytCenter = setInterval(updateLytCenter, 1000);
            }, 0);
        }
    }

    if (!isMobile) {
        setTimeout(calcTopbarSpacings, 200);
        !isMiniWindow && LayoutsCenterResizeObserver();
        window.addEventListener('resize', handleWinResize);
    }

    /**
     * 
     * @param {'l' | 'r'} dir
     */
    function isSideDockHidden(dir = 'l') {
        return asriDoms[`dock${dir}`] && asriDoms[`dock${dir}`].classList.contains('fn__none')
        // uses right dock to calculate status bar position: https://github.com/mustakshif/Asri-for-SiYuan/issues/16
    }
    function hasDockb() {
        return asriDoms.dockb && !asriDoms.dockb.classList.contains('fn__none');
    }

    function DoesLytDockbFloat() {
        if (!isMobile) {
            const layouts = asriDoms.layouts;
            const lytDockb = layouts.querySelector('.layout__dockb');

            return layouts && lytDockb?.classList.contains('layout--float') && lytDockb?.style.height !== "0px";
        }
    }
    function addDockbClassName() {
        const dockbExist = hasDockb();
        const dockbFloat = DoesLytDockbFloat();

        asriDoms.toolbar?.nextElementSibling.classList.toggle('has-dockb', dockbExist);
        asriDoms.toolbar?.nextElementSibling.classList.toggle('has-layout-dockb-float', dockbFloat);
        asriDoms.dockb?.classList.toggle('has-layout-dockb-float', dockbFloat);

        pushUnique(asriClassNames, '.has-dockb');
        pushUnique(asriClassNames, '.has-layout-dockb-float');
    }

    addDockbClassName();

    // function handleFloatLytDockb() {
    //     if (DoesLytDockbFloat()) {
    //         asriDoms.dockb?.classList.add('has-layout-float');
    //         pushUnique(asriClassNames, '.has-layout-float');
    //     } else {
    //         asriDoms.dockb?.classList.remove('has-layout-float');
    //     }
    // }
    // handleFloatLytDockb();

    function isStatusHidden() {
        return asriDoms.status && asriDoms.status.classList.contains('fn__none');
    }

    function addEmojiDialogClassName() {
        // emoji dialog
        let dialogs = document.querySelectorAll('.b3-dialog--open .b3-dialog');
        dialogs.forEach(dialog => {
            dialog.querySelector('.emojis') && (
                dialog.classList.add('emojis-container'),
                pushUnique(asriClassNames, '.emojis-container')
            )
        })
    }
    /**
     * Check if the dock is hidden/floating or not
     * @param {'l' | 'r' | 'b'} direction
     */
    function isLayoutDockHidden(direction) {
        let layoutDockNew = asriDoms[`layoutDock${direction}`];
        return layoutDockNew && (layoutDockNew.classList.contains('layout--float') || layoutDockNew.style.cssText.includes('width: 0px'))
    }

    function isDockLytPinned(node) {
        return node && !node.classList.contains('layout--float');
    }
    function isDockLytExpanded(node) {
        return node?.style.width !== '0px';
    }
    function isFloatDockLytHidden(node) {
        return !isDockLytPinned(node) && node?.style.cssText.includes('transform: translate');
    }

    /**
     * Control the display of docks background and borders
     */
    function dockBg() {

        if (asriDoms.dockl && !isMobile && !isMiniWindow) {
            for (let dir of ['l', 'r']) {

                let lyt = asriDoms[`layoutDock${dir}`],
                    dock = asriDoms[`dock${dir}`];

                if (isDockLytPinned(lyt) && isDockLytExpanded(lyt)) {
                    dock.classList.add('dock-layout-expanded');
                    pushUnique(asriClassNames, '.dock-layout-expanded');
                } else {
                    dock.classList.remove('dock-layout-expanded');
                }

                if (!isSideDockHidden() && !isFloatDockLytHidden(lyt) && isDockLytExpanded(lyt)) {
                    switch (dir) {
                        case 'l':
                            // dock.style.borderRightColor = 'transparent';
                            dock.style.setProperty('--border-clr', 'transparent');
                            break;
                        case 'r':
                            // dock.style.borderLeftColor = 'transparent';
                            dock.style.setProperty('--border-clr', 'transparent');
                            break;
                    }
                } else {
                    dock.style.removeProperty('--border-clr');
                }
            }
        }
    }

    dockBg();

    /**
     * Calculate the position of status bar when there is a change of the display of docks and their layouts.
     */
    function statusPosition() {
        if (!isMobile && !isMiniWindow) {
            if (!hasDockb()) {
                function setStatusTransform(x, y) {
                    asriDoms.status.style.transform = `translate(${x}px, ${y}px)`;
                }

                let layoutCenter = asriDoms.layouts.querySelector('.layout__center');

                if (layoutCenter && asriDoms.layoutDockr && !asriDoms.status.classList.contains('.fn__none')) {
                    let layoutDockrWidth = asriDoms.layoutDockr.clientWidth;
                    let layoutCenterWidth = layoutCenter.clientWidth;

                    asriDoms.layoutDockb = asriDoms.layouts.querySelector('.layout__dockb');
                    if (asriDoms.layoutDockb && !asriDoms.layoutDockb.classList.contains('.fn__none') && isDockLytPinned(asriDoms.layoutDockb)) var y = asriDoms.layoutDockb.clientHeight * -1;
                    else y = 0;

                    asriDoms.status.style.maxWidth = layoutCenterWidth - 12 + 'px';

                    let isDockRightHidden = isSideDockHidden('r'),
                        isLayoutDockRightHidden = isLayoutDockHidden('r');

                    if (isDockRightHidden && isLayoutDockRightHidden) setStatusTransform(0, y);
                    else if (!isDockRightHidden && isLayoutDockRightHidden) setStatusTransform(-40, y);
                    else if (!isDockRightHidden && !isLayoutDockRightHidden) setStatusTransform((layoutDockrWidth + 40) * -1, y);
                    else if (isDockRightHidden && !isLayoutDockRightHidden) setStatusTransform(layoutDockrWidth * -1, y);

                    asriDoms.status = document.getElementById('status');
                }
            } else {
                asriDoms.status?.style.removeProperty('max-width');
                asriDoms.status?.style.removeProperty('transform');
            }

            // if (!hasDockb() && !isLayoutDockHidden('b')) {
            //     let layoutDockbHeight = asriDoms.layoutDockb?.clientHeight;
            //     asriDoms.status.style.transform = `translateY(-${layoutDockbHeight + 42}px)`;
            // }   
        }
    }


    function setStatusHeightVar() {
        if (isStatusHidden()) document.body.style.setProperty('--status-height', '0px');
        else document.body.style.setProperty('--status-height', '32px');
    }

    setStatusHeightVar();

    function avoidOverlappingWithStatus() {
        if (!isStatusHidden()) {

            let layoutTabContainers = asriDoms.layouts?.querySelectorAll('.layout__center .layout-tab-container');
            let statusRect = asriDoms.status.getBoundingClientRect();

            layoutTabContainers?.forEach(layoutTabContainer => {
                let fileTree = layoutTabContainer.querySelector('.file-tree');
                if (fileTree && !fileTree.classList.contains('fn__none')) {
                    let containerRect = layoutTabContainer.getBoundingClientRect();
                    if (isOverlapping(containerRect, statusRect)) {
                        layoutTabContainer.style.paddingBottom = '35px'
                    } else {
                        layoutTabContainer.style.removeProperty('padding-bottom');
                    }
                } else {
                    layoutTabContainer.style.removeProperty('padding-bottom');
                }
            })

            let searchList = document.getElementById('searchList');
            let searchPreview = document.getElementById('searchPreview');
            if (searchList || searchPreview) {
                let searchListRect = searchList.getBoundingClientRect();
                let searchPreviewRect = searchPreview.getBoundingClientRect();

                if (isOverlapping(searchListRect, statusRect)) {
                    searchList.style.paddingBottom = '35px'
                } else {
                    searchList.style.removeProperty('padding-bottom')
                }

                if (isOverlapping(searchPreviewRect, statusRect)) {
                    searchPreview.style.paddingBottom = '35px'
                } else {
                    searchPreview.style.removeProperty('padding-bottom')
                }
            }

            // pdfviewer
            let viewerContainer = document.getElementById('viewerContainer');

            if (viewerContainer) {
                let viewerContainerRect = viewerContainer.getBoundingClientRect();

                if (isOverlapping(viewerContainerRect, statusRect)) {
                    viewerContainer.style.paddingBottom = '35px';
                } else {
                    viewerContainer.style.removeProperty('padding-bottom')
                }
            }

            // flashcard in tabbar
            asriDoms.layouts?.querySelectorAll('.card__main').forEach(card => {
                if (card) {
                    let cardRect = card.getBoundingClientRect();

                    if (isOverlapping(cardRect, statusRect)) {
                        card.style.paddingBottom = '35px';
                    } else {
                        card.style.removeProperty('padding-bottom')
                    }
                }
            });
        }
    }
    avoidOverlappingWithStatus();

    /**
     * Check if two elements have overlapping parts.
     * @param {object} elementRect 
     * @param {object} targetRect 
     * @returns {boolean}
     */
    function isOverlapping(elementRect, targetRect) {
        if (elementRect && targetRect) {
            return (
                elementRect.right > targetRect.left &&
                elementRect.bottom > targetRect.top &&
                elementRect.left < targetRect.left + targetRect.width &&
                elementRect.top < targetRect.top + targetRect.height
            )
        }
    }

    function formatIndentGuidesForFocusedItems() {
        if (!isMobile) {
            let listItemsFocus = document.querySelectorAll('.file-tree .b3-list-item--focus');

            document.querySelectorAll('.file-tree .has-focus').forEach(oldUl => oldUl.classList.remove('has-focus'));

            listItemsFocus.forEach(li => {
                if (!li.nextElementSibling || (li.nextElementSibling.tagName !== 'UL' || li.nextElementSibling.classList.contains('fn__none'))) {
                    li.parentNode.classList.add('has-focus');
                    pushUnique(asriClassNames, '.has-focus');
                }
            })
        }
    }

    formatIndentGuidesForFocusedItems();

    function formatProtyleWithBgImageOnly() {
        let protyleBgs = asriDoms.layouts?.querySelectorAll('.protyle .protyle-background');

        protyleBgs.forEach(protyleBg => {
            if (!protyleBg.querySelector('.protyle-background__img img')?.classList.contains('fn__none') && protyleBg.querySelector('.protyle-background__icon.fn__none')) {
                protyleBg.classList.add('without-icon');
                pushUnique(asriClassNames, '.without-icon');
            } else {
                protyleBg.classList.remove('without-icon')
            }
        })
    }

    /**
     * Set a simple mutation observer for a single type of mutation.
     * @param {'childList' | 'attributes' | 'characterData'} type mutation type 
     * @param {Function} func 
     */
    function setSimpleMutationObserver(type, func) {
        let callback = function (mutationList, observer) {
            mutationList.forEach(mutation => {
                switch (mutation.type) {
                    case type:
                        func(mutation, observer)
                }
            })
        };
        return new MutationObserver(callback);
    }
    /**
     * Set mutation observer for multiple types of mutation.
     * @param {Function | undefined} funcChildList 
     * @param {Function | undefined} funcAttr default: undefined
     * @param {Function | undefined} funcCharacterData default: undefined
     */
    function setCompoundMutationObserver(funcChildList, funcAttr = undefined, funcCharacterData = undefined) {
        let callback = function (mutationList, observer) {
            mutationList.forEach(mutation => {
                if (funcChildList && mutation.type === 'childList') {
                    funcChildList(mutation, observer);
                } else if (funcAttr && mutation.type === 'attributes') {
                    funcAttr(mutation, observer);
                } else if (funcCharacterData && mutation.type === 'characterData') {
                    funcCharacterData(mutation, observer);
                }
            })
        }
        return new MutationObserver(callback)
    }

    // observers ————————————————————————————————————————————————
    function topbarObserver(type, func) {
        let topbar = asriDoms.toolbar;
        let topObserver = setSimpleMutationObserver(type, func);
        if (topbar) topObserver.observe(topbar, { [type]: true }), asriObservers.push(topObserver);
    }

    /**
     * 
     * @param {Function | undefined} funcChildList 
     * @param {Function | undefined} funcAttr default: undefined
     * @param {boolean} subTree default: false
     */
    function docBodyObserver(funcChildList, funcAttr = undefined, subTree = false) {
        let config = {};
        if (funcChildList) config.childList = true;
        if (funcAttr) config.attributes = true;
        if (funcChildList && subTree) config.subtree = true;

        let bodyObserver = setCompoundMutationObserver(funcChildList, funcAttr);
        bodyObserver.observe(document.body, config);
        asriObservers.push(bodyObserver);
    }

    function statusObsever(type, func) {
        let status = asriDoms.status;
        let statusObsever = setSimpleMutationObserver(type, func);
        if (status) statusObsever.observe(status, { [type]: true }), asriObservers.push(statusObsever);
    }

    /**
     * 
     * @param {'l' | 'r'} direction 
     * @param {String} type mutation type
     * @param {*} func 
     */
    function dockObserver(direction, type, func) {
        let dock = asriDoms[`dock${direction}`];
        let dockObserver = setSimpleMutationObserver(type, func);
        if (dock) dockObserver.observe(dock, { [type]: true }), asriObservers.push(dockObserver);
    } // {[type]: true} uses computed property name syntax

    /**
     * 
     * @param {'l' | 'r'} direction 
     * @param {Function | undefined} funcChildList 
     * @param {Function | undefined} funcAttr 
     * @param {Function | undefined} fucnCharacterData 
     * @param {boolean} subTree 
     */
    function dockLayoutObserver(direction, funcChildList, funcAttr = undefined, fucnCharacterData = undefined, subTree = false) {
        let config = {};
        if (funcChildList) config.childList = true;
        if (funcAttr) config.attributes = true;
        if (fucnCharacterData) config.characterData = true;
        if (funcChildList && subTree) config.subtree = true;

        let dockLayout = asriDoms[`layoutDock${direction}`];
        let dockLytObserver = setCompoundMutationObserver(funcChildList, funcAttr, fucnCharacterData);

        // handle cases where layoutDock element is not loaded
        if (dockLayout) dockLytObserver.observe(dockLayout, config), asriObservers.push(dockLytObserver);
        else {
            let count = 0,
                maxCount = 10;
            let tryGetLayoutDock;

            function updateDockLayout() {
                dockLayout = asriDoms.layouts.querySelector(`.layout__dock${direction}`);
                count++;

                if (count === maxCount || dockLayout) {
                    clearInterval(tryGetLayoutDock);
                    asriDoms[`layoutDock${direction}`] = dockLayout;
                    dockBg();
                    dockLytObserver.observe(dockLayout, config);
                    asriObservers.push(dockLytObserver);
                }
            }

            setTimeout(() => {
                tryGetLayoutDock = setInterval(updateDockLayout, 1000);
            }, 0);
        }
    }

    /**
     * 
     * @param {Function | undefined} funcChildList 
     * @param {Function | undefined} funcAttr 
     * @param {Function | undefined} fucnCharacterData 
     * @param {boolean} subTree default: false
     */
    function layoutsObserver(funcChildList, funcAttr = undefined, fucnCharacterData = undefined, subTree = false) {
        let config = {};
        if (funcChildList) config.childList = true;
        if (funcAttr) config.attributes = true;
        if (fucnCharacterData) config.characterData = true;
        if (funcChildList && subTree) config.subtree = true;

        let layouts = asriDoms.layouts;
        let lytsObserver = setCompoundMutationObserver(funcChildList, funcAttr, fucnCharacterData);
        lytsObserver.observe(layouts, config);
        asriObservers.push(lytsObserver);
    }

    // Start observers ————————————————————————————————————————————————
    docBodyObserver(
        // childList mutations func
        () => {
            addEmojiDialogClassName();
            addDockbClassName();
            // statusPosition();
        }
    )

    if (!isMobile) {
        if (!isMiniWindow) {
            dockLayoutObserver(
                'l',
                undefined,
                () => {
                    setTimeout(() => {
                        // tabbarSpacing();
                        avoidOverlappingWithStatus();
                    }, 200); // after animation
                    // left dock background
                    dockBg();
                }
            )

            dockLayoutObserver(
                'r',
                undefined,
                () => {
                    setTimeout(() => {
                        // statusPosition();
                        avoidOverlappingWithStatus();
                    }, 200);
                    // right dock background
                    dockBg();
                }
            )
            statusObsever('attributes', setStatusHeightVar);

            // layoutsObserver(
            //     () => {
            //         setTimeout(() => {
            //             updateWndEls();
            //             calcTabbarSpacings();
            //             calcProtyleSpacings();
            //             avoidOverlappingWithStatus();
            //             console.log('1')
            //         }, 200); // 动画之后
            //     },
            //     undefined,
            //     undefined,
            //     true
            // )
        }
    }

    /**
    * Retrieves the currently active node.
    * If a target node selector is provided, traverses up the DOM until it finds a matching target node.
    * 
    * @param {string} targetNodeSelector Optional, a CSS selector string for the target node.
    * @returns {Element|null} Returns the matched target node or the parent element of the currently active node; if no match is found or the active node is not within the specified class name, returns null.
    */
    function getActiveTargetNode(targetNodeSelector = '') {
        if (document.activeElement.classList.contains('protyle-wysiwyg')) {
            let node = window.getSelection()?.focusNode?.parentElement;

            if (node && !targetNodeSelector) return node;

            // If a target node selector is provided, traverse up the DOM until we find a match
            if (node && targetNodeSelector) {
                while (node && !node.parentElement.matches(targetNodeSelector)) {
                    node = node.parentElement;
                }

                // Return the matched node or null if no match found
                return node ? node : null;
            }
        }

        // If no active element within the 'protyle-wysiwyg' class, return null
        return null;
    }

    function recalcDragInitials() {
        let asriTopbarLeftSpacing = document.querySelector('#AsriTopbarLeftSpacing');
        let asriTopbarRightSpacing = document.querySelector('#AsriTopbarRightSpacing');

        asriTopbarLeftSpacing?.style.setProperty('width', '0px');
        asriTopbarRightSpacing?.style.setProperty('width', '0px');
        dragRectLeftInitial = asriDoms.drag?.getBoundingClientRect().left;
        dragRectRightInitial = asriDoms.drag?.getBoundingClientRect().right;
        asriTopbarLeftSpacing?.style.removeProperty('width');
        asriTopbarRightSpacing?.style.removeProperty('width');
    }

    function debounce(fn, delay) {
        let timer = null;
        return (...param) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...param);
            }, delay);
        };
    }
    function handleLowFreqTasks() {
        if (!isMobile) {
            setTimeout(() => {
                updateWndEls();
                recalcDragInitials();
                calcTopbarSpacings();
                calcTabbarSpacings();
                calcProtyleSpacings();
                formatIndentGuidesForFocusedItems();
                formatProtyleWithBgImageOnly();
                avoidOverlappingWithStatus();
                addDockbClassName();
                statusPosition();
                !isIOSApp && followSysAccentColor && supportsOklch && getSystemAccentColor();
            }, 200);
        }
    }
    handleLowFreqTasks();

    function handleKeyUp(event) {
        // if (event.isComposing || event.keyCode === 229) {
        //     // ignore CJK IME input event
        //     return;
        // }
        const isModifierKey = event.key === 'Control' || event.key === 'Alt' || event.key === 'Shift' || event.key === 'Meta';

        if (isModifierKey) {
            handleLowFreqTasks();
        }
    }

    function handleDblClick(event) {
        document.body.style.setProperty('--mouseX', event.clientX + 'px');
        document.body.style.setProperty('--mouseY', event.clientY + 'px');
    }

    window.addEventListener('mouseup', handleLowFreqTasks);
    window.addEventListener('dragend', handleLowFreqTasks);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('dblclick', handleDblClick);

    window.destroyTheme = () => {
        // const isAsriInBothModes = window.siyuan.config.appearance.themeLight === "Asri" && window.siyuan.config.appearance.themeDark === "Asri";
        // console.log('isAsriInBothModes', isAsriInBothModes)

        // if (isAsriInBothModes) {
        //     document.body.classList.add('asri-mode-transition');
        //     setTimeout(() => {
        //         document.body.classList.remove('asri-mode-transition');
        //     }, 350);

        //     return;
        // }

        // remove event listeners
        window.removeEventListener('mouseup', handleLowFreqTasks);
        window.removeEventListener('keyup', handleKeyUp);
        window.removeEventListener('dragend', handleLowFreqTasks);
        window.removeEventListener('dblclick', handleDblClick);
        window.removeEventListener('resize', handleWinResize);
        asriDoms.barMode?.removeEventListener("click", customizeThemeColor);

        // disconnect all observers
        asriObservers.forEach(observer => observer.disconnect());

        // restore traffic light to default position
        if (isMacOS && !isInBrowser) setTrafficLightPosition(8);
        if (isMacOS && isMiniWindow) setTrafficLightPosition(8, 13);

        // remove added class names and elements
        asriClassNames.forEach(className => {
            document.querySelectorAll(className).forEach(el => el.classList.remove(className.slice(1)));
        })
        document.querySelector('#AsriTopbarLeftSpacing')?.remove();
        document.querySelector('#AsriTopbarRightSpacing')?.remove();
        document.querySelector('#AsriPluginsIconsDivider')?.remove();

        // remove js calculated properties
        document.body.style.removeProperty('--mouseX');
        document.body.style.removeProperty('--mouseY');
        document.body.style.removeProperty('--status-height');
        document.documentElement.style.removeProperty('--asri-sys-accent');
        document.documentElement.style.removeProperty('--asri-sys-accent-accessible');
        document.documentElement.style.removeProperty('--asri-sys-accent-grayscale');
        document.documentElement.style.removeProperty('--asri-user-custom-accent');
        document.documentElement.style.removeProperty('--asri-c-factor');
        document.documentElement.style.removeProperty('--asri-c-0');
        document.querySelectorAll('.dock').forEach(dock => {
            dock.style.removeProperty('--border-clr');
        })

        // fix remaining properties
        setTimeout(() => {
            asriDoms.toolbar?.style.removeProperty('--topbar-left-spacing');
            asriDoms.toolbar?.style.removeProperty('--topbar-right-spacing');
            asriDoms.dockr?.style.removeProperty('--avoid-topbar');
            asriDoms.layoutDockr?.style.removeProperty('--avoid-topbar');
            asriDoms.status?.style.removeProperty('max-width');
            asriDoms.status?.style.removeProperty('transform');
            const wndElements = document.body.querySelectorAll('[data-type="wnd"]');
            // console.log(wndElements);
            wndElements.forEach(wnd => {
                const tabbarContainer = wnd.firstElementChild;
                const protyles = wnd.querySelectorAll('.protyle-wysiwyg');

                tabbarContainer?.style.removeProperty('padding-left');
                tabbarContainer?.style.removeProperty('padding-right');
                tabbarContainer?.style.removeProperty('padding-top');
                protyles.forEach(protyle => {
                    protyle.style.removeProperty('--protyle-spacing');
                    protyle.dataset.prevpadding = undefined;
                });
            })

            const layoutTabContainers = asriDoms.layouts?.querySelectorAll('.layout__center .layout-tab-container');
            layoutTabContainers.forEach(tabContainer => {
                tabContainer.style.removeProperty('padding-bottom');
            })
        }, 200);

        document.getElementById('searchList')?.style.removeProperty('padding-bottom');
        document.getElementById('searchPreview')?.style.removeProperty('padding-bottom');
        document.getElementById('viewerContainer')?.style.removeProperty('padding-bottom');
        asriDoms.layouts.querySelectorAll('.card__main').forEach(card => {
            card.style.removeProperty('padding-bottom');
        })

        // restore deleted css rules
        if (asriDeletedRules) {
            for (let i = 0; i < asriDeletedRules.length; i++) {
                let rule = asriDeletedRules[i];
                rule.styleSheet.insertRule(rule.rule, rule.styleSheet.cssRules.length);
            }
        }

        // add transition
        document.body.classList.add('asri-mode-transition');
        setTimeout(() => {
            document.body.classList.remove('asri-mode-transition');
        }, 350);
    }
})();