// ─── Filter definitions ───────────────────────────────────────────────────────
// Each entry: { id: SVG element id, enabled: boolean, markup: SVG string }

const filters: { id: string; enabled: boolean; markup: string }[] = [
  {
    id: "asri-filter-sticker-white",
    enabled: true,
    markup: `
<svg width="0" height="0" style="position:absolute;overflow:hidden" aria-hidden="true">
  <defs>
    <filter x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur"/>
      <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 200 -1" result="mask"/>
      <feFlood flood-color="#fff" flood-opacity="1" result="paint"/>
      <feComposite in="paint" in2="mask" operator="in" result="outline"/>
      <feMerge>
        <feMergeNode in="outline"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
</svg>`
  },
  {
    id: "asri-filter-sticker-light",
    enabled: false,
    markup: `
<svg width="0" height="0" style="position:absolute;overflow:hidden" aria-hidden="true">
  <defs>
    <filter x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
      <!-- 轮廓mask -->
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="mask_blur"/>
      <feColorMatrix in="mask_blur" type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 200 -1"
        result="outline_mask"/>
      <!-- 颜色：大模糊 → 调饱和度 → 提亮+alpha=1 -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="color_blur"/>
      <feColorMatrix in="color_blur" type="saturate" values="1.5" result="color_sat"/>
      <feColorMatrix in="color_sat" type="matrix"
        values="0.1 0 0 0 0.9  0 0.1 0 0 0.9 0 0 0.1 0 0.9  0 0 0 0 1"
        result="outline_color"/>
      <!-- 裁剪 + 合成 -->
      <feComposite in="outline_color" in2="outline_mask" operator="in" result="outline"/>
      <feMerge>
        <feMergeNode in="outline"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
</svg>`
  },
  {
    id: "asri-filter-sticker-dark",
    enabled: true,
    markup: `
<svg width="0" height="0" style="position:absolute;overflow:hidden" aria-hidden="true">
  <defs>
    <filter x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="mask_blur"/>
      <feColorMatrix in="mask_blur" type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 200 -1"
        result="outline_mask"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="color_blur"/>
      <feColorMatrix in="color_blur" type="saturate" values="1.5" result="color_sat"/>
      <feColorMatrix in="color_sat" type="matrix"
        values="0.35 0 0 0 0.65  0 0.35 0 0 0.65 0 0 0.35 0 0.65  0 0 0 0 1"
        result="outline_color"/>
      <feComposite in="outline_color" in2="outline_mask" operator="in" result="outline"/>
      <feMerge>
        <feMergeNode in="outline"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
</svg>`
  },
  {
    id: "asri-filter-gooey-text",
    enabled: false,
    markup: `
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position: absolute; width: 0px; height: 0px; overflow: hidden;"><defs><filter><feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="4"></feGaussianBlur><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -12" result="goo"></feColorMatrix><feComposite in="SourceGraphic" in2="goo" operator="atop"></feComposite></filter></defs></svg>
    `
  }
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FILTERS_CONTAINER_ID = "asri-injected-filters";

function getOrCreateFiltersContainer(): HTMLElement {
  let container = document.getElementById(FILTERS_CONTAINER_ID);
  if (!container) {
    container = document.createElement("div");
    container.id = FILTERS_CONTAINER_ID;
    container.classList.add("asri-injected-filters");
    container.style.position = "absolute";
    container.style.width = "0";
    container.style.height = "0";
    container.style.overflow = "hidden";
    // container.style.display = "none"; // 会导致白色滤镜失效 --- IGNORE ---
    document.body.appendChild(container);
  }
  return container;
}

function injectFilter(id: string, markup: string) {
  if (document.getElementById(id)) return;
  
  const container = getOrCreateFiltersContainer();
  const temp = document.createElement("div");
  temp.innerHTML = markup;
  const el = temp.firstElementChild!;
  el.id = id;
  el.querySelector("filter")!.id = id.replace("filter-", "");
  container.appendChild(el);
}

function removeFilter(id: string) {
  document.getElementById(id)?.remove();
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function injectStickerFilter() {
  setTimeout(() => {
    for (const { id, enabled, markup } of filters) {
      if (enabled) injectFilter(id, markup);
    }
  }, 0);
}

export function removeStickerFilter() {
  const container = document.getElementById(FILTERS_CONTAINER_ID);
  if (container) {
    container.remove();
  }
}
