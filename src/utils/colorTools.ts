// 导出主要函数
export { extractFirstColorFromCSSBackground, convertToHex };

/**
 * 从CSS background-image属性中提取第一个颜色并转换为hex格式
 * @param cssBackgroundImage CSS background-image属性值
 * @returns 第一个找到的颜色的hex值，如果没有找到则返回null
 */
function extractFirstColorFromCSSBackground(cssBackgroundImage: string): string | null {
  if (!cssBackgroundImage) return null;

  // 颜色匹配的正则表达式模式
  const colorPatterns = [
    // hex颜色: #fff, #ffffff, #fffa, #ffffffff
    /#([0-9a-fA-F]{3,8})\b/,

    // rgb/rgba颜色: rgb(255,255,255), rgba(255,255,255,0.5)
    /rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)/,

    // hsl/hsla颜色: hsl(0,100%,50%), hsla(0,100%,50%,0.5)
    /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)/,

    // CSS颜色名称
    /\b(black|white|red|green|blue|yellow|orange|purple|pink|brown|gray|grey|transparent)\b/i,
  ];

  // 按顺序尝试匹配每种颜色格式
  for (const pattern of colorPatterns) {
    const match = cssBackgroundImage.match(pattern);
    if (match) {
      return convertToHex(match[0]);
    }
  }

  return null;
}

/**
 * 将各种颜色格式转换为hex格式
 * @param colorStr 颜色字符串
 * @returns hex颜色值
 */
function convertToHex(colorStr: string): string {
  // 如果已经是hex格式，直接返回（补全格式）
  if (colorStr.startsWith("#")) {
    return normalizeHex(colorStr);
  }

  // 处理rgb/rgba格式
  const rgbMatch = colorStr.match(
    /rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)/
  );
  if (rgbMatch) {
    const r = Math.round(parseFloat(rgbMatch[1]));
    const g = Math.round(parseFloat(rgbMatch[2]));
    const b = Math.round(parseFloat(rgbMatch[3]));
    return rgbToHex(r, g, b);
  }

  // 处理hsl/hsla格式
  const hslMatch = colorStr.match(
    /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)/
  );
  if (hslMatch) {
    const h = parseFloat(hslMatch[1]);
    const s = parseFloat(hslMatch[2]) / 100;
    const l = parseFloat(hslMatch[3]) / 100;
    return hslToHex(h, s, l);
  }

  // 处理CSS颜色名称
  const colorNames: { [key: string]: string } = {
    "black": "#000000",
    "white": "#ffffff",
    "red": "#ff0000",
    "green": "#008000",
    "blue": "#0000ff",
    "yellow": "#ffff00",
    "orange": "#ffa500",
    "purple": "#800080",
    "pink": "#ffc0cb",
    "brown": "#a52a2a",
    "gray": "#808080",
    "grey": "#808080",
    "transparent": "#00000000",
  };

  const lowerColor = colorStr.toLowerCase();
  if (colorNames[lowerColor]) {
    return colorNames[lowerColor];
  }

  // 如果无法识别，返回默认颜色
  return "#000000";
}

/**
 * 标准化hex颜色格式
 * @param hex hex颜色字符串
 * @returns 标准化的hex颜色
 */
function normalizeHex(hex: string): string {
  // 移除#号
  hex = hex.slice(1);

  // 3位转6位
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  // 4位转8位 (带alpha)
  if (hex.length === 4) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  // 确保是6位或8位
  if (hex.length === 6 || hex.length === 8) {
    return "#" + hex.toLowerCase();
  }

  // 如果格式不正确，返回黑色
  return "#000000";
}

/**
 * RGB转Hex
 * @param r 红色值 (0-255)
 * @param g 绿色值 (0-255)
 * @param b 蓝色值 (0-255)
 * @returns hex颜色值
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * HSL转Hex
 * @param h 色相 (0-360)
 * @param s 饱和度 (0-1)
 * @param l 亮度 (0-1)
 * @returns hex颜色值
 */
function hslToHex(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return rgbToHex(r, g, b);
}

// 使用示例和测试
// function testColorExtraction() {
//   const testCases = [
//     "linear-gradient(45deg, #dca 12%, transparent 0, transparent 88%, #dca 0),linear-gradient(135deg, transparent 37%, #a85 0, #a85 63%, transparent 0),linear-gradient(45deg, transparent 37%, #dca 0, #dca 63%, transparent 0) #753",
//     "linear-gradient(90deg, rgba(200,0,0,.5) 50%, transparent 50%),linear-gradient(rgba(200,0,0,.5) 50%, transparent 50%)",
//     "radial-gradient(black 3px, transparent 4px),radial-gradient(black 3px, transparent 4px),linear-gradient(#fff 4px, transparent 0)",
//     "linear-gradient(45deg, transparent 74px, transparent 75px, #a4a4a4 75px, #a4a4a4 76px, transparent 77px, transparent 109px)",
//     "background: linear-gradient(to right, hsl(240, 100%, 50%), white)",
//     "background-image: radial-gradient(circle, rgb(255, 0, 0) 0%, blue 100%)",
//   ];

//   console.log("颜色提取测试结果:");
//   testCases.forEach((css, index) => {
//     const result = extractFirstColorFromCSSBackground(css);
//     console.log(`${index + 1}. ${css.substring(0, 50)}... -> ${result}`);
//   });
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
      l: lightness,
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
    l: lightness,
  };
}

export function hexToOklch(hex: string) {
  if (!hex) return;
  // 移除可能存在的 '#' 符号
  hex = hex.replace(/^#/, "");

  if (hex.length === 4) hex = hex.substring(0, 3);
  else if (hex.length === 8) hex = hex.substring(0, 6);

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map(function (c) {
        return c + c;
      })
      .join("");
  }

  // 将 hex 转换为 RGB
  let R = parseInt(hex.slice(0, 2), 16) / 255;
  let G = parseInt(hex.slice(2, 4), 16) / 255;
  let B = parseInt(hex.slice(4, 6), 16) / 255;

  // 将 RGB 转换为线性 RGB
  R = R > 0.04045 ? Math.pow((R + 0.055) / 1.055, 2.4) : R / 12.92;
  G = G > 0.04045 ? Math.pow((G + 0.055) / 1.055, 2.4) : G / 12.92;
  B = B > 0.04045 ? Math.pow((B + 0.055) / 1.055, 2.4) : B / 12.92;

  // 将线性 RGB 转换为 XYZ
  let x = 0.4124564 * R + 0.3575761 * G + 0.1804375 * B;
  let y = 0.2126729 * R + 0.7151522 * G + 0.072175 * B;
  let z = 0.0193339 * R + 0.119192 * G + 0.9503041 * B;

  // 将 XYZ 转换为 LMS
  let l = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
  let m = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
  let s = 0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z;

  // 应用非线性函数
  l = Math.cbrt(l);
  m = Math.cbrt(m);
  s = Math.cbrt(s);

  // 计算 OKLCH 的 L 值
  let L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  
  // 计算 OKLCH 的 C 和 H 值
  let a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  let b = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  // 计算色度 (Chroma)
  let C = Math.sqrt(a * a + b * b);

  // 计算色相 (Hue)
  let H = Math.atan2(b, a) * (180 / Math.PI);
  if (H < 0) {
    H += 360;
  }

  return { L, C, H };
}
