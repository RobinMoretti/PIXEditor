<template>
	<div class="grids-container">
		<div class="grid">
			<div 
				class="cells-row"
				v-for="y in grid.height"
				:key="'cells-row-' + y">
				<div 
					class="cell"
					v-for="x in grid.width"
					:key="'cell-' + x"
					:class="{'checked': cells[((y-1) * grid.width) + (x-1)].checked}">
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface cell{
	checked: boolean,
	x: number,
	y: number,
}

@Component({
})
export default class GridsContainer extends Vue {
	public grid = {
		width: 5,
		height: 5
	};

	public cells: Array<cell> = [];
	mounted(){
		for (let y = 0; y < this.grid.height; y++) {
			for (let x = 0; x < this.grid.width; x++) {
				this.cells.push({
					checked: Math.random() < 0.5 ? true : false,
					x: x,
					y: y
				})
			}
		}
	}
}
</script>


<style scoped lang="scss">
	.grids-container{
		width: 100%; height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.cells-row{
			display: flex;
			flex-direction: row;
			justify-content: start;
		}

		.cell{
			margin-left: -1px; margin-bottom: -1px;
			width: 30px; height: 30px;
			border: 1px solid black;
			box-sizing: border-box;
			background: white;
		}

		.cell.checked{
			background: black;
		}
	}
</style>

