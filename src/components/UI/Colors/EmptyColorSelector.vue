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

<script>
import { useGridStore } from '@/store/grid'

export default {
	setup() {
		return {
			gridModule: useGridStore(),
		}
	},
	computed: {
		isSelected() {
			return this.gridModule.selectedColorIndex < 0
		},
	},
	methods: {
		clickedButton() {
			this.gridModule.selectEmptyColor()
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
