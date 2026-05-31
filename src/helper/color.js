export function hexToRgbA(hexCode) {
	let hex = hexCode.replace('#', '')

	if (hex.length === 3) {
		hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
	}

	const r = parseInt(hex.substring(0, 2), 16)
	const g = parseInt(hex.substring(2, 4), 16)
	const b = parseInt(hex.substring(4, 6), 16)

	return { r, g, b }
}

function componentToHex(c) {
	const hex = c.toString(16)
	return hex.length === 1 ? `0${hex}` : hex
}

export function rgbToHex(c) {
	return `#${componentToHex(c.r)}${componentToHex(c.g)}${componentToHex(c.b)}`
}
