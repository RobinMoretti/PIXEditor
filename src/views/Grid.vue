<template>
	<div class="grids-container" ref="grid" :class="{ print: !(!cellsAreVisible && !UIIsVisible) }">
		<div class="grid" v-if="cells.length">
			<div class="horizontal-container" :class="{ right: horizontalPosition }">
				<cells-count-horizontal
					v-if="countsAreVisible && countsIsvisible"
					class="horizontal-cells-count-container"
				/>
			</div>
			<div class="grids-true-container">
				<div class="vertical-container" :class="{ bottom: verticalPosition }">
					<cells-count-vertical
						v-if="countsAreVisible && countsIsvisible"
						class="vertical-cells-count-container"
					/>
				</div>
				<div class="background-gid-container">
					<background-grid class="background-gid" />
				</div>
				<div class="cells-container" :class="{ hidden: !cellsAreVisible }">
					<cell v-for="index in cellsCount" :key="'cell-' + (index - 1)" :index="index" />
				</div>
			</div>

			<div
				class="colors-container-export"
				:class="{ left: horizontalPosition }"
				v-if="!cellsAreVisible && !UIIsVisible"
			>
				<div class="colors-true-container">
					<color-component
						v-for="(color, key) in cellsColor"
						:key="`color-${key}`"
						:color="color"
						:color-index="key"
						for-print
					></color-component>
					<div class="grid-size-export" v-if="showGridSize">
						{{ gridModule.settings.grid.width }}×{{ gridModule.settings.grid.height }}
					</div>
				</div>
			</div>
		</div>

		<colors-editor v-if="UIIsVisible" />

		<div class="grid-settings" v-if="UIIsVisible"></div>

		<div class="system-settings" v-if="UIIsVisible">
			<div class="range-container grid-border-width-container">
				<input
					type="range"
					min="0"
					max="13"
					step="1"
					v-model="gridBorderWidth"
					@change="updateBorderWidth"
				/>
				<label> Border Width </label>
			</div>

			<div class="range-container zoom-container">
				<input type="range" min="0" max="2" step="0.01" v-model="systemZoom" />
				<label> Zoom </label>
			</div>

			<grid-setting-rect />
		</div>

		<bottom-menu v-if="UIIsVisible" />
	</div>
</template>

<script>
import * as htmlToImage from "html-to-image";
import { useGridStore } from "@/store/grid";
import { useSystemStore } from "@/store/system";
import { emitter } from "@/eventBus";
import cellsCountHorizontal from "@/components/grid/CellsCountHorizontal.vue";
import cellsCountVertical from "@/components/grid/CellsCountVertical.vue";
import backgroundGrid from "@/components/grid/BackgroundGrid.vue";
import ColorsEditor from "@/components/UI/Colors/ColorsEditor.vue";
import colorComponent from "@/components/UI/Colors/ColorPicker.vue";
import gridSettingRect from "@/components/UI/GridSettingRect.vue";
import BottomMenu from "@/components/UI/BottomMenu.vue";
import Cell from "@/components/grid/Cell.vue";

export default {
	components: {
		cellsCountHorizontal,
		cellsCountVertical,
		backgroundGrid,
		ColorsEditor,
		Cell,
		BottomMenu,
		colorComponent,
		gridSettingRect,
	},
	setup() {
		return {
			gridModule: useGridStore(),
			systemModule: useSystemStore(),
		};
	},
	data() {
		return {
			systemZoom: 0,
			gridBorderWidth: 10,
			UIIsVisible: true,
			cellsAreVisible: true,
			countsAreVisible: true,
		};
	},
	watch: {
		gridBorderWidth() {
			this.updateBorderWidth();
		},
		systemZoom() {
			this.systemModule.updateZoom(this.systemZoom);
		},
	},
	computed: {
		cellsCount() {
			return this.gridModule.settings.grid.width * this.gridModule.settings.grid.height;
		},
		cells() {
			return this.gridModule.cells;
		},
		cellsColor() {
			return this.gridModule.cellsColors;
		},
		horizontalPosition() {
			return this.gridModule.settings.grid.counts.horizontalPosition === "right";
		},
		verticalPosition() {
			return this.gridModule.settings.grid.counts.verticalPosition === "bottom";
		},
		countsIsvisible() {
			return this.gridModule.settings.grid.counts.visible;
		},
		showGridSize() {
			return this.gridModule.settings.grid.export?.showGridSize !== false;
		},
	},
	mounted() {
		this.gridModule.updateCounts();
		this.gridBorderWidth = this.gridModule.settings.grid.border.width;
		this.systemZoom = this.systemModule.zoom;

		emitter.on("EXPORT_GAME", this.exportGame);
		emitter.on("EXPORT_SOLUTION", this.exportSolution);
		document.addEventListener("mouseup", this.onGlobalMouseUp);
	},
	unmounted() {
		emitter.off("EXPORT_GAME", this.exportGame);
		emitter.off("EXPORT_SOLUTION", this.exportSolution);
		document.removeEventListener("mouseup", this.onGlobalMouseUp);
	},
	methods: {
		exportGame() {
			this.UIIsVisible = false;
			this.cellsAreVisible = false;
			const node = this.$refs.grid;

			htmlToImage
				.toPng(node, { pixelRatio: 5 })
				.then((dataUrl) => {
					const link = document.createElement("a");
					link.download = this.gridModule.settings.grid.title + "-game.png";
					link.href = dataUrl;
					link.click();
					link.classList.add("inexistant");
					this.UIIsVisible = true;
					this.cellsAreVisible = true;
				})
				.catch((error) => {
					console.error("oops, something went wrong!", error);
					this.UIIsVisible = true;
					this.cellsAreVisible = true;
				});
		},
		exportSolution() {
			this.UIIsVisible = false;
			this.countsAreVisible = false;
			const node = this.$refs.grid;
			htmlToImage
				.toPng(node, { pixelRatio: 5 })
				.then((dataUrl) => {
					const link = document.createElement("a");
					link.download = this.gridModule.settings.grid.title + "-solution.png";
					link.href = dataUrl;
					link.click();
					link.classList.add("inexistant");
					this.UIIsVisible = true;
					this.countsAreVisible = true;
				})
				.catch((error) => {
					console.error("oops, something went wrong!", error);
					this.UIIsVisible = true;
					this.countsAreVisible = true;
				});
		},
		onGlobalMouseUp() {
			if (this.gridModule.cellsInteraction.clicked) {
				this.gridModule.toggleCellsInteractionClicked(false);
			}
		},
		updateBorderWidth() {
			this.gridModule.updateBorderWidth(this.gridBorderWidth);
		},
	},
};
</script>

<style scoped lang="scss">
.grids-container {
	width: 100%;
	height: calc(100% - 40px);
	overflow: auto;
	display: flex;
	justify-content: center;
	align-items: center;

	.grids-true-container {
		display: flex;
		flex-direction: column;
	}

	.grid {
		margin: 20px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		transform: scale(var(--system-zoom));
		transform-origin: 50% 50% 0px;
	}

	.cells-container {
		display: grid;
		grid-template-rows: var(--grid-template-rows);
		grid-template-columns: var(--grid-template-columns);
	}

	.cell {
		width: 30px;
		height: 30px;
		border: var(--grid-border-width) solid rgba(121, 121, 121, 0);
		box-sizing: border-box;
	}

	.cell.checked {
		background: black;
	}

	.vertical-container {
		position: relative;

		.vertical-cells-count-container {
			position: absolute;
			bottom: 0;
		}
	}

	.vertical-container.bottom {
		order: 3;

		.vertical-cells-count-container {
			position: absolute;
			bottom: unset !important;
			top: 0;
		}
	}

	.horizontal-container {
		position: relative;

		.horizontal-cells-count-container {
			position: absolute;
			right: 0;
		}
	}

	.horizontal-container.right {
		order: 3;
	}

	.background-gid-container {
		position: relative;
		z-index: -1;
		.background-gid {
			position: absolute;
			top: 0;
		}
	}

	.grid-settings {
		position: absolute;
		top: 14px;
		right: 75px;

		input {
			border: solid rgba(10, 10, 10, 0.424) 2px;
		}
	}

	.system-settings {
		position: absolute;
		top: 14px;
		left: 14px;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-direction: column;

		input {
			border: solid rgba(10, 10, 10, 0.424) 2px;
		}
		label {
			margin-left: 10px;
			text-transform: uppercase;
			font-size: 12px;
		}

		.range-container {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			flex-direction: row;
			font-weight: bold;
		}
	}

	.colors-container-export {
		&.left {
			order: -1;

			.colors-true-container {
				position: absolute;
				right: 10px;
			}
		}

		position: relative;
		margin-left: 10px;

		.colors-true-container {
			position: absolute;
			top: 0px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.grid-size-export {
				margin-top: 8px;
				font-size: 12px;
				font-weight: bold;
				color: var(--grid-count-font-color);
				white-space: nowrap;
			}
		}
	}
}

.inexistant {
	display: none;
	visibility: hidden;
	position: fixed;
	left: -100000px;
	right: -100000px;
}

.hidden {
	visibility: hidden;
	opacity: 0;
}
</style>
