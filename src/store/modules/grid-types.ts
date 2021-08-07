export interface stringIndexedArray{
	[k: string]: any,
}

export interface color{
	r: number,
	g: number,
	b: number,
}

export interface cell{
	checked: boolean,
	color: color | null,
}
export interface count{
	color: color | null,
	number: number,
}

export interface row{
	items: Array<count>,
}
export interface border{
	width: number,
}
export interface gridSetting{
	title: string,
	width: number,
	height: number,
	border: border
}
export interface settings{
	grid: gridSetting
}
