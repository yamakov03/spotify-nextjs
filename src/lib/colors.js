import ColorThief from "colorthief";

export function shadeColor(color, percent) {

    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

export function lumaRGB(R, G, B) {
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

export function lumaHex(color) {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);
    return lumaRGB(R, G, B);
}

export function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function getPrimaryColors(sourceImage) {
    var colorThief = new ColorThief();

    var palette = colorThief.getPalette(sourceImage);
    var hex = [rgbToHex(palette[0][0], palette[0][1], palette[0][2]), rgbToHex(palette[1][0], palette[1][1], palette[1][2])]

    var luma1 = lumaRGB(palette[0][0], palette[0][1], palette[0][2])
    var luma2 = lumaRGB(palette[1][0], palette[1][1], palette[1][2])

    if (luma1 > luma2) {
        if (luma1 > 0.8) {
            return ([`${shadeColor(hex[0], -10)}`, `${hex[1]}`])
        } else {
            return ([`${hex[0]}`, `${hex[1]}`]);
        }
    } else if (luma2 > 0.8) {
        return ([`${shadeColor(hex[1], -10)}`, `${hex[0]}`])
    } else { return ([`${hex[1]}`, `${hex[0]}`]); }
}

export function getPrimaryColor(sourceImage) {
    var colorThief = new ColorThief();

    var palette = colorThief.getPalette(sourceImage);
    var hex = rgbToHex(palette[0][0], palette[0][1], palette[0][2])
    return `${hex[1]}`
}

export function randomHSLA() {
    return `hsla(${~~(2000 * Math.random())}, 70%,  45%, 1)`
}

export function getPrimarySolarizedColor() {
    var elem = document.getElementById('solarizedGradient')
    var elemStyle = getComputedStyle(elem, "")['background-image']

    return elemStyle.substring(elemStyle['background-image'].indexOf('rgb'), elemStyle['background-image'].indexOf(')'))
}