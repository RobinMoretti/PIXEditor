export function map(inMin: number, inMax: number,
	outMin: number, outMax: number,
	value: number): number {
	return ((value - inMin) * (outMax - outMin)) / ((inMax - inMin) + outMin);
}
