import fastdom from "fastdom";

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
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): T {
    let timeoutId: NodeJS.Timeout | null = null;

    return ((...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
            timeoutId = null;
        }, delay);
    }) as T;
}

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

    let res: boolean = false;

    return res = fastdom.measure(() => {
        let el1Rect: DOMRect | undefined, el2Rect: DOMRect | undefined;

        el1Rect = el1.getBoundingClientRect();
        el2Rect = el2.getBoundingClientRect();

        return isRectOverlapping(el1Rect, el2Rect);
    })();
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

export function nodeListsHaveSameElements(list1: NodeListOf<Element> | undefined, list2: NodeListOf<Element> | undefined): boolean {
    if (!list1 || !list2) {
        return false;
    }

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