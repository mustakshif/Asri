import fastdom from "fastdom";
import { asriDoms as doms } from "./util/rsc";
import { modeTransition } from "./util/styles";
import { destroyModules, initModules } from "./modules";

setTimeout(async () => {
    initModules();

    fastdom.measure(() => {
        if (doms.layoutCenter()) {
            const centerWidth = doms.layoutCenter()?.clientWidth;
            if (centerWidth) {
                console.log(`centerWidth: ${centerWidth}`);
            } else {
                console.log("centerWidth: undefined");
            }
        }
    });

    window.destroyTheme = () => {
        destroyModules();
        modeTransition();
    }
}, 0);