import {
	VuexModule,
	Module,
	Mutation,
	Action,
	// Action,
} from 'vuex-class-modules';

import {
	cell, row, color, count, settings,
} from './grid-types';
import store from '../index';

@Module
class GridModule extends VuexModule {
	@Action
	init(): void{
		this.initColors();
	}

	// --------------------------------------------------------------------------------------//
	//                                         GRID SETTINGS                                        //
	// --------------------------------------------------------------------------------------//
	settings: settings = {
		grid: {
			width: 10,
			height: 10,
			border: {
				width: 3,
			},
		},
	}

	@Action
	initGrid():void {
		// generate random grid
		for (let y = 0; y < this.settings.grid.height; y += 1) {
			for (let x = 0; x < this.settings.grid.width; x += 1) {
				this.addCell({
					checked: false,
					x,
					y,
				});
			}
		}
	}

	@Mutation
	incrementBorder():void {
		this.settings.grid.border.width += 1;
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

	@Mutation
	addCell(newCell: cell): void {
		this.cells.push(newCell);
	}

	@Action
	toggleCell(cellIndex: number): void{
		if (this.cellsInteraction.clicked) {
			this.cells[cellIndex].checked = !this.cells[cellIndex].checked;
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
						color: {
							r: 0, g: 0, b: 0,
						},
					} as count);
				}

				const lastItemCount = activeRow.items[activeRow.items.length - 1];

				if (activeCell.checked) {
					let previousCell = null;

					if (activeCellIndex - 1) {
						previousCell = this.cells[activeCellIndex - 1];
					}

					if (!previousCell || previousCell.checked) {
						lastItemCount.number += 1;
					} else if (lastItemCount.number) {
						activeRow.items.push({
							number: 1,
							color: {
								r: 0, g: 0, b: 0,
							},
						} as count);
					} else {
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
						color: {
							r: 0, g: 0, b: 0,
						},
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

					if (!previousCell || previousCell.checked) {
						previousItemCount.number += 1;
					} else if (previousItemCount.number) {
						activeColumn.items.push({
							number: 1,
							color: {
								r: 0, g: 0, b: 0,
							},
						} as count);
					} else {
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
