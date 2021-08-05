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

		<p>mouse {{mouse}}</p>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
		return {
			'--grid-border-width': `${this.gridModule.settings.grid.border.width}px`,
			'--grid-template-columns': this.gridModule.getCssGridColumns,
			'--grid-template-rows': this.gridModule.getCssGridRows,
			'--grid-border-color': this.backgroundColor,
			'--grid-background-color': this.borderColor,
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
