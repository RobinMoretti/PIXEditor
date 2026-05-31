export function map(inMin, inMax, outMin, outMax, value) {
	return ((value - inMin) * (outMax - outMin)) / ((inMax - inMin) + outMin)
}
