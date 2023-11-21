
export function useSysScrollbar() {
    // 去除 webkit-scrollbar 样式，采用系统样式滚动条
    // 遍历所有样式表
    for (let i = 0; i < document.styleSheets.length; i++) {
        let styleSheet = document.styleSheets[i];
        try {
            // 遍历样式表中的所有规则
            for (let j = 0; j < styleSheet.cssRules.length; j++) {
                let rule = styleSheet.cssRules[j];
                // 检查规则是否是滚动条规则
                if (rule.selectorText && rule.selectorText.includes('::-webkit-scrollbar')) {
                    // 检查规则是否设置了宽度或高度
                    if (rule.style.width || rule.style.height) {
                        // 删除规则
                        styleSheet.deleteRule(j);
                        // 由于删除了一个规则，我们需要将索引减一，以便下一次循环时能正确地获取到下一个规则
                        j--;
                    }
                }
            }
        } catch (e) {
            // 忽略跨域样式表的错误
        }
    }
}