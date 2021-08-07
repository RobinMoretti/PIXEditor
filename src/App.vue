<template>
	<div
		id="app"
		class="app-container"
		@mousedown="toggleSystemClick"
		@mouseup="toggleSystemClick"
		:style="cssVars">
		<background/>
		<editor-nav/>
		<router-view/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { map } from '@/helper/mathHelper';
import EditorNav from '@/components/header/EditorNav.vue';
import Background from '@/components/UI/Background.vue';

import systemModule from '@/store/modules/system';
import gridModule from '@/store/modules/grid';

@Component({
	components: {
		EditorNav,
		Background,
	},
})

export default class App extends Vue {
	systemModule = systemModule;

	gridModule = gridModule;

	get mouse(){
		return this.gridModule.cellsInteraction
	}
	mounted(): void {
		this.gridModule.init();
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
		let marginBottom = this.gridModule.settings.grid.border.width +5;
		return {
			'--grid-border-width': `${this.gridModule.settings.grid.border.width}px`,
			'--grid-cells-count-margin': `${marginBottom}px`,
			'--grid-template-columns': this.gridModule.getCssGridColumns,
			'--grid-template-rows': this.gridModule.getCssGridRows,
			'--grid-border-color': this.backgroundColor,
			'--grid-background-color': this.borderColor,
			'--grid-count-font-weigth': String(map(0, 13, 400, 1000, this.gridModule.settings.grid.border.width)),
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
