<template>
	<div class="color-container">
		<div for="color-input" @click="openColorPicker">Color</div>
		<input type="color" name="color-input" ref="colorPicker" @change="updateEditorColor($event)">
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';
import { hexToRgbA } from '@/helper/color';

const ColorProps = Vue.extend({

	props: {
		color: Object,
		colorIndex: Number
	}
})

@Component
export default class Color extends ColorProps {
	gridModule = gridModule;

	$refs!: {
		colorPicker: HTMLInputElement
	}

	updateEditorColor(event: Event): void{
		let selectedColor = hexToRgbA((<HTMLInputElement>event.target).value)
		
		this.gridModule.updateColor({
			newColor: selectedColor, 
			colorIndex: this.colorIndex
		});
	}

	openColorPicker(): void{
		this.$refs.colorPicker.click();
	}

}
</script>

<style scoped lang="scss">
	.color-container{
		position: fixed;
		right: 0;
		top: 0;
	}
</style>
