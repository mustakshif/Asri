function isMacOS() {
    return navigator.platform.indexOf("Mac") === 0 || navigator.userAgentData.platform === "macOS";
}

isMacOS() && document.body.classList.add('body--mac');

function isMobile() {
    return document.getElementById('sidebar') && document.getElementById('editor');
}

isMobile() && document.body.classList.add('body--mobile');

function isInBrowser() {
    let toolbar = document.getElementById('toolbar');
    return toolbar && toolbar.classList.contains('toolbar--browser')
}

isInBrowser() && document.body.classList.add("body--browser");

function isFullScreen() {

}

function useSysScrollbar() {
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
}

isMacOS() && useSysScrollbar();

function handleToolbarHover() {
    let toolbar = document.querySelector('.toolbar');
    let toolbarDrag = document.getElementById('drag');
    if (toolbarDrag) {
        toolbarDrag.addEventListener('mouseenter', () => {
            toolbar.classList.add('no-hover');
        });
        toolbarDrag.addEventListener('mouseleave', () => {
            toolbar.classList.remove('no-hover');
        });
    }
}

handleToolbarHover();

// Mac 红绿灯位置
function ModifyMacTrafficLights() {
    let currentWindow = require("@electron/remote").getCurrentWindow();
    currentWindow.setTrafficLightPosition({ x: 16, y: 16 });
}

if (isMacOS() && !isInBrowser() && !isMobile()) ModifyMacTrafficLights();

const doms = {
    layouts: document.getElementById('layouts'),
    status: document.getElementById('status'),
    dockl: document.getElementById('dockLeft'),
    dockr: document.getElementById('dockRight'),
    layoutDockl: document.querySelector('.layout__dockl'),
    layoutDockr: document.querySelector('.layout__dockr'),
    toolbarWindow: document.querySelector('.toolbar__window'),
}

// function updateDocksAndLayouts() {
//     doms.dockl = document.getElementById('dockLeft');
//     doms.dockr = document.getElementById('dockRight');
//     doms.layoutDockl = document.querySelector('.layout__dockl');
//     doms.layoutDockr = document.querySelector('.layout__dockr');
// }
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

    // 添加if isFullScreen
    var topLeftRect = {
        left: 0,
        top: 0,
        width: 80,
        height: 42
    };

    let wndElements = doms.layouts.querySelectorAll('[data-type="wnd"]');

    if (wndElements) {
        for (let element of wndElements) {
            var elementRect = element.getBoundingClientRect();
            var layoutTabbar = element.querySelector('.layout-tab-bar:not(.layout-tab-bar--readonly)');

            var isOverlappingTopLeft = topLeftRect && isOverlapping(elementRect, topLeftRect);

            var isOverlappingTopRight = toolbarWindowRec && isOverlapping(elementRect, topRightRect);


            // 左侧红绿灯
            if (!isInBrowser() && !isMobile() && isMacOS()) {
                if (isOverlappingTopLeft && (isDockHidden() || !document.getElementById('dockLeft'))) {
                    layoutTabbar.style.marginLeft = 'var(--b3-toolbar-left-mac)';
                } else if (isOverlappingTopLeft && isLayoutDockHidden('l')) {
                    layoutTabbar.style.marginLeft = 'calc(var(--b3-toolbar-left-mac) - 42px)';
                } else {
                    layoutTabbar.style.removeProperty('margin-left');
                }
            }

            // 新窗口右侧图标区域
            if (isOverlappingTopRight) {
                layoutTabbar.parentNode.style.marginRight = topRightRect.width - 8 + 'px'
            } else {
                layoutTabbar.parentNode.style.removeProperty('margin-right');
            }
        }
    }
}

function isDockHidden() {
    return doms.dockl && doms.dockl.classList.contains('fn__none') > 0
}

/**
 * 判断 .layout__dock 是否隐藏或浮动
 * @param {'l' | 'r'} direction
 */
function isLayoutDockHidden(direction) {
    let layoutDockNew = doms[`layoutDock${direction}`];
    return layoutDockNew && (layoutDockNew.classList.contains('layout--float') || layoutDockNew.style.cssText.includes('width: 0px'))
}

/**
 * 边栏面板战开始边栏的背景变化
 */
function dockBg() {
    function isDockLytPinned(node) {
        return node && !node.classList.contains('layout--float');
    }
    function isDockLytExpanded(node) {
        return node.style.width !== '0px';
    }

    let docklLayout = doms.layoutDockl,
        dockrLayout = doms.layoutDockr,
        dockl = doms.dockl,
        dockr = doms.dockr;

    if (isDockLytPinned(docklLayout) && isDockLytExpanded(docklLayout)) {
        dockl.classList.add('dock-layout-expanded');
    } else {
        dockl?.classList.remove('dock-layout-expanded');
    }

    if (isDockLytPinned(dockrLayout) && isDockLytExpanded(dockrLayout)) {
        dockr.classList.add('dock-layout-expanded');
    } else {
        dockr?.classList.remove('dock-layout-expanded');
    }
}
dockBg();

/**
 * 边栏和边栏面板展开/收起时状态栏的位置
 */
function statusPositon() {
    let layoutCenter = doms.layouts.querySelector('.layout__center');

    if (layoutCenter && doms.layoutDockr && !doms.status.classList.contains('.fn__none')) {
        let layoutDockrWidth = doms.layoutDockr.clientWidth;
        let layoutCenterWidth = layoutCenter.clientWidth;

        doms.status.style.maxWidth = layoutCenterWidth - 12 + 'px';

        if (isDockHidden() && isLayoutDockHidden('r')) {
            doms.status.style.transform = 'none';
        } else if (!isDockHidden() && isLayoutDockHidden('r')) {
            doms.status.style.transform = 'translateX(-40px)';
        } else if (!isDockHidden() && !isLayoutDockHidden('r')) {
            doms.status.style.transform = `translateX(-${layoutDockrWidth + 40}px)`;
        } else if (isDockHidden() && !isLayoutDockHidden('r')) {
            doms.status.style.transform = `translateX(-${layoutDockrWidth}px)`;
        }

        doms.status = document.getElementById('status');
    }
}
statusPositon();

/**
 * 大纲、反链在作为页面显示时，避免被status遮住底部
 */
function listBgPaddingBttm() {
    if (!doms.status.classList.contains('.fn__none')) {
        let layoutTabContainers = doms.layouts.querySelectorAll('.layout__center .layout-tab-container');
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
    }
}
listBgPaddingBttm();

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
 * @param {Function | undefined} fucnCharacterData default: undefined
 */
function setCompoundMutationObserver(funcChildList, funcAttr = undefined, fucnCharacterData = undefined) {
    let callback = function (mutationList, observer) {
        mutationList.forEach(mutation => {
            if (funcChildList && mutation.type === 'childList') {
                funcChildList(mutation, observer);
            } else if (fucnCharacterData && mutation.type === 'characterData') {
                fucnCharacterData(mutation, observer);
            } else if (funcAttr && mutation.type === 'attributes') {
                funcAttr(mutation, observer);
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
 * @param {String} type mutation type
 * @param {*} func 
 */
function dockLayoutObserver(direction, type, func) {
    let dockLayout = doms[`layoutDock${direction}`];
    let observer = setSimpleMutationObserver(type, func);
    dockLayout && observer.observe(dockLayout, { [type]: true });
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

docBodyObserver(
    // childList mutations func
    () => {
        // emoji dialog
        let dialog = document.querySelector('.b3-dialog--open .b3-dialog');
        if (dialog && dialog.querySelector('.emojis')) {
            dialog.classList.add('emojis-container');
        }
    }
)

// 左栏dock
dockObserver('l', 'attributes', () => {
    doms.dockl = document.getElementById('dockLeft');
    tabbarSpacing();
});
// 右栏dock
dockObserver('r', 'attributes', () => {
    doms.dockr = document.getElementById('dockRight');
    statusPositon();
    listBgPaddingBttm();
});

// 左栏面板
dockLayoutObserver('l', 'attributes', () => {
    setTimeout(() => {
        doms.layoutDockl = document.querySelector('.layout__dockl');
        tabbarSpacing();
    }, 200); // 动画之后
    // 左栏dock背景
    dockBg();

})

// 右栏面板
dockLayoutObserver('r', 'attributes', () => {
    setTimeout(() => {
        doms.layoutDockr = document.querySelector('.layout__dockr');
        statusPositon();
        listBgPaddingBttm();
    }, 200);
    //右栏dock背景
    dockBg();
})

// 中心布局
layoutsObserver(
    // childList mutation func
    () => {
        setTimeout(() => {
            doms.layouts = document.getElementById('layouts');
            tabbarSpacing();
        }, 1);
    }, 
    // attributes mutation func
    () => {
        listBgPaddingBttm();
    }, 
    undefined, 
    true
)

function monitorDOM() {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {

            if (mutation.type === 'childList') {

                // tabbarSpacing();

                // emoji dialog
                // let dialog = document.querySelector('.b3-dialog--open .b3-dialog');
                // if (dialog && dialog.querySelector('.emojis')) {
                //     dialog.classList.add('emojis-container');
                // }

                // 页签中显示大纲、关系图、反链时
                // let layoutCenterWnds = document.querySelectorAll('.layout__center [data-type="wnd"]');
                // if (layoutCenterWnds) layoutCenterWnds.forEach(wndEl => {
                //     let layoutCenterFiletree = wndEl.querySelector('.file-tree');
                //     if (layoutCenterFiletree && !layoutCenterFiletree.classList.contains('fn__none')) {
                //         wndEl.classList.add('shrink-in-tab');
                //     } else {
                //         wndEl.classList.remove('shrink-in-tab');
                //     }
                // });


                // for (let key in doms.dock) {
                //     doms.dock[key].classList.add('highlight');
                // }


                //右侧面板底部 padding
                // if (!doms.status.classList.contains('fn__none')) {
                //     document.body.classList.add('body-status-shown');
                // } else {
                //     document.body.classList.remove('body-status-shown');
                // }

                // status 右边距
                // if (doms.dockr && doms.dockr.classList.contains('fn__none')) {
                //     doms.status.style.right = '8px';
                // } else {
                //     doms.status.style.right = '48px';
                // }

                //  页签搜索
                // document.querySelectorAll('.block__icons').forEach(blockIcons => {
                //     let nextSibling = blockIcons.nextElementSibling;
                //     if (nextSibling && nextSibling.classList.contains("search__header")) {
                //         blockIcons.classList.add("search");
                //     }
                // });

                // 文档树缩进参考、反链
                let listItemsFocus = document.querySelectorAll('.file-tree .b3-list-item--focus');
                let backlinkListItems = document.querySelectorAll('.sy__backlink .b3-list-item');

                document.querySelectorAll('.file-tree .has-focus').forEach(oldUl => oldUl.classList.remove('has-focus')
                );

                for (let li of listItemsFocus) {
                    if (!li.nextElementSibling || (li.nextElementSibling.tagName !== 'UL' || li.nextElementSibling.classList.contains('fn__none'))) {
                        li.parentNode.classList.add('has-focus');
                    }
                }

                document.querySelectorAll('.sy__backlink .protyle-shown').forEach(oldLi => oldLi.classList.remove('protyle-shown'));

                for (let li of backlinkListItems) {
                    if (li.nextElementSibling && !li.nextElementSibling.classList.contains('fn__none') && li.nextElementSibling.classList.contains('protyle')) {
                        li.classList.add('protyle-shown');
                    }
                }

                // // 表单元素父元素overflow属性
                // let textFieldSelectors = [
                //     '.config__panel .config__tab-container .fn__flex-1 > .b3-text-field',
                //     '.config__panel .config__tab-container .fn__flex-1 > select.b3-select',
                //     '.b3-tooltips > .b3-slider'
                // ]

                // textFieldSelectors.forEach(selector => {
                //     let els = document.querySelectorAll(selector);

                //     els?.forEach(el => el.parentNode.style.overflow = 'visible')
                // })

                // dock与侧栏背景
                // function dockBg() {
                //     function isDockLytPinned(node) {
                //         return node && !node.classList.contains('layout--float');
                //     }
                //     function isDockLytExpanded(node) {
                //         return node.style.width !== '0px';
                //     }

                //     let docklLayout = document.querySelector('.layout__dockl'),
                //         dockrLayout = document.querySelector('.layout__dockr'),
                //         dockl = document.getElementById('dockLeft'),
                //         dockr = document.getElementById('dockRight');

                //     if (isDockLytPinned(docklLayout) && isDockLytExpanded(docklLayout)) {
                //         dockl.classList.add('dock-layout-expanded');
                //     } else {
                //         dockl?.classList.remove('dock-layout-expanded');
                //     }

                //     if (isDockLytPinned(dockrLayout) && isDockLytExpanded(dockrLayout)) {
                //         dockr.classList.add('dock-layout-expanded');
                //     } else {
                //         dockr?.classList.remove('dock-layout-expanded');
                //     }
                // }

            }
        });
    });

    var config = {
        attributes: true,
        childList: true,
        subtree: true
    };

    observer.observe(document.body, config);
}

// monitorDOM();

/**
 * 根据当前帧是否还有剩余的空闲时间选择是否执行任务
 * @param {Function} task 
 * @param {Function} callback 
 */
function _runTask(task, callback) {
    requestIdleCallback((idle) => {
        if (idle.timeRemaining() > 0) {
            task();
            callback()
        } else _runTask(task, callback)
    })
}

// new Promise((resolve) => {
//     _runTask(monitorDOM, resolve);
//     console.log('task run')
// });

function getDblClickMouseXY() {
    window.addEventListener('dblclick', handleDblClick);
    function handleDblClick(event) {
        document.body.style.setProperty('--mouseX', event.clientX + 'px');
        document.body.style.setProperty('--mouseY', event.clientY + 'px');
    }
}

getDblClickMouseXY();
