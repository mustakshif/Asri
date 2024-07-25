import fastdom from "fastdom";
import { asriDoms as doms } from "./util/rsc";
import { isOverlapping, modeTransition } from "./util/misc";
import { unloadAsriJSModules, loadAsriJSModules } from "./modules";

setTimeout(async () => {
    loadAsriJSModules();

    fastdom.measure(() => {
        console.log('measure called: ', doms.layoutCenter);

        if (doms.layoutCenter) {
            const centerWidth = doms.layoutCenter?.clientWidth;
            if (centerWidth) {
                console.log(`centerWidth: ${centerWidth}`);
            } else {
                console.log("centerWidth: undefined");
            }
        }
    });

    console.log(isOverlapping(doms.drag,doms.toolbar))

    window.destroyTheme = () => {
        unloadAsriJSModules();
        modeTransition();
    }
}, 0);