export interface cell{
	checked: boolean,
	x: number,
	y: number,
}
export interface color{
	r: number,
	g: number,
	b: number,
	a: number,
}
export interface count{
	color: color,
	number: number,
}

export interface row{
	items: Array<count>,
}

