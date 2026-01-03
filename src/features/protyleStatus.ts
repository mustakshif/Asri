import { getFocusedProtyleInfo, querySelectorAsync } from "../utils/misc";
import { asriDoms } from "../utils/rsc";

export async function toggleProtyleStatus(docID?: string) {
  let isprotyle = (await getFocusedProtyleInfo(docID)).isProtyle;
  const status = asriDoms.status || (await querySelectorAsync("#status"));
  if (!status) return;
  status.classList.toggle("asri--non-protyle-status", !isprotyle);
}

export function removeProtyleStatusClassName() {
  const status = asriDoms.status;
  if (!status) return;
  status.classList.remove("asri--non-protyle-status");
}
