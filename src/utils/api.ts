// 思源 API
// [cc-baselib/siYuanApi.js at main · leolee9086/cc-baselib](https://github.com/leolee9086/cc-baselib/blob/main/src/siYuanApi.js)
// Rem Craft/util/api.js

export { getFile, putFile, setBlockAttrs, getBlockAttrs };

interface SiyuanResponse<T = unknown> {
  code: number;
  data: T;
  [key: string]: unknown;
}

interface BlockAttrs {
  [key: string]: string;
}

async function getFile(path: string) {
  const response = await fetch("/api/file/getFile", {
    method: "POST",
    body: JSON.stringify({ path }),
  });
  if (response.ok) return response;
  else return null;
}

async function putFile(path: string, filedata: BlobPart, isDir = false, modTime = Date.now()) {
  let blob = new Blob([filedata]);
  let fileName = path.split("/").pop() as string;
  let file = new File([blob], fileName);
  let formdata = new FormData();
  formdata.append("path", path);
  formdata.append("file", file);
  formdata.append("isDir", String(isDir));
  formdata.append("modTime", String(modTime));
  const response = await fetch("/api/file/putFile", {
    body: formdata,
    method: "POST",
  });
  if (response.ok) return await response.json();
  else return null;
}

async function setBlockAttrs(blockId: string, attrObj: BlockAttrs) {
  const url = "/api/attr/setBlockAttrs";
  return resolveResponse(
    requestFromSiyuan(url, {
      id: blockId,
      attrs: attrObj,
    })
  );
}

async function getBlockAttrs(id: string): Promise<BlockAttrs | null> {
  const url = "/api/attr/getBlockAttrs";
  return resolveResponse(
    requestFromSiyuan(url, { id })
  );
}

async function resolveResponse<T>(response: Promise<SiyuanResponse<T>>): Promise<T | null> {
  const r = await response;
  return r.code === 0 ? r.data : null;
}

async function requestFromSiyuan<T>(url: string, data: unknown): Promise<SiyuanResponse<T>> {
  const response = await fetch(url, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      Authorization: `Token ${""}`,
    },
  });
  return response.json() as Promise<SiyuanResponse<T>>;
}
