<template>
    <div class="count-positionning-container">
        <div class="row">
            <div 
                class="point" 
                :class="{visible: verticalCountPosition === 'top'}" 
                @click="toggleCountPosition('vertical', 'bottom')"></div>
        </div>

        <div class="row">
            <div class="column">
                <div 
                    class="point" 
                    :class="{visible: horizontalCountPosition === 'left'}"
                    @click="toggleCountPosition('horizontal', 'right')"></div>
            </div>
            <div 
                class="abstract-grid-container"
                :class="{visible: countsAreVisible}"
                @click="toggleVisibility()">
            </div>
            <div class="column">
                <div 
                    class="point" 
                    :class="{visible: horizontalCountPosition === 'right'}"
                    @click="toggleCountPosition('horizontal', 'left')"></div>
            </div>
        </div>

        <div class="row">
            <div 
                class="point" 
                :class="{visible: verticalCountPosition === 'bottom'}"
                @click="toggleCountPosition('vertical', 'top')"></div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import gridModule from '@/store/modules/grid';
import { orientationType, positionType } from '@/store/modules/grid-types';

export default class GridsContainer extends Vue {
	gridModule = gridModule;

    get verticalCountPosition(){
        return this.gridModule.settings.grid.counts.verticalPosition;
    }
    get horizontalCountPosition(){
        return this.gridModule.settings.grid.counts.horizontalPosition;
    }

    get countsAreVisible(){
        return this.gridModule.settings.grid.counts.visible;
    }
    
    public toggleVisibility(): void{
        this.gridModule.toggleCountsVisibility();
    }

    public toggleCountPosition(orientation: orientationType, targetPosition: positionType): void{
        this.gridModule.updateCountsPosition({
            orientation, 
            targetPosition
        });
    }
}
</script>

<style lang="scss" scoped>
.count-positionning-container{
    margin-top: 0;

    .abstract-grid-container{
        width: 20px; height: 20px;
        margin: 5px;
        border: solid 3px rgb(100, 100, 100);
        background-color: var(--grid-background-color);
        cursor: pointer;

        &.visible{
            border: solid 3px rgb(33, 33, 33);
        }
    }

    .row{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .column{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .point{
        background: rgb(33, 33, 33);
        width: 10px; height: 10px;
        border-radius: 100%;
        opacity: 0;
    }
    .point.visible{
        opacity: 1;
        background: rgb(33, 33, 33);
        cursor: pointer;
    }
    .point.visible:hover{
        opacity: 0.7;
    }
}
</style>

