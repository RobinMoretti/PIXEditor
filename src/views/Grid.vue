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

			<div>
				
				<div class="cells-count-vertical">
					<div
						class="cells-count-column"
						v-for="(column, key) in verticalCellsCount"
						:key="'cells-count-column-' + key">
						<div
							class="cells-count-column-count"
							v-for="(count, countKey) in column.items"
							:key="'cells-vertical-count-' + countKey">
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
							@mouseover="gridModule.toggleCell(((y-1) * grid.width) + (x-1))"
							@mousedown="mouseDownCell(((y-1) * grid.width) + (x-1))"
							@mouseup="mouseUpCell(((y-1) * grid.width) + (x-1))">
						</div>
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

@Component({
})
export default class GridsContainer extends Vue {
	gridModule = gridModule;

	$refs!: {
		grid: HTMLInputElement
	}

	get grid(){
		return this.gridModule.grid;
	}

	get cells(){
		return this.gridModule.cells;
	}

	get horizontalCellsCount(){
		return this.gridModule.horizontalCellsCount;
	}

	get verticalCellsCount(){
		return this.gridModule.verticalCellsCount;
	}

	public mouseDownCell(cellIndex: number): void{
		this.gridModule.toggleCellsInteractionClicked();
		this.gridModule.toggleCell(cellIndex);
	}

	public mouseUpCell(cellIndex: number): void{
		this.gridModule.toggleCellsInteractionClicked();
		this.gridModule.toggleCell(cellIndex);
	}

	mounted(): void {
		// generate random grid
		for (let y = 0; y < this.grid.height; y += 1) {
			for (let x = 0; x < this.grid.width; x += 1) {
				this.gridModule.addCell({
					checked: Math.random() < 0.5,
					x,
					y,
				});
			}
		}
		
		this.gridModule.updateCounts();
	}

	exportImage(): void {
		const node = this.$refs.grid as HTMLElement;
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
			padding-bottom: 1px;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
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
		.cells-count-vertical{
			// padding-bottom: 1px;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			box-sizing: border-box;

			.cells-count-column{
				box-sizing: border-box;
				height: 100%;
				width: 30px;
				border-left: solid 1px black;
				border-right: solid 1px black;
				border-top: solid 1px black;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				align-items: stretch;
				
				margin-left: -1px;
				// align-items: center;
				padding: 2px;
			}
		}
	}
</style>
