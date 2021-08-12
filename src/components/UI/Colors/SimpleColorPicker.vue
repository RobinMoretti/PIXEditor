<template>
	<div class="color-container">
		<div 
			class="color-button"
			:class="{ 'no-margin-top': noMarginTop}"
			for="color-input" 
			@click="clickedButton"
			:style="getCssColor">	
		</div>
		<input 
			type="color" 
			name="color-input" 
			ref="colorPicker" 
			class="color-input"
			@change="updateEditorColor($event)">
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';
import { hexToRgbA, rgbToHex } from '@/helper/color';
import { color } from '@/store/modules/grid-types';

const ColorProps = Vue.extend({
	props: {
		color: Object,
		colorIndex: Number,
		noMarginTop: Boolean,
	}
})

@Component
export default class Color extends ColorProps {
	gridModule = gridModule;

	$refs!: {
		colorPicker: HTMLInputElement
	}

	mounted():void{
		this.updateInputColorValue();
	}

	updateEditorColor(event: Event): void{
		let selectedColor = hexToRgbA((<HTMLInputElement>event.target).value);

		this.gridModule.updateBasicColor({
			newColor: selectedColor, 
			colorObj: this.color,
		});
		
		this.updateInputColorValue();
	}

	clickedButton(): void{
		this.$refs.colorPicker.click();
	}

	deleteColor(event: Event): void{
		event.stopPropagation();
		this.gridModule.deleteColor(this.colorIndex);
	}

	get canDelete(): boolean{
		if(this.gridModule.cellsColors.length > 1){
			return true;
		}

		return false;
	}

	get isSelected(): boolean{
		if(this.color == this.gridModule.cellsColors[this.gridModule.selectedColorIndex]){
			return true;
		}
		else{
			return false;
		}
	}

	get getCssColor(): object {
		let cssColor = {
			'background-color': `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`
		};

		return cssColor;
	}

	updateInputColorValue(): void{
		this.$refs.colorPicker.value = rgbToHex(this.color);
	}

}
</script>

<style scoped lang="scss">
	.color-input{
		position: fixed;
		right: 2000vw;
	}

	.color-button{
		display: inline-block;
		width: 35px; height: 35px;
		border-radius: 100%;
		cursor: pointer;
		margin-top: 10px;
		border: 2px solid rgba(12, 12, 12, 0.137);
		position: relative;
		
		.delete-buton{
			width: 15px; height: 15px;
			border-radius: 100%;
			background: blanchedalmond;
			font-weight: 700;
			font-size: 15px;
			position: absolute;
			left: -5px; top: -5px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.color-button:hover{
		display: inline-block;
		width: 35px; height: 35px;
		border-radius: 100%;
		cursor: pointer;
  		animation: 1s infinite blink_slowly;
	}

	.selected{
		border: 2px solid rgb(12, 12, 12, 1);
	}

	.no-margin-top{
		margin-top: 2px;
	}


	@keyframes blink_slowly { 
		0% { 
			border: 2px solid rgba(12, 12, 12, 1);
		} 
		50% { 				
			border: 2px solid rgb(12, 12, 12, 0.5);
		}  
		100% { 
			border: 2px solid rgb(12, 12, 12, 1);
		} 
	}

</style>
