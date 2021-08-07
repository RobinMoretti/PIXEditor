export function map(in_min: number, in_max: number, out_min: number, out_max: number, value: number): number{
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}