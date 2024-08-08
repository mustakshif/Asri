// import htmlString from './menuHTML/index.html';
import { getFile, putFile } from '../../util/syAPI';
import { environment as env } from '../../util/rsc';

const asriConfigsDefault = {
    followSysAccentColor: true,
    chroma: "1",
    userCustomColor: ""
};

let sysAccentColor: string;
let followSysAccentColor = true, isSysAccentGray = false, isUserAccentGray = false;


export async function makeConfigMenuItems() {
    if (env.isIOSApp) return;
    
    const i18n = await loadI18n();

    const asriChromaAriaLabelPrefix = i18n.asriChroma;
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
        .then((data) => {
            if (!data) return;            
            followSysAccentColor = !!data.followSysAccentColor || asriConfigsDefault.followSysAccentColor;
            asriConfigsDefault.followSysAccentColor = followSysAccentColor;
            asriConfigsDefault.chroma = data.chroma || "1";
            asriConfigsDefault.userCustomColor = data.userCustomColor || "#3478f6";
        });
}

async function updateAsriConfigs() {
    await putFile("/data/snippets/Asri.config.json", false, JSON.stringify(asriConfigsDefault, undefined, 4));
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