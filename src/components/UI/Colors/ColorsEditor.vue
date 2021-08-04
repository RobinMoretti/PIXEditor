<template>
	<div class="colors-editor-container">
		<color-component
			v-for="(color, key) in cellsColor"
			:key="`color-${key}`"
			:color="color"
			:color-index="key"></color-component>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import colorComponent from './Color.vue';
import gridModule from '@/store/modules/grid';
import { color } from '@/store/modules/grid-types';

@Component({
	components: {
		colorComponent,
	}
})
export default class ColorsEditor extends Vue {
	gridModule = gridModule;

	get cellsColor(): Array<color>{
		return this.gridModule.cellsColors;
	}
}
</script>

<style scoped lang="scss">
	.colors-editor-container{
		position: fixed;
		right: 0;
		top: 0;
		margin-right: 15px;
	}
</style>
