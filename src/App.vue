<template>
	<div id="app" v-on:mousemove="updateMousePosition">
		<router-view/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from './store'

export default defineComponent({
  setup() {
    const store = useStore()
    store.state.canUpdateMou/* sePosit */ion // typed as number
  },
})
</script>


<style lang="scss">

  @import "./assets/sass/app.scss";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    padding: 12px;
  }

</style>
