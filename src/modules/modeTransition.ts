import { environment } from "../util/rsc";

export async function modeTransitionOnClick(e: Event) {
    const target = e.target as HTMLElement;

    if (target.closest('[data-name="barmode"] .b3-menu__item:not([id])')) {
        console.log(`Clicked item: ${target.textContent}`);
        // startTranstition();
        startDefaultTranstition(() => {
            console.log('\x1b[34m\x1b[1m\x1b[47mMode Transition started\x1b[0m');
        }, environment.isMacOS ? 0 : 100);
    }
}

export async function startDefaultTranstition(func?: () => void, waitDuration = 0) {
    if (!document.startViewTransition) {
        if (func) func();
        return;
    }

    if (waitDuration > 0) {
        const wait = (ms: number) => {
            return new Promise(r => setTimeout(r, ms))
        };
        const transition = document.startViewTransition(async () => {
            // Pause for up to 100ms for fonts to be ready:
            await Promise.race([wait(waitDuration)]);
            func && func();
        });

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    opacity: [0, 1],
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                }
            );
        });
    } else {
        document.startViewTransition(func); // 此时动画时长由CSS决定
    }

}

export const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');


// 圆形过渡
// let lastClick: any;
// // addEventListener('click', event => (lastClick = event));

// function spaNavigate() {
//     // Fallback for browsers that don't support this API:
//     if (!document.startViewTransition) {
//         return;
//     }

//     // Get the click position, or fallback to the middle of the screen
//     const x = lastClick?.clientX ?? innerWidth / 2;
//     const y = lastClick?.clientY ?? innerHeight / 2;
//     // Get the distance to the furthest corner
//     const endRadius = Math.hypot(
//         Math.max(x, innerWidth - x),
//         Math.max(y, innerHeight - y)
//     );

//     // With a transition:
//     const transition = document.startViewTransition(() => {
//     });

//     // Wait for the pseudo-elements to be created:
//     transition.ready.then(() => {
//         // Animate the root's new view
//         document.documentElement.animate(
//             {
//                 clipPath: [
//                     `circle(0 at ${x}px ${y}px)`,
//                     `circle(${endRadius}px at ${x}px ${y}px)`,
//                 ],
//             },
//             {
//                 duration: 500,
//                 easing: 'ease-in',
//                 // Specify which pseudo-element to animate
//                 pseudoElement: '::view-transition-new(root)',
//             }
//         );
//     });
// }