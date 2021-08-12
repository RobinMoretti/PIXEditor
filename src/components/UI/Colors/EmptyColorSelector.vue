<template>
    <div class="color-wrapper">
        <div 
            class="color-container"
            :class="{ selected: isSelected }"
            @click="clickedButton">

            <div 
                class="color-button">
                <div class="bar-1"></div>
                <div class="bar-2"></div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';

@Component
export default class ColorsEditor extends Vue {
	gridModule = gridModule;

	clickedButton(): void{
		this.gridModule.selectEmptyColor();
	}

	get isSelected(): boolean{
		if(this.gridModule.selectedColorIndex < 0){
			return true;
		}
		else{
			return false;
		}
	}
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
        overflow: hidden;

        .bar-1{
            position: absolute;
            left: -10px; top: -13px;
            height: 3px; width: 300px;
            background: coral;
            transform: rotate(45deg);
            transform-origin: top left;
        } 
        .bar-2{
            position: absolute;
            right: -10px; top: -13px;
            height: 3px; width: 300px;
            background: coral;
            transform: rotate(-45deg);
            transform-origin: top right;
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
