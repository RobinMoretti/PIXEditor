<template>
	<div class="cells-count-vertical">
		<div
			class="cells-count-column"
			v-for="(column, key) in verticalCellsCount"
			:key="'cells-count-column-' + key">
			<div
				class="cells-count-column-item"
				v-for="(count, countKey) in column.items"
				:key="'cells-vertical-count-' + countKey"
				:class="getClassCount(count)">
				{{ count.number }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';
import { color, count, row, stringIndexedArray } from '@/store/modules/grid-types';

@Component
export default class cellsCountVertical extends Vue {
	gridModule = gridModule;

	get verticalCellsCount(): row[] {
		return this.gridModule.verticalCellsCount;
	}

	get borderColor(): color {
		return this.gridModule.backgroudColor;
	}

	getClassCount(countItem: count): Record<string, string> {
		let className = `count-font-0`;

		if(countItem.color){
			className = `count-font-${this.getColorIndex(countItem.color)}`
		}
		let classObj: stringIndexedArray = {};
		classObj[className] = true;

		return classObj;
	}

	getColorIndex(cellColor: color): number{
		for (let i = 0; i < this.gridModule.cellsColors.length; i++) {
			const color = this.gridModule.cellsColors[i];
			if(color === cellColor){
				return i;
			}
		}
		
		return 0;
	}
}
</script>

<style scoped lang="scss">
	.cells-count-vertical{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: stretch;
		box-sizing: border-box;
		margin-bottom: 10px;
		// background: white;

		.cells-count-column{
			box-sizing: border-box;
			width: calc(30px * var(--system-zoom));
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: stretch;

			.cells-count-column-item{
				height: calc(30px * var(--system-zoom));
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size:  calc(25px * var(--system-zoom));
				font-weight: 600;
			}
		}
	}
</style>
