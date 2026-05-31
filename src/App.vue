<template>
	<div
		id="app"
		class="app-container"
		@mousedown="toggleSystemClick"
		@mouseup="toggleSystemClick"
		:style="cssVars"
	>
		<background />
		<editor-nav />
		<router-view />

		<modal on-title="DISPLAY_ABOUT">
			<h1>Pix Editor</h1>
			<div>
				<p>
					A minimalist web editor to create and print
					<a href="https://en.wikipedia.org/wiki/Nonogram" target="_blank">nonogram</a>
					(picross) puzzles — right in your browser.
				</p>
				<p>Works on Firefox and Chrome (desktop).</p>
				<p><b>Features</b></p>
				<ul>
					<li>Draw on a customizable grid (up to 4 colors)</li>
					<li>Adjust grid size and borders</li>
					<li>Print a clean puzzle sheet</li>
					<li>Share via URL</li>
				</ul>
				<p><b>Keyboard shortcuts</b></p>
				<ul>
					<li><kbd>1</kbd> – <kbd>4</kbd> &nbsp;select color</li>
					<li><kbd>Shift</kbd> &nbsp;erase (hold)</li>
				</ul>
				<p>
					Made by Robin Moretti &mdash;
					<a href="https://github.com/RobinMoretti/PIXEditor" target="_blank">source code</a>
					<br />
					<small>v{{ appVersion }}</small>
				</p>
			</div>
		</modal>
	</div>
</template>

<script>
import { map } from "@/helper/mathHelper";
import EditorNav from "@/components/header/EditorNav.vue";
import Background from "@/components/UI/Background.vue";
import Modal from "@/components/UI/Modal.vue";
import { useSystemStore } from "@/store/system";
import { useGridStore } from "@/store/grid";
import { version } from "../package.json";

export default {
	components: {
		EditorNav,
		Background,
		Modal,
	},
	setup() {
		return {
			systemModule: useSystemStore(),
			gridModule: useGridStore(),
		};
	},
	data() {
		return {
			appVersion: version,
		};
	},
	computed: {
		mouse() {
			return this.gridModule.cellsInteraction;
		},
		backgroundColor() {
			let color = `rgb(${this.gridModule.backgroudColor.r}`;
			color += `,${this.gridModule.backgroudColor.g}`;
			color += `,${this.gridModule.backgroudColor.b}`;
			return color;
		},
		borderColor() {
			let color = `rgba(${this.gridModule.borderColor.r}`;
			color += `,${this.gridModule.borderColor.g}`;
			color += `,${this.gridModule.borderColor.b}`;
			return color;
		},
		cssVars() {
			const marginBottom = this.gridModule.settings.grid.border.width + 5;
			return {
				"--grid-border-width": `${this.gridModule.settings.grid.border.width}px`,
				"--grid-cells-count-margin": `${marginBottom}px`,
				"--grid-template-columns": this.gridModule.getCssGridColumns,
				"--grid-template-rows": this.gridModule.getCssGridRows,
				"--grid-border-color": this.backgroundColor,
				"--grid-background-color": this.borderColor,
				"--grid-count-font-weigth": String(
					map(0, 13, 400, 1000, this.gridModule.settings.grid.border.width),
				),
				"--system-zoom": this.systemModule.zoom,
			};
		},
	},
	mounted() {
		window.addEventListener("keydown", (event) => {
			this.keyIsPressed(event.key);
		});
		window.addEventListener("keyup", (event) => {
			this.keyIsUp(event.key);
		});
	},
	methods: {
		keyIsPressed(key) {
			if (key === "1" || key === "2" || key === "3" || key === "4") {
				this.gridModule.selectColor(this.gridModule.cellsColors[parseInt(key) - 1]);
			} else if (key === "Shift") {
				this.gridModule.tempSelectEmptyColor();
			}
		},
		keyIsUp(key) {
			if (key === "Shift") {
				this.gridModule.tempReleaseEmptyColor();
			}
		},
		toggleSystemClick() {
			this.systemModule.toggleClicked();
		},
		disableOtherClick() {
			this.systemModule.disableOtherClick();
		},
	},
};
</script>

<style lang="scss">
@use "./assets/sass/app.scss";

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	width: 100%;
	height: 100%;
}
</style>
