import htmlString from './menuHTML/index.html';
//菜单ariaLabel、文本等需要动态指定
import { environment } from '../../util/rsc';

const { lang } = environment;
async function loadI18n() {
    if (['zh_CN', 'zh_CHT', 'en_US'].includes(lang)) {
        const res = await fetch(`/appearance/themes/Asri/i18n/${lang}.json`);
        return res.json();
    } else {
        const res = await fetch(`/appearance/themes/Asri/i18n/en_US.json`);
        return res.json();
    }
}

async function makeItems() {
    const configTexts = await loadI18n();
    console.log(configTexts);
}