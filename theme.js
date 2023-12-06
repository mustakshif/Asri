(() => {
    import('./style/customizable/customModules.js')
        .then((customModules) => {
            customModules.handleToolbarHover();
            customModules.ModifyMacTrafficLights();
        })
        .catch((e) => {
            console.error(e);
        });
})();



function monitorDOM() {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {
                const doms = {
                    dialog: document.querySelector('.b3-dialog--open .b3-dialog'),
                    layouts: document.getElementById('layouts'),
                    status: document.getElementById('status'),
                    dockl: document.getElementById('dockLeft'),
                    dockr: document.getElementById('dockRight'),
                    docklLayout: layouts.querySelector('.layout__dockl'),
                    dockrLayout: layouts.querySelector('.layout__dockr'),
                    blockIconsList: layouts.querySelectorAll('.block__icons'),
                }

                // emoji dialog                
                if (doms.dialog && doms.dialog.querySelector('.emojis')) {
                    doms.dialog.classList.add('emojis-container');
                }

                // 页签中显示大纲、关系图、反链时
                var layoutCenterActive = doms.layouts.querySelector('.layout__center .layout__wnd--active');
                if (layoutCenterActive) {
                    var layoutCenterFiletree = layoutCenterActive.querySelector('.file-tree');
                    if (layoutCenterFiletree && !layoutCenterFiletree.classList.contains('fn__none')) {
                        layoutCenterActive.classList.add('shrink-in-tab');
                    } else {
                        layoutCenterActive.classList.remove('shrink-in-tab');
                    }
                }

                // for (let key in doms.dock) {
                //     doms.dock[key].classList.add('highlight');
                // }


                // dock与侧栏 ——————————————————
                function isDockLytPinned(node) {
                    return !node.classList.contains('layout--float');
                }
                function isDockLytExpanded(node) {
                    return node.style.width !== '0px';
                }

                if (isDockLytPinned(doms.docklLayout) && isDockLytExpanded(doms.docklLayout)) {
                    doms.dockl.classList.add('dock-layout-expanded');
                    // console.log('left added')
                } else {
                    doms.dockl.classList.remove('dock-layout-expanded');
                    // console.log('left removed')
                }
                if (isDockLytPinned(doms.dockrLayout) && isDockLytExpanded(doms.dockrLayout)) {
                    doms.dockr.classList.add('dock-layout-expanded');
                    // console.log('right added')
                } else {
                    doms.dockr.classList.remove('dock-layout-expanded');
                    // console.log('right removed')
                }



                //右侧面板底部 padding
                if (!doms.status.classList.contains('fn__none')) {
                    doms.dockrLayout.classList.add('body-status-shown');
                } else {
                    doms.dockrLayout.classList.remove('body-status-shown');
                }

                // status 右边距
                if (doms.dockr.classList.contains('fn__none')) {
                    doms.status.style.right = '8px';
                } else {
                    doms.status.style.right = '48px';
                }

                //  页签搜索
                doms.blockIconsList.forEach(function (blockIcons) {
                    let nextSibling = blockIcons.nextElementSibling;
                    if (nextSibling && nextSibling.classList.contains("search__header")) {
                        blockIcons.classList.add("search");
                    }
                });

                // 文档树缩进参考
                let listItemsFocus = document.querySelectorAll('.file-tree .b3-list-item--focus');
                document.querySelectorAll('.file-tree .has-focus').forEach(oldUl => {
                    oldUl.classList.remove('has-focus')
                });
                for (let li of listItemsFocus) {
                    if (!li.nextElementSibling || (li.nextElementSibling.tagName !== 'UL' || li.nextElementSibling.classList.contains('fn__none'))) {
                        li.parentNode.classList.add('has-focus');
                    }
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
