import fastdom from "fastdom";
import { asriDoms as doms, environment as env } from "./util/rsc";
import { addEnvClassNames, removeEnvClassNames } from "./modules/env";
import { useSysScrollbar, restoreDefaultScrollbar } from "./modules/scrollbar";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./modules/trafficLights";

setTimeout(async () => {
    addEnvClassNames();
    useSysScrollbar();
    applyTrafficLightPosition();
    
    fastdom.measure(() => {
        const centerWidth = doms.layoutCenter()?.clientWidth;
        if (centerWidth) {
            console.log(`centerWidth: ${centerWidth}`);
        }
    });

    window.destroyTheme = () => {
        removeEnvClassNames();
        restoreDefaultScrollbar();
        restoreTrafficLightPosition();
    }
}, 0);