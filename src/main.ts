import { loadAsriJSModules, unloadAsriJSModules } from "./modules";
import { modeTransition } from "./util/misc";

setTimeout(() => {
    loadAsriJSModules();

    window.destroyTheme = () => {
        unloadAsriJSModules();
        modeTransition();
    }
}, 0);