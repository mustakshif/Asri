import { isInBrowser } from "../../script/common.js";
import { useSysScrollbar } from "../../script/scrollbar.js";

isInBrowser();
useSysScrollbar();

// 隐藏顶栏 --> hide-toolbar.scss
export function handleToolbarHover() {
    let toolbar = document.querySelector('.toolbar');
    let toolbarDrag = toolbar.querySelector('#drag');

    toolbarDrag.addEventListener('mouseenter', () => {
        toolbar.classList.add('no-hover');
    });
    toolbarDrag.addEventListener('mouseleave', () => {
        toolbar.classList.remove('no-hover');
    });
}

// Mac 红绿灯
export function ModifyMacTrafficLights() {
    if (!isInBrowser()) {
        const currentWindowModified = require("@electron/remote").getCurrentWindow();
        currentWindowModified.setTrafficLightPosition({ x: 16, y: 16 });
    }
}

//题头图渐隐 --> cover-image-fading.scss
// document.addEventListener("DOMContentLoaded", function () {
//     // 定义一个函数来处理 .protyle-background 元素
//     function handleProtyleBg(protyleBg) {
//         // 获取对应的 .protyle-background__icon 元素
//         var iconwIcon = protyleBg.querySelector(".protyle-background__icon");

//         // 创建一个新的 MutationObserver
//         var iconObserver = new MutationObserver(function (iconMutations) {
//             iconMutations.forEach(function (iconMutation) {
//                 if (iconMutation.type === "attributes" && iconMutation.attributeName === "class") {
//                     if (iconwIcon.classList.contains("fn__none")) {
//                         protyleBg.classList.add("no-icon");
//                     } else {
//                         protyleBg.classList.remove("no-icon");
//                     }
//                 }
//             });
//         });

//         // 配置观察选项：只观察类列表的变化
//         var config = { attributes: true, subtree: true,attributeFilter: ["class"] };

//         // 开始观察 iconwIcon
//         iconObserver.observe(iconwIcon, config);
//     }

//     // 获取和处理所有已有的 .protyle-background 元素
//     var protyleBgElements = document.querySelectorAll(".protyle-background");
//     protyleBgElements.forEach(handleProtyleBg);

//     // 创建一个新的 MutationObserver 来监视整个文档
//     var observer = new MutationObserver(function (mutations) {
//         mutations.forEach(function (mutation) {
//             if (mutation.type === "childList") {
//                 mutation.addedNodes.forEach(function (node) {
//                     if (node.nodeType === Node.ELEMENT_NODE) {
//                         // 对每个新添加的 .protyle-background 元素进行处理
//                         var protyleBgElements = node.querySelectorAll(".protyle-background");
//                         protyleBgElements.forEach(handleProtyleBg);
//                     }
//                 });
//             }
//         });
//     });

//     // 配置观察选项：观察子节点的添加和删除
//     var config = { childList: true, subtree: true };

//     // 开始观察整个文档
//     observer.observe(document, config);
// });