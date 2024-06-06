import fastdom from "fastdom";
import { asriDoms as doms, environment as env } from "./util/rsc";
import { addEnvClassNames, removeEnvClassNames } from "./modules/env";
import { useSysScrollbar, restoreDefaultScrollbar } from "./modules/scrollbar";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./modules/trafficLights";
import { modeTransition } from "./util/misc";
import { watchImgExportMo } from "./modules/dialog";
import { asriClickEventListener } from "./modules";

setTimeout(async () => {

    addEnvClassNames();
    useSysScrollbar();
    applyTrafficLightPosition();
    watchImgExportMo.observe(document.body, { childList: true });
    asriClickEventListener.start(document.body, "click");

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
        removeEnvClassNames();
        restoreDefaultScrollbar();
        restoreTrafficLightPosition();
        watchImgExportMo.disconnect(() => document.body.classList.remove("has-exportimg"));
        modeTransition();
    }
}, 0);