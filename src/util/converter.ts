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