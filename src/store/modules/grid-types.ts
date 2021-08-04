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
export interface border{
	width: number,
}
export interface gridSetting{
	width: number,
	height: number,
	border: border
}
export interface settings{
	grid: gridSetting
}
