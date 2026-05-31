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
@click="clickInputFile($event)">&#8615;</div>
<div 
class="delete-downloaded-img-buton"
v-if="isSelected && !forPrint && color.img"
@click="deleteUploadedImg($event)">&#8999;</div>

<input type="file" id="input" ref="fileInput" class="file-input" @change="uploadImageFile($event)">
</div>
</template>

<script>
import { useGridStore } from '@/store/grid'
import { hexToRgbA, rgbToHex } from '@/helper/color'
import { getBase64 } from '@/helper/exports'

export default {
props: {
color: Object,
colorIndex: Number,
forPrint: Boolean,
},
setup() {
return {
gridModule: useGridStore(),
}
},
mounted() {
this.updateInputColorValue()
},
computed: {
canDelete() {
if (this.gridModule.cellsColors.length > 1) {
const filteredCells = this.gridModule.cells.filter(
(cell) => this.gridModule.cellsColors[cell] === this.color
)
if (filteredCells.length > 0) return false
return true
}
return false
},
isSelected() {
return this.color === this.gridModule.cellsColors[this.gridModule.selectedColorIndex]
},
getCssColor() {
if (this.color.img) {
return { 'background-color': 'transparent !important' }
}
return {
'background-color': `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`,
}
},
getCountFontCss() {
const className = `count-font-${this.colorIndex}`
return { [className]: true }
},
},
methods: {
updateEditorColor(event) {
const selectedColor = hexToRgbA(event.target.value)
this.gridModule.updateColor({ newColor: selectedColor, colorIndex: this.colorIndex })
this.updateInputColorValue()
},
clickedButton() {
if (this.isSelected) {
this.$refs.colorPicker.click()
} else {
this.gridModule.selectColor(this.color)
}
},
deleteColor(event) {
event.stopPropagation()
this.gridModule.deleteColor(this.colorIndex)
},
updateInputColorValue() {
this.$refs.colorPicker.value = rgbToHex(this.color)
},
uploadImageFile(event) {
const files = event.target.files
if (files && files[0]) {
getBase64(files[0]).then((result) => {
if (typeof result === 'string') {
this.gridModule.updateColorImg({ imgValue: result, colorIndex: this.colorIndex })
}
})
}
},
clickInputFile(event) {
event.preventDefault()
event.stopPropagation()
if (this.$refs.fileInput) {
this.$refs.fileInput.click()
}
},
deleteUploadedImg(event) {
event.preventDefault()
event.stopPropagation()
this.gridModule.updateColorImg({ colorIndex: this.colorIndex })
},
},
}
</script>

<style scoped lang="scss">
.color-container{
padding: 0;
display: flex;
justify-content: space-between;
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
cursor: pointer;
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
border: 2px solid rgba(33, 33, 33, 1);
border-right: 0px solid rgba(33, 33, 33, 1);
}
.color-button{
border: 2px solid rgba(33, 33, 33, 1);
}
}

.for-print{
.color-index{
border: 2px solid rgba(33, 33, 33, 1) !important;
border-right: 0px solid rgba(33, 33, 33, 1) !important;
}
.color-button{
border: 2px solid rgba(33, 33, 33, 1) !important;
}
}

#input{
position: fixed;
left: -100000px; top: -100000px;
}

.color-wrapper{
position: relative;
margin-bottom: 10px;

.download-buton, .delete-downloaded-img-buton{
width: 15px; height: 15px;
border-radius: 100%;
font-weight: 700;
font-size: 15px;
position: absolute;
right: -5px; bottom: -5px;
background: thistle;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
}

.delete-downloaded-img-buton{
background: thistle;
font-size: 18px;
font-weight: bold;
}
}

@keyframes blink_slowly { 
	0% { 
		border: 2px solid rgba(33, 33, 33, 1);
	} 
	50% { 				
		border: 2px solid rgba(33, 33, 33, 0.5);
	}  
	100% { 
		border: 2px solid rgba(33, 33, 33, 1);
	} 
}
</style>
