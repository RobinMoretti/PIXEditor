<template>
	<div class="bottom-nav-container">
        <div class="grid-sizing">
            <input 
                type="number" 
                v-model="gridWidth" 
                @change="updateGridWidth">
            <p class="division">/</p>
            <input 
                type="number" 
                v-model="gridHeight" 
                @change="updateGridHeight">
        </div>
        <div class="export-container">
            <p  class="export-title">EXPORT:</p>
            <p @click="exportGame" class="button export-button">GAME</p>
            <p @click="exportSolution" class="button export-button">SOLUTION</p>
        </div>
			<!-- <input type="range" min="0" max="13" step="1" v-model="gridBorderWidth" @change="updateBorderWidth">  -->
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';

@Component({
})
export default class BottomMenu extends Vue {
    gridModule = gridModule;
    gridWidth = this.gridModule.settings.grid.width;
    gridHeight = this.gridModule.settings.grid.height;
    
    updateGridWidth(): void{
        this.gridModule.updateGridWidth(this.gridWidth);
    }
    updateGridHeight(): void{
        this.gridModule.updateGridHeight(this.gridHeight);
    }

    exportGame(): void{
        this.$bus.$emit('EXPORT_GAME')
    }
    exportSolution(): void{
        this.$bus.$emit('EXPORT_SOLUTION')
    }

}
</script>

<style scoped lang="scss">
	.bottom-nav-container{
		position: fixed;
		bottom: 0; left: 0;
        width: 100%;
		background-color: rgb(255, 255, 255);
		width: 100%;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
	}

    .grid-sizing{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .division{
            font-weight: 600;
            font-size: 20px;
            margin: 0 5px;
        }
    }
    
    .export-container{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        margin-left: 30px;

        .export-button{
            margin-left: 10px;
            cursor: pointer;
            border-bottom: rgba(19, 19, 19, 0.335) 4px solid;
            padding-bottom: 2px;
        }
        .export-button:hover{
            margin-left: 10px;
            cursor: pointer;
            border-bottom: rgba(19, 19, 19, 0.644) 4px solid;
            padding-bottom: 2px;
        }
    }

    input[type=number]{
        border: 0;
        border-bottom: rgba(19, 19, 19, 0.335) 4px solid;
        background-color: unset;
        outline: none;
        font-size: 15px;
        width: 25px;
        padding-bottom: 1px;
        text-align: center;
    }
    
    input[type=number]:focus{
        border-bottom: rgba(19, 19, 19, 0.644) 4px solid;

    }
    
    
    input[type=number] { 
        -moz-appearance: textfield;
        appearance: textfield;
        margin: 0; 
    }

    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
</style>
