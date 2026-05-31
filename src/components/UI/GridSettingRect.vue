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

<script>
import { useGridStore } from '@/store/grid'

export default {
setup() {
return {
gridModule: useGridStore(),
}
},
computed: {
verticalCountPosition() {
return this.gridModule.settings.grid.counts.verticalPosition
},
horizontalCountPosition() {
return this.gridModule.settings.grid.counts.horizontalPosition
},
countsAreVisible() {
return this.gridModule.settings.grid.counts.visible
},
},
methods: {
toggleVisibility() {
this.gridModule.toggleCountsVisibility()
},
toggleCountPosition(orientation, targetPosition) {
this.gridModule.updateCountsPosition({ orientation, targetPosition })
},
},
}
</script>

<style lang="scss" scoped>
.count-positionning-container{
    margin-top: 5px;
    background-color: white;
    padding: 5px;
    border-radius: 100%;
    border: solid 3px rgba(0, 0, 0, 0.13);

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
