<template>
	<div class="grids-container">
		<div class="grid" ref="gridElement" v-if="cells.length">
			<div
				class="cells-row"
				v-for="y in grid.height"
				:key="'cells-row-' + y">
				<div
					class="cell"
					v-for="x in grid.width"
					:key="'cell-' + x"
					:class="{'checked': cells[((y-1) * grid.width) + (x-1)].checked}"
					@click="toggle(((y-1) * grid.width) + (x-1))">
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as htmlToImage from 'html-to-image';

interface cell{
	checked: boolean,
	x: number,
	y: number,
}

@Component({
})
export default class GridsContainer extends Vue {
	$refs!: {
		grid: HTMLInputElement
	}

	public grid = {
		width: 5,
		height: 5,
	};

	public cells: Array<cell> = [];

	mounted(): void {
		for (let y = 0; y < this.grid.height; y += 1) {
			for (let x = 0; x < this.grid.width; x += 1) {
				this.cells.push({
					checked: Math.random() < 0.5,
					x,
					y,
				});
			}
		}
		
		setTimeout(() => {
			this.exportImage();
		}, 1000);
	}

	exportImage(){
		console.log('export');
		var node = document.querySelector(".grid") as HTMLElement;
		console.log(node);
		htmlToImage.toPng(node, { 
			// cacheBust: true, 
			// width: 1000,
			// canvasWidth: 2000,
			pixelRatio: 3,
		})
		.then(function (dataUrl) {
			var img = new Image();
			img.src = dataUrl;
			img.classList.add("preview-image");
			document.body.appendChild(img);
		})
		.catch(function (error) {
			console.error('oops, something went wrong!', error);
		});
	}

	public toggle(cellIndex: number): void{
		this.cells[cellIndex].checked = !this.cells[cellIndex].checked; 
	}
}
</script>

<style scoped lang="scss">
	.grids-container{
		width: 100%; height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		grid{
			margin: 20px;
		}
		.cells-row{
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			margin-left: 1px;
		}
		.cells-row:last-child{
			margin-bottom: 1px;
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
