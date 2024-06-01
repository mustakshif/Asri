import { AsriMutationObserver } from "../util/observers";

export const docBodyObserver = new AsriMutationObserver(docBodyCallback);

function docBodyCallback(mutationList: MutationRecord[], observer: MutationObserver) {
    console.log(mutationList);
}
