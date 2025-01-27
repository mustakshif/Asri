// import htmlString from './menuHTML/index.html';
import { getFile, putFile } from '../../util/api';
import { remote } from '../../util/electron';
import { debounce, hexToHSL, hexToOklchL, querySelectorAsync } from '../../util/misc';
import { environment as env } from '../../util/rsc';
import { startFadeInFadeOutTranstition } from '../modeTransition';

let asriConfigs = {
    'light': {
        'followSysAccentColor': false,
        'chroma': "1",
        'userCustomColor': "#3478f6",
        'presetPalette': ''
    },
    'dark': {
        'followSysAccentColor': false,
        'chroma': "1",
        'userCustomColor': "#3478f6",
        'presetPalette': ''
    }
};

let curMode: 'light' | 'dark';

const debounceChramaValueSaving = debounce(updateAsriConfigs, 200);

export let i18n: any;
let sysAccentColor: string;
let isSysAccentGray = false, isUserAccentGray = false;
let followSysAccentBtn: AsriDomsExtended, pickColorBtn: AsriDomsExtended, asriChromaSlider: HTMLInputElement | null, colorPicker: HTMLInputElement | null;
export let followSysAccentColor = false;

function updateThemeMode() {
    return window.siyuan.config.appearance.mode === 0 ? 'light' : 'dark'
}
export async function loadThemePalette() {
    // if (env.isIOSApp) return; // fix app crash
    // i18n = await loadI18n();
    curMode = updateThemeMode();
    getAsriConfigs().then(() => {
        if (!env.supportOklch) return;

        // check local configs to set initial theme color
        if (!(env.isInBrowser || env.isMobile || env.isLinux)) {
            if (followSysAccentColor) {
                document.documentElement.style.removeProperty('--asri-user-custom-accent');
            }
            else {
                document.documentElement.style.setProperty('--asri-user-custom-accent', asriConfigs[curMode].userCustomColor);
                reverseOnPrimaryLightness(asriConfigs[curMode].userCustomColor);
            }
        } else {
            document.documentElement.style.setProperty('--asri-user-custom-accent', asriConfigs[curMode].userCustomColor);
            reverseOnPrimaryLightness(asriConfigs[curMode].userCustomColor);
        }

        document.documentElement.style.setProperty('--asri-c-factor', asriConfigs[curMode].chroma);
        isUserAccentGray = asriConfigs[curMode].chroma === '0' ? true : false;
        handleGrayScale(asriConfigs[curMode].chroma);
        getSystemAccentColor();
    });

    // env.supportOklch && asriDoms.barMode?.addEventListener("click", customizeThemeColor);
}

export function unloadThemePalette() {
    document.documentElement.style.removeProperty('--asri-user-custom-accent');
    document.documentElement.style.removeProperty('--asri-sys-accent-grayscale');
    document.documentElement.style.removeProperty('--asri-c-factor');
    document.documentElement.style.removeProperty('--asri-sys-accent');
    document.documentElement.style.removeProperty('--asri-sys-accent-accessible');
    document.documentElement.style.removeProperty('--asri-c-0');
    document.documentElement.style.removeProperty('--asri-on-primary-reverse');
    // asriDoms.barMode?.removeEventListener("click", customizeThemeColor);
    document.querySelectorAll('.asri-config').forEach(el => el.remove());
}

export async function loadI18n() {
    let res: Response;
    try {
        if (['zh_CN', 'zh_CHT', 'en_US'].includes(env.lang)) {
            res = await fetch(`/appearance/themes/Asri/i18n/${env.lang}.json`);
        } else {
            res = await fetch('/appearance/themes/Asri/i18n/en_US.json');
        }

        i18n = await res.json();
        return i18n;
    } catch (error) {
        console.error('failed to load i18n:', error);
        throw error;
    }
}

async function getAsriConfigs() {
    console.log('curMode', curMode);
    await getFile("/data/snippets/Asri.config.json")
        .then((response) => {
            if (response && response.status === 200) {
                return response.json();
            }
            return null;
        })
        .then(data => {
            if (!data) {
                followSysAccentColor = asriConfigs[curMode].followSysAccentColor;
                return;
            };

            // 如果本地配置数据中没有light或dark，则将旧数据赋值给asriConfigs
            let originalData: any;

            if (!(data['light'])) {
                originalData = data;
                Object.keys(asriConfigs).forEach(key => {
                    data[key as keyof typeof asriConfigs] = originalData;
                })
            }

            const modes: ('light' | 'dark')[] = ['light', 'dark'];
            for (const mode of modes) {
                asriConfigs[mode].followSysAccentColor = !!data[mode].followSysAccentColor;
                asriConfigs[mode].chroma = data[mode].chroma ?? "1";
                asriConfigs[mode].userCustomColor = data[mode].userCustomColor ?? "#3478f6";
                asriConfigs[mode].presetPalette = data[mode].presetPalette ?? '';
            }

            followSysAccentColor = !!data[curMode].followSysAccentColor;
        });
}

async function updateAsriConfigs() {
    await putFile("/data/snippets/Asri.config.json", JSON.stringify(asriConfigs, undefined, 4));
}

// async function customizeThemeColor() {
//     if (!Object.keys(i18n).length) i18n = await loadI18n();
//     // create menu items and handle click events
//     setTimeout(createMenuItems, 0);
// }

export async function createBarModeMenuItems(e: Event) {
    if (e.type !== 'mouseup') return;
    if (!Object.keys(i18n).length) i18n = await loadI18n();
    const target = e.target as HTMLElement;
    const targetItem = target.closest('.toolbar__item') as HTMLElement;
    if (!targetItem) return;
    // use existing menu items if any
    if (document.querySelector('.asri-config')) return;
    // create menu items when there is no existing menu items
    let barModeMenuItems = await querySelectorAsync('#commonMenu[data-name="barmode"] .b3-menu__items', document, 2, 0);
    if (!barModeMenuItems) return;

    const asriConfigMenuHTML = `
        <button class="b3-menu__separator asri-config"></button>
        <button class="b3-menu__item asri-config" id="pickColor">
            <svg class="b3-menu__icon"></svg>
            <input id="asriColorPicker" type="color" value="${asriConfigs[curMode].userCustomColor}">
            <label for="asriColorPicker" class="be-menu__label">${i18n['pickColor']}</label>
        </button>
        <button class="b3-menu__item asri-config" id="followSysAccent">
            <svg class="b3-menu__icon"></svg>
            <label for="" class="be-menu__label">${i18n['followSysAccent']}</label>
        </button>
        <button class="b3-menu__item asri-config" data-type="nobg" id="asriChroma">
            <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 11l-8-8l-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0zM5 2l5 5m-8 6h15m5 7a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4c.3 1.6 2 2.4 2 4" />
            </svg>
            <div aria-label="${i18n['asriChroma'] + (asriChromaSlider?.value ?? asriConfigs[curMode].chroma ?? '1')}" class="b3-tooltips b3-tooltips__n">
                <input style="box-sizing: border-box" type="range" id="asriChromaSlider" class="b3-slider fn__block" min="0" max="5" step="0.1" value="1">
            </div>
        </button>
        <button class="b3-menu__separator asri-config"></button>
        <button class="b3-menu__item asri-config" id="prst-light-everbliss">
            <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#ed6c30" d="M65.49 56.02c.13.32.45 1.18.75 1.36c.36.23 1.6-.35 1.96-.54a6.1 6.1 0 0 0 2.66-2.66c1.15-2.27-.27-5.1-3-4.79c-2.99.34-3.23 4.47-2.37 6.63m-7.59 9.29c.27-.23 1-.79 1.08-1.13c.11-.42-.82-1.42-1.1-1.71c-.9-.91-2.07-1.54-3.33-1.74c-2.51-.42-4.79 1.79-3.67 4.31c1.22 2.74 5.23 1.72 7.02.27m11.66 4.76c-.34-.09-1.23-.33-1.54-.19c-.4.17-.64 1.51-.71 1.9c-.18 1.27.03 2.58.63 3.71c1.18 2.25 4.31 2.74 5.64.33c1.46-2.62-1.77-5.21-4.02-5.75M59.01 52.69c.42.39.85.84 1.32 1.19c.27.2.87.36 1.14.09c.41-.41.54-1.5.66-2.03c.57-2.43.88-4.96.46-7.44l-.02-.08c-.64-3.88-6.03-4.85-7.63-1.05l-.11.3c-.75 2.3.13 4.71 1.67 6.44c.8.9 1.63 1.75 2.51 2.58m-9.58 5.14c1.18.2 2.37.34 3.56.44c.58.05 1.19.13 1.78.11c.32-.01.9-.27.95-.64c.06-.58-.52-1.51-.76-2c-1.07-2.26-2.41-4.43-4.28-6.1l-.06-.06c-2.93-2.62-7.74-.01-6.62 3.96l.11.3c.83 2.26 3.02 3.59 5.32 3.99m-6.78 13.09c-3.71 1.3-3.73 6.78.29 7.7l.32.05c2.39.35 4.61-.94 6.06-2.76q1.11-1.41 2.1-2.91c.32-.49.68-.98.94-1.5c.15-.3.2-.92-.11-1.14c-.48-.34-1.57-.27-2.12-.3c-2.49-.13-5.04 0-7.4.83zM66.7 89.74c1.51-1.89 1.52-4.45.68-6.63a40 40 0 0 0-1.45-3.28c-.26-.52-.51-1.08-.82-1.58c-.18-.27-.69-.63-1.04-.48c-.53.24-1.03 1.21-1.33 1.68c-1.38 2.08-2.55 4.35-3.03 6.8l-.02.09c-.74 3.86 3.96 6.64 6.79 3.64zm14.61-13.11l.07.05c3.44 1.9 7.55-1.7 5.57-5.33l-.17-.27c-1.33-2.02-3.76-2.83-6.08-2.71c-1.2.06-2.39.19-3.57.37c-.57.08-1.19.14-1.75.29c-.32.08-.82.46-.78.83c.06.58.84 1.35 1.18 1.79c1.55 1.95 3.34 3.77 5.53 4.98m-6.36-18.25c.56.18 1.58-.22 2.11-.36c2.42-.62 4.8-1.53 6.8-3.04l.07-.05c3.13-2.38 1.49-7.6-2.62-7.25l-.32.05c-2.38.39-4.11 2.29-4.94 4.47a41 41 0 0 0-1.11 3.41c-.15.56-.35 1.14-.44 1.72c-.05.33.09.93.45 1.05"/><path fill="#f79329" d="m19.62 87.45l.31.1c2.51.67 5.45-.74 7.56-1.96c1.95-1.13 3.87-2.35 5.62-3.79c.68-.57 1.4-1.1 1.96-1.79c.5-.63.86-1.85-.18-2.19c-1.46-.46-3.15-.22-4.65-.15c-3.36.16-7 .29-10.1 1.75c-1.08.51-2 1.26-2.65 2.39c-1.2 2.07-.18 4.82 2.13 5.64m52.1 26.75l.18-.27c1.32-2.23.74-5.45.12-7.81c-.58-2.18-1.24-4.36-2.17-6.42c-.37-.8-.68-1.64-1.2-2.36c-.48-.65-1.56-1.33-2.16-.42c-.84 1.28-1.05 2.98-1.38 4.44c-.74 3.28-1.58 6.82-1.01 10.19c.21 1.17.69 2.27 1.6 3.19c1.7 1.73 4.62 1.48 6.02-.54m36.85-27.7c2.27-.83 3.25-3.59 2-5.69l-.17-.28c-1.49-2.13-4.65-2.94-7.06-3.35c-2.22-.38-4.48-.68-6.74-.69c-.88 0-1.78-.06-2.65.11c-.79.16-1.85.87-1.27 1.79c.81 1.3 2.27 2.19 3.46 3.1c2.68 2.04 5.55 4.27 8.86 5.15c1.15.29 2.34.32 3.57-.14M91.41 34.24c-1.28 1.86-2.49 3.79-3.45 5.83c-.37.8-.8 1.59-1.01 2.46c-.18.79.01 2.04 1.1 1.91c1.52-.2 2.94-1.15 4.26-1.85c2.97-1.58 6.2-3.26 8.38-5.9c.75-.92 1.27-1.99 1.37-3.3c.2-2.41-1.9-4.46-4.34-4.2l-.32.04c-2.55.46-4.61 3-5.99 5.01m-67.1 17.57c2.21.46 4.45.85 6.71.94c.88.03 1.78.13 2.65-.01c.8-.13 1.89-.79 1.34-1.75c-.76-1.32-2.19-2.27-3.34-3.23c-2.61-2.13-5.39-4.48-8.67-5.46c-1.14-.35-2.32-.42-3.56-.02c-2.3.74-3.39 3.46-2.22 5.62l.17.29c1.4 2.18 4.53 3.12 6.92 3.62M40.9 20.98l-.07.32c-.43 2.56 1.26 5.35 2.68 7.34c1.32 1.82 2.72 3.62 4.33 5.22c.62.62 1.23 1.29 1.97 1.78c.67.44 1.93.68 2.16-.39c.33-1.5-.09-3.15-.29-4.63c-.49-3.33-.97-6.94-2.73-9.88c-.61-1.03-1.44-1.87-2.62-2.41c-2.21-1.02-4.85.27-5.43 2.65m19.39-6.69l-.17.27c-1.47 2.45-.72 5.6-.23 8.22c.81 4.39 1.85 8.71 3.33 12.92c.23.65.49 1.82 1.25 2.06c1.16.35 1.35-1.32 1.56-2.02C67 32.5 67.2 29 67.68 25.66c.42-2.88.71-5.81.22-8.71c-.2-1.17-.68-2.27-1.59-3.19c-1.69-1.73-4.61-1.48-6.02.53M25.79 31c.65 2.79 3.38 4.52 5.56 6.07c3.63 2.59 7.38 4.96 11.38 6.95c.61.3 1.62.97 2.33.6c1.08-.54.05-1.88-.28-2.54c-1.55-2.99-3.85-5.64-5.83-8.37c-1.71-2.36-3.54-4.67-5.91-6.4c-.96-.71-2.07-1.16-3.37-1.19c-2.41-.06-4.34 2.15-3.95 4.58zm19.35 55.83c-.52-1.09-1.88-.09-2.54.24c-3.03 1.49-5.73 3.74-8.49 5.66c-2.39 1.66-4.74 3.44-6.52 5.77c-.72.95-1.2 2.04-1.26 3.35c-.11 2.41 2.06 4.38 4.49 4.04l.32-.06c2.79-.6 4.58-3.29 6.17-5.44c2.67-3.58 5.11-7.28 7.18-11.24c.32-.61 1-1.61.65-2.32m9.79 6.16c-2.17 2.58-3.75 5.72-5.51 8.59c-1.53 2.48-2.96 5.05-3.66 7.9c-.29 1.16-.29 2.35.19 3.57c.86 2.26 3.64 3.18 5.73 1.9l.27-.18c2.31-1.67 2.87-4.86 3.47-7.47c1-4.35 1.76-8.71 2.08-13.17c.05-.69.27-1.87-.34-2.38c-.92-.77-1.76.68-2.23 1.24M13.04 59.44c-1.86 1.53-1.87 4.46 0 6.03l.26.2c2.32 1.67 5.51 1.19 8.18.94c4.44-.42 8.82-1.09 13.15-2.19c.67-.18 1.86-.34 2.16-1.07c.46-1.12-1.2-1.46-1.88-1.73c-3.13-1.25-6.62-1.75-9.89-2.51c-2.83-.67-5.73-1.21-8.65-.98c-1.18.09-2.32.47-3.33 1.31m62.42-19.1c.78.14 1.54-.8 2.03-1.27c3.2-3.12 6.06-6.51 8.74-10.08c1.61-2.14 3.68-4.61 3.46-7.47l-.03-.32c-.36-2.43-2.87-3.95-5.15-3.15c-1.23.43-2.15 1.19-2.85 2.15c-1.73 2.38-2.77 5.12-3.68 7.89c-1.06 3.19-2.45 6.42-3.02 9.75c-.12.72-.69 2.3.5 2.5m32.58 4.21c-2.88.53-5.54 1.81-8.11 3.19c-2.96 1.59-6.19 2.97-8.9 4.98c-.58.44-2.09 1.19-1.37 2.16c.49.63 1.68.48 2.36.48c4.47-.05 8.88-.54 13.28-1.28c2.63-.45 5.84-.82 7.65-3.03l.2-.26c1.41-2.01.64-4.84-1.56-5.83c-1.19-.55-2.38-.63-3.55-.41m-18.9 66.57c.32-1.27.18-2.46-.24-3.57c-1.04-2.74-2.77-5.13-4.58-7.41c-2.09-2.63-4.03-5.57-6.49-7.87c-.54-.5-1.55-1.85-2.37-.96c-.54.58-.18 1.73-.05 2.41c.84 4.38 2.11 8.63 3.63 12.83c.9 2.51 1.84 5.61 4.33 6.99l.29.14c2.24 1.03 4.89-.23 5.48-2.56m13.7-13.21c-1.99-2.15-4.49-3.71-7.04-5.14c-2.93-1.65-5.83-3.62-8.98-4.82c-.69-.26-2.13-1.13-2.56.01c-.27.74.49 1.66.87 2.24c2.44 3.75 5.22 7.2 8.21 10.52c1.79 1.98 3.83 4.49 6.66 4.83l.32.02c2.45.11 4.43-2.06 4.09-4.45c-.17-1.29-.75-2.34-1.57-3.21m8.94-34.74c-2.88-.54-5.82-.3-8.7.06c-3.34.42-6.85.55-10.1 1.46c-.71.2-2.39.37-2.05 1.53c.22.76 1.38 1.05 2.03 1.29c4.18 1.56 8.47 2.68 12.85 3.57c2.61.54 5.75 1.34 8.23-.07l.27-.17c2.04-1.37 2.34-4.29.65-6.01c-.92-.94-2.01-1.43-3.18-1.66"/><path fill="#ed6c30" d="M68.46 60.57c-1.46 0-2.64 1.19-2.64 2.64c0 1.46 1.18 2.64 2.64 2.64s2.64-1.18 2.64-2.64c0-1.45-1.18-2.64-2.64-2.64"/><circle cx="60.02" cy="70.85" r="2.64" fill="#ed6c30"/><path fill="#fcc21b" d="M90.88 117.43c-2.52 0-4.55 2.04-4.55 4.55c0 2.52 2.04 4.55 4.55 4.55a4.55 4.55 0 1 0 0-9.1"/><circle cx="111.12" cy="109.49" r="4.55" fill="#fcc21b"/><path fill="#fcc21b" d="M120.61 82.3a4.55 4.55 0 1 0 0 9.1c2.51 0 4.55-2.04 4.55-4.55c0-2.52-2.04-4.55-4.55-4.55"/><circle cx="122.14" cy="44.46" r="4.55" fill="#fcc21b"/><path fill="#fcc21b" d="M93.09 13.9a4.54 4.54 0 0 0 4.55-4.55c0-2.51-2.04-4.55-4.55-4.55c-2.52 0-4.55 2.04-4.55 4.55c0 2.52 2.04 4.55 4.55 4.55m-54.37.02c2.52 0 4.55-2.04 4.55-4.55c0-2.52-2.04-4.55-4.55-4.55a4.54 4.54 0 0 0-4.55 4.55c0 2.51 2.03 4.55 4.55 4.55"/><ellipse cx="8.74" cy="41.02" fill="#fcc21b" rx="4.55" ry="4.56"/><path fill="#fcc21b" d="M8.88 85.2a4.55 4.55 0 0 0-4.55 4.56c0 2.51 2.04 4.55 4.55 4.55s4.55-2.04 4.55-4.55c0-2.53-2.03-4.56-4.55-4.56"/><circle cx="45.54" cy="123.09" r="4.56" fill="#fcc21b"/><path fill="#fcc21b" d="M123.57 64.42c-2.18 0-3.94 1.76-3.94 3.93c0 2.18 1.76 3.95 3.94 3.95c2.17 0 3.93-1.77 3.93-3.95c.01-2.17-1.76-3.93-3.93-3.93"/><ellipse cx="108.42" cy="25.2" fill="#fcc21b" rx="3.93" ry="3.94"/><circle cx="62.94" cy="4.29" r="3.94" fill="#fcc21b"/><circle cx="20.28" cy="21.62" r="3.94" fill="#fcc21b"/><circle cx="4.43" cy="62.85" r="3.94" fill="#fcc21b"/><circle cx="21.82" cy="110.83" r="3.94" fill="#fcc21b"/><circle cx="69.15" cy="123.68" r="3.94" fill="#fcc21b"/></svg>
            <span class="b3-menu__label">Everbliss</span>
        </button>
`;
    const asriConfigFrag = document.createRange().createContextualFragment(asriConfigMenuHTML);

    barModeMenuItems.appendChild(asriConfigFrag);

    // set funcitons for menu items
    followSysAccentBtn = document.getElementById('followSysAccent');
    pickColorBtn = document.getElementById('pickColor');
    asriChromaSlider = document.getElementById('asriChromaSlider') as HTMLInputElement | null;
    colorPicker = pickColorBtn!.querySelector('input') as HTMLInputElement | null;

    if (!followSysAccentBtn || !pickColorBtn || !asriChromaSlider || !colorPicker) return;

    // check local configs to determine the initial state of the menu items
    followSysAccentBtn.classList.toggle('b3-menu__item--selected', followSysAccentColor);
    pickColorBtn.classList.toggle('b3-menu__item--selected', !followSysAccentColor);
    asriChromaSlider.value = asriConfigs[curMode].chroma || "1";
    asriChromaSlider.parentElement!.ariaLabel = i18n['asriChroma'] + asriConfigs[curMode].chroma;

    handleMenuItemClick();
}

function handleMenuItemClick() {
    if (!followSysAccentBtn || !pickColorBtn || !asriChromaSlider || !colorPicker) return;

    // handle click events
    if (env.isInBrowser || env.isMobile || env.isLinux) {
        // followSysAccentColor = false;
        followSysAccentBtn.classList.add('fn__none');
    } else {
        followSysAccentBtn.addEventListener('mouseup', handleFollowSystemAccentBtnClick);
    }
    pickColorBtn.addEventListener('mouseup', handlePickColorBtnClick);
    colorPicker.addEventListener('input', handleColorPickerInput);
    colorPicker.addEventListener('change', handleColorPickerChange);
    asriChromaSlider.addEventListener('input', handleChromaSliderInput);
}

function handleFollowSystemAccentBtnClick() {

    startFadeInFadeOutTranstition(600, () => {
        if (!followSysAccentColor) {
            followSysAccentColor = true;
            followSysAccentBtn!.classList.add('b3-menu__item--selected');
            pickColorBtn!.classList.remove('b3-menu__item--selected');
            document.documentElement.style.removeProperty('--asri-user-custom-accent');

            asriConfigs[curMode].followSysAccentColor = true;
            getSystemAccentColor();
        } else {
            followSysAccentColor = false;
            followSysAccentBtn!.classList.remove('b3-menu__item--selected');
            pickColorBtn!.classList.add('b3-menu__item--selected');
            document.documentElement.style.setProperty('--asri-user-custom-accent', asriConfigs[curMode].userCustomColor || sysAccentColor || '#3478f6');

            handleGrayScale(asriConfigs[curMode].chroma);
            reverseOnPrimaryLightness(asriConfigs[curMode].userCustomColor || sysAccentColor || '#3478f6');

            asriConfigs[curMode].followSysAccentColor = false;
        }
        updateAsriConfigs();
    });
}

function handlePickColorBtnClick() {

    startFadeInFadeOutTranstition(600, () => {
        if (!followSysAccentColor) return;

        followSysAccentColor = false;
        followSysAccentBtn!.classList.remove('b3-menu__item--selected');
        pickColorBtn!.classList.add('b3-menu__item--selected');

        document.documentElement.style.setProperty('--asri-user-custom-accent', asriConfigs[curMode].userCustomColor);

        handleGrayScale(asriConfigs[curMode].chroma);
        reverseOnPrimaryLightness(asriConfigs[curMode].userCustomColor);

        asriConfigs[curMode].userCustomColor = asriConfigs[curMode].userCustomColor;

        asriConfigs[curMode].followSysAccentColor = false;
        updateAsriConfigs();
    });
}

function handleColorPickerInput() {
    const hexColor = colorPicker!.value;
    document.documentElement.style.setProperty('--asri-user-custom-accent', hexColor);
    reverseOnPrimaryLightness(hexColor);
}

function handleColorPickerChange() {
    followSysAccentBtn!.classList.remove('b3-menu__item--selected');
    pickColorBtn!.classList.add('b3-menu__item--selected');
    reverseOnPrimaryLightness(colorPicker!.value);

    asriConfigs[curMode].userCustomColor = colorPicker!.value;
    followSysAccentColor = false;
    asriConfigs[curMode].followSysAccentColor = false;
    updateAsriConfigs();
}

function handleChromaSliderInput(this: any) {
    const chromaValue = this.value;
    document.documentElement.style.setProperty('--asri-c-factor', chromaValue);
    this.parentElement!.ariaLabel = i18n['asriChroma'] + chromaValue;
    asriConfigs[curMode].chroma = chromaValue;

    isUserAccentGray = chromaValue === '0' ? true : false;

    handleGrayScale(chromaValue);

    debounceChramaValueSaving();
}

export function getSystemAccentColor() {
    if (!(env.isInBrowser || env.isMobile || env.isLinux)) {
        const accent = remote.systemPreferences.getAccentColor();
        const accentHex = '#' + accent.slice(0, 6);
        const accentHsl = hexToHSL(accentHex);
        if (!accentHsl) return;

        if (sysAccentColor !== accentHex) {
            document.documentElement.style.setProperty('--asri-sys-accent', accentHex);
            if (accentHsl.s > 0.28) document.documentElement.style.setProperty('--asri-sys-accent-accessible', accentHex);
            else document.documentElement.style.removeProperty('--asri-sys-accent-accessible');

            isSysAccentGray = accentHsl.s === 0 ? true : false;

            // document.body.classList.add('asri-mode-transition');
            // setTimeout(() => {
            //     document.body.classList.remove('asri-mode-transition');
            // }, 350);

            sysAccentColor = accentHex;
        }

        if (followSysAccentColor) {
            handleGrayScale(accentHsl.s)
            reverseOnPrimaryLightness(accentHex);
        };
    }
}

/**
 * decide if use grayscale or not, if so return true, otherwise return false
 * @param {string | number} chroma 
 * @returns boolean
 */
function handleGrayScale(chroma: string | number) {
    const chromaValue = String(chroma);
    if (chromaValue === '0' || (followSysAccentColor && isSysAccentGray) || isUserAccentGray) {
        document.documentElement.style.setProperty('--asri-c-0', '0');
        return true;
    }
    else {
        document.documentElement.style.removeProperty('--asri-c-0');
        return false;
    }
}

const reverseThreshold = env.appSchemeMode === 'light' ? 0.81 : 0.79;
function reverseOnPrimaryLightness(hex: string) {
    const lightness = hexToOklchL(hex);
    if (!lightness) return;
    if (lightness > reverseThreshold) {
        document.documentElement.style.setProperty('--asri-on-primary-reverse', env.appSchemeMode === 'light' ? '.4' : '.3');
    } else {
        document.documentElement.style.removeProperty('--asri-on-primary-reverse');
    }
}
