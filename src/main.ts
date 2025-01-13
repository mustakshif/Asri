import { loadAsriJSModules, unloadAsriJSModules } from "./modules";

loadAsriJSModules();

window.destroyTheme = () => {

    let completeUnload = true;

    setTimeout(() => {
        const themePairOnDestroy = {
            'light': window.siyuan.config.appearance.themeLight,
            'dark': window.siyuan.config.appearance.themeDark
        }
        console.log('destroy', themePairOnDestroy);
        if (themePairOnDestroy.light === 'Asri' &&
            themePairOnDestroy.dark === 'Asri'
        ) {
            completeUnload = false;
        };
        console.log(`\x1b[31m\x1b[1m\x1b[47mTheme destroy mode: ${completeUnload ? 'complete' : 'incomplete'}\x1b[0m`);
        unloadAsriJSModules(completeUnload);
    }, 0);
}