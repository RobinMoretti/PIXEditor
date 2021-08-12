export interface stringIndexedArray{
	[k: string]: any,
}

export interface color{
	r: number,
	g: number,
	b: number,
	img?: string,
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

export interface countsSettingType{
	verticalPosition: positionType,
	horizontalPosition: positionType,
	visible: boolean,
}

export interface gridSetting{
	title: string,
	width: number,
	height: number,
	border: border,
	counts: countsSettingType,
}
export interface settings{
	grid: gridSetting
}

export type positionType = 'top' | 'bottom' | 'left' | 'right';
export type orientationType = 'vertical' | 'horizontal';