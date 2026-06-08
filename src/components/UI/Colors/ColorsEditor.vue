<template>
<div class="colors-editor-container">

<div class="gid-colors-container">
<simple-color-component
:color="backgroundGridColor"
no-margin-top></simple-color-component>
<simple-color-component
:color="borderGridColor"></simple-color-component>
<simple-color-component
:color="markerBorderGridColor"
title="Lignes ×5"></simple-color-component>
<simple-color-component
:color="countsColor"
title="Chiffres"></simple-color-component>
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

<script>
import { useGridStore } from '@/store/grid'
import colorComponent from './ColorPicker.vue'
import simpleColorComponent from './SimpleColorPicker.vue'
import emptyColorSelector from './EmptyColorSelector.vue'

export default {
components: {
colorComponent,
simpleColorComponent,
emptyColorSelector,
},
setup() {
return {
gridModule: useGridStore(),
}
},
computed: {
cellsColor() {
return this.gridModule.cellsColors
},
backgroundGridColor() {
return this.gridModule.backgroudColor
},
borderGridColor() {
return this.gridModule.borderColor
},
markerBorderGridColor() {
return this.gridModule.markerBorderColor
},
countsColor() {
return this.gridModule.countsColor
},
},
methods: {
addNewColor() {
this.gridModule.addColor()
},
},
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
