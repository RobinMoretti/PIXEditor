import { defineStore } from 'pinia'

let saveStorageTimeout = null

export const useGridStore = defineStore('grid', {
	state: () => ({
		firstInitied: false,

		importExportDatas: [
			'settings',
			'cells',
			'cellsColors',
			'backgroudColor',
			'borderColor',
		],

		settings: {
			grid: {
				title: '',
				width: 10,
				height: 10,
				border: {
					width: 3,
				},
				counts: {
					verticalPosition: 'top',
					horizontalPosition: 'left',
					visible: true,
				},
			},
		},

		tempGridSetting: {
			grid: {
				width: 0,
				height: 0,
			},
		},

		cells: [],
		horizontalCellsCount: [],
		verticalCellsCount: [],

		cellsInteraction: {
			clicked: false,
		},

		cellsColors: [],

		backgroudColor: { r: 150, g: 150, b: 150 },
		borderColor: { r: 255, g: 255, b: 255 },

		selectedColorIndex: 0,
		lastSelectedColor: 0,
	}),

	getters: {
		getFullDatas(state) {
			const fullData = {}
			state.importExportDatas.forEach((dataName) => {
				fullData[dataName] = state[dataName]
			})
			return fullData
		},

		getCssGridColumns(state) {
			let col = ''
			for (let i = 0; i < state.settings.grid.width; i++) {
				col += '1fr '
			}
			return col
		},

		getCssGridRows(state) {
			let row = ''
			for (let i = 0; i < state.settings.grid.height; i++) {
				row += '1fr '
			}
			return row
		},

		cellsCount(state) {
			return state.settings.grid.width * state.settings.grid.height
		},
	},

	actions: {
		init() {
			this.firstInitied = true
			this.saveGridInLocalStorage()
		},

		clear() {
			localStorage.clear()
		},

		empty() {
			for (let i = 0; i < this.cells.length; i++) {
				this.cells[i] = -1
			}
			this.updateCounts()
			this.saveGridInLocalStorage()
		},

		importDatas(datas) {
			this.importExportDatas.forEach((dataName) => {
				this[dataName] = datas[dataName]
			})
			this.checkForMissingDatas()
			this.selectColor(this.cellsColors[0])
			this.updateCounts()
			this.saveGridInLocalStorage()
		},

		checkForMissingDatas() {
			if (!this.settings.grid.counts) {
				this.settings.grid.counts = {
					verticalPosition: 'top',
					horizontalPosition: 'left',
					visible: true,
				}
			}
		},

		saveGridInLocalStorage() {
			if (saveStorageTimeout !== null) {
				clearTimeout(saveStorageTimeout)
			}
			saveStorageTimeout = setTimeout(() => {
				localStorage.setItem('grid', JSON.stringify(this.getFullDatas))
			}, 1000)
		},

		loadGridFromLocalStorage() {
			const gridString = localStorage.getItem('grid')
			if (typeof gridString === 'string') {
				this.importDatas(JSON.parse(gridString))
			}
		},

		initGrid() {
			this.initColors()
			for (let y = 0; y < this.settings.grid.height; y++) {
				for (let x = 0; x < this.settings.grid.width; x++) {
					this.cells.push(-1)
				}
			}
			this.saveGridInLocalStorage()
		},

		updateBorderWidth(value) {
			this.settings.grid.border.width = value
			this.saveGridInLocalStorage()
		},

		updateGridTitle(value) {
			this.settings.grid.title = value
			this.saveGridInLocalStorage()
		},

		updateGridWidth(value) {
			this.saveGridSetting()
			this.settings.grid.width = value
			this.updateCellsLenght()
			this.updateCounts()
			this.saveGridInLocalStorage()
		},

		updateGridHeight(value) {
			this.saveGridSetting()
			this.settings.grid.height = value
			this.updateCellsLenght()
			this.updateCounts()
			this.saveGridInLocalStorage()
		},

		updateCountsPosition({ orientation, targetPosition }) {
			if (orientation === 'vertical') {
				this.settings.grid.counts.verticalPosition = targetPosition
			} else {
				this.settings.grid.counts.horizontalPosition = targetPosition
			}
			this.saveGridInLocalStorage()
		},

		toggleCountsVisibility(state) {
			if (state !== undefined) {
				this.settings.grid.counts.visible = state
			} else {
				this.settings.grid.counts.visible = !this.settings.grid.counts.visible
			}
			this.saveGridInLocalStorage()
		},

		saveGridSetting() {
			this.tempGridSetting = JSON.parse(JSON.stringify(this.settings))
		},

		updateCellsLenght() {
			const tempCells = [...this.cells]

			this.cells = new Array(this.settings.grid.width * this.settings.grid.height).fill(-1)

			for (let y = 0; y < this.settings.grid.height; y++) {
				for (let x = 0; x < this.settings.grid.width; x++) {
					let isInBound = true
					if (x > this.settings.grid.width - 1 || x > this.tempGridSetting.grid.width - 1) {
						isInBound = false
					}
					if (y > this.settings.grid.height - 1 || y > this.tempGridSetting.grid.height - 1) {
						isInBound = false
					}

					if (isInBound) {
						const tempCellIndex = x + (y * this.tempGridSetting.grid.width)
						if (tempCellIndex < tempCells.length) {
							const tempCell = tempCells[tempCellIndex]
							const cellIndex = x + (y * this.settings.grid.width)
							if (tempCell >= 0) {
								this.cells[cellIndex] = tempCell
							}
						}
					}
				}
			}
		},

		clearCells() {
			for (let i = 0; i < this.cells.length; i++) {
				this.cells[i] = -1
			}
		},

		addNewCell(quantity) {
			if (quantity) {
				for (let i = 0; i < quantity; i++) {
					this.cells.push(-1)
				}
			} else {
				this.cells.push(-1)
			}
		},

		toggleCell(cellIndex) {
			if (this.cellsInteraction.clicked) {
				this.cells[cellIndex] = this.selectedColorIndex
				this.updateCounts()
				this.saveGridInLocalStorage()
			}
		},

		updateCounts() {
			if (this.cells.length === 0) {
				this.initGrid()
			}
			this.updateHorizontalCounts()
			this.updateVerticalCounts()
		},

		updateHorizontalCounts() {
			this.horizontalCellsCount = []

			for (let y = 0; y < this.settings.grid.height; y++) {
				const activeRow = { items: [] }

				for (let x = 0; x < this.settings.grid.width; x++) {
					const activeCellIndex = (y * this.settings.grid.width) + x
					const activeCell = this.cells[activeCellIndex]

					if (!activeRow.items.length) {
						activeRow.items.push({
							number: 0,
							color: this.cellsColors[activeCell],
						})
					}

					const lastItemCount = activeRow.items[activeRow.items.length - 1]

					if (activeCell >= 0) {
						const previousCell = x > 0 ? this.cells[activeCellIndex - 1] : null

						if (previousCell == null || (previousCell >= 0 && previousCell === activeCell)) {
							lastItemCount.number += 1
						} else {
							activeRow.items.push({
								number: 1,
								color: this.cellsColors[activeCell],
							})
						}
					}
				}

				this.horizontalCellsCount.push(activeRow)
			}
		},

		updateVerticalCounts() {
			this.verticalCellsCount = []

			for (let x = 0; x < this.settings.grid.width; x++) {
				const activeColumn = { items: [] }

				for (let y = 0; y < this.settings.grid.height; y++) {
					const activeCellIndex = (y * this.settings.grid.width) + x
					const activeCell = this.cells[activeCellIndex]

					if (!activeColumn.items[activeColumn.items.length - 1]) {
						activeColumn.items.push({
							number: 0,
							color: null,
						})
					}

					const previousItemCount = activeColumn.items[activeColumn.items.length - 1]

					if (activeCell >= 0) {
						let previousCell = -1
						let previousCellIndex = -1

						if ((activeCellIndex - this.settings.grid.width) >= 0) {
							previousCellIndex = activeCellIndex - this.settings.grid.width
							previousCell = this.cells[activeCellIndex - this.settings.grid.width]
						} else if ((activeCellIndex - 1 + (this.settings.grid.width * this.settings.grid.height - 1)) >= 0) {
							previousCellIndex = activeCellIndex - 1
							previousCellIndex += (this.settings.grid.width * this.settings.grid.height - 1)
							previousCell = this.cells[previousCellIndex]
						}

						if (!previousCellIndex || (previousCell >= 0 && previousCell === activeCell)) {
							previousItemCount.color = this.cellsColors[activeCell]
							previousItemCount.number += 1
						} else if (previousItemCount.number) {
							activeColumn.items.push({
								number: 1,
								color: this.cellsColors[activeCell],
							})
						} else {
							if (previousItemCount.color === null) {
								previousItemCount.color = this.cellsColors[activeCell]
							}
							previousItemCount.number += 1
						}
					}
				}

				this.verticalCellsCount.push(activeColumn)
			}
		},

		toggleCellsInteractionClicked(clickState) {
			if (clickState != null) {
				this.cellsInteraction.clicked = clickState
			} else {
				this.cellsInteraction.clicked = !this.cellsInteraction.clicked
			}
		},

		initColors() {
			const primaryColor = {
				r: Math.round(Math.random() * 255),
				g: Math.round(Math.random() * 255),
				b: Math.round(Math.random() * 255),
			}
			this.cellsColors.push(primaryColor)
			this.selectColor(this.cellsColors[0])
			this.saveGridInLocalStorage()
		},

		selectColor(colorObj) {
			this.selectedColorIndex = this.cellsColors.findIndex((c) => c === colorObj)
		},

		selectEmptyColor() {
			this.selectedColorIndex = -1
		},

		tempSelectEmptyColor() {
			this.lastSelectedColor = this.selectedColorIndex
			this.selectedColorIndex = -1
		},

		tempReleaseEmptyColor() {
			if (this.selectedColorIndex < 0) {
				this.selectedColorIndex = this.lastSelectedColor
			}
		},

		addColor(newColor) {
			if (this.cellsColors.length < 5) {
				if (newColor) {
					this.cellsColors.push(newColor)
				} else {
					const nc = {
						r: Math.round(Math.random() * 255),
						g: Math.round(Math.random() * 255),
						b: Math.round(Math.random() * 255),
					}
					this.cellsColors.push(nc)
					this.selectColor(nc)
				}
				this.saveGridInLocalStorage()
			}
		},

		updateColor({ newColor, colorIndex }) {
			this.cellsColors[colorIndex].r = newColor.r
			this.cellsColors[colorIndex].g = newColor.g
			this.cellsColors[colorIndex].b = newColor.b
			this.saveGridInLocalStorage()
		},

		updateColorImg({ imgValue, colorIndex }) {
			this.cellsColors[colorIndex].img = imgValue
			this.saveGridInLocalStorage()
		},

		updateBasicColor({ newColor, colorObj }) {
			colorObj.r = newColor.r
			colorObj.g = newColor.g
			colorObj.b = newColor.b
			this.saveGridInLocalStorage()
		},

		deleteColor(index) {
			if (this.cellsColors.length > 1) {
				this.cellsColors.splice(index, 1)
				this.selectColor(this.cellsColors[this.cellsColors.length - 1])
				this.saveGridInLocalStorage()
			}
		},
	},
})
