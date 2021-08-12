<template>
    <div
        class="cell"
        :id="`cell-${index-1}`"
        :class="{'checked': cells[index-1] >= 0}"
        :style="cellCss"
        @mouseover="toggleIfPossible(index)"
        @mousedown="mouseDownCell(index-1)"
        @mouseup="mouseUpCell()">
		<img :src="colors[cells[index-1]].img" class="img-cell" v-if="colors[cells[index-1]] && colors[cells[index-1]].img">
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';
import { cell, color } from '@/store/modules/grid-types';
import grid from '@/store/modules/grid';

const CellProps = Vue.extend({
	props: {
		index: Number,
		cell: Number,
	},
});

@Component
export default class Cell extends CellProps {
	gridModule = gridModule;

	get cells(): Array<cell> {
		return this.gridModule.cells;
	}
	get colors(): Array<color> {
		return this.gridModule.cellsColors;
	}

	get cellCss(): Record<string, string> {
		if (this.cells[this.index - 1] >= 0 && this.colors[this.cells[this.index - 1]]) {
			const color = this.colors[this.cells[this.index - 1]];
			if(!color?.img){
				return {
					'background-color': `rgb(${color?.r},${color?.g},${color?.b})`,
				};
			}
			else{
				return {
					'background-color': `unset !important`,
				};
			}
		}

		return {};
	}

	public mouseDownCell(cellIndex: number): void{
		this.gridModule.toggleCellsInteractionClicked();
		this.gridModule.toggleCell(cellIndex);
	}

	public toggleIfPossible(index: number){
		if(this.gridModule.cellsInteraction.clicked){
			gridModule.toggleCell(index-1);
		}
	}

	public mouseUpCell(): void{
		this.gridModule.toggleCellsInteractionClicked();
	}
}
</script>

<style scoped lang="scss">
	.cells-container{

		*{

		-webkit-touch-callout: none; /* iOS Safari */
			-webkit-user-select: none; /* Safari */
			-khtml-user-select: none; /* Konqueror HTML */
			-moz-user-select: none; /* Old versions of Firefox */
				-ms-user-select: none; /* Internet Explorer/Edge */
					user-select: none;
		}
		.cell{
			position: relative;
		}


		.img-cell{
			position: absolute;
			left: calc((var(--grid-border-width)/2) * (-1)); top: calc((var(--grid-border-width)/2) * (-1));
			width: calc(var(--grid-border-width) + 100%); height: calc(var(--grid-border-width) + 100%);
			object-fit: cover;
			z-index: -1;
		}
	}
</style>
