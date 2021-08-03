<template>
  <div id="app" class="app-container">
    <background/>
    <editor-nav/>
	<router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EditorNav from '@/components/header/EditorNav.vue';
import Background from '@/components/UI/Background.vue';

@Component({
	components: {
		EditorNav,
		Background,
	},
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import "./assets/sass/app.scss";

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}
</style>
