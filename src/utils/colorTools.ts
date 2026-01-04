// ============================================================================
// Color Extraction & Conversion
// ============================================================================

const COLOR_NAMES: Record<string, string> = {
  black: "#000000", white: "#ffffff", red: "#ff0000", green: "#008000",
  blue: "#0000ff", yellow: "#ffff00", orange: "#ffa500", purple: "#800080",
  pink: "#ffc0cb", brown: "#a52a2a", gray: "#808080", grey: "#808080",
  transparent: "#00000000",
};

export function extractFirstColorFromCSSBackground(cssBackgroundImage: string): string | null {
  if (!cssBackgroundImage) return null;

  const patterns = [
    /#([0-9a-fA-F]{3,8})\b/,
    /rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)/,
    /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)/,
    /\b(black|white|red|green|blue|yellow|orange|purple|pink|brown|gray|grey|transparent)\b/i,
  ];

  for (const pattern of patterns) {
    const match = cssBackgroundImage.match(pattern);
    if (match) return convertToHex(match[0]);
  }
  return null;
}

export function convertToHex(colorStr: string): string {
  if (colorStr.startsWith("#")) return normalizeHex(colorStr);

  const rgbMatch = colorStr.match(/rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)/);
  if (rgbMatch) {
    const [r, g, b] = [parseFloat(rgbMatch[1]), parseFloat(rgbMatch[2]), parseFloat(rgbMatch[3])].map(Math.round);
    return rgbToHex(r, g, b);
  }

  const hslMatch = colorStr.match(/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)/);
  if (hslMatch) {
    const [h, s, l] = [parseFloat(hslMatch[1]), parseFloat(hslMatch[2]) / 100, parseFloat(hslMatch[3]) / 100];
    return hslToHex(h, s, l);
  }

  const lower = colorStr.toLowerCase();
  return COLOR_NAMES[lower] || "#000000";
}

// ============================================================================
// Hex Normalization
// ============================================================================

function normalizeHex(hex: string): string {
  hex = hex.slice(1);
  if (hex.length === 3 || hex.length === 4) {
    hex = hex.split("").map(c => c + c).join("");
  }
  if (hex.length === 6 || hex.length === 8) {
    return "#" + hex.toLowerCase();
  }
  return "#000000";
}

// ============================================================================
// RGB ↔ Hex
// ============================================================================

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// ============================================================================
// HSL ↔ Hex
// ============================================================================

function hslToHex(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let [r, g, b] = [0, 0, 0];
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }

  return rgbToHex(
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255)
  );
}

export function hexToHSL(hex: string): { h: number; s: number; l: number } | undefined {
  if (!hex) return;

  const [r, g, b] = [1, 3, 5].map(start => parseInt(hex.substring(start, start + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l };

  const delta = max - min;
  const s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  let h = 0;
  if (max === r) h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / delta + 2) / 6;
  else h = ((r - g) / delta + 4) / 6;

  return { h, s, l };
}

// ============================================================================
// Hex ↔ OKLCH
// ============================================================================

export function hexToOklch(hex: string): { L: number; C: number; H: number } | undefined {
  if (!hex) return;

  hex = hex.replace(/^#/, "");
  if (hex.length === 4) hex = hex.substring(0, 3);
  else if (hex.length === 8) hex = hex.substring(0, 6);
  if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");

  const [R, G, B] = [0, 2, 4].map(start => parseInt(hex.slice(start, start + 2), 16) / 255);

  // Linear RGB
  const [lr, lg, lb] = [R, G, B].map(v => v > 0.04045 ? Math.pow((v + 0.055) / 1.055, 2.4) : v / 12.92);

  // XYZ (D65)
  const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb;
  const y = 0.2126729 * lr + 0.7151522 * lg + 0.072175 * lb;
  const z = 0.0193339 * lr + 0.119192 * lg + 0.9503041 * lb;

  // LMS
  const l = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
  const m = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
  const s = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z);

  // OKLCH
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const b_ = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const C = Math.sqrt(a * a + b_ * b_);
  let H = Math.atan2(b_, a) * (180 / Math.PI);
  if (H < 0) H += 360;

  return { L, C, H };
}
