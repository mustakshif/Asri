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
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number = 200): T {
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

// export function debounce(fn: Function, delay = 200): (...args: any[]) => any {
//     let timer: any;

//     return function (this: any, ...args: any) {
//         if (timer) {
//             clearTimeout(timer)
//         }
//         timer = setTimeout(() => {
//             fn.apply(this, args);
//             timer = null;
//         }, delay)
//     }
// }

export function hexToHSL(hex: string) {
    if (!hex) {
        return;
    }
    const r = parseInt(hex.substring(1, 3), 16) / 255;
    const g = parseInt(hex.substring(3, 5), 16) / 255;
    const b = parseInt(hex.substring(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    const lightness = (max + min) / 2;

    if (max === min) {
        return {
            h: 0,
            s: 0,
            l: lightness
        };
    }

    let hue = 0;
    const delta = max - min;
    const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    switch (max) {
        case r:
            hue = (g - b) / delta + (g < b ? 6 : 0);
            break;
        case g:
            hue = (b - r) / delta + 2;
            break;
        case b:
            hue = (r - g) / delta + 4;
            break;
    }
    hue /= 6;

    return {
        h: hue,
        s: saturation,
        l: lightness
    };
}

export function hexToOklchL(hex: string) {
    if (!hex) return;
    // 移除可能存在的 '#' 符号
    hex = hex.replace(/^#/, '');

    if (hex.length === 4) hex.substring(0, 3);
    else if (hex.length === 8) hex.substring(0, 6);

    if (hex.length === 3) {
        hex = hex.split('').map(function (c) {
            return c + c;
        }).join('');
    }

    // 将 hex 转换为 RGB
    let r = parseInt(hex.slice(0, 2), 16) / 255;
    let g = parseInt(hex.slice(2, 4), 16) / 255;
    let b = parseInt(hex.slice(4, 6), 16) / 255;

    // 将 RGB 转换为线性 RGB
    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    // 将线性 RGB 转换为 XYZ
    let x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
    let y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b;
    let z = 0.0193339 * r + 0.1191920 * g + 0.9503041 * b;

    // 将 XYZ 转换为 LMS
    let l = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
    let m = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
    let s = 0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z;

    // 应用非线性函数
    l = Math.cbrt(l);
    m = Math.cbrt(m);
    s = Math.cbrt(s);

    // 计算 OKLCH 的 L 值
    let L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;

    // 将 L 值范围调整到 0-100
    // L = L * 100;

    return L;
}

export function modeTransition() {
    document.body.classList.add('asri-mode-transition');
    setTimeout(() => {
        document.body.classList.remove('asri-mode-transition');
    }, 350);
}

/**
* Check if two elements have overlapping parts.
*/

export function isOverlapping(el1: AsriDomsExtended, el2: AsriDomsExtended): boolean {
    if (!el1 || !el2) {
        console.warn('isOverlapping called with null element');
        return false;
    }

    let el1Rect: DOMRect, el2Rect: DOMRect;

    el1Rect = el1.getBoundingClientRect();
    el2Rect = el2.getBoundingClientRect();

    const res = isRectOverlapping(el1Rect, el2Rect);
    // console.log('measure isOverlapping')
    return res;
}
export async function isOverlappingPromise(el1: AsriDomsExtended, el2: AsriDomsExtended): Promise<boolean> {
    if (!el1 || !el2) {
        console.warn('isOverlapping called with null element');
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
        result = (
            elementRect.right > targetRect.left &&
            elementRect.bottom > targetRect.top &&
            elementRect.left < targetRect.left + targetRect.width &&
            elementRect.top < targetRect.top + targetRect.height
        )
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

export async function querySelectorPromise(selector: string, trial = 10, timeout = 200): Promise<Element | undefined> {
    let n = 0;
    while (n < trial) {
        const element = document.querySelector<Element>(selector);
        if (element) return element;

        await new Promise(resolve => setTimeout(resolve, timeout));
        n++;
    }
    // throw new Error('querySelectorPromise failed');
}

export async function querySelectorAllPromise(selector: string, trial = 10, timeout = 200): Promise<NodeListOf<Element> | undefined> {
    let n = 0;
    while (n < trial) {
        const elements = document.querySelectorAll<Element>(selector);
        if (elements.length > 0) return elements;

        await new Promise(resolve => setTimeout(resolve, timeout));
        n++;
    }
    // throw new Error('querySelectorAllPromise failed');
}