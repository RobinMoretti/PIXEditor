<template>
	<div class="cells-count-horizontal" :class="{ right: horizontalPosition }">
		<div
			class="cells-count-row"
			v-for="(row, key) in horizontalCellsCount"
			:key="'cells-count-row-' + key"
		>
			<div
				class="cells-count-row-item"
				v-for="(count, countKey) in getRowItems(row)"
				:key="'cells-horizontal-count-' + countKey"
				:class="getClassCount(count)"
			>
				{{ count.number }}
			</div>
		</div>
	</div>
</template>

<script>
import { useGridStore } from "@/store/grid";

export default {
	setup() {
		return {
			gridModule: useGridStore(),
		};
	},
	computed: {
		horizontalCellsCount() {
			return this.gridModule.horizontalCellsCount;
		},
		horizontalPosition() {
			return this.gridModule.settings.grid.counts.horizontalPosition === "right";
		},
	},
	methods: {
		getRowItems(row) {
			return this.horizontalPosition ? [...row.items].reverse() : row.items;
		},
		getClassCount(countItem) {
			let className = "count-font-0";
			if (countItem.color) {
				className = `count-font-${this.getColorIndex(countItem.color)}`;
			}
			return { [className]: true };
		},
		getColorIndex(cellColor) {
			for (let i = 0; i < this.gridModule.cellsColors.length; i++) {
				if (this.gridModule.cellsColors[i] === cellColor) return i;
			}
			return 0;
		},
	},
};
</script>

<style scoped lang="scss">
.cells-count-horizontal {
	&.right {
		margin-left: 10px;
		left: 0;
		right: unset !important;
		.cells-count-row {
			flex-direction: row-reverse;
		}
	}

	margin-right: 10px;

	.cells-count-row {
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

		.cells-count-row-item {
			width: 30px;
			font-size: 25px;
			font-weight: 600;
		}
	}
}
</style>
