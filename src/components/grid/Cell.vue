<template>
    <div
        class="cell"
        :id="`cell-${index-1}`"
        :class="{'checked': cells[index-1].checked}"
        :style="cellCss"
        @mouseover="gridModule.toggleCell(index-1)"
        @mousedown="mouseDownCell(index-1)"
        @mouseup="mouseUpCell()">
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';
import { cell } from '@/store/modules/grid-types';

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

	get cellCss(): Record<string, string> {
		if (this.cells[this.index - 1] && this.cells[this.index - 1].color) {
			const { color } = this.cells[this.index - 1];
			return {
				'background-color': `rgb(${color?.r},${color?.g},${color?.b})`,
			};
		}

		return {};
	}

	public mouseDownCell(cellIndex: number): void{
		this.gridModule.toggleCellsInteractionClicked();
		this.gridModule.toggleCell(cellIndex);
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
	}
</style>
