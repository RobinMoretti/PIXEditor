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
				<div class="background-gid-container">
					<background-grid class="background-gid"/>
				</div>
				<div class="cells-container">
					<div
						class="cell"
						:id="`cell-${index-1}`"
						v-for="index in ( cellsCount )"
						:key="'cell-' + (index-1)"
						:class="{'checked': cells[index-1].checked}"
						@mouseover="gridModule.toggleCell(index-1)"
						@mousedown="mouseDownCell(index-1)"
						@mouseup="mouseUpCell(index-1)">
					</div>
				</div>
			</div>
		</div>

		<colors-editor/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as htmlToImage from 'html-to-image';
import gridModule from '@/store/modules/grid';
import cellsCountHorizontal from '@/components/grid/CellsCountHorizontal.vue';
import cellsCountVertical from '@/components/grid/CellsCountVertical.vue';
import backgroundGrid from '@/components/grid/BackgroundGrid.vue';
import ColorsEditor from '@/components/UI/Colors/ColorsEditor.vue';
import { cell, gridSetting } from '@/store/modules/grid-types';

@Component({
	components: {
		cellsCountHorizontal,
		cellsCountVertical,
		backgroundGrid,
		ColorsEditor,
	},
})
export default class GridsContainer extends Vue {
	gridModule = gridModule;

	$refs!: {
		grid: HTMLInputElement
	}

	get grid(): gridSetting {
		return this.gridModule.settings.grid;
	}

	get cellsCount(): number {
		return this.grid.width * this.grid.height;
	}

	get cells(): Array<cell> {
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
		// setTimeout(() => {
		// 	this.exportImage();
		// }, 500);
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

		.cells-container{
			display: grid;
			grid-template-rows: var(--grid-template-rows);
			grid-template-columns: var(--grid-template-columns);
		}

		.cells-row{
			// display: flex;
			// flex-direction: row;
			// justify-content: flex-start;
			// margin-left: var(--grid-border-width);
		}
		.cells-row:last-child{
			// margin-bottom: var(--grid-border-width);
		}

		.cell{
			// margin-left: calc(0px - var(--grid-border-width));
			// margin-bottom: calc(0px - var(--grid-border-width));
			width: 30px; height: 30px;
			border: var(--grid-border-width) solid rgba(121, 121, 121, 0);
			box-sizing: border-box;
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

		.background-gid-container{
			position: relative;
			z-index: -1;
			.background-gid{
				position: absolute;
				top: 0;
			}
		}
	}
</style>
