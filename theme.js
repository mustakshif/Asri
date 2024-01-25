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
const doms = {
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
}

const isMacOS = navigator.platform.indexOf("Mac") === 0;
const isLinux = navigator.platform.indexOf("Linux") === 0;
// Safari 不支持 navigator.UserAgentData.platform；浏览器不支持 process.platform

const isMobile = document.getElementById('sidebar') && document.getElementById('editor');
const isInBrowser = doms.toolbar && doms.toolbar.classList.contains('toolbar--browser');
const isMiniWindow = document.body.classList.contains('body--window') > 0;

// function isFullScreen() {
//     ipcRenderer.invoke('siyuan-get', { cmd: 'isFullScreen' })
//         .then(isFullscreen => isFullscreen ? true : false);
// }

function isFullScreen() {
    return require("@electron/remote").getCurrentWindow().isFullScreen()
}

isMacOS && document.body.classList.add('body--mac');
isLinux && document.body.classList.add('body--linux');
isMobile && document.body.classList.add('body--mobile');
isInBrowser && document.body.classList.add("body--browser");


function setTrafficLightPosition(x, y = x) {
    require("@electron/remote").getCurrentWindow().setWindowButtonPosition({ x: x, y: y });
}

if (isMacOS && !isInBrowser && !isMobile) setTrafficLightPosition(16);
if (isMiniWindow && isMacOS) setTrafficLightPosition(14);

function useSysScrollbar() {
    if (isMacOS) {
        let HadeethWebkitScrollbar = document.getElementById('HadeethWebkitScrollbar');

        if (!document.body.classList.contains('hadeeth-use-webkit-scrollbar')) {
            HadeethWebkitScrollbar?.remove();

            for (let i = 0; i < document.styleSheets.length; i++) {
                let styleSheet = document.styleSheets[i];
                try {
                    for (let j = 0; j < styleSheet.cssRules.length; j++) {
                        let rule = styleSheet.cssRules[j];
                        if (rule.selectorText && rule.selectorText.includes('::-webkit-scrollbar')) {
                            if (rule.style.width || rule.style.height || rule.style.backgroundColor) {
                                styleSheet.deleteRule(j);
                            }
                        }
                    }
                } catch (e) { }
            }
        } else {
            function addWebkitScrollbar() {
                HadeethWebkitScrollbar?.remove();

                var style = document.createElement('style');
                style.setAttribute('id', 'HadeethWebkitScrollbar');
                style.innerHTML = "::-webkit-scrollbar {width: 10px;height: 10px;}";
                document.head.appendChild(style);
            }
            addWebkitScrollbar();
        }
    }
}

useSysScrollbar();

// function handleToolbarHover() {
//     let toolbarDrag = document.getElementById('drag');
//     if (toolbarDrag) {
//         toolbarDrag.addEventListener('mouseenter', () => {
//             doms.toolbar.classList.add('no-hover');
//         });
//         toolbarDrag.addEventListener('mouseleave', () => {
//             doms.toolbar.classList.remove('no-hover');
//         });
//     }
// }

// // handleToolbarHover();

// async function toolbarTutorial() {
//     let toolbar = doms.toolbar;

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
        doms.toolbar.insertBefore(newDiv, before);
    } else if (after) {
        doms.toolbar.insertBefore(newDiv, after.nextSibling);
    } else {
        doms.toolbar.appendChild(newDiv);
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

    window.addEventListener('resize', function () {
        isWinResizing = true;
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            isWinResizing = false;
            if (isMacOS && isFullScreen() && !isInBrowser) {
                document.body.classList.add('body--fullscreen');
                dragRectLeftInitial = dragRectLeftInitial - 80;
                fromFullscreen = true;
            } else {
                document.body.classList.remove('body--fullscreen');
                dragRectLeftInitial = fromFullscreen ? doms.drag?.getBoundingClientRect().left : dragRectLeftInitial;
                fromFullscreen = false;
            }
            calcTopbarSpacings();
            calcTabbarSpacings();
        }, 200);
    });
}

let dragRectLeftInitial = doms.drag?.getBoundingClientRect().left,
    dragRectRightInitial = doms.drag?.getBoundingClientRect().right;
let pluginsContainer, leftSpacing, rightSpacing, topbar,
    layoutsCenterRect, leftSpacingRect, rightSpacingRect, barSyncRect, dragRect;

if (!isMobile && doms.toolbar) {
    createTopbarElementById('AsriPluginIconsContainer', undefined, doms.drag);
    createTopbarElementById('AsriTopbarLeftSpacing', undefined, doms.barSync);
    isMacOS ? createTopbarElementById('AsriTopbarRightSpacing', undefined, doms.barMode) : createTopbarElementById('AsriTopbarRightSpacing', doms.barSearch);
}

function calcTopbarSpacings(widthChange) {
    pluginsContainer = document.getElementById('AsriPluginIconsContainer');
    leftSpacing = document.getElementById('AsriTopbarLeftSpacing');
    rightSpacing = document.getElementById('AsriTopbarRightSpacing');
    topbar = doms.toolbar;

    layoutsCenterRect = doms.layouts.querySelector('.layout__center').getBoundingClientRect();
    rightSpacingRect = rightSpacing.getBoundingClientRect();
    barSyncRect = doms.barSync.getBoundingClientRect();

    let winWidth = window.innerWidth,
        centerRectLeft = layoutsCenterRect.left
    centerRectRight = layoutsCenterRect.right;

    function calcAndApply() {
        // 左侧
        if (centerRectLeft > dragRectLeftInitial + 8)
            topbar.style.setProperty('--topbar-left-spacing', 0),
            dragRectLeftInitial = doms.drag.getBoundingClientRect().left;
            // 每次重新计算 initial
        else topbar.style.setProperty('--topbar-left-spacing', centerRectLeft - barSyncRect.right + 4 + 'px');

        // 右侧
        if (centerRectRight < dragRectRightInitial - 8) {
            topbar.style.setProperty('--topbar-right-spacing', 0);

            dragRectRightInitial = doms.drag.getBoundingClientRect().right;

            //使用 CSS
            doms.dockr?.style.removeProperty('--avoid-topbar');
            doms.layoutDockr?.style.removeProperty('--avoid-topbar');
        } else {
            topbar.style.setProperty('--topbar-right-spacing', rightSpacingRect.right - centerRectRight + 7 + 'px');

            if (isMacOS || isInBrowser) {
                doms.dockr?.style.setProperty('--avoid-topbar', '4px');
                doms.layoutDockr?.style.setProperty('--avoid-topbar', '4px')
            } else {
                doms.dockr?.style.setProperty('--avoid-topbar', 'calc(var(--toolbar-height) - 6px)');
                doms.layoutDockr?.style.setProperty('--avoid-topbar', 'calc(var(--toolbar-height) - 6px)')
            };
        }
    }

    if (!isWinResizing) calcAndApply()
    else dragRectRightInitial = dragRectRightInitial + widthChange;

    (function barLineSwitch() {
        if (centerRectRight < dragRectRightInitial - 8) {
            // dragRectRightInitial = doms.drag.getBoundingClientRect().right;
            // 横线
            pluginsContainer.style.setProperty('--container-bg', 'var(--b3-list-hover)');
            pluginsContainer.style.left = centerRectRight + 'px';
            pluginsContainer.style.right = '0';
            pluginsContainer.style.removeProperty('height');
            pluginsContainer.style.removeProperty('top');
        }
        else {
            // if (isWinResizing) dragRectRightInitial = dragRectRightInitial + widthChange;
            // 竖线
            dragRect = doms.drag.getBoundingClientRect();
            pluginsContainer.style.setProperty('--container-bg', 'var(--b3-border-color-trans)');
            pluginsContainer.style.left = dragRect.right - 10 + 'px';
            pluginsContainer.style.right = winWidth - dragRect.right + 8 + 'px';
            pluginsContainer.style.height = '21px';
            pluginsContainer.style.top = '13.5px';
        }
    })();

    // console.log(`drag左\t\t${dragRectLeftInitial}\ncenter左\t${centerRectLeft}`)
}

function calcTabbarSpacings() {
    let wndElements = doms.layouts.querySelectorAll('[data-type="wnd"]'); // 考虑分屏的情况

    if (wndElements) {
        for (let wnd of wndElements) {
            let tabbarContainer = wnd.querySelector('.fn__flex-column[data-type="wnd"] > .fn__flex:first-child');
            let tabbarContainerRect = tabbarContainer.getBoundingClientRect();
            let dragRect = doms.drag.getBoundingClientRect();

            if (isOverlapping(tabbarContainerRect, dragRect)) {
                let paddingLeftValue = (tabbarContainerRect.left < dragRect.left) ? dragRect.left - tabbarContainerRect.left - 6 + 'px' : '';
                let paddingRightValue = (tabbarContainerRect.right > dragRect.right) ? tabbarContainerRect.right - dragRect.right + 8 + 'px' : '';

                tabbarContainer.style.paddingLeft = paddingLeftValue;
                tabbarContainer.style.paddingRight = paddingRightValue;

                doms.drag = document.getElementById('drag');
            } else {
                tabbarContainer.style.paddingLeft = 0;
                tabbarContainer.style.paddingRight = 0;
            }

            if (tabbarContainerRect.right - 60 < dragRect.left) {
                tabbarContainer.style.paddingTop = '42px';
                tabbarContainer.style.paddingLeft = 0;
                tabbarContainer.style.paddingRight = 0;
            } else {
                tabbarContainer.style.removeProperty('padding-top');
            }
        }
    }
}

function LayoutsCenterResizeObserver() {
    let lytCenter = doms.layouts.querySelector('.layout__center');
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

    if (lytCenter) ro.observe(lytCenter);
    else {
        let count = 0,
            maxCount = 10;
        let tryGetLytCenter;

        function updateLytCenter() {
            doms.layouts = document.getElementById('layouts');
            lytCenter = doms.layouts.querySelector('.layout__center');
            count++;
            if (count === maxCount || lytCenter) {
                clearInterval(tryGetLytCenter);
                // doms.layouts = document.getElementById('layouts');
                ro.observe(lytCenter);
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
}

handleWinResize();

/**
 * 新小窗页签栏左右边距控制
 */
// function tabbarSpacinginMiniWindow() {
//     var toolbarWindowRec = doms.toolbarWindow?.getBoundingClientRect();
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

//     let wndElements = doms.layouts.querySelectorAll('[data-type="wnd"]'); // 考虑分屏的情况

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

function isSideDockHidden() {
    return doms.dockl && doms.dockl.classList.contains('fn__none') > 0
}
function hasDockb() {
    return doms.dockb && !doms.dockb.classList.contains('fn__none') > 0;
}
function addDockbClassName() {
    if (hasDockb()) {
        doms.toolbar?.nextElementSibling.classList.add('has-dockb')
    } else {
        doms.toolbar?.nextElementSibling.classList.remove('has-dockb');
    }
}

function isStatusHidden() {
    return doms.status && doms.status.classList.contains('fn__none');
}

function addEmojiDialogClassName() {
    // emoji dialog
    let dialogs = document.querySelectorAll('.b3-dialog--open .b3-dialog');
    dialogs.forEach(dialog => {
        dialog.querySelector('.emojis') && dialog.classList.add('emojis-container');
    })
}
/**
 * 判断 .layout__dock 是否隐藏或浮动
 * @param {'l' | 'r' | 'b'} direction
 */
function isLayoutDockHidden(direction) {
    let layoutDockNew = doms[`layoutDock${direction}`];
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
 * 边栏面板展开时边栏的背景变化
 */
function dockBg() {

    if (doms.dockl && !isMobile) {
        for (let dir of ['l', 'r']) {

            let lyt = doms[`layoutDock${dir}`],
                dock = doms[`dock${dir}`];

            if (isDockLytPinned(lyt) && isDockLytExpanded(lyt)) {
                dock.classList.add('dock-layout-expanded');
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
 * 边栏和边栏面板展开/收起时状态栏的位置
 */
function statusPositon() {
    if (!isMobile) {
        if (!hasDockb()) {
            function setStatusTransform(x, y) {
                doms.status.style.transform = `translate(${x}px, ${y}px)`;
            }

            let layoutCenter = doms.layouts.querySelector('.layout__center');

            if (layoutCenter && doms.layoutDockr && !doms.status.classList.contains('.fn__none')) {
                let layoutDockrWidth = doms.layoutDockr.clientWidth;
                let layoutCenterWidth = layoutCenter.clientWidth;

                doms.layoutDockb = doms.layouts.querySelector('.layout__dockb');
                if (doms.layoutDockb && isDockLytPinned(doms.layoutDockb)) var y = doms.layoutDockb.clientHeight * -1;
                else y = 0;

                doms.status.style.maxWidth = layoutCenterWidth - 12 + 'px';

                if (isSideDockHidden() && isLayoutDockHidden('r')) setStatusTransform(0, y);
                else if (!isSideDockHidden() && isLayoutDockHidden('r')) setStatusTransform(-40, y);
                else if (!isSideDockHidden() && !isLayoutDockHidden('r')) setStatusTransform((layoutDockrWidth + 40) * -1, y);
                else if (isSideDockHidden() && !isLayoutDockHidden('r')) setStatusTransform(layoutDockrWidth * -1, y);

                doms.status = document.getElementById('status');
            }
        } else {
            doms.status?.style.removeProperty('max-width');
            doms.status?.style.removeProperty('transform');
        }

        // if (!hasDockb() && !isLayoutDockHidden('b')) {
        //     let layoutDockbHeight = doms.layoutDockb?.clientHeight;
        //     doms.status.style.transform = `translateY(-${layoutDockbHeight + 42}px)`;
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
    if (!doms.status.classList.contains('.fn__none')) {

        let layoutTabContainers = doms.layouts?.querySelectorAll('.layout__center .layout-tab-container');
        let statusRect = doms.status.getBoundingClientRect();

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
 * 判断两个元素是否有重合。传入两个rec, 参照 getBoundingClientRect() 的属性标准
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
        let listItemsFocus = doms.layouts.querySelectorAll('.file-tree .b3-list-item--focus');

        doms.layouts.querySelectorAll('.file-tree .has-focus').forEach(oldUl => oldUl.classList.remove('has-focus'));

        for (let li of listItemsFocus) {
            if (!li.nextElementSibling || (li.nextElementSibling.tagName !== 'UL' || li.nextElementSibling.classList.contains('fn__none'))) {
                li.parentNode.classList.add('has-focus');
            }
        }
    }
}
formatIndentGuidesForFocusedItems();

function formatProtyleWithBgImageOnly() {
    let protyleBgs = doms.layouts?.querySelectorAll('.protyle .protyle-background');

    protyleBgs.forEach(protyleBg => {
        if (!protyleBg.querySelector('.protyle-background__img img')?.classList.contains('fn__none') && protyleBg.querySelector('.protyle-background__icon.fn__none')) {
            protyleBg.classList.add('without-icon')
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
    let topbar = doms.toolbar;
    let observer = setSimpleMutationObserver(type, func);
    if (topbar) observer.observe(topbar, { [type]: true })
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

    let observer = setCompoundMutationObserver(funcChildList, funcAttr);
    observer.observe(document.body, config);
}

function statusObsever(type, func) {
    let status = doms.status;
    let observer = setSimpleMutationObserver(type, func);
    if (status) observer.observe(status, { [type]: true });
}

/**
 * 
 * @param {'l' | 'r'} direction 
 * @param {String} type mutation type
 * @param {*} func 
 */
function dockObserver(direction, type, func) {
    let dock = doms[`dock${direction}`];
    let observer = setSimpleMutationObserver(type, func);
    dock && observer.observe(dock, { [type]: true });
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

    let dockLayout = doms[`layoutDock${direction}`];
    let observer = setCompoundMutationObserver(funcChildList, funcAttr, fucnCharacterData);

    // 解决部分情况下layoutDock元素加载滞后于此js而出现无法启动监视的情况
    if (dockLayout) observer.observe(dockLayout, config);
    else {
        let count = 0,
            maxCount = 10;
        let tryGetLayoutDock;

        function updateDockLayout() {
            dockLayout = doms.layouts.querySelector(`.layout__dock${direction}`);
            count++;

            if (count === maxCount || dockLayout) {
                clearInterval(tryGetLayoutDock);
                doms[`layoutDock${direction}`] = dockLayout;
                dockBg();
                observer.observe(dockLayout, config);
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

    let layouts = doms.layouts;
    let observer = setCompoundMutationObserver(funcChildList, funcAttr, fucnCharacterData);
    observer.observe(layouts, config);
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

        //     dragleftRectRightInitial = doms.drag.getBoundingClientRect().left;
        //     dragRectRightInitial = doms.drag.getBoundingClientRect().right;
        // })

        // // 左栏dock
        // dockObserver('l', 'attributes', () => {
        //     doms.dockl = document.getElementById('dockLeft');
        //     // tabbarSpacing();
        // });
        // // 右栏dock
        // dockObserver('r', 'attributes', () => {
        //     doms.dockr = document.getElementById('dockRight');
        //     // statusPositon();
        //     avoidOverlappingWithStatus();
        // });

        // 左栏面板
        dockLayoutObserver(
            'l',
            undefined,
            () => {
                setTimeout(() => {
                    doms.layoutDockl = document.querySelector('.layout__dockl');
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
                    doms.layoutDockr = document.querySelector('.layout__dockr');
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
                doms.layouts = document.getElementById('layouts');
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

function getDblClickMouseXY() {
    window.addEventListener('dblclick', handleDblClick);
    function handleDblClick(event) {
        document.body.style.setProperty('--mouseX', event.clientX + 'px');
        document.body.style.setProperty('--mouseY', event.clientY + 'px');
    }
}

getDblClickMouseXY();