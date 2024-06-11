import fastdom from "fastdom";
import { isStatusHidden } from "../util/styles";

export function setStatusHeightVar() {
    const statusHeight = isStatusHidden() ? 0 : 32;
    fastdom.mutate(() => {
        document.body.style.setProperty('--status-height', `${statusHeight}px`)
    })
}
