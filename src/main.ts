import { loadAsriJSModules, unloadAsriJSModules } from "./modules";
import { modeTransition } from "./util/misc";

loadAsriJSModules();

window.destroyTheme = () => {
    unloadAsriJSModules();
    modeTransition();
}