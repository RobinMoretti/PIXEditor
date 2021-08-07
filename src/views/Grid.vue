<template>
	<div class="grids-container" ref="grid" >
		<!-- <p v-html="horizontalCellsCount"></p> -->
		<div class="grid" v-if="cells.length">
			<div class="horizontal-container">
				<cells-count-horizontal v-if="countsAreVisible" class="horizontal-cells-count-container"/>
			</div>
			<div>
				<div class="vertical-container">
					<cells-count-vertical v-if="countsAreVisible" class="vertical-cells-count-container"/>
				</div>
				<div class="background-gid-container">
					<background-grid class="background-gid"/>
				</div>
				<div class="cells-container" :class="{ hidden: !cellsAreVisible}">
					<cell
						v-for="index in ( cellsCount )"
						:key="'cell-' + (index-1)"
						:index="index"/>
				</div>
			</div>
		</div>

		<colors-editor v-if="UIIsVisible"/>

		<div class="grid-settings" v-if="UIIsVisible"> 
			<input type="range" min="0" max="13" step="1" v-model="gridBorderWidth" @change="updateBorderWidth"> 
		</div>

		<bottom-menu v-if="UIIsVisible"/>
		
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as htmlToImage from 'html-to-image';
import gridModule from '@/store/modules/grid';
import cellsCountHorizontal from '@/components/grid/CellsCountHorizontal.vue';
import cellsCountVertical from '@/components/grid/CellsCountVertical.vue';
import backgroundGrid from '@/components/grid/BackgroundGrid.vue';
import ColorsEditor from '@/components/UI/Colors/ColorsEditor.vue';
import BottomMenu from '@/components/UI/BottomMenu.vue';
import Cell from '@/components/grid/Cell.vue';
import { cell, gridSetting } from '@/store/modules/grid-types';


@Component({
	components: {
		cellsCountHorizontal,
		cellsCountVertical,
		backgroundGrid,
		ColorsEditor,
		Cell,
		BottomMenu,
	},
})
export default class GridsContainer extends Vue {
	gridModule = gridModule;
    gridBorderWidth = 10;
	UIIsVisible = true;
	cellsAreVisible = true;
	countsAreVisible = true;

	$refs!: {
		grid: HTMLInputElement
	}
 	
	@Watch('gridBorderWidth')
	onGridBorderWidthChange(value: number, oldValue: number) {
		this.updateBorderWidth();
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

	mounted(): void {
		this.gridModule.updateCounts(); 
		this.$bus.$on('EXPORT_GAME', this.exportGame)
		this.$bus.$on('EXPORT_SOLUTION', this.exportSolution)
		this.gridBorderWidth = this.gridModule.settings.grid.border.width;
		// setTimeout(() => {
		// 	this.exportImage();
		// }, 500);
	}

	exportGame(): void {
		this.UIIsVisible = false;
		this.cellsAreVisible = false;
		const node = this.$refs.grid as HTMLElement;
		htmlToImage.toPng(node, {
			// cacheBust: true,
			// width: 1000,
			// canvasWidth: 2000,
			pixelRatio: 3,
		})
			.then((dataUrl) => {
				var link = document.createElement('a');
				link.download = 'pix-export.png';
				link.href = dataUrl;
				link.click();
				link.classList.add("inexistant");
				this.UIIsVisible = true;
				this.cellsAreVisible = true;
			})
			.catch((error) => {
				console.error('oops, something went wrong!', error);
				this.UIIsVisible = true;
				this.cellsAreVisible = true;
			});
	}
	exportSolution(): void {
		this.UIIsVisible = false;
		this.countsAreVisible = false;
		const node = this.$refs.grid as HTMLElement;
		htmlToImage.toPng(node, {
			pixelRatio: 3,
		})
			.then((dataUrl) => {
				var link = document.createElement('a');
				link.download = 'pix-export.png';
				link.href = dataUrl;
				link.click();
				link.classList.add("inexistant");
				this.UIIsVisible = true;
				this.countsAreVisible = true;
			})
			.catch((error) => {
				console.error('oops, something went wrong!', error);
				this.UIIsVisible = true;
				this.countsAreVisible = true;
			});
	}

	updateBorderWidth(): void{
		this.gridModule.updateBorderWidth(this.gridBorderWidth);
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

		.grid-settings{
			position: absolute;
			top: 14px;
			right: 75px;

			input{
				border: solid rgba(10, 10, 10, 0.424) 2px;
			}
		}
	}

	.inexistant{
		display: none;
		visibility: hidden;
		position: fixed;
		left: -100000px;
		right: -100000px;
	}
	.hidden{
		visibility: hidden;
		opacity: 0;
	}
</style>
