const doms = {
    layouts: document.getElementById('layouts'),
    status: document.getElementById('status'),
    dockl: document.getElementById('dockLeft'),
    dockr: document.getElementById('dockRight'),
    dockb: document.getElementById('dockBottom'),
    layoutDockl: document.querySelector('.layout__dockl'),
    layoutDockr: document.querySelector('.layout__dockr'),
    layoutDockb: document.querySelector('.layout__dockb'),
    toolbarWindow: document.querySelector('.toolbar__window'),
    toolbar: document.getElementById('toolbar')
    // backlinkListItems: layouts.querySelectorAll('.sy__backlink .b3-list-item')
}

const isToolbarAlwaysShown = document.body.classList.contains('hadeeth-pin-toolbar') > 0;
const isMacOS = navigator.platform.indexOf("Mac") === 0 || navigator.userAgentData.platform === "macOS" || "darwin" === process.platform;
const isMobile = document.getElementById('sidebar') && document.getElementById('editor');
const isInBrowser = doms.toolbar && doms.toolbar.classList.contains('toolbar--browser');

isMacOS && document.body.classList.add('body--mac');
isMobile && document.body.classList.add('body--mobile');
isInBrowser && document.body.classList.add("body--browser");

const isFullScreen = () => {
    if (!isInBrowser && !isMobile) {
        return require("@electron/remote").getCurrentWindow().isFullScreen();
    }
}

function addFullscreenClassName() {
    if (!isInBrowser && !isMobile) {
        let currentWindow = require("@electron/remote").getCurrentWindow();

        currentWindow.on('resize', () => {
            if (isFullScreen()) {
                document.body.classList.add('body--fullscreen');
            } else {
                document.body.classList.remove('body--fullscreen');
            }

            tabbarSpacing();
        })
    }
}

addFullscreenClassName();

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
                            if (rule.style.width || rule.style.height) {
                                styleSheet.deleteRule(j);
                            }
                        }
                    }
                } catch (e) { }
            }
        } else {
            function addWebkitScrollbar() {
                HadeethWebkitScrollbar?.parentNode.removeChild(HadeethWebkitScrollbar);

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

function handleToolbarHover() {
    let toolbarDrag = document.getElementById('drag');
    if (toolbarDrag) {
        toolbarDrag.addEventListener('mouseenter', () => {
            doms.toolbar.classList.add('no-hover');
        });
        toolbarDrag.addEventListener('mouseleave', () => {
            doms.toolbar.classList.remove('no-hover');
        });
    }
}

handleToolbarHover();

function toolbarTutorial() {
    let toolbar = doms.toolbar;
    if (toolbar) {
        function playAnimation() {
            toolbar.classList.add("hadeeth-toolbar-tutorial");
            console.log('added')
        }
    
        function onAnimationEnd() {
            toolbar.classList.remove("hadeeth-toolbar-tutorial");
            toolbar?.removeEventListener("animationend", onAnimationEnd);
        }
    
        toolbar.addEventListener("animationend", onAnimationEnd);
    
        playAnimation();
    }
}

toolbarTutorial();

// Mac 红绿灯位置
function ModifyMacTrafficLights() {
    let currentWindow = require("@electron/remote").getCurrentWindow();
    currentWindow.setTrafficLightPosition({ x: 16, y: 16 });
}

if (isMacOS && !isInBrowser && !isMobile && !isToolbarAlwaysShown) ModifyMacTrafficLights();

function RestoreMacTrafficLights() {
    let currentWindow = require("@electron/remote").getCurrentWindow();
    currentWindow.setTrafficLightPosition({ x: 12, y: 12 });
}

/**
 * 主窗口、新小窗页签栏左右边距控制
 */
function tabbarSpacing() {
    var toolbarWindowRec = doms.toolbarWindow?.getBoundingClientRect();
    var topRightRect = toolbarWindowRec && {
        left: toolbarWindowRec.left,
        top: 0,
        width: toolbarWindowRec.width,
        height: toolbarWindowRec.height
    }

    if (!isFullScreen()) {
        if (!isToolbarAlwaysShown) {
            var topLeftRect = {
                left: 0,
                top: 0,
                width: 80,
                height: 48
            };
        } else {
            var topLeftRect = {
                left: 0,
                top: 0,
                width: 72,
                height: 40
            };
        }
    }

    let wndElements = doms.layouts.querySelectorAll('[data-type="wnd"]');

    if (wndElements) {
        for (let element of wndElements) {
            var elementRect = element.getBoundingClientRect();
            var layoutTabbar = element.querySelector('.layout-tab-bar:not(.layout-tab-bar--readonly)');

            var isOverlappingTopLeft = topLeftRect && isOverlapping(elementRect, topLeftRect);

            var isOverlappingTopRight = toolbarWindowRec && isOverlapping(elementRect, topRightRect);


            // 左侧红绿灯
            if (!isInBrowser && !isMobile && isMacOS) {
                if (isOverlappingTopLeft && (isSideDockHidden() || !document.getElementById('dockLeft'))) {
                    layoutTabbar.style.marginLeft = 'var(--b3-toolbar-left-mac)';
                } else if (isOverlappingTopLeft && isLayoutDockHidden('l')) {
                    layoutTabbar.style.marginLeft = 'calc(var(--b3-toolbar-left-mac) - 42px)';
                } else {
                    layoutTabbar.style.removeProperty('margin-left');
                }
            }

            // 新窗口右侧图标区域
            if (isOverlappingTopRight) {
                layoutTabbar.parentNode.style.marginRight = topRightRect.width - 8 + 'px';
            } else {
                layoutTabbar.parentNode.style.removeProperty('margin-right');
            }
        }
    }
}

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
    let dialog = document.querySelector('.b3-dialog--open .b3-dialog');
    if (dialog && dialog.querySelector('.emojis')) {
        dialog.classList.add('emojis-container');
    }
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
                        dock.style.borderRightColor = 'transparent';
                        break;
                    case 'r':
                        dock.style.borderLeftColor = 'transparent';
                        break;
                }
            } else {
                dock.style.removeProperty('border-left-color');
                dock.style.removeProperty('border-right-color');
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
statusPositon();

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
 * 反链面板文档题图粘性置顶
 */
// function formatSyBacklinkItemsLayout() {
//     doms.backlinkListItems = doms.layouts.querySelectorAll('.sy__backlink .b3-list-item');

//     document.querySelectorAll('.sy__backlink .protyle-shown').forEach(oldLi => oldLi.classList.remove('protyle-shown'));

//     for (let li of doms.backlinkListItems) {
//         if (li.nextElementSibling && !li.nextElementSibling.classList.contains('fn__none') && li.nextElementSibling.classList.contains('protyle')) {
//             li.classList.add('protyle-shown');
//         }
//     }
// }
// formatSyBacklinkItemsLayout();

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
        statusPositon();
    },
    () => {
        if (isMacOS && !isInBrowser && !isMobile) {
            if (isToolbarAlwaysShown && !doms.toolbarWindow) {
                RestoreMacTrafficLights();
            } else {
                ModifyMacTrafficLights();
            }
        }
    }
)

if (!isMobile) {

    if (!doms.toolbarWindow) {
        // 左栏dock
        dockObserver('l', 'attributes', () => {
            doms.dockl = document.getElementById('dockLeft');
            tabbarSpacing();
        });
        // 右栏dock
        dockObserver('r', 'attributes', () => {
            doms.dockr = document.getElementById('dockRight');
            statusPositon();
            avoidOverlappingWithStatus();
        });

        // 左栏面板
        dockLayoutObserver(
            'l',
            undefined,
            () => {
                setTimeout(() => {
                    doms.layoutDockl = document.querySelector('.layout__dockl');
                    tabbarSpacing();
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
                    statusPositon();
                    avoidOverlappingWithStatus();
                }, 200);
                //右栏dock背景
                dockBg();
            }
        )

        // 状态栏
        statusObsever('attributes', setStatusHeightVar);
    }

    // 中心布局
    layoutsObserver(
        // childList mutation func
        () => {
            doms.layouts = document.getElementById('layouts');
            setTimeout(() => {
                tabbarSpacing(); // 适用于分屏操作时
                statusPositon();
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


