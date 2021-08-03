<template>
	<div id="app" class="app-container" @mousedown="toggleSystemClick" @mouseup="toggleSystemClick">
		<background/>
		<editor-nav/>
		<router-view/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EditorNav from '@/components/header/EditorNav.vue';
import Background from '@/components/UI/Background.vue';

import systemModule from '@/store/modules/system';

@Component({
	components: {
		EditorNav,
		Background,
	},
})
export default class App extends Vue {
	systemModule = systemModule;

	public toggleSystemClick(): void {
		this.systemModule.toggleClicked();
	}

	get getClickState(): boolean {
		return this.systemModule.mouse.clicked;
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
