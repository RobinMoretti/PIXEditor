<template>
	<div class="colors-editor-container">

		<div class="gid-colors-container">
			<simple-color-component
				:color="backgroundGridColor"
				no-margin-top></simple-color-component>
			<simple-color-component
				:color="borderGridColor"></simple-color-component>
		</div>

		<color-component
			v-for="(color, key) in cellsColor"
			:key="`color-${key}`"
			:color="color"
			:color-index="key"></color-component>

		<empty-color-selector/>

		<div
			class="button"
			@click="addNewColor"
			v-if="cellsColor.length < 4">+</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';
import { color } from '@/store/modules/grid-types';
import colorComponent from './ColorPicker.vue';
import simpleColorComponent from './SimpleColorPicker.vue';
import emptyColorSelector from './EmptyColorSelector.vue';

@Component({
	components: {
		colorComponent,
		simpleColorComponent,
		emptyColorSelector,
	},
})
export default class ColorsEditor extends Vue {
	gridModule = gridModule;

	get cellsColor(): Array<color> {
		return this.gridModule.cellsColors;
	}

	get backgroundGridColor(): color {
		return this.gridModule.backgroudColor;
	}

	get borderGridColor(): color {
		return this.gridModule.borderColor;
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
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		flex-direction: column;
	}

	.button{
		font-size: 30px;
		font-weight: 500;
		margin-top: 10px;
		cursor: pointer;
	}

	.gid-colors-container{
		padding: 5px;
		margin-bottom: 10px;
		border: 2px solid rgba(12, 12, 12);
		width: 50px;
	}
</style>
