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

export default function darkenColor(hex, paintColor) {
    const rgb = hexToRgb(hex)
    //console.log(paintColor)
    let result;
    if (paintColor === "all") {
        result = [rgb.r, rgb.g, rgb.b].map(x => {
            return Math.max(0, x - 30)
        })
    } else if (paintColor === "white") {
        result = [rgb.r, rgb.g, rgb.b].map(x => {
            return Math.min(255, x + 30)
        })
    } else {
        result = [
            paintColor === "cyan" ? Math.max(0, rgb.r - 30) : rgb.r,
            paintColor === "magenta" ? Math.max(0, rgb.g - 30) : rgb.g,
            paintColor === "yellow" ? Math.max(0, rgb.b - 30) : rgb.b
        ]
    }
    //console.log(`Result is ${result}`)
    return rgbToHex(result)
}