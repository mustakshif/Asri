import { loadAsriJSModules, unloadAsriJSModules } from "./modules";

loadAsriJSModules();

window.destroyTheme = () => {
    console.log('\x1b[31m\x1b[1m\x1b[47mTheme destroying\x1b[0m');
    // asriModeTransition();
    unloadAsriJSModules();
}