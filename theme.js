function isMacOS() {
    return navigator.platform.indexOf("Mac") === 0 || navigator.userAgentData.platform === "macOS";
}

isMacOS() && document.body.classList.add('body--mac');

function isMobile() {
    return document.getElementById('sidebar') && document.getElementById('editor');
}

isMobile() && document.body.classList.add('body--mobile');

function isInBrowser() {
    let toolbar = document.querySelector('.toolbar');
    return toolbar && toolbar.classList.contains('toolbar--browser')
}

isInBrowser() && document.body.classList.add("body--browser");

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

/**
 * 隐藏顶栏后主窗口、新小窗顶栏页签栏的左右间距控制
 */
function tabbarSpacing() {
    var toolbarWindowRec = document.querySelector('.toolbar__window')?.getBoundingClientRect();
    if (toolbarWindowRec) {
        var topRightRect = {
            left: toolbarWindowRec.left,
            top: 0,
            width: toolbarWindowRec.width,
            height: toolbarWindowRec.height
        }
    }
    var topLeftRect = {
        left: 0,
        top: 0,
        width: 80,
        height: 42
    };

    /**
     * 传入两个rec, 参照 getBoundingClientRect() 的属性标准
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

    var wndElements = document.querySelectorAll('#layouts [data-type="wnd"]');
    if (wndElements) {

        for (let element of wndElements) {
            var elementRect = element.getBoundingClientRect();
            var layoutTabbar = element.querySelector('.layout-tab-bar:not(.layout-tab-bar--readonly)');

            var isOverlappingTopLeft = isOverlapping(elementRect, topLeftRect);
            if (toolbarWindowRec) {
                var isOverlappingTopRight = isOverlapping(elementRect, topRightRect);
            }

            var isDockLHidden = document.querySelector('#dockLeft.fn__none') ? 1 : 0;
            var isLayoutDockLHidden = document.querySelector('.layout__dockl[style*="width: 0px"], .layout__dockl.layout--float') ? 1 : 0;

            // 左侧红绿灯
            if (!isInBrowser() && isMacOS()) {
                if (isOverlappingTopLeft && (isDockLHidden || !document.getElementById('dockLeft'))) {
                    layoutTabbar.style.marginLeft = 'var(--b3-toolbar-left-mac)';
                } else if (isOverlappingTopLeft && isLayoutDockLHidden) {
                    layoutTabbar.style.marginLeft = 'calc(var(--b3-toolbar-left-mac) - 42px)';
                } else {
                    layoutTabbar.style.removeProperty('margin-left');
                }
            }

            // 新窗口右侧图标区域
            if (toolbarWindowRec && isOverlappingTopRight) {
                layoutTabbar.parentNode.style.marginRight = topRightRect.width - 8 + 'px'
            } else {
                layoutTabbar.parentNode.style.removeProperty('margin-right');
            }
        }
    }
}

function monitorDOM() {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {

            const doms = {
                layouts: document.getElementById('layouts'),
                status: document.getElementById('status'),
                dockl: document.getElementById('dockLeft'),
                dockr: document.getElementById('dockRight'),
            }

            if (mutation.type === 'childList') {

                // tabbarSpacing();

                // emoji dialog
                let dialog = document.querySelector('.b3-dialog--open .b3-dialog');
                if (dialog && dialog.querySelector('.emojis')) {
                    dialog.classList.add('emojis-container');
                }

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
                if (doms.dockr && doms.dockr.classList.contains('fn__none')) {
                    doms.status.style.right = '8px';
                } else {
                    doms.status.style.right = '48px';
                }

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

                // 表单元素父元素overflow属性
                let textFieldSelectors = [
                    '.config__panel .config__tab-container .fn__flex-1 > .b3-text-field',
                    '.config__panel .config__tab-container .fn__flex-1 > select.b3-select',
                    '.b3-tooltips > .b3-slider'
                ]

                textFieldSelectors.forEach(selector => {
                    let els = document.querySelectorAll(selector);

                    els?.forEach(el => el.parentNode.style.overflow = 'visible')
                })

                // dock与侧栏背景
                function isDockLytPinned(node) {
                    return node && !node.classList.contains('layout--float');
                }
                function isDockLytExpanded(node) {
                    return node.style.width !== '0px';
                }

                let docklLayout = document.querySelector('.layout__dockl'),
                    dockrLayout = document.querySelector('.layout__dockr'),
                    dockl = document.getElementById('dockLeft'),
                    dockr = document.getElementById('dockRight');

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
        });
    });

    var config = {
        attributes: true,
        childList: true,
        subtree: true
    };

    observer.observe(document.body, config);
}

monitorDOM();

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
