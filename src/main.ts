import { loadAsriJSModules, unloadAsriJSModules } from "./modules";

loadAsriJSModules();
const themePairOnStart = {
    'light': window.siyuan.config.appearance.themeLight,
    'dark': window.siyuan.config.appearance.themeDark
}

window.destroyTheme = () => {
    
    let completeUnload = true;
    const themePairOnDestroy = {
        'light': window.siyuan.config.appearance.themeLight,
        'dark': window.siyuan.config.appearance.themeDark
    }
    console.log('destroy',themePairOnDestroy);
    if (themePairOnDestroy.light === themePairOnStart.light && themePairOnDestroy.dark === themePairOnStart.dark && themePairOnDestroy.light === 'Asri') {
        completeUnload = false;
    };

    console.log(`\x1b[31m\x1b[1m\x1b[47mDestroying Theme: ${completeUnload?'complete':'incomplete'}\x1b[0m`);
    unloadAsriJSModules(completeUnload);
}