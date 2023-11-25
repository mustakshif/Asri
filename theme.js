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

// let protyleBg = document.querySelector('.protyle-background--enable')
// let protyleBgIcon = protyleBg.querySelectorAll('.protyle-background__icon')

// if (protyleBgIcon.classList.contains('fn__none')) {
//     protyleBg.style.marginBottom='-94px';
// }