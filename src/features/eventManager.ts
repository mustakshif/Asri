/**
 * 事件管理
 * 处理全局 DOM 事件监听和观察者回调
 */

import { debouncedFormatIndentGuidesForFocusedItems } from "../ui/sidepanels";
import { asriConfigs, runtime } from "../core/config";
import { updateCoverImgColor } from "../core/palette";
import { toggleProtyleStatus } from "../features/protyleStatus";

export function createGlobalClassNameMoCallback() {
  return (mutationList: MutationRecord[], _observer: MutationObserver) => {
    for (let mutation of mutationList) {
      const target = mutation.target as HTMLElement;

      if (target.classList.contains("body--blur")) return; // ⚠️ ignore constant classname change when app window blurs which cause unnecessary re-render and high cpu usage.

      // filetree list item switch
      if (target.classList.contains("b3-list-item--focus")) {
        debouncedFormatIndentGuidesForFocusedItems();
      }

      // tab switch
      if (target.classList.contains("item--focus")) {
        const docId = target.getAttribute("data-id") ?? undefined;
        toggleProtyleStatus(docId);

        docId && asriConfigs[runtime.mode].followCoverImgColor && updateCoverImgColor(docId);
      }

      if (target.classList.contains("layout__wnd--active")) {
        const targetDoc = target.querySelector(".layout__center .layout-tab-container>[data-id]:not(.fn__none)");

        if (!targetDoc) return;

        const docId = targetDoc.getAttribute("data-id") ?? undefined;
        toggleProtyleStatus(docId);

        docId && asriConfigs[runtime.mode].followCoverImgColor && updateCoverImgColor(docId);
      }
    }
  };
}

export function createAppearanceModeUpdateCallback() {
  return (_e: MediaQueryListEvent) => {
    // 主题模式切换时的处理
    // 这里可以添加过渡动画等
  };
}
