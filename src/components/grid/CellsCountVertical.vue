<template>
	<div class="cells-count-vertical">
		<div
			class="cells-count-column"
			v-for="(column, key) in verticalCellsCount"
			:key="'cells-count-column-' + key">
			<div
				class="cells-count-column-item"
				v-for="(count, countKey) in column.items"
				:key="'cells-vertical-count-' + countKey">
				{{ count.number }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';
import { row } from '@/store/modules/grid-types';

@Component
export default class cellsCountVertical extends Vue {
	gridModule = gridModule;

	get verticalCellsCount(): row[] {
		return this.gridModule.verticalCellsCount;
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
		margin-bottom: var(--grid-border-width);
		// background: white;

		.cells-count-column{
			box-sizing: border-box;
			width: 30px;
			// border-left: solid var(--grid-border-width) rgba(0, 0, 0, 0);
			// border-right: solid var(--grid-border-width) rgba(0, 0, 0, 0);
			// border-top: solid var(--grid-border-width) rgba(0, 0, 0, 0);
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: stretch;

			// align-items: center;

			.cells-count-column-item{
				height: 30px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				font-size: 20px;
				font-weight: 600;
			}
		}
	}
</style>
