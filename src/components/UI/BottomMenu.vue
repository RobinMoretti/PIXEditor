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
