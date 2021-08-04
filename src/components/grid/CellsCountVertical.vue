<template>
    <div class="cells-count-vertical">
        <div
            class="cells-count-column"
            v-for="(column, key) in verticalCellsCount"
            :key="'cells-count-column-' + key">
            <div
                class="cells-count-column-item"
                v-for="(count, countKey) in column.items"
                :key="'cells-vertical-count-' + countKey">
                {{ count.number }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';

@Component
export default class cellsCountVertical extends Vue {
	gridModule = gridModule;

	get verticalCellsCount(){
		return this.gridModule.verticalCellsCount;
	}
}
</script>

<style scoped lang="scss">
    .cells-count-vertical{
        // padding-bottom: 1px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: stretch;
        box-sizing: border-box;
        // background: white;

        .cells-count-column{
            box-sizing: border-box;
            width: 30px;
            border-left: solid 1px rgba(0, 0, 0, 0);
            border-right: solid 1px rgba(0, 0, 0, 0);
            border-top: solid 1px rgba(0, 0, 0, 0);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: stretch;
            
            margin-left: -1px;
            // align-items: center;
            padding: 2px;
            .cells-count-column-item{
                height: 25px;
                display: flex;
                flex-direction: column;
                justify-content: center;
		        font-size: 18px;
		        font-weight: 400;
            }
        }
    }
</style>
