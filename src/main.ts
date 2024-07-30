import { loadAsriJSModules, unloadAsriJSModules } from "./modules";
import { modeTransition } from "./util/misc";

setTimeout(async () => {
    loadAsriJSModules();

    window.destroyTheme = () => {
        unloadAsriJSModules();
        modeTransition();
    }
}, 0);