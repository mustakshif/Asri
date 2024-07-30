import { debounce, modeTransition } from "./util/misc";
import { unloadAsriJSModules, loadAsriJSModules } from "./modules";
import fastdom from "fastdom";

setTimeout(async () => {
    loadAsriJSModules();

    window.destroyTheme = () => {
        unloadAsriJSModules();
        modeTransition();
    }
}, 0);