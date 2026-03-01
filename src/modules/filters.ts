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
      <feFlood flood-color="#ffffff" flood-opacity="1" result="paint"/>
      <feComposite in="paint" in2="mask" operator="in" result="outline"/>
      <feMerge>
        <feMergeNode in="outline"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
</svg>`,
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
</svg>`,
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
</svg>`,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function injectFilter(id: string, markup: string) {
  if (document.getElementById(id)) return;
  const temp = document.createElement("div");
  temp.innerHTML = markup;
  const el = temp.firstElementChild!;
  el.id = id;
  el.querySelector("filter")!.id = id.replace("filter-", "");
  document.body.insertBefore(el, document.body.firstChild);
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
  }, 300);
}

export function removeStickerFilter() {
  for (const { id } of filters) {
    removeFilter(id);
  }
}
