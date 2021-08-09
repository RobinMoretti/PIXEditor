<template>
	<div
		class="cells-count-horizontal">
		<div
			class="cells-count-row"
			v-for="(row, key) in horizontalCellsCount"
			:key="'cells-count-row-' + key">
			<div
				class="cells-count-row-item"
				v-for="(count, countKey) in row.items"
				:key="'cells-horizontal-count-' + countKey"
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
export default class cellsCountHorizontal extends Vue {
	gridModule = gridModule;

	get horizontalCellsCount(): row[] {
		return this.gridModule.horizontalCellsCount;
	}

	get borderColor(): color {
		return this.gridModule.backgroudColor;
	}

	// getCssCount(countItem: count): Record<string, string> {
	// 	if (countItem.color) {
	// 		return {
	// 			color: `rgb(${countItem.color.r}, ${countItem.color.g}, ${countItem.color.b})`,
	// 		};
	// 	}

	// 	return {
	// 		color: `rgb(${this.borderColor.r}, ${this.borderColor.g}, ${this.borderColor.b})`,
	// 	};
	// }
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
	.cells-count-horizontal{
		// background: white;
		margin-right: 10px;

		.cells-count-row{
			box-sizing: border-box;
			height: 30px;
			width: 100%;
			border-bottom: solid var(--grid-border-width) rgba(0, 0, 0, 0);
			border-top: solid var(--grid-border-width) rgba(0, 0, 0, 0);
			border-left: solid var(--grid-border-width) rgba(0, 0, 0, 0);
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;

			padding: 2px;

			.cells-count-row-item{
				width: 30px;
				font-size: 25px;
				font-weight: 600;
			}
		}
	}
</style>
