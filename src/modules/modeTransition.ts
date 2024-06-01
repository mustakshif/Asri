export function modeTransition() {
    document.body.classList.add('asri-mode-transition');
    setTimeout(() => {
        document.body.classList.remove('asri-mode-transition');
    }, 350);
}