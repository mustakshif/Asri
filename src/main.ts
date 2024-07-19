import fastdom from "fastdom";
import { asriDoms as doms } from "./util/rsc";
import { modeTransition } from "./util/misc";
import { unloadAsriJSModules, loadAsriJSModules } from "./modules";

setTimeout(async () => {
    loadAsriJSModules();

    fastdom.measure(() => {
        if (doms.layoutCenter) {
            const centerWidth = doms.layoutCenter?.clientWidth;
            if (centerWidth) {
                console.log(`centerWidth: ${centerWidth}`);
            } else {
                console.log("centerWidth: undefined");
            }
        }
    });

    window.destroyTheme = () => {
        unloadAsriJSModules();
        modeTransition();
    }
}, 0);