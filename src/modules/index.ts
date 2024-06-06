import { AsriEventListener } from "../util/eventListeners";
import { dockBg } from "./docks";

export const asriClickEventListener = new AsriEventListener(listenClickEvents)

function listenClickEvents(e: Event) {
    console.log(e);
    dockBg();
}