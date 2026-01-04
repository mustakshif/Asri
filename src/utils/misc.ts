import { cssVarManager } from "../core/cssVar";

// ============================================================================
// Array Utilities
// ============================================================================

export function pushUnique<T>(arr: T[], item: T): void {
  if (!arr.includes(item)) arr.push(item);
}

// ============================================================================
// Function Decorators
// ============================================================================

export function debounce<T extends (...args: any[]) => any>(func: T, delay = 200): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return ((...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  }) as T;
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit = 200): T {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
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

// ============================================================================
// DOM Overlap Detection
// ============================================================================

function isRectOverlapping(elementRect: DOMRect, targetRect: DOMRect): boolean {
  return (
    elementRect.right > targetRect.left &&
    elementRect.bottom > targetRect.top &&
    elementRect.left < targetRect.left + targetRect.width &&
    elementRect.top < targetRect.top + targetRect.height
  );
}

export function isOverlapping(el1: AsriDomsExtended, el2: AsriDomsExtended): boolean {
  if (!el1 || !el2) {
    console.warn("isOverlapping called with null element");
    return false;
  }
  return isRectOverlapping(el1.getBoundingClientRect(), el2.getBoundingClientRect());
}

export async function isOverlappingAsync(el1: AsriDomsExtended, el2: AsriDomsExtended): Promise<boolean> {
  // Wrap sync function in Promise for API compatibility
  return Promise.resolve(isOverlapping(el1, el2));
}

// ============================================================================
// Node List Comparison
// ============================================================================

export function nodeListsHaveSameElements(list1: NodeListOf<Element>, list2: NodeListOf<Element>): boolean {
  if (!list1.length || !list2.length) return false;

  const set1 = new Set(list1);
  const set2 = new Set(list2);

  if (set1.size !== set2.size) return false;

  for (const item of set1) {
    if (!set2.has(item)) return false;
  }
  return true;
}

// ============================================================================
// Async Query Selectors
// ============================================================================

async function queryWithRetry<T>(
  queryFn: (selector: string) => T,
  hasResults: (result: T) => result is NonNullable<T>,
  selector: string,
  trial = 10,
  timeout = 200
): Promise<NonNullable<T> | undefined> {
  for (let i = 0; i < trial; i++) {
    const result = queryFn(selector);
    if (hasResults(result)) return result as NonNullable<T>;
    await new Promise(resolve => setTimeout(resolve, timeout));
  }
}

export async function querySelectorAsync(
  selector: string,
  scope: Document | Element = document,
  trial = 10,
  timeout = 200
): Promise<Element | undefined> {
  return queryWithRetry(
    s => scope.querySelector<Element>(s),
    (el): el is Element => el !== null,
    selector,
    trial,
    timeout
  );
}

export async function querySelectorAllAsync(
  selector: string,
  scope: Document | Element = document,
  trial = 10,
  timeout = 200
): Promise<NodeListOf<Element> | undefined> {
  return queryWithRetry(
    s => scope.querySelectorAll<Element>(s),
    (els): els is NodeListOf<Element> => els.length > 0,
    selector,
    trial,
    timeout
  );
}

// ============================================================================
// Protyle Utilities
// ============================================================================

interface ProtyleInfo {
  docID: string | undefined;
  isProtyle: boolean;
  protyle: HTMLElement | undefined;
}

export async function getFocusedProtyleInfo(docID?: string, waitForLoading = false): Promise<ProtyleInfo> {
  const res: ProtyleInfo = { docID: docID || undefined, isProtyle: false, protyle: undefined };

  if (!docID) {
    const focusedDocTab = await querySelectorAsync(".layout__center .layout-tab-bar .item--focus");
    docID = focusedDocTab?.getAttribute("data-id") ?? undefined;
  }
  if (!docID) return res;

  const curProtyle = document.querySelector(
    `.layout__center .layout-tab-container>.protyle[data-id="${docID}"]:not(.fn__none)`
  ) as HTMLElement;
  if (!curProtyle) return res;

  if (waitForLoading) {
    await waitForProtyleLoaded(curProtyle);
  }

  return { docID, isProtyle: true, protyle: curProtyle };
}

async function waitForProtyleLoaded(protyle: HTMLElement, maxWaitTime = 5000): Promise<boolean> {
  if (protyle.getAttribute("data-loading") === "finished") return true;

  return new Promise(resolve => {
    const observer = new MutationObserver(() => {
      if (protyle.getAttribute("data-loading") === "finished") {
        clearTimeout(timeoutId);
        observer.disconnect();
        resolve(true);
      }
    });

    observer.observe(protyle, { attributeFilter: ["data-loading"] });

    const timeoutId = setTimeout(() => {
      observer.disconnect();
      resolve(false);
    }, maxWaitTime);
  });
}
