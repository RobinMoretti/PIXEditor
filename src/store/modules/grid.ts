import {
	VuexModule,
	Module,
	Mutation,
	Action,
	// Action,
} from 'vuex-class-modules';

import {
	cell, row, color, count, settings, stringIndexedArray,
} from './grid-types';
import store from '../index';

@Module
class GridModule extends VuexModule {
	@Action
	init(): void{
	}

	importExportDatas: Array<string> = [
		'settings',
		'cells',
		'cellsColors',
		'backgroudColor',
		'borderColor',
	];

	
	get getFullDatas(): stringIndexedArray{
		let fullData: stringIndexedArray = {};
		let gridDatas: stringIndexedArray = this as stringIndexedArray;

		this.importExportDatas.forEach(dataName => {
			fullData[dataName] = gridDatas[dataName];
		});

		return fullData;
	}
	// --------------------------------------------------------------------------------------//
	//                                         GRID SETTINGS                                 //
	// --------------------------------------------------------------------------------------//
	settings: settings = {
		grid: {
			title: '',
			width: 10,
			height: 10,
			border: {
				width: 3,
			},
		},
	}

	tempGridSetting = {
		grid: {
			width: 0,
			height: 0,
		},
	}

	@Action
	initGrid():void {

		this.initColors();
		// generate random grid
		for (let y = 0; y < this.settings.grid.height; y += 1) {
			for (let x = 0; x < this.settings.grid.width; x += 1) {
				this.addNewCell();
			}
		}
	}

	@Mutation
	updateBorderWidth(value: number):void {
		this.settings.grid.border.width = value;
	}
	
	@Mutation
	updateGridTitle(value: string):void {
		this.settings.grid.title = value;
	}

	@Action
	updateGridWidth(value: number):void {
		this.saveGridSetting();
		this.settings.grid.width = value;
		this.updateCellsLenght();
		this.updateCounts();
	}
	@Action
	updateGridHeight(value: number):void {
		this.saveGridSetting();
		this.settings.grid.height = value;
		this.updateCellsLenght();
		this.updateCounts();
	}

	@Mutation
	saveGridSetting(){
		this.tempGridSetting = JSON.parse(JSON.stringify(this.settings));
	}

	get getCssGridColumns() {
		let gridTemplaceColumn = '';
		for (let index = 0; index < this.settings.grid.width; index += 1) {
			gridTemplaceColumn += '1fr ';
		}
		return gridTemplaceColumn;
	}

	get getCssGridRows() {
		let gridTemplaceRow = '';
		for (let index = 0; index < this.settings.grid.height; index += 1) {
			gridTemplaceRow += '1fr ';
		}
		return gridTemplaceRow;
	}

	// --------------------------------------------------------------------------------------//
	//                                   CELLS                                   			//
	// --------------------------------------------------------------------------------------//
	cells: Array<cell> = [];
	
	@Action
	updateCellsLenght(): void{
		let newLength = this.settings.grid.width * this.settings.grid.height;
		
		let tempCells: Array<cell> = [...this.cells];
		console.log(tempCells);
		 
		this.resetCells();
		this.addNewCell(this.settings.grid.width * this.settings.grid.height);

		for (let y = 0; y < this.settings.grid.height; y++) {
			for (let x = 0; x < this.settings.grid.width; x++) {

				let isInBound = true;
				if(x > this.settings.grid.width - 1 || x > this.tempGridSetting.grid.width - 1){
					isInBound = false;
				}
				if(y > this.settings.grid.height - 1 || y > this.tempGridSetting.grid.height - 1){
					isInBound = false;
				}

				if(isInBound){
					let tempCellindex = x + (y * this.tempGridSetting.grid.width);

					if(tempCellindex < tempCells.length){
						let tempCell: cell = tempCells[tempCellindex];

						let cellIndex = x + (y * this.settings.grid.width);
						if(tempCell.checked && tempCell.color){
							this.checkCell({
								cellIndex: cellIndex,
								color: tempCell.color,
							});
						}
					}
				}
			}
		}
		// if(this.cells.length > newLength){
		// 	let quantityToRemove = this.cells.length - newLength;
		// 	this.cells.splice(newLength, quantityToRemove); 
		// }
		// else{
		// 	let quantityToAdd = newLength - this.cells.length;
		// 	this.addNewCell(quantityToAdd);
		// }
	}

	@Mutation
	resetCells():void {
		this.cells = [];
	}

	@Mutation
	addNewCell(quantity?: number): void {
		if(quantity){
			for (let index = 0; index < quantity; index++) {
				this.cells.push({
					checked: false,
					color: null
				});
			}
		}
		else{
			this.cells.push({
				checked: false,
				color: null
			});
		}
	}

	@Mutation
	checkCell({ cellIndex, color }: { cellIndex: number; color: color }): void{
		this.cells[cellIndex].checked = true;
		this.cells[cellIndex].color = color;
	}

	@Action
	toggleCell(cellIndex: number): void{
		if (this.cellsInteraction.clicked) {
			this.cells[cellIndex].checked = !this.cells[cellIndex].checked;
			if(this.cells[cellIndex].checked){
				this.cells[cellIndex].color = this.selectedColor;
			}
			else{
				this.cells[cellIndex].color = null;
			}
			this.updateCounts();
		}
	}

	get cellsCount(): number {
		return this.settings.grid.width * this.settings.grid.height;
	}
	// --------------------------------------------------------------------------------------//
	//                                    CELLS COUNT                                       //
	// --------------------------------------------------------------------------------------//

	horizontalCellsCount: Array<row> = [];

	verticalCellsCount: Array<row> = [];

	@Action
	updateCounts(): void {
		if (this.cells.length === 0) {
			this.initGrid();
		}

		this.updateHorizontalCounts();
		this.updateVerticalCounts();
	}

	@Mutation
	updateHorizontalCounts() {
		this.horizontalCellsCount = [];

		for (let y = 0; y < this.settings.grid.height; y += 1) {
			const activeRow: row = {
				items: [],
			};

			for (let x = 0; x < this.settings.grid.width; x += 1) {
				const activeCellIndex = (y * this.settings.grid.width) + x;
				const activeCell = this.cells[activeCellIndex];

				// si active row est vide, ajouter un premier item
				if (!activeRow.items[activeRow.items.length - 1]) {
					activeRow.items.push({
						number: 0,
						color: null,
					} as count);
				}

				const lastItemCount = activeRow.items[activeRow.items.length - 1];

				if (activeCell.checked) {
					let previousCell = null;

					if (activeCellIndex - 1) {
						previousCell = this.cells[activeCellIndex - 1];
					}

					if (!previousCell || 
						previousCell.checked && previousCell.color == activeCell.color) {
						lastItemCount.color = activeCell.color;
						lastItemCount.number += 1;
					} else if (lastItemCount.number) {
						activeRow.items.push({
							number: 1,
							color: activeCell.color,
						} as count);
					} else {
						if(lastItemCount.color === null){
							lastItemCount.color = activeCell.color;
						}
						lastItemCount.number += 1;
					}
				}
			}

			this.horizontalCellsCount.push(activeRow);
		}
	}

	@Mutation
	updateVerticalCounts() {
		this.verticalCellsCount = [];

		for (let x = 0; x < this.settings.grid.width; x += 1) {
			const activeColumn: row = {
				items: [],
			};

			for (let y = 0; y < this.settings.grid.height; y += 1) {
				const activeCellIndex = (y * this.settings.grid.width) + x;
				const activeCell = this.cells[activeCellIndex];

				// si active row est vide, ajouter un premier item
				if (!activeColumn.items[activeColumn.items.length - 1]) {
					activeColumn.items.push({
						number: 0,
						color: null,
					} as count);
				}

				const previousItemCount = activeColumn.items[activeColumn.items.length - 1];

				if (activeCell.checked) {
					let previousCell = null;
					let previousCellIndex = null;

					if ((activeCellIndex - this.settings.grid.width) >= 0) {
						previousCellIndex = activeCellIndex - this.settings.grid.width;
						previousCell = this.cells[activeCellIndex - this.settings.grid.width];
					} else if ((activeCellIndex - 1 + (this.cellsCount - 1)) >= 0) {
						previousCellIndex = activeCellIndex - 1;
						previousCellIndex += (this.settings.grid.width * this.settings.grid.height - 1);
						previousCell = this.cells[previousCellIndex];
					}

					if (!previousCell || 
						previousCell.checked  && previousCell.color == activeCell.color) {
						previousItemCount.color = activeCell.color;
						previousItemCount.number += 1;
					} else if (previousItemCount.number) {
						activeColumn.items.push({
							number: 1,
							color: previousItemCount.color,
						} as count);
					} else {
						if(previousItemCount.color === null){
							previousItemCount.color = activeCell.color;
						}
						previousItemCount.number += 1;
					}
				}
			}

			this.verticalCellsCount.push(activeColumn);
		}
	}

	// --------------------------------------------------------------------------------------//
	//                                     INTERACTION                                      //
	// --------------------------------------------------------------------------------------//
	cellsInteraction = {
		clicked: false,
	};

	@Mutation
	toggleCellsInteractionClicked(clickState?: boolean | null): void {
		if (clickState != null) {
			this.cellsInteraction.clicked = clickState;
		} else {
			this.cellsInteraction.clicked = !this.cellsInteraction.clicked;
		}
	}

	// --------------------------------------------------------------------------------------//
	//                                     COLORS                                      		//
	// --------------------------------------------------------------------------------------//
	cellsColors: Array<color> = [];

	backgroudColor: color = {
		r: 150, g: 150, b: 150,
	};

	borderColor: color = {
		r: 255, g: 255, b: 255,
	};

	selectedColor: color | null = null;

	@Action
	initColors(): void{
		// main color
		const primaryColor: color = {
			r: Math.round(Math.random() * 255), 
			g: Math.round(Math.random() * 255), 
			b: Math.round(Math.random() * 255),
		};
		
		this.cellsColors.push(primaryColor);
		this.selectColor(this.cellsColors[0]);
	}

	@Mutation
	selectColor(color: color): void {
		this.selectedColor = color;
	}

	@Action
	addColor(newColor?: color): void {
		if(newColor){
			this.cellsColors.push(newColor);
		}
		else{
			let newColor: color = {
				r: Math.round(Math.random() * 255), 
				g: Math.round(Math.random() * 255), 
				b: Math.round(Math.random() * 255),
			};

			this.cellsColors.push(newColor);
			this.selectColor(newColor);
		}
	}

	@Mutation
	updateColor({ newColor, colorIndex }: { newColor: color; colorIndex: number }): void {
		this.cellsColors[colorIndex].r = newColor.r;
		this.cellsColors[colorIndex].g = newColor.g;
		this.cellsColors[colorIndex].b = newColor.b;
	}

	@Mutation
	updateBasicColor({ newColor, color }: { newColor: color; color: color }): void {
		color.r = newColor.r;
		color.g = newColor.g;
		color.b = newColor.b;
	}
	
	@Action
	deleteColor(index: number): void {
		if(this.cellsColors.length > 1){
			//TODO: checker si d'autre couleur avec cette couleur sont présente	
			this.cellsColors.splice(index, 1);
			this.selectColor(this.cellsColors[this.cellsColors.length - 1]);
		}
	}

}

export default new GridModule({ store, name: 'grid' });
