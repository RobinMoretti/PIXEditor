<template>
	<div class="grids-container">
		<!-- <p v-html="horizontalCellsCount"></p> -->
		<div class="grid" ref="grid" v-if="cells.length">
			<div class="horizontal-container">
				<cells-count-horizontal class="horizontal-cells-count-container"/>
			</div>
			<div>
				<div class="vertical-container">
					<cells-count-vertical class="vertical-cells-count-container"/>
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
import cellsCountHorizontal from '@/components/grid/CellsCountHorizontal.vue'
import cellsCountVertical from '@/components/grid/CellsCountVertical.vue'

@Component({
	components: {
		cellsCountHorizontal,
		cellsCountVertical,
	}
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

	public mouseDownCell(cellIndex: number): void{
		this.gridModule.toggleCellsInteractionClicked();
		this.gridModule.toggleCell(cellIndex);
	}

	public mouseUpCell(cellIndex: number): void{
		this.gridModule.toggleCellsInteractionClicked();
		this.gridModule.toggleCell(cellIndex);
	}

	mounted(): void {
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

		.vertical-container{
			position: relative;

			.vertical-cells-count-container{
				position: absolute;
				bottom: 0;
			}
		}
		.horizontal-container{
			position: relative;

			.horizontal-cells-count-container{
				position: absolute;
				right: 0;
			}
		}
	}
</style>
