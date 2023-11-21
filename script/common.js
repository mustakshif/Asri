// 判断是否在浏览器中
export function isInBrowser() {
    let body = document.body;
    let toolbar = document.querySelector('.toolbar');

    if (toolbar.classList.contains('toolbar--browser')) {
        body.classList.add("body--browser");
        return true;
    } else {
        return false;
    }
}