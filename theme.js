(() => {
    import('./style/customizable/customModules.js')
        .then((customModules) => {
            customModules.handleToolbarHover();
            customModules.ModifyMacTrafficLights();
        })
        .catch((e) => {
            console.error(e);
        });
})();

