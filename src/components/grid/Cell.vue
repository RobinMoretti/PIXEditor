<template>
    <div
        class="cell"
        :id="`cell-${index-1}`"
        :class="{'checked': cells[index-1] >= 0}"
        :style="cellCss"
        @mouseover="toggleIfPossible(index)"
        @mousedown="mouseDownCell(index-1)"
        @mouseup="mouseUpCell()">
<img :src="colors[cells[index-1]].img" class="img-cell" v-if="colors[cells[index-1]] && colors[cells[index-1]].img">
    </div>
</template>

<script>
import { useGridStore } from '@/store/grid'

export default {
props: {
index: Number,
cell: Number,
},
setup() {
return {
gridModule: useGridStore(),
}
},
computed: {
cells() {
return this.gridModule.cells
},
colors() {
return this.gridModule.cellsColors
},
cellCss() {
if (this.cells[this.index - 1] >= 0 && this.colors[this.cells[this.index - 1]]) {
const color = this.colors[this.cells[this.index - 1]]
if (!color?.img) {
return {
'background-color': `rgb(${color?.r},${color?.g},${color?.b})`,
}
} else {
return { 'background-color': 'unset !important' }
}
}
return {}
},
},
methods: {
mouseDownCell(cellIndex) {
this.gridModule.toggleCellsInteractionClicked()
this.gridModule.toggleCell(cellIndex)
},
toggleIfPossible(index) {
if (this.gridModule.cellsInteraction.clicked) {
this.gridModule.toggleCell(index - 1)
}
},
mouseUpCell() {
this.gridModule.toggleCellsInteractionClicked()
},
},
}
</script>

<style scoped lang="scss">
.cells-container{
*{
-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;
}
.cell{
position: relative;
}

.cell:hover{
border-color: rgba(255, 252, 45, 0.486) !important;
}

.img-cell{
position: absolute;
left: calc((var(--grid-border-width)/2) * (-1)); top: calc((var(--grid-border-width)/2) * (-1));
width: calc(var(--grid-border-width) + 100%); height: calc(var(--grid-border-width) + 100%);
object-fit: cover;
z-index: -1;
}
}
</style>
