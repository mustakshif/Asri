import fastdom from "fastdom";
import { asriDoms as doms, environment as env } from "./util/rsc";
import { addEnvClassNames, removeEnvClassNames } from "./modules/env";
import { useSysScrollbar, restoreDefaultScrollbar } from "./modules/scrollbar";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./modules/trafficLights";
import { modeTransition } from "./modules/modeTransition";
import { watchImgExportMo } from "./modules/dialog";

setTimeout(async () => {

    addEnvClassNames();
    useSysScrollbar();
    applyTrafficLightPosition();
    watchImgExportMo.observe(document.body, { childList: true });

    fastdom.measure(() => {
        const centerWidth = doms.layoutCenter()?.clientWidth;
        if (centerWidth) {
            console.log(`centerWidth: ${centerWidth}`);
        } else {
            console.log("centerWidth: undefined");
        }
    });

    window.destroyTheme = () => {
        removeEnvClassNames();
        restoreDefaultScrollbar();
        restoreTrafficLightPosition();
        modeTransition();
        watchImgExportMo.disconnect(() => document.body.classList.remove("has-exportimg"));
    }
}, 0);