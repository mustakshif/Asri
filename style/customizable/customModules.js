import { isInBrowser } from "../../script/common.js";
import { useSysScrollbar } from "../../script/scrollbar.js";

isInBrowser();

// 隐藏顶栏
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


useSysScrollbar();