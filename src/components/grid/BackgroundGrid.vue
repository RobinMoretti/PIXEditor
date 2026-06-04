<template>
  <div class="background-cells-container">
    <div
      class="cell"
      v-for="cell in cellsCount"
      :key="'cell-' + cell"
      :class="getCellClasses(cell - 1)"
    >
      <div class="cell-border-item"></div>
    </div>
  </div>
</template>

<script>
import { useGridStore } from "@/store/grid";

export default {
  setup() {
    return {
      gridModule: useGridStore(),
    };
  },
  computed: {
    cellsCount() {
      return this.gridModule.settings.grid.width * this.gridModule.settings.grid.height;
    },
    gridWidth() {
      return this.gridModule.settings.grid.width;
    },
  },
  methods: {
    getCellClasses(index) {
      const col = index % this.gridWidth;
      const row = Math.floor(index / this.gridWidth);
      return {
        "fifth-col": (col + 1) % 5 === 0,
        "fifth-row": (row + 1) % 5 === 0,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.background-cells-container {
  display: grid;
  grid-template-rows: var(--grid-template-rows);
  grid-template-columns: var(--grid-template-columns);
}

.cell {
  width: 30px;
  height: 30px;
  background: var(--grid-background-color);
  box-sizing: border-box;
}

.cell-border-item {
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

.cell.fifth-col .cell-border-item {
  border-right-color: var(--grid-marker-border-color);
    z-index: 1;
}
.cell.fifth-col.fifth-row .cell-border-item {
    z-index: 2;
}


.cell.fifth-row .cell-border-item {
  border-bottom-color: var(--grid-marker-border-color);
    z-index: 1;
//   border-bottom-color: red !important;
}
</style>
