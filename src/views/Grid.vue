<template>
	<div class="grids-container">
		<!-- <p v-html="horizontalCellsCount"></p> -->
		<div class="grid" ref="grid" v-if="cells.length">
			<div
				class="cells-count-horizontal">
				<div
					class="cells-count-row"
					v-for="(row, key) in horizontalCellsCount"
					:key="'cells-count-row-' + key">
					<div
						class="cells-count-row-count"
						v-for="(count, countKey) in row.items"
						:key="'cells-horizontal-count-' + countKey">
						{{ count.number }}
					</div>
				</div>
			</div>

			<div class="cells-container">
				<div
					class="cells-row"
					v-for="y in grid.height"
					:key="'cells-row-' + y">
					<div
						class="cell"
						v-for="x in grid.width"
						:key="'cell-' + x"
						:class="{'checked': cells[((y-1) * grid.width) + (x-1)].checked}"
						@mouseover="toggle(((y-1) * grid.width) + (x-1))"
						@mousedown="mouseDownCell(((y-1) * grid.width) + (x-1))"
						@mouseup="mouseUpCell(((y-1) * grid.width) + (x-1))">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as htmlToImage from 'html-to-image';
import gridModule from '@/store/modules/grid';

interface cell{
	checked: boolean,
	x: number,
	y: number,
}
interface color{
	r: number,
	g: number,
	b: number,
	a: number,
}
interface count{
	color: color,
	number: number,
}
interface row{
	items: Array<count>,
}

@Component({
})
export default class GridsContainer extends Vue {
	gridModule = gridModule;

	$refs!: {
		grid: HTMLInputElement
	}

	public grid = {
		width: 10,
		height: 5,
	};

	public cells: Array<cell> = [];

	public horizontalCellsCount: Array<row> = [];

	public verticalCellsCount: Array<row> = [];

	public mouseDownCell(cellIndex: number): void{
		this.gridModule.toggleCellsInteractionClicked();
		this.toggle(cellIndex);
	}

	public mouseUpCell(cellIndex: number): void{
		this.gridModule.toggleCellsInteractionClicked();
		this.toggle(cellIndex);
	}

	mounted(): void {
		for (let y = 0; y < this.grid.height; y += 1) {
			for (let x = 0; x < this.grid.width; x += 1) {
				this.cells.push({
					checked: Math.random() < 0.5,
					x,
					y,
				});
			}
		}
		this.updateCounts();
	}

	exportImage(): void {
		const node = this.$refs.grid as HTMLElement;
		console.log(node);
		htmlToImage.toPng(node, {
			// cacheBust: true,
			// width: 1000,
			// canvasWidth: 2000,
			pixelRatio: 3,
		})
			.then((dataUrl) => {
				const img = new Image();
				img.src = dataUrl;
				img.classList.add('preview-image');
				document.body.appendChild(img);
			})
			.catch((error) => {
				console.error('oops, something went wrong!', error);
			});
	}

	public toggle(cellIndex: number): void{
		if (this.gridModule.cellsInteraction.clicked) {
			this.cells[cellIndex].checked = !this.cells[cellIndex].checked;
			this.updateCounts();
		}
	}

	updateCounts(): void {
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
}
</script>

<style scoped lang="scss">
	.grids-container{
		width: 100%; height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.grid{
			margin: 20px;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
		}

		.cells-row{
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			margin-left: 1px;
		}
		.cells-row:last-child{
			margin-bottom: 1px;
		}

		.cell{
			margin-left: -1px; margin-bottom: -1px;
			width: 30px; height: 30px;
			border: 1px solid black;
			box-sizing: border-box;
			background: white;
		}

		.cell.checked{
			background: black;
		}

		.cells-count-horizontal{
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			box-sizing: border-box;

			.cells-count-row{
				box-sizing: border-box;
				height: 30px;
				width: 100%;
				border-bottom: solid 1px black;
				border-top: solid 1px black;
				border-left: solid 1px black;
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				margin-bottom: -1px;
				align-items: center;

				padding: 2px;
			}
		}
	}
</style>
