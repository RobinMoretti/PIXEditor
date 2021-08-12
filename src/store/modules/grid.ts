import {
	VuexModule,
	Module,
	Mutation,
	Action,
	// Action,
} from 'vuex-class-modules';

import {
	cell, row, color, count, settings, stringIndexedArray, orientationType, positionType,
} from './grid-types';
import store from '../index';
import Vue from 'vue';

let saveStorageTimeout: number | null = null;

@Module
class GridModule extends VuexModule {
	firstInitied = false;

	@Action
	init(): void{
		this.firstInit();
		this.saveGridInLocalStorage();
	}
	@Mutation
	firstInit(){
		this.firstInitied = true;
	}
	
	@Action
	clear(){
		localStorage.clear();
	}
	@Action
	empty(){
		this.clearCells();
		this.updateCounts();
		this.saveGridInLocalStorage();
	}

	importExportDatas: Array<string> = [
		'settings',
		'cells',
		'cellsColors',
		'backgroudColor',
		'borderColor',
	];

	get getFullDatas(): stringIndexedArray {
		const fullData: stringIndexedArray = {};
		const gridDatas: stringIndexedArray = this as stringIndexedArray;

		this.importExportDatas.forEach((dataName) => {
			fullData[dataName] = gridDatas[dataName];
		});

		return fullData;
	}

	@Action
	importDatas(datas: stringIndexedArray): void{
		this.importExportDatas.forEach((dataName) => {
			this.updateOneData({
				dataName,
				dataValue: datas[dataName],
			});
		});

		this.checkForMissingDatas();

		this.connectColorsIntances();
		this.selectColor(this.cellsColors[0]);
		this.updateCounts();
		this.saveGridInLocalStorage();
		
	}

	@Mutation
	checkForMissingDatas(){
		if(!this.settings.grid.counts){
			Vue.set(this.settings.grid, 'counts', {
				verticalPosition: 'top',
				horizontalPosition: 'left',
				visible: true,
			});
		}
	}

	@Mutation
	updateOneData({ dataName, dataValue }: { dataName: string; dataValue: any }) {
		const gridDatas: stringIndexedArray = this as stringIndexedArray;
		gridDatas[dataName] = dataValue;	
	}

	@Action
	saveGridInLocalStorage(): void{
		if(saveStorageTimeout !== null){
			clearTimeout(saveStorageTimeout);
		}

		saveStorageTimeout = setTimeout(() => {
			localStorage.setItem('grid', JSON.stringify(this.getFullDatas));
		}, 1000);
	}

	@Action
	loadGridFromLocalStorage(): void{
		let gridString = localStorage.getItem('grid');
		if(typeof(gridString) === "string"){
			let gridObj = JSON.parse(gridString) as stringIndexedArray;
			this.importDatas(gridObj);
		}
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
			counts: {
				verticalPosition: 'top',
				horizontalPosition: 'left',
				visible: true,
			}
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
		
		for (let y = 0; y < this.settings.grid.height; y += 1) {
			for (let x = 0; x < this.settings.grid.width; x += 1) {
				this.addNewCell();
			}
		}

		this.saveGridInLocalStorage();
	}

	@Action
	updateBorderWidth(value: number):void {
		this.settings.grid.border.width = value;
		this.saveGridInLocalStorage();
	}

	@Action
	updateGridTitle(value: string):void {
		this.settings.grid.title = value;
		this.saveGridInLocalStorage();
	}

	@Action
	updateGridWidth(value: number):void {
		this.saveGridSetting();
		this.settings.grid.width = value;
		this.updateCellsLenght();
		this.updateCounts();
		this.saveGridInLocalStorage();
	}

	@Action
	updateGridHeight(value: number):void {
		this.saveGridSetting();
		this.settings.grid.height = value;
		this.updateCellsLenght();
		this.updateCounts();
		this.saveGridInLocalStorage();
	}

	@Action
	updateCountsPosition({ orientation, targetPosition }: { orientation: orientationType; targetPosition: positionType }):void {
		if(orientation === 'vertical'){
			this.settings.grid.counts.verticalPosition = targetPosition;
		}
		else{
			this.settings.grid.counts.horizontalPosition = targetPosition;
		}
		this.saveGridInLocalStorage();
	}

	@Action
	toggleCountsVisibility(state?: boolean):void {
		if(state !== undefined){
			this.settings.grid.counts.visible = state;
		}
		else{
			this.settings.grid.counts.visible = !this.settings.grid.counts.visible;
		}

		this.saveGridInLocalStorage();
	}

	@Mutation
	saveGridSetting() {
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
		const tempCells: Array<cell> = [...this.cells];

		this.resetCells();
		this.addNewCell(this.settings.grid.width * this.settings.grid.height);

		for (let y = 0; y < this.settings.grid.height; y += 1) {
			for (let x = 0; x < this.settings.grid.width; x += 1) {
				let isInBound = true;
				if (x > this.settings.grid.width - 1 || x > this.tempGridSetting.grid.width - 1) {
					isInBound = false;
				}
				if (y > this.settings.grid.height - 1 || y > this.tempGridSetting.grid.height - 1) {
					isInBound = false;
				}

				if (isInBound) {
					const tempCellindex = x + (y * this.tempGridSetting.grid.width);

					if (tempCellindex < tempCells.length) {
						const tempCell: cell = tempCells[tempCellindex];

						const cellIndex = x + (y * this.settings.grid.width);

						if (tempCell >= 0) {
							this.checkCell({
								cellIndex,
								refCell: tempCell,
							});
						}
					}
				}
			}
		}
	}

	@Mutation
	resetCells():void {
		this.cells = [];
	}

	@Mutation
	clearCells():void {
		for (let index = 0; index < this.cells.length; index++) {
			Vue.set(this.cells, index, -1);
		}
	}

	@Mutation
	addNewCell(quantity?: number): void {
		if (quantity) {
			for (let index = 0; index < quantity; index += 1) {
				this.cells.push(-1);
			}
		} else {
			this.cells.push(-1);
		}
	}

	@Mutation
	checkCell({ cellIndex, refCell }: { cellIndex: number; refCell: cell }): void{
		Vue.set(this.cells, cellIndex, refCell);
		// this.cells[cellIndex] = refCell;
	}

	@Action
	toggleCell(cellIndex: number): void{
		console.log("toggleCell")
		console.log(this.selectedColorIndex)
		console.log(this.cells[cellIndex])

		if (this.cellsInteraction.clicked) {
			Vue.set(this.cells, cellIndex, this.selectedColorIndex);
			// this.cells[cellIndex] = this.selectedColorIndex;
			
			this.updateCounts();
			this.saveGridInLocalStorage();
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
				if (!activeRow.items.length) {
					activeRow.items.push({
						number: 0,
						color: this.cellsColors[activeCell],
					} as count);
				}

				const lastItemCount = activeRow.items[activeRow.items.length - 1];

				if (activeCell >= 0) {
					let previousCell = activeCellIndex - 1 >= 0 ? this.cells[activeCellIndex - 1] : null;
					
					if (!previousCell ||
						previousCell >= 0 && (previousCell >= 0 && (previousCell === activeCell))) {
						// lastItemCount.color = activeCell.color;
						lastItemCount.number += 1;
					} else if (lastItemCount.number) {
						activeRow.items.push({
							number: 1,
							color: this.cellsColors[activeCell],
						} as count);
					} else {
						if (lastItemCount.number === 0) {
							lastItemCount.color = this.cellsColors[activeCell];
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

				if (activeCell >= 0) {
					let previousCell = -1;
					let previousCellIndex = -1;

					if ((activeCellIndex - this.settings.grid.width) >= 0) {
						previousCellIndex = activeCellIndex - this.settings.grid.width;
						previousCell = this.cells[activeCellIndex - this.settings.grid.width];
					} else if ((activeCellIndex - 1 + (this.settings.grid.width * this.settings.grid.height - 1)) >= 0) {
						previousCellIndex = activeCellIndex - 1;
						previousCellIndex += (this.settings.grid.width * this.settings.grid.height - 1);
						previousCell = this.cells[previousCellIndex];
					}

					if (!previousCellIndex
						|| (previousCell >= 0 && (previousCell === activeCell))) {
						previousItemCount.color = this.cellsColors[activeCell];
						previousItemCount.number += 1;
					} else if (previousItemCount.number) {
						activeColumn.items.push({
							number: 1,
							color: this.cellsColors[activeCell],
						} as count);
					} else {
						if (previousItemCount.color === null) {
							previousItemCount.color = this.cellsColors[activeCell];
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
	selectedColorIndex: number = 0;

	@Mutation
	connectColorsIntances() {
		// this.cells.forEach((cellObj) => {
		// 	for (let i = 0; i < this.cellsColors.length; i += 1) {
		// 		const colorObj = this.cellsColors[i];
		// 		if (cellObj.color) {
		// 			const sameR = colorObj.r === cellObj.color.r;
		// 			const sameG = colorObj.g === cellObj.color.g;
		// 			const sameB = colorObj.b === cellObj.color.b;

		// 			if (sameR && sameG && sameB) {
		// 				cellObj.color = colorObj;
		// 			}
		// 		}
		// 	}
		// });
	}

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
		this.saveGridInLocalStorage();
	}

	@Mutation
	selectColor(colorObj: color): void {
		this.selectedColor = colorObj;
		this.selectedColorIndex = this.cellsColors.findIndex(color => color === colorObj);
	}

	@Action
	addColor(newColor?: color): void {
		if(this.cellsColors.length < 5){
			if (newColor) {
				this.cellsColors.push(newColor);
			} else {
				const newColor2: color = {
					r: Math.round(Math.random() * 255),
					g: Math.round(Math.random() * 255),
					b: Math.round(Math.random() * 255),
				};
	
				this.cellsColors.push(newColor2);
				this.selectColor(newColor2);
			}
			this.saveGridInLocalStorage();
		}
	}

	@Action
	updateColor({ newColor, colorIndex }: { newColor: color; colorIndex: number }): void {
		this.cellsColors[colorIndex].r = newColor.r;
		this.cellsColors[colorIndex].g = newColor.g;
		this.cellsColors[colorIndex].b = newColor.b;

		this.saveGridInLocalStorage();
	}

	@Action
	updateColorImg({ imgValue, colorIndex }: { imgValue?: string; colorIndex: number }): void {
		Vue.set(this.cellsColors[colorIndex], 'img', imgValue);
		// this.cellsColors[colorIndex].img = imgValue;
		this.saveGridInLocalStorage();
	}

	/* eslint class-methods-use-this: ["error", { "exceptMethods": ["updateBasicColor"] }] */
	@Action
	updateBasicColor({ newColor, colorObj }: { newColor: color; colorObj: color }): void {
		/* eslint no-param-reassign: "error" */
		colorObj.r = newColor.r;
		colorObj.g = newColor.g;
		colorObj.b = newColor.b;
		this.saveGridInLocalStorage();
	}

	@Action
	deleteColor(index: number): void {
		if (this.cellsColors.length > 1) {
			// TODO: checker si d'autre couleur avec cette couleur sont présente
			this.cellsColors.splice(index, 1);
			this.selectColor(this.cellsColors[this.cellsColors.length - 1]);
			this.saveGridInLocalStorage();
			this.saveGridInLocalStorage();
		}
	}
}

export default new GridModule({ store, name: 'grid' });
