// 思源 API
// [cc-baselib/siYuanApi.js at main · leolee9086/cc-baselib](https://github.com/leolee9086/cc-baselib/blob/main/src/siYuanApi.js)
// Rem Craft/util/api.js

export {
    getFile,
    putFile,
    setBlockAttrs,
    getBlockAttrs
}

async function getFile(path:string) {
    const response = await fetch('/api/file/getFile', {
        method: 'POST',
        headers: {
            Authorization: `Token ''`,
        },
        body: JSON.stringify({
            path: path,
        }),
    });
    if (response.ok) return response;
    else return null;
}

async function putFile(path:string, filedata: BlobPart, isDir = false, modTime = Date.now()) {
    let blob = new Blob([filedata]);
    let fileName = path.split('/').pop() as string;
    let file = new File([blob], fileName);
    let formdata = new FormData();
    formdata.append('path', path);
    formdata.append('file', file);
    formdata.append('isDir', String(isDir));
    formdata.append('modTime', String(modTime));
    const response = await fetch('/api/file/putFile', {
        body: formdata,
        method: 'POST',
        headers: {
            Authorization: `Token ''`,
        },
    });
    if (response.ok) return await response.json();
    else return null;
}

async function setBlockAttrs(内容块id: string, 属性对象: any) {
    let url = '/api/attr/setBlockAttrs';
    return 解析响应体(
        向思源请求数据(url, {
            id: 内容块id,
            attrs: 属性对象,
        })
    );
}

async function getBlockAttrs(id: string) {
    let url = '/api/attr/getBlockAttrs';
    return 解析响应体(
        向思源请求数据(url, {
            id: id,
        })
    );
}


async function 解析响应体(response: any) {
    let r = await response;
    // console.log(r)
    return r.code === 0 ? r.data : null;
}
async function 向思源请求数据(url:any, data:any) {
    let resData = null;
    console.log(data);
    await fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            Authorization: `Token ${''}`,
        },
    }).then(function (response) {
        resData = response.json();
        console.log(resData);
    });
    return resData;
}