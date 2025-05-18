import { AsriMutationObserver } from "../util/observers";
import { debounce, querySelectorAllAsync } from "../util/misc";

// 定义标题层级映射，便于后续扩展
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

// 监视DOM变化的观察器
let protyleMutationObserver: AsriMutationObserver;

/**
 * 初始化标题吸顶功能
 */
export function initStickyStacks() {
    // 初始化DOM变化观察器
    protyleMutationObserver = new AsriMutationObserver(debouncedHandleProtyleChanges);
    
    // 监听编辑区变化
    observeProtyleChanges();
    
    // 初始化标题观察
    initHeadingObservers();
}

/**
 * 监听编辑区变化
 */
function observeProtyleChanges() {
    // 监听编辑区的DOM变化，以便在内容变化时重新初始化观察器
    const protyles = document.querySelectorAll('.protyle-content');
    protyles.forEach(protyle => {
        protyleMutationObserver.observe(protyle, {
            childList: true,
            subtree: true
        });
    });
}

/**
 * 处理编辑区变化的防抖函数
 */
const debouncedHandleProtyleChanges = debounce(handleProtyleChanges, 200);

/**
 * 处理编辑区变化
 */
function handleProtyleChanges() {
    // 重新初始化标题观察
    resetHeadingObservers();
    initHeadingObservers();
}

/**
 * 重置标题观察器
 */
function resetHeadingObservers() {
    // 断开所有观察器连接
    headingObservers.forEach(observer => observer.disconnect());
    headingObservers = [];
    
    // 清除所有吸顶标题
    clearAllStickyHeadings();
}

/**
 * 清除所有吸顶标题
 */
function clearAllStickyHeadings() {
    // 移除所有吸顶类名
    document.querySelectorAll(`.${STICKY_CLASS}`).forEach(el => {
        el.classList.remove(STICKY_CLASS);
    });
    
    // 清空吸顶标题集合
    stickyHeadings.clear();
}

/**
 * 初始化标题观察器
 */
async function initHeadingObservers() {
    // 获取所有标题元素
    const headings = await querySelectorAllAsync(ALL_HEADINGS_SELECTOR);
    
    if (!headings || headings.length === 0) return;
    
    // 创建观察器
    const observer = new IntersectionObserver(handleHeadingIntersection, {
        threshold: 0,
        rootMargin: '-1px 0px 0px 0px' // 顶部偏移1px，使元素刚好离开视口顶部时触发
    });
    
    // 观察所有标题元素
    headings.forEach(heading => {
        observer.observe(heading);
    });
    
    // 保存观察器实例
    headingObservers.push(observer);
}

/**
 * 处理标题元素的交叉状态变化
 */
function handleHeadingIntersection(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
        const heading = entry.target as HTMLElement;
        const headingLevel = getHeadingLevel(heading);
        console.log(heading, heading.classList);
        
        if (!headingLevel) return;
        
        if (!entry.isIntersecting) {
            // 标题离开视口顶部，添加吸顶效果
            addStickyHeading(heading, headingLevel);
        } else if (entry.boundingClientRect.top > 0) {
            // 标题重新进入视口，移除吸顶效果
            removeStickyHeading(heading, headingLevel);
        }
    });
}

/**
 * 获取标题元素的层级
 */
function getHeadingLevel(element: HTMLElement): string | null {
    // 检查元素是否为标题
    for (const level of HEADING_LEVELS) {
        if (element.classList.contains(level)) {
            return level;
        }
    }
    return null;
}

/**
 * 添加吸顶标题
 */
function addStickyHeading(heading: HTMLElement, level: string) {
    // 获取当前层级索引
    const levelIndex = HEADING_LEVELS.indexOf(level);
    
    // 移除比当前层级更低的所有吸顶标题
    // 例如：如果添加h2，则移除所有h3-h6的吸顶标题
    for (let i = levelIndex + 1; i < HEADING_LEVELS.length; i++) {
        const lowerLevel = HEADING_LEVELS[i];
        if (stickyHeadings.has(lowerLevel)) {
            const lowerHeading = stickyHeadings.get(lowerLevel);
            if (lowerHeading) {
                lowerHeading.classList.remove(STICKY_CLASS);
                stickyHeadings.delete(lowerLevel);
            }
        }
    }
    
    // 如果同级已有吸顶标题，先移除
    if (stickyHeadings.has(level)) {
        const existingHeading = stickyHeadings.get(level);
        if (existingHeading) {
            existingHeading.classList.remove(STICKY_CLASS);
        }
    }
    
    // 添加吸顶类名
    heading.classList.add(STICKY_CLASS);
    
    // 更新吸顶标题集合
    stickyHeadings.set(level, heading);
}

/**
 * 移除吸顶标题
 */
function removeStickyHeading(heading: HTMLElement, level: string) {
    // 检查是否为当前吸顶的标题
    if (stickyHeadings.get(level) === heading) {
        // 移除吸顶类名
        heading.classList.remove(STICKY_CLASS);
        
        // 从吸顶标题集合中移除
        stickyHeadings.delete(level);
    }
}

/**
 * 卸载标题吸顶功能
 */
export function unloadStickyStacks() {
    // 断开所有观察器连接
    resetHeadingObservers();
    
    // 断开DOM变化观察器
    if (protyleMutationObserver) {
        protyleMutationObserver.disconnect();
    }
}