// import htmlString from './menuHTML/index.html';
import { getFile, putFile } from '../../util/api';
import { remote } from '../../util/electron';
import { debounce, hexToHSL } from '../../util/misc';
import { asriDoms, environment as env } from '../../util/rsc';

const asriConfigs = {
    'followSysAccentColor': true,
    'chroma': "1",
    'userCustomColor': ""
};

let sysAccentColor: string;
let isSysAccentGray = false, isUserAccentGray = false;
export let followSysAccentColor = true; 


export async function makeConfigMenuItems() {
    if (env.isIOSApp) return; // fix app crash
    getAsriConfigs().then(() => {
        if (env.supportOklch) {
            // check local configs to set initial theme color
            if (!(env.isInBrowser || env.isMobile || env.isLinux)) {
                if (followSysAccentColor) document.documentElement.style.removeProperty('--asri-user-custom-accent');
                else document.documentElement.style.setProperty('--asri-user-custom-accent', asriConfigs.userCustomColor);
            } else {
                document.documentElement.style.setProperty('--asri-user-custom-accent', asriConfigs.userCustomColor);
            }

            document.documentElement.style.setProperty('--asri-c-factor', asriConfigs.chroma);

            isUserAccentGray = asriConfigs.chroma === '0' ? true : false;

            handleGrayScale(asriConfigs.chroma);

            getSystemAccentColor();
            customizeThemeColor();
        }
    });

    env.supportOklch && asriDoms.barMode?.addEventListener("click", customizeThemeColor);
}

export function removeConfigMenuItems() {
    document.documentElement.style.removeProperty('--asri-user-custom-accent');
    document.documentElement.style.removeProperty('--asri-sys-accent-grayscale');
    document.documentElement.style.removeProperty('--asri-c-factor');
    document.documentElement.style.removeProperty('--asri-sys-accent');
    document.documentElement.style.removeProperty('--asri-sys-accent-accessible');
    document.documentElement.style.removeProperty('--asri-c-0');
    asriDoms.barMode?.removeEventListener("click", customizeThemeColor);
    document.querySelectorAll('.asri-config').forEach(el => el.remove());
}

async function loadI18n() {
    if (['zh_CN', 'zh_CHT', 'en_US'].includes(env.lang)) {
        const res = await fetch(`/appearance/themes/Asri/i18n/${env.lang}.json`);
        return res.json();
    } else {
        const res = await fetch('/appearance/themes/Asri/i18n/en_US.json');
        return res.json();
    }
}

async function getAsriConfigs() {
    await getFile("/data/snippets/Asri.config.json")
        .then((response) => {
            if (response && response.status === 200) {
                return response.json();
            }
            return null;
        })
        .then(data => {
            if (!data) {
                followSysAccentColor = asriConfigs.followSysAccentColor;
                return;
            };
            followSysAccentColor = !!data.followSysAccentColor;
            asriConfigs.followSysAccentColor = followSysAccentColor;
            asriConfigs.chroma = data.chroma ?? "1";
            asriConfigs.userCustomColor = data.userCustomColor ?? "#3478f6";
        });
}

async function updateAsriConfigs() {
    await putFile("/data/snippets/Asri.config.json", JSON.stringify(asriConfigs, undefined, 4));
}

async function customizeThemeColor() {
    const i18n = await loadI18n();
    const asriChromaAriaLabelPrefix = i18n['asriChroma'];

    let followSysAccentBtn: AsriDomsExtended, pickColorBtn: AsriDomsExtended, asriChromaSlider: HTMLInputElement | null, colorPicker: HTMLInputElement | null;

    // create menu items and handle click events
    setTimeout(createMenuItems, 0);

    function createMenuItems() {
        // use existing menu items if any
        if (document.querySelector('.asri-config')) return;
        // create menu items when there is no existing menu items
        const barModeMenuItems = document.querySelector('#commonMenu[data-name="barmode"] .b3-menu__items');
        if (!barModeMenuItems) return;

        const asriConfigMenuHTML = `<button class="b3-menu__separator asri-config"></button>
<button class="b3-menu__item asri-config" id="pickColor">
    <svg class="b3-menu__icon"></svg>
    <label for="asriColorPicker" class="be-menu__label">${i18n['pickColor']}
    </label>
    <input id="asriColorPicker" type="color" value="${asriConfigs.userCustomColor}">
</button>
<button class="b3-menu__item asri-config" id="followSysAccent">
    <svg class="b3-menu__icon"></svg>
    <label for="" class="be-menu__label">${i18n['followSysAccent']}
    </label>
</button>
<button class="b3-menu__item asri-config" data-type="nobg" id="asriChroma">
    <svg class="b3-menu__icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m19 11l-8-8l-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0zM5 2l5 5m-8 6h15m5 7a2 2 0 1 1-4 0c0-1.6 1.7-2.4 2-4c.3 1.6 2 2.4 2 4" />
    </svg>
    <div aria-label="${asriChromaAriaLabelPrefix + (asriChromaSlider?.value ?? asriConfigs.chroma ?? '1')}" class="b3-tooltips b3-tooltips__n">
        <input style="box-sizing: border-box" type="range" id="asriChromaSlider" class="b3-slider fn__block" min="0"
            max="5" step="0.1" value="1">
    </div>
</button>`;
        const asriConfigFrag = document.createRange().createContextualFragment(asriConfigMenuHTML);

        barModeMenuItems.appendChild(asriConfigFrag);

        // set funcitons for menu items
        followSysAccentBtn = document.getElementById('followSysAccent');
        pickColorBtn = document.getElementById('pickColor');
        asriChromaSlider = document.getElementById('asriChromaSlider') as HTMLInputElement | null;
        colorPicker = pickColorBtn!.lastElementChild as HTMLInputElement | null;

        if (!followSysAccentBtn || !pickColorBtn || !asriChromaSlider || !colorPicker) return;

        // check local configs to determine the initial state of the menu items
        followSysAccentBtn.classList.toggle('b3-menu__item--selected', followSysAccentColor);
        pickColorBtn.classList.toggle('b3-menu__item--selected', !followSysAccentColor);
        asriChromaSlider.value = asriConfigs.chroma || "1";
        asriChromaSlider.parentElement!.ariaLabel = asriChromaAriaLabelPrefix + asriConfigs.chroma;

        // handle click events
        if (env.isInBrowser || env.isMobile || env.isLinux) {
            // followSysAccentColor = false;
            followSysAccentBtn.classList.add('fn__none');
        } else {
            followSysAccentBtn.addEventListener('click', () => {
                if (!followSysAccentColor) {
                    followSysAccentColor = true;
                    followSysAccentBtn!.classList.add('b3-menu__item--selected');
                    pickColorBtn!.classList.remove('b3-menu__item--selected');
                    document.documentElement.style.removeProperty('--asri-user-custom-accent');

                    asriConfigs.followSysAccentColor = true;
                    getSystemAccentColor();
                } else {
                    followSysAccentColor = false;
                    followSysAccentBtn!.classList.remove('b3-menu__item--selected');
                    pickColorBtn!.classList.add('b3-menu__item--selected');
                    document.documentElement.style.setProperty('--asri-user-custom-accent', asriConfigs.userCustomColor || sysAccentColor || '#3478f6');

                    handleGrayScale(asriConfigs.chroma);

                    asriConfigs.followSysAccentColor = false;
                }

                updateAsriConfigs();
            });
        }

        pickColorBtn.addEventListener('click', () => {
            if (!followSysAccentColor) return;
            else {
                followSysAccentColor = false;
                followSysAccentBtn!.classList.remove('b3-menu__item--selected');
                pickColorBtn!.classList.add('b3-menu__item--selected');

                document.documentElement.style.setProperty('--asri-user-custom-accent', asriConfigs.userCustomColor);

                handleGrayScale(asriConfigs.chroma);

                asriConfigs.userCustomColor = asriConfigs.userCustomColor;

                asriConfigs.followSysAccentColor = false;
                updateAsriConfigs();
            }
        });
        colorPicker.addEventListener('input', () => {
            document.documentElement.style.setProperty('--asri-user-custom-accent', colorPicker!.value);
        });
        colorPicker.addEventListener('change', () => {
            followSysAccentBtn!.classList.remove('b3-menu__item--selected');
            pickColorBtn!.classList.add('b3-menu__item--selected');

            asriConfigs.userCustomColor = colorPicker!.value;
            followSysAccentColor = false;
            asriConfigs.followSysAccentColor = false;
            updateAsriConfigs();
        });

        const debounceChramaValueSaving = debounce(() => updateAsriConfigs(), 200);
        asriChromaSlider.addEventListener('input', function () {
            let chromaValue = this.value;
            document.documentElement.style.setProperty('--asri-c-factor', chromaValue);
            this.parentElement!.ariaLabel = asriChromaAriaLabelPrefix + chromaValue;
            asriConfigs.chroma = chromaValue;

            isUserAccentGray = chromaValue === '0' ? true : false;

            handleGrayScale(chromaValue);

            debounceChramaValueSaving();
        });
    }
}

export function getSystemAccentColor() {
    if (!(env.isInBrowser || env.isMobile || env.isLinux)) {
        const accent = remote.systemPreferences.getAccentColor();
        const accentHex = '#' + accent.slice(0, 6);
        const accentHSLObj = hexToHSL(accentHex);
        if (!accentHSLObj) return;

        if (sysAccentColor !== accentHex) {
            document.documentElement.style.setProperty('--asri-sys-accent', accentHex);
            if (accentHSLObj.s > 0.28) document.documentElement.style.setProperty('--asri-sys-accent-accessible', accentHex);
            else document.documentElement.style.removeProperty('--asri-sys-accent-accessible');

            isSysAccentGray = accentHSLObj.s === 0 ? true : false;

            document.body.classList.add('asri-mode-transition');
            setTimeout(() => {
                document.body.classList.remove('asri-mode-transition');
            }, 350);

            sysAccentColor = accentHex;
        }

        followSysAccentColor && handleGrayScale(accentHSLObj.s);
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