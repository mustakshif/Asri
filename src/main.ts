import { loadAsriJSModules, unloadAsriJSModules } from "./modules";
import { asriModeTransition } from "./util/misc";
import { environment } from "./util/rsc";

loadAsriJSModules();

window.destroyTheme = () => {
    asriModeTransition();
    setTimeout(() => {
        const appearanceConfig = window.siyuan.config.appearance;
        const fromMode = environment.appSchemeMode;
        const currMode = window.siyuan.config.appearance.mode > 0 ? 'dark' : 'light';
        if (
            appearanceConfig.themeDark === appearanceConfig.themeLight || (
                fromMode === currMode && (
                    (currMode === 'dark' && appearanceConfig.themeDark === 'Asri') ||
                    (currMode === 'light' && appearanceConfig.themeLight === 'Asri')
                )
            )
        ) {
            return;
        }

        unloadAsriJSModules();
    }, 500);
}