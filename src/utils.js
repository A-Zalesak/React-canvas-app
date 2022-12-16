function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(rgb) {
    const result = rgb.map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('')
    return '#' + result
}

export default function darkenColor(hex) {
    const rgb = hexToRgb(hex)
    const result = [rgb.r, rgb.g, rgb.b].map(x => {
        return Math.max(0, x - 30)
    })
    return rgbToHex(result)
}