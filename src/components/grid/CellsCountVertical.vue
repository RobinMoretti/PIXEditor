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
				:style="getCssCount(count)">
				{{ count.number }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';
import { color, count, row } from '@/store/modules/grid-types';

@Component
export default class cellsCountVertical extends Vue {
	gridModule = gridModule;

	get verticalCellsCount(): row[] {
		return this.gridModule.verticalCellsCount;
	}
	get borderColor(): color {
		return this.gridModule.backgroudColor;
	}

	getCssCount(countItem: count){
		if(countItem.color){
			return {
				'color': `rgb(${countItem.color.r}, ${countItem.color.g}, ${countItem.color.b})`
			}
		}

		return {
			'color': `rgb(${this.borderColor.r}, ${this.borderColor.g}, ${this.borderColor.b})`
		}
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
			width: 30px;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: stretch;

			.cells-count-column-item{
				height: 30px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 25px;
				font-weight: 600;
			}
		}
	}
</style>
