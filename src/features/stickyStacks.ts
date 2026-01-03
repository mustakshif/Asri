
const HEADING_SELECTORS = {
    h1: '.h1',
    h2: '.h2',
    h3: '.h3',
    h4: '.h4',
    h5: '.h5',
    h6: '.h6'
};

// 获取所有标题选择器
const ALL_HEADINGS_SELECTOR = Object.values(HEADING_SELECTORS).join(',');

// 标题层级顺序，用于确定堆叠优先级
const HEADING_LEVELS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

// 吸顶类名
const STICKY_CLASS = 'asri-sticky-stack';

// 当前吸顶的标题元素集合，按层级存储
let stickyHeadings: Map<string, HTMLElement> = new Map();

// 观察器实例
let headingObservers: IntersectionObserver[] = [];



export function initStickyStacks() {
}

export function unloadStickyStacks() {

}