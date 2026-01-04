import { setThemeSource } from "../platform/vibrancy";

export async function modeTransitionOnClick(e: Event) {
  if (e.type !== "mouseup") return;

  const target = e.target as HTMLElement;

  if (target.closest('[data-name="barmode"] .b3-menu__item:not([id])')) {
    console.log(`Clicked item: ${target.textContent}, dataset: ${target.parentElement?.dataset.id}`);
    // e.stopPropagation();
    // e.preventDefault();
    startFadeInFadeOutTranstition();
    if (target.parentElement?.dataset.id === "themeOS") setThemeSource();
  }
}

export async function startFadeInFadeOutTranstition(animDuration = 600, func?: () => void, waitDuration = 0) {
  // // Setup view transition support
  // const meta = document.createElement('meta');
  // meta.name = 'view-transition';
  // meta.content = 'same-origin';
  // document.head.appendChild(meta);

  if (!document.startViewTransition) {
    func && func();
    return;
  }

  console.log("\x1b[34m\x1b[1m\x1b[47mMode Transition started\x1b[0m");
  if (waitDuration > 0) {
    const wait = (ms: number) => {
      return new Promise((r) => setTimeout(r, ms));
    };
    const transition = document.startViewTransition(async () => {
      await Promise.race([wait(waitDuration)]);
      func && func();
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          opacity: [0, 1],
        },
        {
          duration: animDuration,
          // easing: 'ease-in-out',
        }
      );
    });
  } else {
    const transition = document.startViewTransition(func);
    const style = document.createElement("style");
    style.textContent = `
            ::view-transition-old(root),
            ::view-transition-new(root) {
                animation-duration: ${animDuration}ms;
            }
        `;
    document.head.appendChild(style);

    await transition.finished;
    style.remove();
  }
}

export const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
