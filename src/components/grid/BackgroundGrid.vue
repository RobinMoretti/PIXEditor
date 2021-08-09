<template>
    <div class="background-cells-container">
        <div
            class="cell"
            v-for="cell in cellsCount"
            :key="'cell-' + cell">
            <div class="cell-border-item"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';
import { gridSetting } from '@/store/modules/grid-types';

@Component
export default class backgroundGrid extends Vue {
	gridModule = gridModule;

	get grid(): gridSetting {
		return this.gridModule.settings.grid;
	}

	get cellsCount(): number {
		return this.gridModule.settings.grid.width * this.gridModule.settings.grid.height;
	}
}
</script>

<style scoped lang="scss">
    .background-cells-container{
        display: grid;
        grid-template-rows: var(--grid-template-rows);
        grid-template-columns: var(--grid-template-columns);
    }

    .cell{
        width: calc(30px * var(--system-zoom)); height: calc(30px * var(--system-zoom));
        background:  var(--grid-background-color);
        box-sizing: border-box;
    }

    .cell-border-item{
        width: calc(100% + (var(--grid-border-width)));
        height: calc(100% + (var(--grid-border-width)));
        position: relative;
        right: calc((var(--grid-border-width) / 2));
        bottom: calc((var(--grid-border-width) / 2));
        display: inline-block;
        border-style: solid;
        border-color: var(--grid-border-color);
        border-width: var(--grid-border-width);
        box-sizing: border-box;
    }
</style>
