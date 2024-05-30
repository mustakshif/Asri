// import fastdom from "fastdom";
import { asriDoms as doms, environment as env } from "./util/rsc";
import { addEnvClassNames, removeEnvClassNames } from "./modules/env";
import * as sysScrollbar from "./modules/scrollbar";
import { applyTrafficLightPosition, restoreTrafficLightPosition } from "./modules/trafficLights";

setTimeout(async () => {
    addEnvClassNames();
    sysScrollbar.useSysScrollbar();
    applyTrafficLightPosition();

    window.destroyTheme = () => {
        removeEnvClassNames();
        sysScrollbar.restoreDeletedRules(); // restore scrollbar styles
        restoreTrafficLightPosition();
    }
}, 0);