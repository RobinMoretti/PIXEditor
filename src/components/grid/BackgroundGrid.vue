<template>
    <div class="background-cells-container">
        <div
            class="cells-row"
            v-for="y in grid.height"
            :key="'cells-row-' + y">
            <div
                class="cell"
                v-for="x in grid.width"
                :key="'cell-' + x">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';

@Component
export default class backgroundGrid extends Vue {
	gridModule = gridModule;
    get grid(){
        return this.gridModule.settings.grid;
    }

}
</script>

<style scoped lang="scss">
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
        // margin-left: calc(1px - var(--grid-border-width) - 1px);
        // margin-bottom: calc(1px - var(--grid-border-width) - 1px);
        margin-left: calc(0px - var(--grid-border-width));
        margin-bottom: calc(0px - var(--grid-border-width));
        width: 30px; height: 30px;
        border-width: var(--grid-border-width);
        border-style: dotted ;
        border-color: rgba(121, 121, 121, 0.472);
        box-sizing: border-box;
        background: white;
    }
</style>
