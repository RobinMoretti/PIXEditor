<template>
	<div
		id="app"
		class="app-container"
		@mousedown="toggleSystemClick"
		@mouseup="toggleSystemClick"
		@keydown="displayKey($event)"
		:style="cssVars">
		<background/>
		<editor-nav/>
		<router-view/>

		<modal on-title="DISPLAY_ABOUT">
			<h1>Pix Editor</h1>
			<p>
				Picross is a web printable <a href="https://en.wikipedia.org/wiki/Nonogram" target="_blank">picross</a> (minimalist) editor/creator. <br>
				<br>
				Compatible with Firefox and Chrome on desktop.
				<br>
				<br>

				<ul>
					<li>Create and draw your grid (max 4 colors)</li>
					<li>Print it</li>
					<li>Share it</li>
				</ul>
				<br>
				<b>Shortcuts</b> 
				<ul>
					<li>1~4 colors</li>
					<li>shift (pressed) to erase</li>
				</ul>
				<br>
				Made by Robin Moretti with ❤️
				<br>
				{{appVersion}} - <a href="https://github.com/RobinMoretti/PIXEditor" target="_blank">source code</a>
			</p>
		</modal>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { map } from '@/helper/mathHelper';
import EditorNav from '@/components/header/EditorNav.vue';
import Background from '@/components/UI/Background.vue';
import Modal from '@/components/UI/Modal.vue'; 

import systemModule from '@/store/modules/system';
import gridModule from '@/store/modules/grid';
import {version} from '@/../package.json';

@Component({
	components: {
		EditorNav,
		Background,
		Modal,
	},
})

export default class App extends Vue {
	systemModule = systemModule;
	gridModule = gridModule;
	appVersion = version;

	get mouse(): { clicked: boolean } {
		return this.gridModule.cellsInteraction;
	}

	mounted(): void {      
		window.addEventListener('keydown', (event: KeyboardEvent)=>{
			this.keyIsPressed(event.key);
		});
		window.addEventListener('keyup', (event: KeyboardEvent)=>{
			this.keyIsUp(event.key);
		});
	}

	public keyIsPressed(key: string): void{
		if(key === '1' || key === '2' || key === '3' || key === '4'){
			this.gridModule.selectColor(this.gridModule.cellsColors[parseInt(key) - 1]);
		}
		else if(key === 'Shift'){
			this.gridModule.tempSelectEmptyColor();
		}
	}

	public keyIsUp(key: string): void{ 
		if(key === 'Shift'){
			this.gridModule.tempReleaseEmptyColor();
		}
	}

	public toggleSystemClick(): void {
		this.systemModule.toggleClicked();
	}

	public disableOtherClick(): void {
		this.systemModule.disableOtherClick();
	}

	get getClickState(): boolean {
		return this.systemModule.mouse.clicked;
	}

	get backgroundColor(): string {
		let color = `rgb(${this.gridModule.backgroudColor.r}`;
		color += `,${this.gridModule.backgroudColor.g}`;
		color += `,${this.gridModule.backgroudColor.b}`;
		return color;
	}

	get borderColor(): string {
		let color = `rgba(${this.gridModule.borderColor.r}`;
		color += `,${this.gridModule.borderColor.g}`;
		color += `,${this.gridModule.borderColor.b}`;
		return color;
	}

	get cssVars(): Record<string, unknown> {
		const marginBottom = this.gridModule.settings.grid.border.width + 5;
		return {
			'--grid-border-width': `${this.gridModule.settings.grid.border.width}px`,
			'--grid-cells-count-margin': `${marginBottom}px`,
			'--grid-template-columns': this.gridModule.getCssGridColumns,
			'--grid-template-rows': this.gridModule.getCssGridRows,
			'--grid-border-color': this.backgroundColor,
			'--grid-background-color': this.borderColor,
			'--grid-count-font-weigth': String(map(0, 13, 400, 1000, this.gridModule.settings.grid.border.width)),
			'--system-zoom': this.systemModule.zoom,
			
		};
	}
}
</script>

<style lang="scss">
@import "./assets/sass/app.scss";

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	width: 100%; height: 100%;
}
</style>
