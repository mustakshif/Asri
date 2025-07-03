/**
 * @description This module is used to support Safari.
 */

import { environment as env } from "../util/rsc";

const { isMacOS, isMobile } = env;
const asriDeletedRules: { styleSheet: CSSStyleSheet; rule: string }[] = [];

/**
 * Can be achieved by `scrollbar` css property.
 * This module is used to support Safari.
 */
export async function useMacSysScrollbar() {
  if (isMacOS || isMobile) {
    for (let i = 0; i < document.styleSheets.length; i++) {
      let styleSheet = document.styleSheets[i];
      try {
        for (let j = 0; j < styleSheet.cssRules.length; j++) {
          let rule = styleSheet.cssRules[j] as CSSStyleRule;
          if (rule.selectorText && rule.selectorText.includes("::-webkit-scrollbar")) {
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

export async function restoreDefaultSiyuanScrollbar() {
  if (asriDeletedRules) {
    for (let i = 0; i < asriDeletedRules.length; i++) {
      let rule = asriDeletedRules[i];
      rule.styleSheet.insertRule(rule.rule, rule.styleSheet.cssRules.length);
    }
  }
}
