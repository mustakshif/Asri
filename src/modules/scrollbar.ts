import { environment as env } from "../util/rsc";

export const asriDeletedRules: { styleSheet: CSSStyleSheet, rule: string }[] = [];
export async function useSysScrollbar() {
    if (env.isMacOS || env.isMobile) {
        for (let i = 0; i < document.styleSheets.length; i++) {
            let styleSheet = document.styleSheets[i];
            try {
                for (let j = 0; j < styleSheet.cssRules.length; j++) {
                    let rule = styleSheet.cssRules[j] as CSSStyleRule;
                    if (rule.selectorText && rule.selectorText.includes('::-webkit-scrollbar')) {
                        if (rule.style.width || rule.style.height || rule.style.backgroundColor) {
                            asriDeletedRules.push({ styleSheet: styleSheet, rule: rule.cssText });
                            styleSheet.deleteRule(j);
                            j--;
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    }
}

export async function restoreDeletedRules() {
    if (asriDeletedRules) {
        for (let i = 0; i < asriDeletedRules.length; i++) {
            let rule = asriDeletedRules[i];
            rule.styleSheet.insertRule(rule.rule, rule.styleSheet.cssRules.length);
        }
    }
}