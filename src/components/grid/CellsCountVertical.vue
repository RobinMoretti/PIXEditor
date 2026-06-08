<template>
<div class="cells-count-vertical" :class="{ bottom: verticalPosition }">
<div
class="cells-count-column"
v-for="(column, key) in verticalCellsCount"
:key="'cells-count-column-' + key">
<div
class="cells-count-column-item"
v-for="(count, countKey) in getColumnItems(column)"
:key="'cells-vertical-count-' + countKey"
:class="getClassCount(count)">
{{ count.number }}
</div>
</div>
</div>
</template>

<script>
import { useGridStore } from '@/store/grid'

export default {
setup() {
return {
gridModule: useGridStore(),
}
},
computed: {
verticalCellsCount() {
return this.gridModule.verticalCellsCount
},
verticalPosition() {
return this.gridModule.settings.grid.counts.verticalPosition === 'bottom'
},
},
	methods: {
		getColumnItems(column) {
			return this.verticalPosition ? [...column.items].reverse() : column.items;
		},
		getClassCount(countItem) {
let className = 'count-font-0'
if (countItem.color) {
className = `count-font-${this.getColorIndex(countItem.color)}`
}
return { [className]: true }
},
getColorIndex(cellColor) {
for (let i = 0; i < this.gridModule.cellsColors.length; i++) {
if (this.gridModule.cellsColors[i] === cellColor) return i
}
return 0
},
},
}
</script>

<style scoped lang="scss">
.cells-count-vertical{
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: stretch;
box-sizing: border-box;
margin-bottom: 10px;

&.bottom{
margin-top: 10px;
.cells-count-column{
flex-direction: column-reverse;
}
}

.cells-count-column{
box-sizing: border-box;
width: 30px;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: stretch;

.cells-count-column-item{
height: 30px;
display: flex;
flex-direction: column;
justify-content: center;
font-size:  25px;
font-weight: 600;
}
}
}
</style>
