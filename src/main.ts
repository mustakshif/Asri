import { loadAsriJSModules, unloadAsriJSModules } from "./modules";
import { modeTransition } from "./util/misc";

setTimeout(loadAsriJSModules, 0);

window.destroyTheme = () => {
    unloadAsriJSModules();
    modeTransition();
}