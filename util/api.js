// 思源 API
// [cc-baselib/siYuanApi.js at main · leolee9086/cc-baselib](https://github.com/leolee9086/cc-baselib/blob/main/src/siYuanApi.js)
// Rem Craft/util/api.js

export {
    getFile,
    putFile,
}

async function getFile(path) {
    const response = await fetch('/api/file/getFile', {
        method: 'POST',
        headers: {
            Authorization: `Token ''`,
        },
        body: JSON.stringify({
            path: path,
        }),
    });
    if (response.status === 200) return response;
    else return null;
}

async function putFile(path, filedata, isDir = false, modTime = Date.now()) {
    let blob = new Blob([filedata]);
    let file = new File([blob], path.split('/').pop());
    let formdata = new FormData();
    formdata.append('path', path);
    formdata.append('file', file);
    formdata.append('isDir', isDir);
    formdata.append('modTime', modTime);
    const response = await fetch('/api/file/putFile', {
        body: formdata,
        method: 'POST',
        headers: {
            Authorization: `Token ''`,
        },
    });
    if (response.status === 200) return await response.json();
    else return null;
}

// 界面 ————————————

// function isFullScreen() {
//     ipcRenderer.invoke('siyuan-get', { cmd: 'isFullScreen' })
//         .then(isFullscreen => isFullscreen ? true : false);
// }