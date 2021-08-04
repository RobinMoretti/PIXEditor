import {
	VuexModule,
	Module,
	Mutation,
	Action,
	// Action,
} from 'vuex-class-modules';

import { cell, row, color, count } from './grid-types';
import store from '../index';


@Module
class GridModule extends VuexModule {
	//--------------------------------------------------------------------------------------//
	//                                         GRID                                         //
	//--------------------------------------------------------------------------------------//
	grid = {
		width: 10,
		height: 5,
	};

	//--------------------------------------------------------------------------------------//
	//                                   CELLS                                   			//
	//--------------------------------------------------------------------------------------//
	cells: Array<cell> = [];

	@Mutation
	addCell(newCell: cell): void  {
		this.cells.push(newCell)
	}

	@Action
	toggleCell(cellIndex: number): void{
		if (this.cellsInteraction.clicked) {
			this.cells[cellIndex].checked = !this.cells[cellIndex].checked;
			this.updateCounts();
		}
	}

	//--------------------------------------------------------------------------------------//
	//                                    CELLS COUNT                                       //
	//--------------------------------------------------------------------------------------//

	horizontalCellsCount: Array<row> = [];

	verticalCellsCount: Array<row> = [];

	@Action
	updateCounts(): void {
		this.updateHorizontalCounts();
		// this.updateVerticalCounts();
	}

	@Mutation
	updateHorizontalCounts(){
		this.horizontalCellsCount = [];
		
		for (let y = 0; y < this.grid.height; y += 1) {
			const activeRow: row = {
				items: [],
			};

			for (let x = 0; x < this.grid.width; x += 1) {
				const activeCellIndex = (y * this.grid.width) + x;
				const activeCell = this.cells[(y * this.grid.width) + x];

				// si active row est vide, ajouter un premier item
				if (!activeRow.items[activeRow.items.length - 1]) {
					activeRow.items.push({
						number: 0,
						color: {
							r: 0, g: 0, b: 0, a: 1,
						},
					} as count);
				}

				const lastItemCount = activeRow.items[activeRow.items.length - 1];

				if (activeCell.checked) {
					let previousCell = null;

					if ((activeCellIndex - (y * this.grid.width)) - 1) {
						previousCell = this.cells[(y * this.grid.width) + x - 1];
					}

					if (!previousCell || previousCell.checked) {
						lastItemCount.number += 1;
					} else if (lastItemCount.number) {
						activeRow.items.push({
							number: 1,
							color: {
								r: 0, g: 0, b: 0, a: 1,
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

	//--------------------------------------------------------------------------------------//
	//                                     INTERACTION                                      //
	//--------------------------------------------------------------------------------------//
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
}

export default new GridModule({ store, name: 'grid' });
