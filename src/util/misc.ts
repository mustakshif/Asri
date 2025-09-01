import { cssVarManager } from "../modules/asriConfigs";

/**
 * Pushes an item to the array if it is not already present.
 * @param {Array} arr - The array to push the item to.
 * @param {*} item - The item to push to the array.
 */
export function pushUnique(arr: any[], item: any) {
  if (!arr.includes(item)) {
    arr.push(item);
  }
}
export function debounce<T extends (...args: any[]) => any>(func: T, delay = 200): T {
  let timeoutId: NodeJS.Timeout | null = null;

  return ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      // console.log('timeoutId cleared', timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args);
      // console.log(timeoutId)
      timeoutId = null;
    }, delay);
  }) as T;
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit = 200): T {
  let lastCall = 0;
  let timeoutId: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;

  return ((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    } else {
      lastArgs = args;
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          lastCall = Date.now();
          if (lastArgs) func(...lastArgs);
          timeoutId = null;
          lastArgs = null;
        }, limit - (now - lastCall));
      }
    }
  }) as T;
}

// export function asriModeTransition() {
//     document.body.classList.add('asri-mode-transition');
//     setTimeout(() => {
//         document.body.classList.remove('asri-mode-transition');
//     }, 350);
// }

/**
 * Check if two elements have overlapping parts.
 */

export function isOverlapping(el1: AsriDomsExtended, el2: AsriDomsExtended): boolean {
  if (!el1 || !el2) {
    console.warn("isOverlapping called with null element");
    return false;
  }

  let el1Rect: DOMRect, el2Rect: DOMRect;

  el1Rect = el1.getBoundingClientRect();
  el2Rect = el2.getBoundingClientRect();

  const res = isRectOverlapping(el1Rect, el2Rect);
  // console.log('measure isOverlapping')
  return res;
}
export async function isOverlappingAsync(el1: AsriDomsExtended, el2: AsriDomsExtended): Promise<boolean> {
  if (!el1 || !el2) {
    console.warn("isOverlapping called with null element");
    return false;
  }

  return new Promise((resolve) => {
    let el1Rect: DOMRect | undefined, el2Rect: DOMRect | undefined;

    el1Rect = el1.getBoundingClientRect();
    el2Rect = el2.getBoundingClientRect();

    const res = isRectOverlapping(el1Rect, el2Rect);
    // console.log('measure isOverlapping')
    resolve(res);
  });
}

function isRectOverlapping(elementRect: DOMRect, targetRect: DOMRect): boolean {
  let result = false;
  if (elementRect && targetRect) {
    result =
      elementRect.right > targetRect.left &&
      elementRect.bottom > targetRect.top &&
      elementRect.left < targetRect.left + targetRect.width &&
      elementRect.top < targetRect.top + targetRect.height;
  }
  return result;
}

export function nodeListsHaveSameElements(list1: NodeListOf<Element>, list2: NodeListOf<Element>): boolean {
  if (!list1.length || !list2.length) return false;

  const set1 = new Set(list1);
  const set2 = new Set(list2);

  if (set1.size !== set2.size) {
    return false;
  }

  for (const item of set1) {
    if (!set2.has(item)) {
      return false;
    }
  }
  // console.log(list1+' and '+list2 + ' have same elements');
  return true;
}

export async function querySelectorAsync(
  selector: string,
  scope: Document | HTMLElement | Element = document,
  trial = 10,
  timeout = 200
): Promise<Element | undefined> {
  let n = 0;
  while (n < trial) {
    const element = scope.querySelector<Element>(selector);
    if (element) return element;

    await new Promise((resolve) => setTimeout(resolve, timeout));
    n++;
  }
  // throw new Error('querySelectorPromise failed');
}

export async function querySelectorAllAsync(
  selector: string,
  scope: Document | HTMLElement | Element = document,
  trial = 10,
  timeout = 200
): Promise<NodeListOf<Element> | undefined> {
  let n = 0;
  while (n < trial) {
    const elements = scope.querySelectorAll<Element>(selector);
    if (elements.length > 0) return elements;

    await new Promise((resolve) => setTimeout(resolve, timeout));
    n++;
  }
  // throw new Error('querySelectorAllPromise failed');
}

export async function getFocusedProtyleInfo(docID?: string, waitForLoading = false) {
  const res: {
    docID: string | undefined;
    isProtyle: boolean;
    protyle: HTMLElement | undefined;
  } = {
    docID: docID || undefined,
    isProtyle: false,
    protyle: undefined,
  };
  if (!docID) {
    // 获取当前聚焦的文档
    const focusedDocTab = await querySelectorAsync(".layout__center .layout-tab-bar .item--focus");
    docID = focusedDocTab?.getAttribute("data-id") ?? undefined;
  }
  if (!docID) return res;

  const curProtyle = document.querySelector(
    `.layout__center .layout-tab-container>.protyle[data-id="${docID}"]:not(.fn__none)`
  ) as HTMLElement;
  if (!curProtyle) return res;

  // 如果需要等待加载完成，则等待 data-loading="finished" 属性
  if (waitForLoading) {
    await waitForProtyleLoaded(curProtyle);
  }

  res.isProtyle = true;
  res.protyle = curProtyle;
  res.docID = docID;
  return res;
}

/**
 * 等待 protyle 元素加载完成（data-loading="finished"）
 * @param protyle - protyle 元素
 * @param maxWaitTime - 最大等待时间（毫秒），默认 5000ms
 * @returns Promise<boolean> - 是否成功等待到加载完成
 */
async function waitForProtyleLoaded(protyle: HTMLElement, maxWaitTime = 5000): Promise<boolean> {
  return new Promise((resolve) => {
    // 如果已经加载完成，直接返回
    if (protyle.getAttribute("data-loading") === "finished") {
      resolve(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    // 创建 MutationObserver 监听属性变化
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-loading" &&
          (mutation.target as HTMLElement).getAttribute("data-loading") === "finished"
        ) {
          clearTimeout(timeoutId);
          observer.disconnect();
          resolve(true);
          return;
        }
      }
    });

    // 开始观察属性变化
    observer.observe(protyle, {
      attributeFilter: ["data-loading"],
    });

    // 设置超时
    timeoutId = setTimeout(() => {
      observer.disconnect();
      resolve(false); // 超时返回 false
    }, maxWaitTime);
  });
}

// function isChromiumV138() {
//   return navigator.userAgent.includes("Chrome/138");
// }

// export function addChromiumV138FixVar() {
//   if (isChromiumV138()) {
//     cssVarManager.setProperty("--asri-ccff", "0.5");
//   }
// }

// export function removeChromiumV138FixVar() {
//   cssVarManager.removeProperty("--asri-ccff");
// }
