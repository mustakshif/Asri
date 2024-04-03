(function () {
    // SiYuan API
    // [cc-baselib/siYuanApi.js at main · leolee9086/cc-baselib](https://github.com/leolee9086/cc-baselib/blob/main/src/siYuanApi.js)
    // Rem Craft/util/api.js

    async function getFile(path) {
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

    if (!isMobile && asriDoms.toolbar) {
        createTopbarElementById('AsriPluginsIconsDivider', undefined, asriDoms.drag);
        (isMacOS && !isInBrowser) ? createTopbarElementById('AsriTopbarLeftSpacing', undefined, asriDoms.barSync) : createTopbarElementById('AsriTopbarLeftSpacing', undefined, asriDoms.barForward);
        (isMacOS || isInBrowser) ? createTopbarElementById('AsriTopbarRightSpacing') : createTopbarElementById('AsriTopbarRightSpacing', asriDoms.barSearch);
    }

    const pluginsDivider = document.getElementById('AsriPluginsIconsDivider');
    // const leftSpacing = document.getElementById('AsriTopbarLeftSpacing');
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

    let asriConfigs = {
        followSysAccentColor: "1",
        useGrayScale: "0",
        userCustomColor: ""
    };

    let sysAccentColor, followSysAccentColor, useGrayScale, userCustomColor;

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
                useGrayScale = Number(data?.useGrayScale || asriConfigs.useGrayScale);
                userCustomColor = data?.userCustomColor || asriConfigs.userCustomColor;

                asriConfigs.followSysAccentColor = data?.followSysAccentColor || '1';
                asriConfigs.useGrayScale = data?.useGrayScale || '0';
                asriConfigs.userCustomColor = data?.userCustomColor || '';
            });
    }

    getAsriConfigs().then(() => {
        supportsOklch && customizeThemeColor();
    });

    async function updateAsriConfigs() {
        await putFile("/data/snippets/Asri.config.json", JSON.stringify(asriConfigs, undefined, 4));
    }

    function customizeThemeColor() {
        let followSysAccentBtn, pickColorBtn, useGrayScaleBtn;
        const i18nMenuItems = {
            'zh_CN': {
                'followSysAccent': '跟随系统强调色',
                'pickColor': '自定义主题色',
                'useGrayScale': '启用纯灰度中性色'
            },
            'zh_CHT': {
                'followSysAccent': '跟隨系統強調色',
                'pickColor': '自定義主題色',
                'useGrayScale': '啟用純灰階中性色'
            },
            'en_US': {
                'followSysAccent': 'Follow system accent color',
                'pickColor': 'Customize theme color',
                'useGrayScale': 'Use grayscale neutral colors'
            },
        }

        // check local configs to set initial theme color
        if (!(isInBrowser || isMobile || isLinux)) {
            if (followSysAccentColor) document.documentElement.style.removeProperty('--asri-user-custom-accent');
            else document.documentElement.style.setProperty('--asri-user-custom-accent', userCustomColor);

            if (useGrayScale || (hexToHSL(sysAccentColor).s == 0 && followSysAccentColor)) document.documentElement.style.setProperty('--asri-sys-accent-grayscale', '#000000');
            else document.documentElement.style.removeProperty('--asri-sys-accent-grayscale');
        } else {
            document.documentElement.style.setProperty('--asri-user-custom-accent', userCustomColor);

            if (useGrayScale) document.documentElement.style.setProperty('--asri-sys-accent-grayscale', '#000000');
            else document.documentElement.style.removeProperty('--asri-sys-accent-grayscale');
        }

        // create menu items and handle click events
        setTimeout(() => {
            // create menu items
            const barModeMenuItems = document.querySelector('#commonMenu[data-name="barmode"] .b3-menu__items');
            if (!barModeMenuItems) return;

            const asriConfigElId = ['pickColor', 'followSysAccent', 'useGrayScale'];
            const separator = document.createElement('button');
            const asriConfigFrag = new DocumentFragment();
            asriConfigElId.forEach(id => {
                const btn = document.createElement('button');
                btn.id = id;
                btn.classList.add('b3-menu__item', 'asri-config');
                btn.innerHTML = `
                        <svg class="b3-menu__icon"></svg>
                        <label class="b3-menu__label">${(lang === 'zh_CN' || lang === 'zh_CHT') ? i18nMenuItems[lang][id] : i18nMenuItems['en_US'][id]}</label>
                        <input type="color" value="${userCustomColor || "#3478f6"}">
                    `;
                asriConfigFrag.append(btn);
            });

            separator.classList.add('b3-menu__separator', 'asri-config');
            asriConfigFrag.insertBefore(separator, asriConfigFrag.firstChild);
            barModeMenuItems.append(asriConfigFrag);
            pushUnique(asriClassNames, '.asri-config');

            // set funcitons for menu items
            followSysAccentBtn = document.getElementById('followSysAccent');
            pickColorBtn = document.getElementById('pickColor');
            useGrayScaleBtn = document.getElementById('useGrayScale');
            colorPicker = pickColorBtn.querySelector('input');

            pickColorBtn.querySelector('label').setAttribute('for', 'asriColorPicker');
            colorPicker.id = 'asriColorPicker';

            // check local configs to determine the initial state of the menu items
            if (followSysAccentColor) followSysAccentBtn.classList.add('b3-menu__item--selected'), pickColorBtn.classList.remove('b3-menu__item--selected');
            else followSysAccentBtn.classList.remove('b3-menu__item--selected'), pickColorBtn.classList.add('b3-menu__item--selected');

            if (useGrayScale) useGrayScaleBtn.classList.add('b3-menu__item--selected');
            else useGrayScaleBtn.classList.remove('b3-menu__item--selected');

            // handle click events
            if (isInBrowser || isMobile || isLinux) {
                // followSysAccentColor = false;
                followSysAccentBtn.classList.add('fn__none');
            } else {
                followSysAccentBtn.addEventListener('click', () => {
                    if (!followSysAccentColor) {
                        followSysAccentBtn.classList.add('b3-menu__item--selected');
                        pickColorBtn.classList.remove('b3-menu__item--selected');
                        document.documentElement.style.removeProperty('--asri-user-custom-accent');
                        getSystemAccentColor();
                        
                        if (hexToHSL(sysAccentColor).s == 0) document.documentElement.style.setProperty('--asri-sys-accent-grayscale', '#000000');
                        else if (!useGrayScale) document.documentElement.style.removeProperty('--asri-sys-accent-grayscale');

                        followSysAccentColor = true;
                        asriConfigs.followSysAccentColor = '1';
                        updateAsriConfigs();
                    } else {
                        followSysAccentBtn.classList.remove('b3-menu__item--selected');
                        pickColorBtn.classList.add('b3-menu__item--selected');
                        document.documentElement.style.setProperty('--asri-user-custom-accent', userCustomColor || sysAccentColor || '#3478f6');
                        if (!useGrayScale) document.documentElement.style.removeProperty('--asri-sys-accent-grayscale');

                        followSysAccentColor = false;
                        asriConfigs.followSysAccentColor = '0';
                        updateAsriConfigs();
                    }
                });
            }

            colorPicker.addEventListener('input', () => {
                document.documentElement.style.setProperty('--asri-user-custom-accent', colorPicker.value);
            });
            colorPicker.addEventListener('change', () => {
                followSysAccentBtn.classList.remove('b3-menu__item--selected');
                pickColorBtn.classList.add('b3-menu__item--selected');

                if(!useGrayScale) document.documentElement.style.removeProperty('--asri-sys-accent-grayscale');

                userCustomColor = colorPicker.value;
                asriConfigs.userCustomColor = colorPicker.value;
                followSysAccentColor = false;
                asriConfigs.followSysAccentColor = '0';
                updateAsriConfigs();
            });

            useGrayScaleBtn.addEventListener('click', () => {
                if (!useGrayScale) {
                    useGrayScaleBtn.classList.add('b3-menu__item--selected');
                    document.documentElement.style.setProperty('--asri-sys-accent-grayscale', '#000000');

                    useGrayScale = true;
                    asriConfigs.useGrayScale = '1';
                    updateAsriConfigs();
                } else {
                    useGrayScaleBtn.classList.remove('b3-menu__item--selected');
                    if (!(followSysAccentColor && hexToHSL(sysAccentColor)?.s === 0)) document.documentElement.style.removeProperty('--asri-sys-accent-grayscale');

                    useGrayScale = false;
                    asriConfigs.useGrayScale = '0';
                    updateAsriConfigs();
                }
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

                if (accentHSLObj.s === 0) document.documentElement.style.setProperty('--asri-sys-accent-grayscale', accentHex);
                else if (!useGrayScale) document.documentElement.style.removeProperty('--asri-sys-accent-grayscale');

                document.body.classList.add('asri-mode-transition');
                setTimeout(() => {
                    document.body.classList.remove('asri-mode-transition');
                }, 350);

                sysAccentColor = accentHex;
            }
        }
    }
    supportsOklch && getSystemAccentColor();
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

    function isFullScreen() {
        return !isInBrowser && require("@electron/remote").getCurrentWindow().isFullScreen();
    }

    function setTrafficLightPosition(x, y = x) {
        require("@electron/remote").getCurrentWindow().setWindowButtonPosition({ x: x, y: y });
    }

    if (isMacOS && !isInBrowser) setTrafficLightPosition(16);
    if (isMacOS && isMiniWindow) setTrafficLightPosition(14);

    (function useSysScrollbar() {
        if (isMacOS) {
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
                if (centerRectLeft > dragRectLeftInitial + 8)
                    topbar.style.setProperty('--topbar-left-spacing', 0),
                        dragRectLeftInitial = fromFullscreen ? dragRectLeftInitial : asriDoms.drag.getBoundingClientRect().left;
                // recalc initial everytime

                else if (isMacOS && !isInBrowser) topbar.style.setProperty('--topbar-left-spacing', centerRectLeft - barSyncRect.right + 4 + 'px');
                else topbar.style.setProperty('--topbar-left-spacing', centerRectLeft - barForwardRect.right + 4 + 'px');

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
                        if (protylePadding !== protyle.dataset.prevPadding) {
                            protyle.style.setProperty('--protyle-spacing', protylePadding);
                            protyle.dataset.prevPadding = protylePadding;
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
    function addDockbClassName() {
        if (hasDockb()) {
            asriDoms.toolbar?.nextElementSibling.classList.add('has-dockb')
        } else {
            asriDoms.toolbar?.nextElementSibling.classList.remove('has-dockb');
        }
    }

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
                followSysAccentColor && supportsOklch && getSystemAccentColor();
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
        asriDoms.topbar?.style.removeProperty('--topbar-left-spacing');
        asriDoms.topbar?.style.removeProperty('--topbar-right-spacing');
        asriDoms.topbar?.style.removeProperty('--avoid-topbar');
        asriDoms.status?.style.removeProperty('max-width');
        asriDoms.status?.style.removeProperty('transform');
        asriDoms.status?.style.removeProperty('--status-height');
        document.documentElement.style.removeProperty('--asri-sys-accent');
        document.documentElement.style.removeProperty('--asri-sys-accent-accessible');
        document.documentElement.style.removeProperty('--asri-sys-accent-grayscale');
        document.documentElement.style.removeProperty('--asri-user-custom-accent');

        let wndElements = asriDoms.layouts?.querySelectorAll('[data-type="wnd"]');
        wndElements.forEach(wnd => {
            let tabbarContainer = wnd.querySelector('.fn__flex-column[data-type="wnd"] > .fn__flex:first-child');
            let protyles = wnd.querySelectorAll('.protyle-wysiwyg');

            tabbarContainer.style.removeProperty('padding-left');
            tabbarContainer.style.removeProperty('padding-right');
            tabbarContainer.style.removeProperty('padding-top');
            protyles.forEach(protyle => {
                protyle.style.removeProperty('--protyle-spacing');
                protyle.dataset.prevPadding = undefined;
            });
        })

        let layoutTabContainers = asriDoms.layouts?.querySelectorAll('.layout__center .layout-tab-container');
        layoutTabContainers.forEach(tabContainer => {
            tabContainer.style.removeProperty('padding-bottom');
        })

        document.getElementById('searchList')?.style.removeProperty('padding-bottom');
        document.getElementById('searchPreview')?.style.removeProperty('padding-bottom');
        document.getElementById('viewerContainer')?.style.removeProperty('padding-bottom');
        asriDoms.layouts.querySelectorAll('.card__main').forEach(card => {
            card.style.removeProperty('padding-bottom');
        })
        document.querySelectorAll('.dock').forEach(dock => {
            dock.style.removeProperty('--border-clr');
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