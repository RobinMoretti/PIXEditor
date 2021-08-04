<template>
	<div class="colors-editor-container">
		<color-component
			v-for="(color, key) in cellsColor"
			:key="`color-${key}`"
			:color="color"
			:color-index="key"></color-component>

		<div 
			class="button"
			@click="addNewColor">+</div>
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

	addNewColor(): void{
		this.gridModule.addColor();
	}
}
</script>

<style scoped lang="scss">
	.colors-editor-container{
		position: fixed;
		right: 15px;
		top: 15px;
	}

	.button{
		font-size: 30px;
		font-weight: 500;
		margin-top: 10px;
		cursor: pointer;
	}
</style>
