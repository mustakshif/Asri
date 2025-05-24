import { isProtyle, querySelectorAsync } from "../util/misc";
import { asriDoms } from "../util/rsc";

export async function toggleProtyleStatus(docID?: string) {
  let isprotyle = await isProtyle(docID);
  const status = asriDoms.status || (await querySelectorAsync("#status"));
  if (!status) return;
  status.classList.toggle("asri--non-protyle-status", !isprotyle);
}

export function removeProtyleStatusClassName() {
  const status = asriDoms.status;
  if (!status) return;
  status.classList.remove("asri--non-protyle-status");
}
