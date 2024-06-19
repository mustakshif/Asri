import fastdom from "fastdom";
import { asriDoms as doms } from "./util/rsc";
import { modeTransition } from "./util/misc";
import { unloadAsriModules, loadAsriModules } from "./modules";

setTimeout(async () => {
    loadAsriModules();

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
        unloadAsriModules();
        modeTransition();
    }
}, 0);