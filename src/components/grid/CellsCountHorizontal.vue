<template>
    <div
        class="cells-count-horizontal">
        <div
            class="cells-count-row"
            v-for="(row, key) in horizontalCellsCount"
            :key="'cells-count-row-' + key">
            <div
                class="cells-count-row-item"
                v-for="(count, countKey) in row.items"
                :key="'cells-horizontal-count-' + countKey">
                {{ count.number }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';

@Component
export default class cellsCountHorizontal extends Vue {
	gridModule = gridModule;

	get horizontalCellsCount(){
		return this.gridModule.horizontalCellsCount;
	}
}
</script>

<style scoped lang="scss">
    .cells-count-horizontal{
        padding-bottom: var(--grid-border-width);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        box-sizing: border-box;
        // background: white;

        .cells-count-row{
            box-sizing: border-box;
            height: 30px;
            width: 100%;
            border-bottom: solid var(--grid-border-width) rgba(0, 0, 0, 0);
            border-top: solid var(--grid-border-width) rgba(0, 0, 0, 0);
            border-left: solid var(--grid-border-width) rgba(0, 0, 0, 0);
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            margin-bottom: calc(0px - var(--grid-border-width));
            align-items: center;

            padding: 2px;

            .cells-count-row-item{
                width: 30px;
		        font-size: 18px;
		        font-weight: 400;
            }
        }
    }
</style>
