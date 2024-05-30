// import fastdom from "fastdom";
import { asriDoms as doms, environment as env } from "./util/rsc";
import { addEnvClassNames, removeEnvClassNames } from "./modules/env";
import { useSysScrollbar, restoreDeletedRules } from "./modules/scrollbar";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./modules/trafficLights";

setTimeout(async () => {
    addEnvClassNames();
    useSysScrollbar();
    applyTrafficLightPosition();

    window.destroyTheme = () => {
        removeEnvClassNames();
        restoreDeletedRules(); // restore scrollbar styles
        restoreTrafficLightPosition();
    }
}, 0);