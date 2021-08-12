<template>
	<div class="color-wrapper">
		<div 
			class="color-container"
			:class="{ selected: isSelected, 'for-print': forPrint }"
			@click="clickedButton">
			<div class="color-index" :class="getCountFontCss" >
				{{ colorIndex + 1 }}
			</div>

			<div 
				class="color-button"
				for="color-input" 
				:style="getCssColor">
				<img :src="color.img" class="img-cell" v-if="color && color.img">
				<div 
					class="delete-buton"
					v-if="isSelected && canDelete && !forPrint"
					@click="deleteColor($event)">-</div>	


			</div>
			<input 
				type="color" 
				name="color-input" 
				ref="colorPicker" 
				class="color-input"
				@change="updateEditorColor($event)">
		</div>

		<div 
			class="download-buton"
			v-if="isSelected && !forPrint && !color.img"
			@click="clickInputFile($event)">↧</div>	
		<div 
			class="delete-downloaded-img-buton"
			v-if="isSelected && !forPrint && color.img"
			@click="deleteUploadedImg($event)">⌇</div>	

		<input type="file" id="input" ref="fileInput" class="file-input" @change="uploadImageFile($event)">
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';
import { hexToRgbA, rgbToHex } from '@/helper/color';
import { color, stringIndexedArray } from '@/store/modules/grid-types';
import { downloadJsonFile, getBase64 } from '@/helper/exports';

const ColorProps = Vue.extend({
	props: {
		color: Object,
		colorIndex: Number,
		forPrint: Boolean,
	}
})

@Component
export default class Color extends ColorProps {
	gridModule = gridModule;

	$refs!: {
		colorPicker: HTMLInputElement,
		fileInput: HTMLInputElement,
	}

	mounted():void{
		this.updateInputColorValue();
	}

	updateEditorColor(event: Event): void{
		let selectedColor = hexToRgbA((<HTMLInputElement>event.target).value)
		
		this.gridModule.updateColor({
			newColor: selectedColor, 
			colorIndex: this.colorIndex
		});

		this.updateInputColorValue();
	}

	clickedButton(): void{
		if(this.isSelected){
			this.$refs.colorPicker.click();
		}
		else{
			this.gridModule.selectColor(this.color);
		}
	}

	deleteColor(event: Event): void{
		event.stopPropagation();
		this.gridModule.deleteColor(this.colorIndex);
	}

	get canDelete(): boolean{
		if(this.gridModule.cellsColors.length > 1){
			// check if color have some cells
			let filteredCells = this.gridModule.cells.filter(
				cell => {
					return cell.color == this.color;
				}
			);

			if(filteredCells.length > 0){
				return false;
			}

			return true;
		}

		return false;
	}

	get isSelected(): boolean{
		if(this.color == this.gridModule.selectedColor){
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

		if(this.color.img){
			cssColor = {
				'background-color': `transparent !important`,
			};
		}

		return cssColor;
	}
	get getCountFontCss(): object {
		// linked with css font
		let className = `count-font-${this.colorIndex}`;

		let countFont: stringIndexedArray = {};
		countFont[className] = true;

		return countFont;
	}
	

	updateInputColorValue(): void{
		this.$refs.colorPicker.value = rgbToHex(this.color);
	}

    uploadImageFile(event: Event){
        let files = (<HTMLInputElement>event.target).files;
        if(files && files[0]){
            let file = files[0];
			getBase64(file).then((result) => {
				if(typeof(result) === 'string'){
					this.gridModule.updateColorImg({imgValue: result, colorIndex: this.colorIndex});
				}
			});
        }	
    }

    clickInputFile(event: Event): void{
		event.preventDefault();
		event.stopPropagation();
		
        if(this.$refs.fileInput){
            let htmlFileElem = <HTMLInputElement>this.$refs.fileInput;
            htmlFileElem.click();
        }
    }
    deleteUploadedImg(event: Event): void{
		event.preventDefault();
		event.stopPropagation();
		this.gridModule.updateColorImg({colorIndex: this.colorIndex});
    }

}
</script>

<style scoped lang="scss">

	.color-container{
		padding: 0;
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.color-input{
		position: fixed;
		right: 2000vw;
	}

	.color-index{
		border: 2px solid rgba(33, 33, 33, 0.137);
		border-right: 0px solid rgba(33, 33, 33, 0) !important;
		font-size: 25px;
		width: 35px; height: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.color-button{
		display: inline-block;
		width: 35px; height: 35px;
		// border-radius: 100%;
		cursor: pointer;
		// margin-top: 10px;
		border: 2px solid rgba(33, 33, 33, 0.137);
		position: relative;
		
		.delete-buton{
			width: 15px; height: 15px;
			border-radius: 100%;
			background: blanchedalmond;
			font-weight: 700;
			font-size: 15px;
			position: absolute;
			right: -7px; top: -5px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		position: relative;
		.img-cell{
			position: absolute;
			left: calc((var(--grid-border-width)/2) * (-1)); top: calc((var(--grid-border-width)/2) * (-1));
			width: calc(var(--grid-border-width) + 100%); height: calc(var(--grid-border-width) + 100%);
			object-fit: cover;
			z-index: -1;
		}
	}
	.color-container:hover{
		.color-index{
  			animation: 1s infinite blink_slowly;
		}
		.color-button{
  			animation: 1s infinite blink_slowly;
		}
		cursor: pointer;
	}

	.selected{
		.color-index{
			border: 2px solid rgb(33, 33, 33, 1);
			border-right: 0px solid rgb(33, 33, 33, 1);
		}
		.color-button{
			border: 2px solid rgb(33, 33, 33, 1);
		}
	}

	.for-print{
		.color-index{
			border: 2px solid rgb(33, 33, 33, 1) !important;
			border-right: 0px solid rgb(33, 33, 33, 1) !important;
		}
		.color-button{
			border: 2px solid rgb(33, 33, 33, 1) !important;
		}
	}

	#input{
		position: fixed;
		left: -100000px; top: -100000px;
	}

	.color-wrapper{
		position: relative;
		
		.download-buton, .delete-downloaded-img-buton{
			width: 15px; height: 15px;
			border-radius: 100%;
			font-weight: 700;
			font-size: 15px;
			position: absolute;
			right: -5px; bottom: 5px;
			font-size: 10px;
			background:thistle;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
		}

		.delete-downloaded-img-buton{
			background:thistle;
			font-size: 18px;
			font-weight: bold;
		}
	}

	@keyframes blink_slowly { 
		0% { 
			border: 2px solid rgba(33, 33, 33, 1);
		} 
		50% { 				
			border: 2px solid rgb(33, 33, 33, 0.5);
		}  
		100% { 
			border: 2px solid rgb(33, 33, 33, 1);
		} 
	}

</style>
