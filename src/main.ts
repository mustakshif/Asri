import { modeTransition } from "./util/misc";
import { unloadAsriJSModules, loadAsriJSModules } from "./modules";

setTimeout(async () => {
    loadAsriJSModules();

    window.destroyTheme = () => {
        unloadAsriJSModules();
        modeTransition();
    }
}, 0);