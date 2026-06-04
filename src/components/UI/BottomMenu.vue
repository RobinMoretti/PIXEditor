<template>
	<div class="bottom-nav-container" @mousedown.stop @mouseup.stop @keydown.stop>
		<div @click="displayAbout" class="about-button">?</div>
		<div class="title-container">
			<input type="text" v-model="gridTitle" @change="updateTitleGrid" />
		</div>

		<div class="grid-sizing">
			<input type="number" v-model="gridWidth" @change="updateGridWidth" />
			<p class="division">/</p>
			<input type="number" v-model="gridHeight" @change="updateGridHeight" />
		</div>

		<div class="export-container">
			<p class="export-title">EXPORT:</p>
			<p @click="exportGame" class="button export-button">GAME</p>
			<p @click="exportSolution" class="button export-button">SOLUTION</p>
			<p @click="exportData" class="button export-button">DATA</p>
			<p @click="exportPsd" class="button export-button">PSD</p>
		</div>

		<div class="import-container">
			<p class="export-title">IMPORT:</p>
			<input
				type="file"
				id="input"
				ref="fileInput"
				class="file-input"
				@change="uploadJsonFile($event)"
			/>
			<p @click="clickInputData" class="button export-button">DATA</p>
			<input
				type="file"
				id="imageInput"
				ref="imageInput"
				class="file-input"
				accept="image/jpeg,image/png"
				@change="uploadImageFile($event)"
			/>
			<p @click="clickInputImage" class="button export-button">IMAGE</p>
		</div>
		<div class="grid-container">
			<p class="grid-title">GRID:</p>

			<p
				@click="displayEmptyButton"
				class="button export-button"
				v-if="!emptyButtonIsVisible"
			>
				EMPTY
			</p>
			<p @click="emptyGrid" class="button export-button" v-else>REALLY ?</p>

			<p
				@click="displayClearButton"
				class="button export-button"
				v-if="!clearButtonIsVisible"
			>
				RESET
			</p>
			<p @click="clearDatas" class="button export-button" v-else>REALLY ?</p>
		</div>
	</div>
</template>

<script>
import { useGridStore } from "@/store/grid";
import { downloadJsonFile, exportPsd } from "@/helper/exports";
import { emitter } from "@/eventBus";
import json from "@/assets/pix-grid/pix-editor.json";

function colorDistance(a, b) {
	return (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2;
}

function isWhitePixel(pixel, threshold = 245) {
	return pixel.r >= threshold && pixel.g >= threshold && pixel.b >= threshold;
}

export default {
	setup() {
		return {
			gridModule: useGridStore(),
		};
	},
	data() {
		return {
			gridWidth: 0,
			gridHeight: 0,
			gridTitle: "",
			clearButtonIsVisible: false,
			emptyButtonIsVisible: false,
		};
	},
	mounted() {
		if (localStorage.getItem("grid")) {
			this.gridModule.loadGridFromLocalStorage();
		} else if (this.gridModule.firstInitied === false) {
			this.importData(json);
			this.gridModule.init();
		}
		this.updateBottomMenuDatas();
	},
	methods: {
		updateBottomMenuDatas() {
			this.gridWidth = this.gridModule.settings.grid.width;
			this.gridHeight = this.gridModule.settings.grid.height;
			this.gridTitle = this.gridModule.settings.grid.title;
		},
		updateGridWidth() {
			this.gridModule.updateGridWidth(this.gridWidth);
		},
		updateGridHeight() {
			this.gridModule.updateGridHeight(this.gridHeight);
		},
		updateTitleGrid() {
			this.gridModule.updateGridTitle(this.gridTitle);
		},
		exportGame() {
			emitter.emit("EXPORT_GAME");
		},
		exportSolution() {
			emitter.emit("EXPORT_SOLUTION");
		},
		displayAbout() {
			emitter.emit("DISPLAY_ABOUT");
		},
		exportData() {
			const toExport = this.gridModule.getFullDatas;
			let fileName = toExport.settings.grid.title;

			if (fileName.length === 0) fileName = "no-title";

			fileName = fileName.toLowerCase().replace(/\s/g, "-");
			fileName += ".json";

			downloadJsonFile(toExport, fileName);
		},
		exportPsd() {
			exportPsd({
				cells: this.gridModule.cells,
				cellsColors: this.gridModule.cellsColors,
				settings: this.gridModule.settings,
				backgroudColor: this.gridModule.backgroudColor,
			});
		},
		clickInputData() {
			if (this.$refs.fileInput) {
				this.$refs.fileInput.click();
			}
		},
		clickInputImage() {
			if (this.$refs.imageInput) {
				this.$refs.imageInput.click();
			}
		},
		uploadImageFile(event) {
			const files = event.target.files;
			if (!files || !files[0]) return;

			const file = files[0];
			if (!file.type.startsWith("image/")) {
				alert("Please select a JPG or PNG image!");
				return;
			}

			const reader = new FileReader();
			reader.onload = (e) => {
				const img = new Image();
				img.onload = () => {
					const width = this.gridModule.settings.grid.width;
					const height = this.gridModule.settings.grid.height;

					if (!width || !height) {
						alert("Please define a valid grid size before importing an image.");
						return;
					}

					const canvas = document.createElement("canvas");
					canvas.width = width;
					canvas.height = height;
					const ctx = canvas.getContext("2d");
					ctx.drawImage(img, 0, 0, width, height);

					const imageData = ctx.getImageData(0, 0, width, height);
					const pixels = [];
					for (let i = 0; i < imageData.data.length; i += 4) {
						pixels.push({
							r: imageData.data[i],
							g: imageData.data[i + 1],
							b: imageData.data[i + 2],
							a: imageData.data[i + 3],
						});
					}

					const palette = this.quantizeColors(pixels, 5);
					const cells = pixels.map((pixel) => {
						if (pixel.a < 128 || isWhitePixel(pixel)) return -1;
						return this.nearestColorIndex(pixel, palette);
					});

					this.importData({
						settings: {
							grid: {
								title: file.name.replace(/\.[^/.]+$/, ""),
								width,
								height,
								border: this.gridModule.settings.grid.border,
								counts: this.gridModule.settings.grid.counts,
							},
						},
						cells,
						cellsColors: palette,
						backgroudColor: this.gridModule.backgroudColor,
						borderColor: this.gridModule.borderColor,
					});
				};
				img.src = e.target.result;
			};
			reader.readAsDataURL(file);
			event.target.value = "";
		},
		quantizeColors(pixels, k) {
			const opaque = pixels.filter((p) => p.a >= 128 && !isWhitePixel(p));
			if (opaque.length === 0) return [{ r: 0, g: 0, b: 0 }];

			// Detect unique colors in the image
			const uniqueColors = new Map();
			for (const p of opaque) {
				const key = `${p.r},${p.g},${p.b}`;
				if (!uniqueColors.has(key)) {
					uniqueColors.set(key, p);
				}
			}

			// If there are fewer unique colors than k, use the actual number
			if (uniqueColors.size < k) {
				return Array.from(uniqueColors.values()).map(({ r, g, b }) => ({ r, g, b }));
			}

			// k-means++ initialisation
			const centroids = [{ ...opaque[Math.floor(Math.random() * opaque.length)] }];
			while (centroids.length < k) {
				const dists = opaque.map((p) =>
					Math.min(...centroids.map((c) => colorDistance(p, c))),
				);
				const total = dists.reduce((a, b) => a + b, 0);
				let r = Math.random() * total;
				let chosen = opaque[opaque.length - 1];
				for (let i = 0; i < opaque.length; i++) {
					r -= dists[i];
					if (r <= 0) {
						chosen = opaque[i];
						break;
					}
				}
				centroids.push({ ...chosen });
			}

			// k-means iterations
			for (let iter = 0; iter < 20; iter++) {
				const clusters = Array.from({ length: k }, () => []);
				for (const p of opaque) {
					let minD = Infinity,
						minI = 0;
					centroids.forEach((c, i) => {
						const d = colorDistance(p, c);
						if (d < minD) {
							minD = d;
							minI = i;
						}
					});
					clusters[minI].push(p);
				}
				let changed = false;
				for (let i = 0; i < k; i++) {
					if (!clusters[i].length) continue;
					const nr = Math.round(
						clusters[i].reduce((s, p) => s + p.r, 0) / clusters[i].length,
					);
					const ng = Math.round(
						clusters[i].reduce((s, p) => s + p.g, 0) / clusters[i].length,
					);
					const nb = Math.round(
						clusters[i].reduce((s, p) => s + p.b, 0) / clusters[i].length,
					);
					if (nr !== centroids[i].r || ng !== centroids[i].g || nb !== centroids[i].b) {
						centroids[i] = { r: nr, g: ng, b: nb };
						changed = true;
					}
				}
				if (!changed) break;
			}

			// Merge very similar colors (threshold of 30)
			const result = [];
			const threshold = 30 * 30; // squared distance
			for (const c of centroids) {
				let merged = false;
				for (const r of result) {
					if (colorDistance(c, r) < threshold) {
						merged = true;
						break;
					}
				}
				if (!merged) {
					result.push({ r: c.r, g: c.g, b: c.b });
				}
			}

			return result;
		},
		nearestColorIndex(pixel, palette) {
			let minDist = Infinity,
				minIdx = 0;
			palette.forEach((c, i) => {
				const d = colorDistance(pixel, c);
				if (d < minDist) {
					minDist = d;
					minIdx = i;
				}
			});
			return minIdx;
		},
		uploadJsonFile(event) {
			const files = event.target.files;
			if (files && files[0]) {
				const file = files[0];

				if (file.type !== "application/json") {
					alert("Please select JSON files only!");
					return;
				}

				const reader = new FileReader();
				reader.onload = () => {
					if (typeof reader.result === "string") {
						this.importData(JSON.parse(reader.result));
					}
				};
				reader.readAsText(file);
			}
		},
		importData(data) {
			this.gridModule.importDatas(data);
			this.updateBottomMenuDatas();
		},
		displayClearButton() {
			this.clearButtonIsVisible = true;
			setTimeout(() => {
				this.clearButtonIsVisible = false;
			}, 3000);
		},
		clearDatas() {
			this.gridModule.clear();
			location.reload();
		},
		displayEmptyButton() {
			this.emptyButtonIsVisible = true;
			setTimeout(() => {
				this.emptyButtonIsVisible = false;
			}, 3000);
		},
		emptyGrid() {
			this.gridModule.empty();
		},
	},
};
</script>

<style scoped lang="scss">
.bottom-nav-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 40px;
	background-color: rgb(255, 255, 255);
	width: 100%;
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: baseline;
}

.grid-sizing {
	display: flex;
	justify-content: flex-start;
	align-items: baseline;
	.division {
		font-weight: 600;
		font-size: 20px;
		margin: 0 5px;
	}
}

.title-container {
	input {
		min-width: 100px;
	}
	margin-right: 15px;
}

.export-container,
.import-container,
.grid-container {
	display: flex;
	justify-content: flex-start;
	align-items: baseline;
	flex-direction: row;
	margin-left: 30px;

	.export-button {
		margin-left: 10px;
		cursor: pointer;
		border-bottom: rgba(19, 19, 19, 0.335) 4px solid;
		padding-bottom: 2px;
	}
	.export-button:hover {
		margin-left: 10px;
		cursor: pointer;
		border-bottom: rgba(19, 19, 19, 0.644) 4px solid;
		padding-bottom: 2px;
	}
}

input[type="number"],
input[type="text"] {
	border: 0;
	border-bottom: rgba(19, 19, 19, 0.335) 4px solid;
	background-color: unset;
	outline: none;
	font-size: 15px;
	width: 25px;
	padding-bottom: 1px;
	text-align: center;
}

input[type="number"]:focus,
input[type="text"]:focus {
	border-bottom: rgba(19, 19, 19, 0.644) 4px solid;
}

input[type="number"] {
	-moz-appearance: textfield;
	appearance: textfield;
	margin: 0;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

.file-input {
	position: fixed;
	right: -10000px;
	top: -10000px;
}

.about-button {
	background: rgb(211, 192, 158);
	border-radius: 100%;
	width: 25px;
	height: 25px;
	display: inline-block;
	cursor: pointer;
	color: white;
	font-weight: 900;

	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 15px;
}
</style>
