function isMacOS() {
    return navigator.platform.indexOf("Mac") === 0 || navigator.userAgentData.platform === "macOS";
}

if (isMacOS()) document.body.classList.add('body--mac');

// 判断是否在浏览器中
function isInBrowser() {
    let toolbar = document.querySelector('.toolbar');
    return toolbar && toolbar.classList.contains('toolbar--browser') > 0
}

if (isInBrowser()) document.body.classList.add("body--browser");

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
        } catch (e) {
            // 忽略跨域样式表的错误
        }
    }
}

if (isMacOS()) useSysScrollbar();

// 隐藏顶栏 --> hide-toolbar.scss
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

// Mac 红绿灯
function ModifyMacTrafficLights() {
    let currentWindow = require("@electron/remote").getCurrentWindow();
    currentWindow.setTrafficLightPosition({ x: 16, y: 16 });
}

if (isMacOS() && !isInBrowser()) ModifyMacTrafficLights();

// (() => {
//     import('./style/customizable/customModules.js')
//         .then((customModules) => {
//             customModules.handleToolbarHover();
//             customModules.ModifyMacTrafficLights();
//         })
//         .catch((e) => {
//             console.error(e);
//         });
// })();

const doms = {
    layouts: document.getElementById('layouts'),
    status: document.getElementById('status'),
    dockl: document.getElementById('dockLeft'),
    dockr: document.getElementById('dockRight'),
}

// 避让红绿灯
function toolbarSpacingRight() {
    const topRightRect = {
        right: 0,
        top: 0,
        width: 42,
        height: 42
    }
}

function toolbarSpacingLeft() {
    const topLeftRect = {
        left: 0,
        top: 0,
        width: 80,
        height: 42
    };

    let wndElements = document.querySelectorAll('#layouts [data-type="wnd"]');
    if (wndElements) {
        for (let element of wndElements) {
            let layoutTabbar = element.querySelector('.layout-tab-bar:not(.layout-tab-bar--readonly)');
            let elementRect = element.getBoundingClientRect();
            let isOverlappingTopLeft = (
                elementRect.right > topLeftRect.left &&
                elementRect.bottom > topLeftRect.top &&
                elementRect.left < topLeftRect.left + topLeftRect.width &&
                elementRect.top < topLeftRect.top + topLeftRect.height
            );

            let isDockLHidden = document.querySelector('#dockLeft.fn__none') ? 1 : 0;
            let isLayoutDockLHidden = document.querySelector('.layout__dockl[style*="width: 0px"], .layout__dockl.layout--float') ? 1 : 0;

            if (isOverlappingTopLeft && isDockLHidden || !document.getElementById('dockLeft')) {
                layoutTabbar.style.marginLeft = 'var(--b3-toolbar-left-mac)';
            } else if (isOverlappingTopLeft && isLayoutDockLHidden) {
                layoutTabbar.style.marginLeft = 'calc(var(--b3-toolbar-left-mac) - 42px)';
            } else {
                layoutTabbar.style.removeProperty('margin-left');
            }
        }
    }
}

function monitorDOM() {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {

                // 避让mac红绿灯 
                if (!isInBrowser()) {
                    if (isMacOS()) toolbarSpacingLeft();
                }

                // emoji dialog
                let dialog = document.querySelector('.b3-dialog--open .b3-dialog');
                if (dialog && dialog.querySelector('.emojis')) {
                    dialog.classList.add('emojis-container');
                }

                // 页签中显示大纲、关系图、反链时
                let layoutCenterWnds = document.querySelectorAll('.layout__center [data-type="wnd"]');
                if (layoutCenterWnds) layoutCenterWnds.forEach(wndEl => {
                    let layoutCenterFiletree = wndEl.querySelector('.file-tree');
                    if (layoutCenterFiletree && !layoutCenterFiletree.classList.contains('fn__none')) {
                        wndEl.classList.add('shrink-in-tab');
                    } else {
                        wndEl.classList.remove('shrink-in-tab');
                    }
                });


                // for (let key in doms.dock) {
                //     doms.dock[key].classList.add('highlight');
                // }


                // dock与侧栏 ——————————————————
                function isDockLytPinned(node) {
                    return node && !node.classList.contains('layout--float');
                }
                function isDockLytExpanded(node) {
                    return node.style.width !== '0px';
                }

                let docklLayout = document.querySelector('.layout__dockl'),
                    dockrLayout = document.querySelector('.layout__dockr'),
                    dockl = document.getElementById('dockLeft'),     dockr = document.getElementById('dockRight');

                if (isDockLytPinned(docklLayout) && isDockLytExpanded(docklLayout)) {
                    dockl.classList.add('dock-layout-expanded');
                    // console.log('left added')
                } else {
                    if (dockl) dockl.classList.remove('dock-layout-expanded');
                    // console.log('left removed')
                }
                if (isDockLytPinned(dockrLayout) && isDockLytExpanded(dockrLayout)) {
                    dockr.classList.add('dock-layout-expanded');
                    // console.log('right added')
                } else {
                    if (dockr) dockr.classList.remove('dock-layout-expanded');
                    // console.log('right removed')
                }



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
                document.querySelectorAll('.block__icons').forEach(blockIcons => {
                    let nextSibling = blockIcons.nextElementSibling;
                    if (nextSibling && nextSibling.classList.contains("search__header")) {
                        blockIcons.classList.add("search");
                    }
                });

                // 文档树缩进参考、反链
                // 反链重写 目前不是立即生效
                let listItemsFocus = document.querySelectorAll('.file-tree .b3-list-item--focus');
                let backlinkListItems = document.querySelectorAll('.sy__backlink .b3-list-item');

                document.querySelectorAll('.file-tree .has-focus').forEach(oldUl => oldUl.classList.remove('has-focus')
                );
                for (let li of listItemsFocus) {
                    if (!li.nextElementSibling || (li.nextElementSibling.tagName !== 'UL' || li.nextElementSibling.classList.contains('fn__none'))) {
                        li.parentNode.classList.add('has-focus');
                    }
                }
                document.querySelectorAll('.sy__backlink .protyle-shown').forEach(oldLi => oldLi.classList.remove('protyle-shown'))
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
                    if (els) {
                        els.forEach(el => el.parentNode.style.overflow = 'visible')
                    }
                })
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



// var tabbarItems = document.querySelectorAll(".layout-tab-bar .item");
// tabbarItems.forEach(
//     item => {
//         item.addEventListener("mousedown", function () {
//             item.classList.add("clicked");
//           });
//           item.addEventListener("mouseup", function () {
//             item.classList.remove("clicked");
//           })
//     }
// )






