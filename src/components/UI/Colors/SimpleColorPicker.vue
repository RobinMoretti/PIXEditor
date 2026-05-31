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

<script>
import { useGridStore } from '@/store/grid'
import { hexToRgbA, rgbToHex } from '@/helper/color'

export default {
props: {
color: Object,
colorIndex: Number,
noMarginTop: Boolean,
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
getCssColor() {
return {
'background-color': `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`,
}
},
},
methods: {
updateEditorColor(event) {
const selectedColor = hexToRgbA(event.target.value)
this.gridModule.updateBasicColor({ newColor: selectedColor, colorObj: this.color })
this.updateInputColorValue()
},
clickedButton() {
this.$refs.colorPicker.click()
},
updateInputColorValue() {
this.$refs.colorPicker.value = rgbToHex(this.color)
},
},
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
		border: 2px solid rgba(12, 12, 12, 0.5);
	}  
	100% { 
		border: 2px solid rgba(12, 12, 12, 1);
	} 
}
</style>
