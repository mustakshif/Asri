// 来自 Rem Craft/util/resource.js

// export const root = '/appearance/themes/Asri/';

export const asriDoms = {
    layouts: document.getElementById('layouts'),
    status: document.getElementById('status'),
    dockl: document.getElementById('dockLeft'),
    dockr: document.getElementById('dockRight'),
    dockb: document.getElementById('dockBottom'),
    layoutDockl: document.querySelector('.layout__dockl'),
    layoutDockr: document.querySelector('.layout__dockr'),
    layoutDockb: document.querySelector('.layout__dockb'),
    toolbar: document.getElementById('toolbar'),
    barSync: document.getElementById('barSync'),
    barForward: document.getElementById('barForward'),
    toolbarVIP: document.getElementById('toolbarVIP'),
    drag: document.getElementById('drag'),
    barPlugins: document.getElementById('barPlugins'),
    barSearch: document.getElementById('barSearch'),
    barMode: document.getElementById('barMode')
}
// export async function checkVersion() {
//     try {
//         const response = await fetch(root + 'theme.json');
//         if (!response.ok || response.status !== 200) {
//             throw new Error(response.statusText);
//         }
//         const json = await response.json();
//         let localVersion = json.version;
//         return window.siyuan.config.appearance.themeVer === localVersion
//             ? window.siyuan.config.appearance.themeVer
//             : localVersion;
//     } catch (e) {
//         console.error(e);
//     }
// }

// /**
//  * 静态资源请求 URL 添加参数
//  * @param {string} url 资源请求 URL
//  * @return {string} 返回添加参数后的 URL
//  */
// export function addURLParam(
//     url,
//     param = {
//         // t: new Date().getTime(),
//         v: window.siyuan.config.appearance.themeVer,
//     }
// ) {
//     let new_url;
//     switch (true) {
//         case url.startsWith('//'):
//             new_url = new URL(`https:${url}`);
//             break;
//         case url.startsWith('http://'):
//         case url.startsWith('https://'):
//             new_url = new URL(url);
//             break;
//         case url.startsWith('/'):
//             new_url = new URL(url, window.location.origin);
//             break;
//         default:
//             new_url = new URL(url, window.location.origin + window.location.pathname);
//             break;
//     }
//     for (let [key, value] of Object.entries(param)) {
//         new_url.searchParams.set(key, value);
//     }
//     switch (true) {
//         case url.startsWith('//'):
//             return new_url.href.substring(new_url.protocol.length);
//         case url.startsWith('http://'):
//         case url.startsWith('https://'):
//             return new_url.href;
//         case url.startsWith('/'):
//             return new_url.href.substring(new_url.origin.length);
//         default:
//             return new_url.href.substring(
//                 (window.location.origin + window.location.pathname).length
//             );
//     }
// }

// /**
//  * 加载脚本文件
//  * @param {string} url 脚本地址
//  * @param {string} type 脚本类型
//  * @param {boolean} async 是否异步加载 & 非阻塞运行
//  * @param {boolean} defer 是否异步加载 & 阻塞运行
//  * @param {string} position 节点插入位置
//  * @param {HTMLElementNode} element 节点插入锚点
//  */
// export function loadScript(
//     src,
//     type = 'module',
//     id ='',
//     async = false,
//     defer = false,
//     position = 'beforebegin',
//     element = document.getElementById('themeScript') ?? document.currentScript
// ) {
//     const script = document.createElement('script');
//     if (type) script.type = type;
//     if (id) script.id = id;
//     if (async) script.async = true;
//     if (defer) script.defer = true;
//     script.src = src;
//     element.insertAdjacentElement(position, script);
// }