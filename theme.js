// 思源 API
// [cc-baselib/siYuanApi.js at main · leolee9086/cc-baselib](https://github.com/leolee9086/cc-baselib/blob/main/src/siYuanApi.js)
// Rem Craft/util/api.js

// async function getFile(path) {
//     const response = await fetch('/api/file/getFile', {
//         method: 'POST',
//         headers: {
//             Authorization: `Token ''`,
//         },
//         body: JSON.stringify({
//             path: path,
//         }),
//     });
//     if (response.status === 200) return response;
//     else return null;
// }

// async function putFile(path, filedata, isDir = false, modTime = Date.now()) {
//     let blob = new Blob([filedata]);
//     let file = new File([blob], path.split('/').pop());
//     let formdata = new FormData();
//     formdata.append('path', path);
//     formdata.append('file', file);
//     formdata.append('isDir', isDir);
//     formdata.append('modTime', modTime);
//     const response = await fetch('/api/file/putFile', {
//         body: formdata,
//         method: 'POST',
//         headers: {
//             Authorization: `Token ''`,
//         },
//     });
//     if (response.status === 200) return await response.json();
//     else return null;
// }

// 界面 ————————————


// function isFullScreen() {
//     ipcRenderer.invoke('siyuan-get', { cmd: 'isFullScreen' })
//         .then(isFullscreen => isFullscreen ? true : false);
// }
(function () {
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
    // Safari 不支持 navigator.UserAgentData.platform；浏览器不支持 process.platform
    // const isIpad = navigator.userAgent.indexOf("iPad") > -1; // ipad适用isBrowser的情况
    const isMobile = document.getElementById('sidebar') && document.getElementById('editor');
    const isInBrowser = asriDoms.toolbar?.classList.contains('toolbar--browser') > 0;
    const isMiniWindow = document.body.classList.contains('body--window') > 0;

    let AsriClassNames = [],
        AsriDeletedRules = [],
        AsriObservers = [];

    isMacOS && document.body.classList.add('body--mac'), AsriClassNames.push('.body--mac');
    isLinux && document.body.classList.add('body--linux'), AsriClassNames.push('.body--linux');
    isMobile && document.body.classList.add('body--mobile'), AsriClassNames.push('.body--mobile');
    isInBrowser && document.body.classList.add("body--browser"), AsriClassNames.push('.body--browser');

    // Array.prototype.pushUnique = function (item) {
    //     if (!this.includes(item)) {
    //         this.push(item);
    //     }
    // } // 更改原型方法会导致背景图插件图片缓存被清除 https://ld246.com/article/1707547966037

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
                            if (rule.style.width || rule.style.height || rule.style.backgroundColor) { // 在删除规则之前将其保存
                                AsriDeletedRules.push({ styleSheet: styleSheet, rule: rule.cssText });
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
    function handleWinResize() {
        // if (!isInBrowser && !isMobile) {
        //     let currentWindow = require("@electron/remote").getCurrentWindow();

        //     currentWindow.on('resize', () => {
        //         isWinResizing = true;

        //         clearTimeout(resizeTimeout);
        //         resizeTimeout = setTimeout(function () {
        //             isWinResizing = false;

        //             if (isFullScreen()) {
        //                 document.body.classList.add('body--fullscreen');
        //             } else {
        //                 document.body.classList.remove('body--fullscreen');
        //             }
        //             // calcTopbarSpacings();
        //             // calcTabbarSpacings();
        //         }, 200);
        //     })
        // } 

        isWinResizing = true;
        clearTimeout(winResizeTimeout);
        winResizeTimeout = setTimeout(function () {
            if (!isMiniWindow) {
                isWinResizing = false;
                if (isMacOS) {
                    let AsriTopbarLeftSpacing = document.querySelector('#AsriTopbarLeftSpacing');
                    if (isFullScreen()) {
                        document.body.classList.add('body--fullscreen');
                        // AsriTopbarLeftSpacing?.style.setProperty('width', '0px');
                        // dragRectLeftInitial = asriDoms.drag?.getBoundingClientRect().left;
                        // AsriTopbarLeftSpacing?.style.removeProperty('width');
                        dragRectLeftInitial = fromFullscreen ? dragRectLeftInitial : dragRectLeftInitial - (80 - 8);
                        fromFullscreen = true;
                    } else {
                        document.body.classList.remove('body--fullscreen');
                        AsriTopbarLeftSpacing?.style.setProperty('width', '0px');
                        dragRectLeftInitial = asriDoms.drag?.getBoundingClientRect().left;
                        AsriTopbarLeftSpacing.style.removeProperty('width');
                        // dragRectLeftInitial = fromFullscreen ? dragRectLeftInitial + 80 : dragRectLeftInitial;
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

    if (!isMobile && asriDoms.toolbar) {
        createTopbarElementById('AsriPluginsIconsDivider', undefined, asriDoms.drag);
        (isMacOS && !isInBrowser) ? createTopbarElementById('AsriTopbarLeftSpacing', undefined, asriDoms.barSync) : createTopbarElementById('AsriTopbarLeftSpacing', undefined, asriDoms.barForward);
        (isMacOS || isInBrowser) ? createTopbarElementById('AsriTopbarRightSpacing') : createTopbarElementById('AsriTopbarRightSpacing', asriDoms.barSearch);
    }

    function calcTopbarSpacings(widthChange) {
        if (!isMiniWindow) {
            let pluginsDivider, leftSpacing, rightSpacing, topbar,
                layoutsCenterRect, leftSpacingRect, rightSpacingRect, barSyncRect, dragRect;

            pluginsDivider = document.getElementById('AsriPluginsIconsDivider');
            leftSpacing = document.getElementById('AsriTopbarLeftSpacing');
            rightSpacing = document.getElementById('AsriTopbarRightSpacing');
            topbar = asriDoms.toolbar;

            layoutsCenterRect = asriDoms.layouts.querySelector('.layout__center')?.getBoundingClientRect();
            rightSpacingRect = rightSpacing.getBoundingClientRect();
            barSyncRect = asriDoms.barSync.getBoundingClientRect();
            barForwardRect = asriDoms.barForward.getBoundingClientRect();

            let winWidth = window.innerWidth,
                centerRectLeft = layoutsCenterRect.left,
                centerRectRight = layoutsCenterRect.right;

            function calcAndApply() {
                // 左侧
                if (centerRectLeft > dragRectLeftInitial + 8)
                    topbar.style.setProperty('--topbar-left-spacing', 0),
                        dragRectLeftInitial = fromFullscreen ? dragRectLeftInitial : asriDoms.drag.getBoundingClientRect().left;
                // 每次重新计算 initial
                else if (isMacOS && !isInBrowser) topbar.style.setProperty('--topbar-left-spacing', centerRectLeft - barSyncRect.right + 4 + 'px');
                else topbar.style.setProperty('--topbar-left-spacing', centerRectLeft - barForwardRect.right + 4 + 'px');

                // 右侧
                if (centerRectRight < dragRectRightInitial - 8) {
                    topbar.style.setProperty('--topbar-right-spacing', 0);

                    dragRectRightInitial = asriDoms.drag.getBoundingClientRect().right;

                    //使用 CSS
                    asriDoms.dockr?.style.removeProperty('--avoid-topbar');
                    asriDoms.layoutDockr?.style.removeProperty('--avoid-topbar');
                } else {
                    if (isMacOS || isInBrowser) {
                        topbar.style.setProperty('--topbar-right-spacing', rightSpacingRect.right - centerRectRight + 5 + 'px');
                        // windowControls 占据 2px

                        asriDoms.dockr?.style.setProperty('--avoid-topbar', '4px');
                        asriDoms.layoutDockr?.style.setProperty('--avoid-topbar', '4px')
                    } else {
                        topbar.style.setProperty('--topbar-right-spacing', rightSpacingRect.right - centerRectRight + 7 + 'px');

                        asriDoms.dockr?.style.setProperty('--avoid-topbar', 'calc(var(--toolbar-height) - 6px)');
                        asriDoms.layoutDockr?.style.setProperty('--avoid-topbar', 'calc(var(--toolbar-height) - 6px)')
                    };
                }
            }

            if (!isWinResizing) calcAndApply(); // 窗口resizing时不计算，不然会导致dragRectRightInitial变动，使顶栏右侧图标位置变动
            else dragRectRightInitial = dragRectRightInitial + widthChange;

            (function dividerSwitch() {
                if (centerRectRight < dragRectRightInitial - 8) {
                    // dragRectRightInitial = asriDoms.drag.getBoundingClientRect().right;
                    // 横线
                    pluginsDivider.style.setProperty('--container-bg', 'var(--b3-list-hover)');
                    pluginsDivider.style.left = centerRectRight + 'px';
                    pluginsDivider.style.right = '0';
                    pluginsDivider.style.removeProperty('height');
                    pluginsDivider.style.removeProperty('top');
                }
                else {
                    // if (isWinResizing) dragRectRightInitial = dragRectRightInitial + widthChange;
                    // 竖线
                    dragRect = asriDoms.drag.getBoundingClientRect();
                    pluginsDivider.style.setProperty('--container-bg', 'var(--b3-border-color-trans)');
                    pluginsDivider.style.left = dragRect.right - 10 + 'px';
                    pluginsDivider.style.right = winWidth - dragRect.right + 8 + 'px';
                    pluginsDivider.style.height = '21px';
                    pluginsDivider.style.top = '13.5px';
                }
            })();

            // console.log(`drag左\t\t${dragRectLeftInitial}\ncenter左\t${centerRectLeft}`)
        }
    }

    let wndElements = [];
    function updateWndEls() {
        wndElements = asriDoms.layouts.querySelectorAll('[data-type="wnd"]');
        // let tabWndElements = asriDoms.layouts.querySelectorAll('[data-type="wnd"]'); // 考虑分屏的情况
        // let popoverWndElements = document.querySelectorAll('.block__popover--open .protyle');

        // tabWndElements.forEach(tabWnd => pushUnique(wndElements, tabWnd));
        // popoverWndElements.forEach(popoverWnd => pushUnique(wndElements, popoverWnd));
    }
    function calcTabbarSpacings() {
        if (!isMiniWindow) {
            wndElements.forEach(wnd => {
                let tabbarContainer = wnd.querySelector('.fn__flex-column[data-type="wnd"] > .fn__flex:first-child');
                let tabbarContainerRect = tabbarContainer.getBoundingClientRect();
                let dragRect = asriDoms.drag.getBoundingClientRect();

                // calc & apply tabbarSpacing
                if (isOverlapping(tabbarContainerRect, dragRect)) {
                    let paddingLeftValue = (tabbarContainerRect.left < dragRect.left) ? dragRect.left - tabbarContainerRect.left - 6 + 'px' : '';
                    let paddingRightValue = (tabbarContainerRect.right > dragRect.right) ? tabbarContainerRect.right - dragRect.right + 8 + 'px' : '';

                    tabbarContainer.style.paddingLeft = paddingLeftValue;
                    tabbarContainer.style.paddingRight = paddingRightValue;

                    asriDoms.drag = document.getElementById('drag');

                    // 极窄宽度下添加上边距
                    if ((tabbarContainerRect.right - 200 < dragRect.left && tabbarContainerRect.left < dragRect.left) || (tabbarContainerRect.left + 200 > dragRect.right && tabbarContainerRect.right > dragRect.right)) {
                        tabbarContainer.style.paddingTop = '42px';
                        tabbarContainer.style.paddingLeft = 0;
                        tabbarContainer.style.paddingRight = 0;
                    } else {
                        tabbarContainer.style.removeProperty('padding-top');
                    }
                } else {
                    tabbarContainer.style.paddingLeft = 0;
                    tabbarContainer.style.paddingRight = 0;
                }
            })
        }
    }

    function calcProtyleSpacings() {
        // calc & apply protyleSpacing
        wndElements.forEach(wnd => {
            let protyles = wnd.querySelector('.file-tree') ? [] : wnd.querySelectorAll('.protyle-wysiwyg');

            // 仅在protylePadding有变化时才应用样式
            if (protyles.length > 0) {
                protyles.forEach(protyle => {
                    // let protylePadding = window.getComputedStyle(protyle).paddingLeft;
                    let protylePadding = protyle.style.paddingLeft;
                    if (protylePadding !== protyle.dataset.prevPadding) {
                        protyle.style.setProperty('--protyle-spacing', protylePadding);
                        protyle.dataset.prevPadding = protylePadding;
                        // console.log(protylePadding);
                    }
                })
            }
        })
    }
    function LayoutsCenterResizeObserver() {
        let lytCenter = asriDoms.layouts.querySelector('.layout__center');
        const ro = new ResizeObserver(entries => {
            for (let entry of entries) {
                // 获取当前元素的大小
                const { inlineSize } = entry.contentBoxSize[0];

                // 检查是否是第一次触发resize事件，如果是则跳过计算
                if (!entry.target.dataset.prevWidth) {
                    entry.target.dataset.prevWidth = inlineSize;
                    continue;
                }

                // 获取上一次的宽度
                const prevWidth = parseFloat(entry.target.dataset.prevWidth);

                // 计算宽度变化量
                const widthChange = inlineSize - prevWidth;

                // 保存当前宽度作为下一次的上一次宽度
                entry.target.dataset.prevWidth = inlineSize;

                // handle center resize
                updateWndEls();
                clearTimeout(centerResizeTimeout);
                centerResizeTimeout = setTimeout(() => {
                    statusPosition();
                    // resize过程中持续运行造成卡顿，改在resize结束后运行   
                    calcProtyleSpacings();
                }, 200);
                calcTopbarSpacings(widthChange);
                calcTabbarSpacings();
                dockBg();
            }
        });

        if (lytCenter) ro.observe(lytCenter), AsriObservers.push(ro);
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
                    ro.observe(lytCenter), AsriObservers.push(ro);
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
     * 新小窗页签栏左右边距控制
     */
    // function tabbarSpacinginMiniWindow() {
    //     var toolbarWindowRec = asriDoms.toolbarWindow?.getBoundingClientRect();
    //     var topRightRect = toolbarWindowRec && {
    //         left: toolbarWindowRec.left,
    //         top: 0,
    //         width: toolbarWindowRec.width,
    //         height: toolbarWindowRec.height
    //     }

    //     var topLeftRect = {
    //         left: 0,
    //         top: 0,
    //         width: 80,
    //         height: 48
    //     };

    //     let wndElements = asriDoms.layouts.querySelectorAll('[data-type="wnd"]'); // 考虑分屏的情况

    //     if (wndElements) {
    //         for (let element of wndElements) {
    //             var elementRect = element.getBoundingClientRect();
    //             var layoutTabbar = element.querySelector('.layout-tab-bar:not(.layout-tab-bar--readonly)');

    //             var isOverlappingTopLeft = topLeftRect && isOverlapping(elementRect, topLeftRect);

    //             var isOverlappingTopRight = toolbarWindowRec && isOverlapping(elementRect, topRightRect);


    //             // 左侧红绿灯
    //             if (!isInBrowser && !isMobile && isMacOS) {
    //                 if (isOverlappingTopLeft) {
    //                     layoutTabbar.style.marginLeft = 'var(--b3-toolbar-left-mac)';
    //                 } else {
    //                     layoutTabbar.style.removeProperty('margin-left');
    //                 }
    //             }

    //             // 右侧图标区域
    //             if (isOverlappingTopRight) {
    //                 layoutTabbar.parentNode.style.marginRight = topRightRect.width - 8 + 'px';
    //             } else {
    //                 layoutTabbar.parentNode.style.removeProperty('margin-right');
    //             }
    //         }
    //     }
    // } // 弃用，采用思源自动避让

    /**
     * 
     * @param {'l' | 'r'} dir
     */
    function isSideDockHidden(dir = 'l') {
        return asriDoms[`dock${dir}`] && asriDoms[`dock${dir}`].classList.contains('fn__none')
        // 使用右侧停靠栏计算状态栏位置
        // https://github.com/mustakshif/Asri-for-SiYuan/issues/16
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
                pushUnique(AsriClassNames, '.emojis-container')
            )
        })
    }
    /**
     * 判断 .layout__dock 是否隐藏或浮动
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
     * 边栏面板展开时边栏的背景、边框线变化
     */
    function dockBg() {

        if (asriDoms.dockl && !isMobile && !isMiniWindow) {
            for (let dir of ['l', 'r']) {

                let lyt = asriDoms[`layoutDock${dir}`],
                    dock = asriDoms[`dock${dir}`];

                if (isDockLytPinned(lyt) && isDockLytExpanded(lyt)) {
                    dock.classList.add('dock-layout-expanded');
                    pushUnique(AsriClassNames, '.dock-layout-expanded');
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
     * 计算dock和dock layout展开/收起时状态栏的位置
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

    setTimeout(() => {
        statusPosition();
    }, 200);

    function setStatusHeightVar() {
        if (isStatusHidden()) document.body.style.setProperty('--status-height', '0px');
        else document.body.style.setProperty('--status-height', '32px');
    }

    setStatusHeightVar();

    /**
     * 大纲、反链、搜索列表等在作为标签页显示时，避免被status遮住底部
     */
    function avoidOverlappingWithStatus() {
        if (!asriDoms.status.classList.contains('.fn__none')) {

            let layoutTabContainers = asriDoms.layouts?.querySelectorAll('.layout__center .layout-tab-container');
            let statusRect = asriDoms.status.getBoundingClientRect();

            layoutTabContainers?.forEach(layoutTabContainer => {
                if (layoutTabContainer.querySelector('.file-tree')) {
                    let containerRect = layoutTabContainer.getBoundingClientRect();
                    if (isOverlapping(containerRect, statusRect)) {
                        layoutTabContainer.style.paddingBottom = '35px'
                    } else {
                        layoutTabContainer.style.removeProperty('padding-bottom');
                    }
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
            asriDoms.layouts.querySelectorAll('.card__main').forEach(card => {
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
     * 判断两个元素是否有重叠部分。传入两个rect, 参照 getBoundingClientRect() 的属性标准
     * @param {*} elementRect 
     * @param {*} targetRect 
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

    /**
     * 文档树聚焦条目参考线
     */
    function formatIndentGuidesForFocusedItems() {
        if (!isMobile) {
            let listItemsFocus = asriDoms.layouts.querySelectorAll('.file-tree .b3-list-item--focus');

            asriDoms.layouts.querySelectorAll('.file-tree .has-focus').forEach(oldUl => oldUl.classList.remove('has-focus'));

            for (let li of listItemsFocus) {
                if (!li.nextElementSibling || (li.nextElementSibling.tagName !== 'UL' || li.nextElementSibling.classList.contains('fn__none'))) {
                    li.parentNode.classList.add('has-focus');
                    pushUnique(AsriClassNames, '.has-focus');
                }
            }
        }
    }
    formatIndentGuidesForFocusedItems();

    function formatProtyleWithBgImageOnly() {
        let protyleBgs = asriDoms.layouts?.querySelectorAll('.protyle .protyle-background');

        protyleBgs.forEach(protyleBg => {
            if (!protyleBg.querySelector('.protyle-background__img img')?.classList.contains('fn__none') && protyleBg.querySelector('.protyle-background__icon.fn__none')) {
                protyleBg.classList.add('without-icon');
                pushUnique(AsriClassNames, '.without-icon');
            } else {
                protyleBg.classList.remove('without-icon')
            }
        })
    }

    /**
     * 设置单个类型变动的监视
     * @param {String} type mutation type 
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
     * 设置多种类型变动的监视
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
        if (topbar) topObserver.observe(topbar, { [type]: true }), AsriObservers.push(topObserver);
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
        AsriObservers.push(bodyObserver);
    }

    function statusObsever(type, func) {
        let status = asriDoms.status;
        let statusObsever = setSimpleMutationObserver(type, func);
        if (status) statusObsever.observe(status, { [type]: true }), AsriObservers.push(statusObsever);
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
        if (dock) dockObserver.observe(dock, { [type]: true }), AsriObservers.push(dockObserver);
    } // {[type]: true} 使用了计算属性名（computed property name）的语法

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

        // 解决部分情况下layoutDock元素加载滞后于此js而出现无法启动监视的情况
        if (dockLayout) dockLytObserver.observe(dockLayout, config), AsriObservers.push(dockLytObserver);
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
                    AsriObservers.push(dockLytObserver);
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
        lytsObserver.observe(layouts, config); AsriObservers.push(lytsObserver);
    }

    // 开始监视变化
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
            // //顶栏
            // topbarObserver('childList', () => {
            //     topbar.style.setProperty('--topbar-left-spacing', 0);
            //     topbar.style.setProperty('--topbar-right-spacing', 0);

            //     dragleftRectRightInitial = asriDoms.drag.getBoundingClientRect().left;
            //     dragRectRightInitial = asriDoms.drag.getBoundingClientRect().right;
            // })

            // // 左栏dock
            // dockObserver('l', 'attributes', () => {
            //     asriDoms.dockl = document.getElementById('dockLeft');
            //     // tabbarSpacing();
            // });
            // // 右栏dock
            // dockObserver('r', 'attributes', () => {
            //     asriDoms.dockr = document.getElementById('dockRight');
            //     // statusPosition();
            //     avoidOverlappingWithStatus();
            // });

            // 左栏面板
            dockLayoutObserver(
                'l',
                undefined,
                () => {
                    setTimeout(() => {
                        asriDoms.layoutDockl = document.querySelector('.layout__dockl');
                        // tabbarSpacing();
                        avoidOverlappingWithStatus();
                    }, 200); // 动画之后
                    // 左栏dock背景
                    dockBg();
                }
            )

            // 右栏面板
            dockLayoutObserver(
                'r',
                undefined,
                () => {
                    setTimeout(() => {
                        asriDoms.layoutDockr = document.querySelector('.layout__dockr');
                        // statusPosition();
                        avoidOverlappingWithStatus();
                    }, 200);
                    //右栏dock背景
                    dockBg();
                }
            )

            // 状态栏
            statusObsever('attributes', setStatusHeightVar);

            // 中心布局
            layoutsObserver(
                // childList mutation func
                () => {
                    // asriDoms.layouts = document.getElementById('layouts');
                    setTimeout(() => {
                        updateWndEls();
                        calcTabbarSpacings();
                        calcProtyleSpacings();
                        // 适用于分屏操作时

                        // statusPosition();
                    }, 200);
                    // runWhenIdle(formatSyBacklinkItemsLayout);
                    formatIndentGuidesForFocusedItems();
                    formatProtyleWithBgImageOnly();
                    avoidOverlappingWithStatus();
                    addDockbClassName();
                },
                undefined,
                undefined,
                true
            )
        } else {
            layoutsObserver(
                () => {
                    setTimeout(() => {
                        updateWndEls();
                        calcProtyleSpacings();
                        // 适用于分屏操作时
                    }, 200);
                    avoidOverlappingWithStatus();
                    formatProtyleWithBgImageOnly();
                },
                undefined,
                undefined,
                true
            )
        }
    }

    // /**
    //  * 根据当前帧是否还有剩余的空闲时间选择是否执行任务
    //  * @param {Function} task 
    //  * @param {Function} callback 
    //  */
    // function _runTask(task, callback) {
    //     requestIdleCallback((idle) => {
    //         if (idle.timeRemaining() > 0) {
    //             task();
    //             callback()
    //         } else _runTask(task, callback)
    //     })
    // }

    // function runWhenIdle(func) {
    //     requestIdleCallback((idle) => {
    //         if (idle.timeRemaining() > 0) {
    //             func();
    //         } else runWhenIdle(func)
    //     })
    // }

    function handleDblClick(event) {
        document.body.style.setProperty('--mouseX', event.clientX + 'px');
        document.body.style.setProperty('--mouseY', event.clientY + 'px');
    }

    window.addEventListener('dblclick', handleDblClick);

    window.destroyTheme = () => {

        let htmlElement = document.documentElement;
        let themeMode = htmlElement.getAttribute('data-theme-mode');
        let lightTheme = htmlElement.getAttribute('data-light-theme');
        let darkTheme = htmlElement.getAttribute('data-dark-theme');

        // let switchBetweenAsriThemes = (themeMode === 'light' && (darkTheme === 'Asri-for-SiYuan' || darkTheme === 'Asri')) || (themeMode === 'dark' && (lightTheme === "Asri-for-SiYuan" || lightTheme === 'Asri'));

        // let toDiffTheme = (themeMode === 'light' && (darkTheme !== "Asri-for-SiYuan" || darkTheme !== 'Asri')) || (themeMode === 'dark' && (lightTheme !== "Asri-for-SiYuan" || lightTheme !== 'Asri'));

        // 取消事件监听
        window.removeEventListener('dblclick', handleDblClick);
        window.removeEventListener('resize', handleWinResize);

        // 取消所有变动观察
        AsriObservers.forEach(observer => observer.disconnect());

        // 恢复 traffic light 位置
        if (isMacOS && !isInBrowser) setTrafficLightPosition(8);
        if (isMacOS && isMiniWindow) setTrafficLightPosition(8, 13);

        // 删除添加的类名和元素
        AsriClassNames.forEach(className => {
            document.querySelectorAll(className).forEach(el => el.classList.remove(className.slice(1)));
        })
        document.querySelector('#AsriTopbarLeftSpacing')?.remove();
        document.querySelector('#AsriTopbarRightSpacing')?.remove();
        document.querySelector('#AsriPluginsIconsDivider')?.remove();

        // 移除 js 样式属性
        document.body.style.removeProperty('--mouseX');
        document.body.style.removeProperty('--mouseY');
        asriDoms.topbar?.style.removeProperty('--topbar-left-spacing');
        asriDoms.topbar?.style.removeProperty('--topbar-right-spacing');
        asriDoms.topbar?.style.removeProperty('--avoid-topbar');
        asriDoms.status?.style.removeProperty('max-width');
        asriDoms.status?.style.removeProperty('transform');
        asriDoms.status?.style.removeProperty('--status-height');

        let wndElements = asriDoms.layouts?.querySelectorAll('[data-type="wnd"]');
        wndElements.forEach(wnd => {
            let tabbarContainer = wnd.querySelector('.fn__flex-column[data-type="wnd"] > .fn__flex:first-child');
            let protyles = wnd.querySelectorAll('.protyle-wysiwyg');

            tabbarContainer.style.removeProperty('padding-left');
            tabbarContainer.style.removeProperty('padding-right');
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

        // 还原被删除的规则
        if (AsriDeletedRules) {
            for (let i = 0; i < AsriDeletedRules.length; i++) {
                let rule = AsriDeletedRules[i];
                rule.styleSheet.insertRule(rule.rule, rule.styleSheet.cssRules.length);
            }
        }
        // console.log('Asri theme destroyed!');
    }
})();