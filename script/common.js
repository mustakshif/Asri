// 判断运行平台是否为 macOS

export function isMacOS() {
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}

// 判断是否在浏览器中
export function isInBrowser() {
    let body = document.body;
    let toolbar = document.querySelector('.toolbar');

    if (toolbar && toolbar.classList.contains('toolbar--browser')) {
        body.classList.add("body--browser");
        return true;
    } else {
        return false;
    }
}
