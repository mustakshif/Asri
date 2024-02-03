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

class Asri {
    constructor() {
        this.doms = {
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

        this.isMacOS = navigator.platform.indexOf("Mac") > -1;
        this.isLinux = navigator.platform.indexOf("Linux") > -1;
        // Safari 不支持 navigator.UserAgentData.platform；浏览器不支持 process.platform
        // this.isIpad = navigator.userAgent.indexOf("iPad") > -1; // ipad适用isBrowser的情况
        this.isMobile = document.getElementById('sidebar') && document.getElementById('editor');
        this.isInBrowser = this.doms.toolbar?.classList.contains('toolbar--browser') > 0;
        this.isMiniWindow = document.body.classList.contains('body--window') > 0;
    }
}

let AsriEnv = new Asri();
let AsriDom = AsriEnv.doms;
let isMacOS = AsriEnv.isMacOS,
    isLinux = AsriEnv.isLinux,
    isMobile = AsriEnv.isMobile,
    isInBrowser = AsriEnv.isInBrowser,
    isMiniWindow = AsriEnv.isMiniWindow;

let AsriClassNames = [],
    AsriDeletedRules = [],
    AsriObservers = [];

isMacOS && document.body.classList.add('body--mac'), AsriClassNames.push('.body--mac');
isLinux && document.body.classList.add('body--linux'), AsriClassNames.push('.body--linux');
isMobile && document.body.classList.add('body--mobile'), AsriClassNames.push('.body--mobile');
isInBrowser && document.body.classList.add("body--browser"), AsriClassNames.push('.body--browser');

/**
 * pushUnique 方法用于向数组中添加一个唯一的元素。
 * 如果元素已经存在于数组中，那么这个方法不会做任何事情。
 * 如果元素不存在于数组中，那么这个方法会将其添加到数组的末尾。
 *
 * @param {any} item - 要添加到数组中的元素。
 */
Array.prototype.pushUnique = function(item) {
    if (!this.includes(item)) {
        this.push(item);
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
                        // 在删除规则之前将其保存
                        AsriDeletedRules.push({ styleSheet: styleSheet, rule: rule.cssText });
                        styleSheet.deleteRule(j);
                        j--;
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
})();

// function handleToolbarHover() {
//     let toolbarDrag = document.getElementById('drag');
//     if (toolbarDrag) {
//         toolbarDrag.addEventListener('mouseenter', () => {
//             AsriDom.toolbar.classList.add('no-hover');
//         });
//         toolbarDrag.addEventListener('mouseleave', () => {
//             AsriDom.toolbar.classList.remove('no-hover');
//         });
//     }
// }

// // handleToolbarHover();

// async function toolbarTutorial() {
//     let toolbar = AsriDom.toolbar;

//     let hasPlayedToolbarTutorial = await getFile("/data/snippets/Hadeeth.config.json")
//         .then((response) => {
//             if (response && response.status === 200) {
//                 return response.json();
//             }
//             return null;
//         })
//         .then((data) => {
//             if (data && data.hasPlayedToolbarTutorial === "1") {
//                 return true;
//             }
//             return false;
//         });

//     if (toolbar && !hasPlayedToolbarTutorial) {
//         toolbar.classList.add("hadeeth-toolbar-tutorial");

//         await putFile("/data/snippets/Hadeeth.config.json", JSON.stringify({ hasPlayedToolbarTutorial: "1" }, undefined, 4));

//         setTimeout(() => {
//             toolbar.classList.remove("hadeeth-toolbar-tutorial");
//         }, 7000);
//     }
// }

// // toolbarTutorial();

/**
 * 
 * @param {string} newid 
 * @param {node} before 
 * @param {node} after 
 */
function createTopbarElementById(newId, before = undefined, after = undefined) {
    let newDiv = document.createElement('div');
    newDiv.id = newId;

    if (before) {
        AsriDom.toolbar.insertBefore(newDiv, before);
    } else if (after) {
        AsriDom.toolbar.insertBefore(newDiv, after.nextSibling);
    } else {
        AsriDom.toolbar.appendChild(newDiv);
    }
}

let isWinResizing = false, resizeTimeout;

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
    let fromFullscreen;
    isWinResizing = true;
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
        isWinResizing = false;
        if (isMacOS && isFullScreen()) {
            document.body.classList.add('body--fullscreen');
            dragRectLeftInitial = dragRectLeftInitial - 80;
            fromFullscreen = true;
        } else {
            document.body.classList.remove('body--fullscreen');
            dragRectLeftInitial = fromFullscreen ? AsriDom.drag?.getBoundingClientRect().left : dragRectLeftInitial;
            fromFullscreen = false;
        }
        calcTopbarSpacings();
        calcTabbarSpacings();
    }, 200);
}

let dragRectLeftInitial = AsriDom.drag?.getBoundingClientRect().left,
    dragRectRightInitial = AsriDom.drag?.getBoundingClientRect().right;

if (!isMobile && AsriDom.toolbar) {
    createTopbarElementById('AsriPluginsIconsDivider', undefined, AsriDom.drag);
    (isMacOS && !isInBrowser) ? createTopbarElementById('AsriTopbarLeftSpacing', undefined, AsriDom.barSync) : createTopbarElementById('AsriTopbarLeftSpacing', undefined, AsriDom.barForward);
    (isMacOS || isInBrowser) ? createTopbarElementById('AsriTopbarRightSpacing') : createTopbarElementById('AsriTopbarRightSpacing', AsriDom.barSearch);
}

function calcTopbarSpacings(widthChange) {
    let pluginsDivider, leftSpacing, rightSpacing, topbar,
        layoutsCenterRect, leftSpacingRect, rightSpacingRect, barSyncRect, dragRect;

    pluginsDivider = document.getElementById('AsriPluginsIconsDivider');
    leftSpacing = document.getElementById('AsriTopbarLeftSpacing');
    rightSpacing = document.getElementById('AsriTopbarRightSpacing');
    topbar = AsriDom.toolbar;

    layoutsCenterRect = AsriDom.layouts.querySelector('.layout__center').getBoundingClientRect();
    rightSpacingRect = rightSpacing.getBoundingClientRect();
    barSyncRect = AsriDom.barSync.getBoundingClientRect();
    barForwardRect = AsriDom.barForward.getBoundingClientRect();

    let winWidth = window.innerWidth,
        centerRectLeft = layoutsCenterRect.left,
        centerRectRight = layoutsCenterRect.right;

    function calcAndApply() {
        // 左侧
        if (centerRectLeft > dragRectLeftInitial + 8)
            topbar.style.setProperty('--topbar-left-spacing', 0),
                dragRectLeftInitial = AsriDom.drag.getBoundingClientRect().left;
        // 每次重新计算 initial
        else if (isMacOS && !isInBrowser) topbar.style.setProperty('--topbar-left-spacing', centerRectLeft - barSyncRect.right + 4 + 'px');
        else topbar.style.setProperty('--topbar-left-spacing', centerRectLeft - barForwardRect.right + 4 + 'px');

        // 右侧
        if (centerRectRight < dragRectRightInitial - 8) {
            topbar.style.setProperty('--topbar-right-spacing', 0);

            dragRectRightInitial = AsriDom.drag.getBoundingClientRect().right;

            //使用 CSS
            AsriDom.dockr?.style.removeProperty('--avoid-topbar');
            AsriDom.layoutDockr?.style.removeProperty('--avoid-topbar');
        } else {
            if (isMacOS || isInBrowser) {
                topbar.style.setProperty('--topbar-right-spacing', rightSpacingRect.right - centerRectRight + 5 + 'px');
                // windowControls 占据 2px

                AsriDom.dockr?.style.setProperty('--avoid-topbar', '4px');
                AsriDom.layoutDockr?.style.setProperty('--avoid-topbar', '4px')
            } else {
                topbar.style.setProperty('--topbar-right-spacing', rightSpacingRect.right - centerRectRight + 7 + 'px');

                AsriDom.dockr?.style.setProperty('--avoid-topbar', 'calc(var(--toolbar-height) - 6px)');
                AsriDom.layoutDockr?.style.setProperty('--avoid-topbar', 'calc(var(--toolbar-height) - 6px)')
            };
        }
    }

    if (!isWinResizing) calcAndApply(); // 窗口resizing时不计算，不然会导致dragRectRightInitial变动，使顶栏右侧图标位置变动
    else dragRectRightInitial = dragRectRightInitial + widthChange;

    (function dividerSwitch() {
        if (centerRectRight < dragRectRightInitial - 8) {
            // dragRectRightInitial = AsriDom.drag.getBoundingClientRect().right;
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
            dragRect = AsriDom.drag.getBoundingClientRect();
            pluginsDivider.style.setProperty('--container-bg', 'var(--b3-border-color-trans)');
            pluginsDivider.style.left = dragRect.right - 10 + 'px';
            pluginsDivider.style.right = winWidth - dragRect.right + 8 + 'px';
            pluginsDivider.style.height = '21px';
            pluginsDivider.style.top = '13.5px';
        }
    })();

    // console.log(`drag左\t\t${dragRectLeftInitial}\ncenter左\t${centerRectLeft}`)
}

function calcTabbarSpacings() {
    let wndElements = AsriDom.layouts.querySelectorAll('[data-type="wnd"]'); // 考虑分屏的情况

    wndElements.forEach(wnd => {
        let tabbarContainer = wnd.querySelector('.fn__flex-column[data-type="wnd"] > .fn__flex:first-child');
        let tabbarContainerRect = tabbarContainer.getBoundingClientRect();
        let dragRect = AsriDom.drag.getBoundingClientRect();

        if (isOverlapping(tabbarContainerRect, dragRect)) {
            let paddingLeftValue = (tabbarContainerRect.left < dragRect.left) ? dragRect.left - tabbarContainerRect.left - 6 + 'px' : '';
            let paddingRightValue = (tabbarContainerRect.right > dragRect.right) ? tabbarContainerRect.right - dragRect.right + 8 + 'px' : '';

            tabbarContainer.style.paddingLeft = paddingLeftValue;
            tabbarContainer.style.paddingRight = paddingRightValue;

            AsriDom.drag = document.getElementById('drag');

            // 极窄宽度下添加上边距
            if (tabbarContainerRect.right - 200 < dragRect.left || tabbarContainerRect.left + 200 > dragRect.right) {
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

function LayoutsCenterResizeObserver() {
    let lytCenter = AsriDom.layouts.querySelector('.layout__center');
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

            handleCenterResize(widthChange);
        }
    });

    if (lytCenter) ro.observe(lytCenter), AsriObservers.push(ro);
    else {
        let count = 0,
            maxCount = 10;
        let tryGetLytCenter;

        function updateLytCenter() {
            AsriDom.layouts = document.getElementById('layouts');
            lytCenter = AsriDom.layouts.querySelector('.layout__center');
            count++;
            if (count === maxCount || lytCenter) {
                clearInterval(tryGetLytCenter);
                // AsriDom.layouts = document.getElementById('layouts');
                ro.observe(lytCenter), AsriObservers.push(ro);
            }
        }
        setTimeout(() => {
            tryGetLytCenter = setInterval(updateLytCenter, 1000);
        }, 0);
    }
}

function handleCenterResize(widthChange) {
    calcTopbarSpacings(widthChange);
    calcTabbarSpacings();
    statusPositon();
    dockBg();
}

if (!isMobile && !isMiniWindow) {
    setTimeout(calcTopbarSpacings, 200);
    LayoutsCenterResizeObserver();
    window.addEventListener('resize', handleWinResize);
}

/**
 * 新小窗页签栏左右边距控制
 */
// function tabbarSpacinginMiniWindow() {
//     var toolbarWindowRec = AsriDom.toolbarWindow?.getBoundingClientRect();
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

//     let wndElements = AsriDom.layouts.querySelectorAll('[data-type="wnd"]'); // 考虑分屏的情况

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
    return AsriDom[`dock${dir}`] && AsriDom[`dock${dir}`].classList.contains('fn__none')
    // 使用右侧停靠栏计算状态栏位置
    // https://github.com/mustakshif/Asri-for-SiYuan/issues/16
}
function hasDockb() {
    return AsriDom.dockb && !AsriDom.dockb.classList.contains('fn__none');
}
function addDockbClassName() {
    if (hasDockb()) {
        AsriDom.toolbar?.nextElementSibling.classList.add('has-dockb')
    } else {
        AsriDom.toolbar?.nextElementSibling.classList.remove('has-dockb');
    }
}

function isStatusHidden() {
    return AsriDom.status && AsriDom.status.classList.contains('fn__none');
}

function addEmojiDialogClassName() {
    // emoji dialog
    let dialogs = document.querySelectorAll('.b3-dialog--open .b3-dialog');
    dialogs.forEach(dialog => {
        dialog.querySelector('.emojis') && (dialog.classList.add('emojis-container'), AsriClassNames.pushUnique('.emojis-container'));
    })
}
/**
 * 判断 .layout__dock 是否隐藏或浮动
 * @param {'l' | 'r' | 'b'} direction
 */
function isLayoutDockHidden(direction) {
    let layoutDockNew = AsriDom[`layoutDock${direction}`];
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

    if (AsriDom.dockl && !isMobile) {
        for (let dir of ['l', 'r']) {

            let lyt = AsriDom[`layoutDock${dir}`],
                dock = AsriDom[`dock${dir}`];

            if (isDockLytPinned(lyt) && isDockLytExpanded(lyt)) {
                dock.classList.add('dock-layout-expanded'),
                AsriClassNames.pushUnique('.dock-layout-expanded');
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
function statusPositon() {
    if (!isMobile) {
        if (!hasDockb()) {
            function setStatusTransform(x, y) {
                AsriDom.status.style.transform = `translate(${x}px, ${y}px)`;
            }

            let layoutCenter = AsriDom.layouts.querySelector('.layout__center');

            if (layoutCenter && AsriDom.layoutDockr && !AsriDom.status.classList.contains('.fn__none')) {
                let layoutDockrWidth = AsriDom.layoutDockr.clientWidth;
                let layoutCenterWidth = layoutCenter.clientWidth;

                AsriDom.layoutDockb = AsriDom.layouts.querySelector('.layout__dockb');
                if (AsriDom.layoutDockb && isDockLytPinned(AsriDom.layoutDockb)) var y = AsriDom.layoutDockb.clientHeight * -1;
                else y = 0;

                AsriDom.status.style.maxWidth = layoutCenterWidth - 12 + 'px';

                let isDockRightHidden = isSideDockHidden('r'),
                    isLayoutDockRightHidden = isLayoutDockHidden('r');

                if (isDockRightHidden && isLayoutDockRightHidden) setStatusTransform(0, y);
                else if (!isDockRightHidden && isLayoutDockRightHidden) setStatusTransform(-40, y);
                else if (!isDockRightHidden && !isLayoutDockRightHidden) setStatusTransform((layoutDockrWidth + 40) * -1, y);
                else if (isDockRightHidden && !isLayoutDockRightHidden) setStatusTransform(layoutDockrWidth * -1, y);

                AsriDom.status = document.getElementById('status');
            }
        } else {
            AsriDom.status?.style.removeProperty('max-width');
            AsriDom.status?.style.removeProperty('transform');
        }

        // if (!hasDockb() && !isLayoutDockHidden('b')) {
        //     let layoutDockbHeight = AsriDom.layoutDockb?.clientHeight;
        //     AsriDom.status.style.transform = `translateY(-${layoutDockbHeight + 42}px)`;
        // }   
    }
}
setTimeout(() => {
    statusPositon();
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
    if (!AsriDom.status.classList.contains('.fn__none')) {

        let layoutTabContainers = AsriDom.layouts?.querySelectorAll('.layout__center .layout-tab-container');
        let statusRect = AsriDom.status.getBoundingClientRect();

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
        let listItemsFocus = AsriDom.layouts.querySelectorAll('.file-tree .b3-list-item--focus');

        AsriDom.layouts.querySelectorAll('.file-tree .has-focus').forEach(oldUl => oldUl.classList.remove('has-focus'));

        for (let li of listItemsFocus) {
            if (!li.nextElementSibling || (li.nextElementSibling.tagName !== 'UL' || li.nextElementSibling.classList.contains('fn__none'))) {
                li.parentNode.classList.add('has-focus'),
                AsriClassNames.pushUnique('.has-focus');
            }
        }
    }
}
formatIndentGuidesForFocusedItems();

function formatProtyleWithBgImageOnly() {
    let protyleBgs = AsriDom.layouts?.querySelectorAll('.protyle .protyle-background');

    protyleBgs.forEach(protyleBg => {
        if (!protyleBg.querySelector('.protyle-background__img img')?.classList.contains('fn__none') && protyleBg.querySelector('.protyle-background__icon.fn__none')) {
            protyleBg.classList.add('without-icon'),
            AsriClassNames.pushUnique('.without-icon');
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
    let topbar = AsriDom.toolbar;
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
    let status = AsriDom.status;
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
    let dock = AsriDom[`dock${direction}`];
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

    let dockLayout = AsriDom[`layoutDock${direction}`];
    let dockLytObserver = setCompoundMutationObserver(funcChildList, funcAttr, fucnCharacterData);

    // 解决部分情况下layoutDock元素加载滞后于此js而出现无法启动监视的情况
    if (dockLayout) dockLytObserver.observe(dockLayout, config), AsriObservers.push(dockLytObserver);
    else {
        let count = 0,
            maxCount = 10;
        let tryGetLayoutDock;

        function updateDockLayout() {
            dockLayout = AsriDom.layouts.querySelector(`.layout__dock${direction}`);
            count++;

            if (count === maxCount || dockLayout) {
                clearInterval(tryGetLayoutDock);
                AsriDom[`layoutDock${direction}`] = dockLayout;
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

    let layouts = AsriDom.layouts;
    let lytsObserver = setCompoundMutationObserver(funcChildList, funcAttr, fucnCharacterData);
    lytsObserver.observe(layouts, config); AsriObservers.push(lytsObserver);
}

// 开始监视变化
docBodyObserver(
    // childList mutations func
    () => {
        addEmojiDialogClassName();
        addDockbClassName();
        // statusPositon();
    }
)

if (!isMobile) {
    if (!isMiniWindow) {
        // //顶栏
        // topbarObserver('childList', () => {
        //     topbar.style.setProperty('--topbar-left-spacing', 0);
        //     topbar.style.setProperty('--topbar-right-spacing', 0);

        //     dragleftRectRightInitial = AsriDom.drag.getBoundingClientRect().left;
        //     dragRectRightInitial = AsriDom.drag.getBoundingClientRect().right;
        // })

        // // 左栏dock
        // dockObserver('l', 'attributes', () => {
        //     AsriDom.dockl = document.getElementById('dockLeft');
        //     // tabbarSpacing();
        // });
        // // 右栏dock
        // dockObserver('r', 'attributes', () => {
        //     AsriDom.dockr = document.getElementById('dockRight');
        //     // statusPositon();
        //     avoidOverlappingWithStatus();
        // });

        // 左栏面板
        dockLayoutObserver(
            'l',
            undefined,
            () => {
                setTimeout(() => {
                    AsriDom.layoutDockl = document.querySelector('.layout__dockl');
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
                    AsriDom.layoutDockr = document.querySelector('.layout__dockr');
                    // statusPositon();
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
                AsriDom.layouts = document.getElementById('layouts');
                setTimeout(() => {
                    calcTabbarSpacings(); // 适用于分屏操作时
                    // statusPositon();
                }, 1);
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
    AsriDom.topbar?.style.removeProperty('--topbar-left-spacing');
    AsriDom.topbar?.style.removeProperty('--topbar-right-spacing');
    AsriDom.topbar?.style.removeProperty('--avoid-topbar');
    AsriDom.status?.style.removeProperty('max-width');
    AsriDom.status?.style.removeProperty('transform');
    AsriDom.status?.style.removeProperty('--status-height');

    let wndElements = AsriDom.layouts?.querySelectorAll('[data-type="wnd"]');
    wndElements.forEach(wnd => {
        let tabbarContainer = wnd.querySelector('.fn__flex-column[data-type="wnd"] > .fn__flex:first-child');
        tabbarContainer.style.removeProperty('padding-left');
        tabbarContainer.style.removeProperty('padding-right');
    })

    let layoutTabContainers = AsriDom.layouts?.querySelectorAll('.layout__center .layout-tab-container');
    layoutTabContainers.forEach(tabContainer => {
        tabContainer.style.removeProperty('padding-bottom');
    })

    document.getElementById('searchList')?.style.removeProperty('padding-bottom');
    document.getElementById('searchPreview')?.style.removeProperty('padding-bottom');
    document.getElementById('viewerContainer')?.style.removeProperty('padding-bottom');
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
}