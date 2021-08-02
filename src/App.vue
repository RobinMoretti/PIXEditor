<template>
  <div id="app" class="app-container">
    <EditorNav/>
		<router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EditorNav from '@/components/header/EditorNav.vue';

@Component({
	components: {
		EditorNav,
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
