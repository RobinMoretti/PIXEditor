export function downloadJsonFile(content, fileName) {
	const a = document.createElement('a')
	const file = new Blob([
		JSON.stringify(content, null, 2),
	], { type: 'application/json' })

	a.href = URL.createObjectURL(file)
	a.download = fileName
	a.click()
}

export function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})
}

export async function exportPsd({ cells, cellsColors, settings, backgroudColor, borderColor, horizontalCellsCount, verticalCellsCount }) {
	const { writePsd } = await import('ag-psd')

	const gridWidth = settings.grid.width
	const gridHeight = settings.grid.height
	const rawBorderWidth = Math.max(1, settings.grid.border.width)

	// Print quality: 150px/cell (equivalent to 30px * pixelRatio:5 like GAME export)
	const TARGET_CELL = 150
	const MAX_DIM = 14000

	const maxHCountItems = Math.max(...horizontalCellsCount.map((row) => row.items.length), 0)
	const maxVCountItems = Math.max(...verticalCellsCount.map((col) => col.items.length), 0)

	// Estimate total size at target resolution to compute scale
	const estBorder = rawBorderWidth * (TARGET_CELL / 30)
	const estW = maxHCountItems * TARGET_CELL + estBorder + gridWidth * (TARGET_CELL + estBorder) + TARGET_CELL * 4
	const estH = maxVCountItems * TARGET_CELL + estBorder + gridHeight * (TARGET_CELL + estBorder)
	const scale = Math.min(1, MAX_DIM / estW, MAX_DIM / estH)

	const cellSize = Math.max(5, Math.round(TARGET_CELL * scale))
	const borderWidth = Math.max(1, Math.round(rawBorderWidth * (cellSize / 30)))
	const countItemSize = cellSize
	const fontSize = Math.max(8, Math.round(cellSize * 0.55))

	const countsLeftWidth = maxHCountItems * countItemSize
	const countsTopHeight = maxVCountItems * countItemSize

	const gridTotalWidth = borderWidth + gridWidth * (cellSize + borderWidth)
	const gridTotalHeight = borderWidth + gridHeight * (cellSize + borderWidth)

	// Palette area: to the right of the grid
	const swatchSize = Math.round(cellSize * 1.1)
	const paletteMargin = Math.round(cellSize * 0.4)
	const paletteLabelFontSize = Math.max(10, Math.round(cellSize * 0.5))
	const paletteX = countsLeftWidth + gridTotalWidth + paletteMargin

	const canvasWidth = paletteX + swatchSize + paletteMargin
	const canvasHeight = countsTopHeight + gridTotalHeight

	// ─── Background layer (fully opaque, covers everything) ───
	const bgCanvas = document.createElement('canvas')
	bgCanvas.width = canvasWidth
	bgCanvas.height = canvasHeight
	const bgCtx = bgCanvas.getContext('2d')
	bgCtx.fillStyle = `rgb(${backgroudColor.r}, ${backgroudColor.g}, ${backgroudColor.b})`
	bgCtx.fillRect(0, 0, canvasWidth, canvasHeight)

	// ─── Grid layer (border + empty cells) ───
	const gridCanvas = document.createElement('canvas')
	gridCanvas.width = canvasWidth
	gridCanvas.height = canvasHeight
	const gridCtx = gridCanvas.getContext('2d')
	gridCtx.fillStyle = `rgb(${borderColor.r}, ${borderColor.g}, ${borderColor.b})`
	gridCtx.fillRect(countsLeftWidth, countsTopHeight, gridTotalWidth, gridTotalHeight)
	for (let y = 0; y < gridHeight; y++) {
		for (let x = 0; x < gridWidth; x++) {
			const cx = countsLeftWidth + borderWidth + x * (cellSize + borderWidth)
			const cy = countsTopHeight + borderWidth + y * (cellSize + borderWidth)
			gridCtx.fillStyle = `rgb(${backgroudColor.r}, ${backgroudColor.g}, ${backgroudColor.b})`
			gridCtx.fillRect(cx, cy, cellSize, cellSize)
		}
	}

	// ─── Palette layer (swatches + grid size) ───
	const paletteCanvas = document.createElement('canvas')
	paletteCanvas.width = canvasWidth
	paletteCanvas.height = canvasHeight
	const paletteCtx = paletteCanvas.getContext('2d')
	paletteCtx.textAlign = 'center'
	paletteCtx.textBaseline = 'middle'

	cellsColors.forEach((color, i) => {
		const sy = countsTopHeight + borderWidth + i * (swatchSize + paletteMargin)
		// Color swatch
		paletteCtx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`
		paletteCtx.fillRect(paletteX, sy, swatchSize, swatchSize)
		// Swatch border
		paletteCtx.strokeStyle = `rgb(${borderColor.r}, ${borderColor.g}, ${borderColor.b})`
		paletteCtx.lineWidth = Math.max(1, Math.round(borderWidth * 0.5))
		paletteCtx.strokeRect(paletteX, sy, swatchSize, swatchSize)
		// Number inside swatch
		const brightness = (color.r * 299 + color.g * 587 + color.b * 114) / 1000
		paletteCtx.fillStyle = brightness > 128 ? '#000000' : '#ffffff'
		paletteCtx.font = `bold ${paletteLabelFontSize}px sans-serif`
		paletteCtx.fillText(String(i + 1), paletteX + swatchSize / 2, sy + swatchSize / 2)
	})

	// Grid size text below swatches
	const sizeY = countsTopHeight + borderWidth + cellsColors.length * (swatchSize + paletteMargin) + paletteMargin
	paletteCtx.fillStyle = `rgb(${borderColor.r}, ${borderColor.g}, ${borderColor.b})`
	paletteCtx.font = `bold ${paletteLabelFontSize}px sans-serif`
	paletteCtx.fillText(`${gridWidth}×${gridHeight}`, paletteX + swatchSize / 2, sizeY + swatchSize / 2)

	// ─── One group per color with individual text layers for count numbers ───
	const colorGroups = cellsColors.map((color, colorIndex) => {
		const textLayers = []
		const fillColor = { r: color.r, g: color.g, b: color.b }

		// Horizontal counts (left side, right-aligned)
		horizontalCellsCount.forEach((row, rowIndex) => {
			const allItems = [...row.items].reverse()
			allItems.forEach((item, j) => {
				if (item.color === cellsColors[colorIndex]) {
					const cx = Math.round(countsLeftWidth - (j + 0.5) * countItemSize)
					const cy = Math.round(countsTopHeight + borderWidth + rowIndex * (cellSize + borderWidth) + cellSize / 2)
					const layerLeft = Math.round(cx - countItemSize / 2)
					const layerTop = Math.round(cy - fontSize)
					const layerRight = Math.round(cx + countItemSize / 2)
					const layerBottom = Math.round(cy + fontSize)
					textLayers.push({
						name: String(item.number),
						left: layerLeft,
						top: layerTop,
						right: layerRight,
						bottom: layerBottom,
						text: {
							text: String(item.number),
							transform: [1, 0, 0, 1, cx, cy],
							left: layerLeft,
							top: layerTop,
							right: layerRight,
							bottom: layerBottom,
							style: { font: { name: 'ArialMT' }, fontSize, fillColor, fauxBold: true },
							paragraphStyle: { justification: 'center' },
						},
					})
				}
			})
		})

		// Vertical counts (top area, bottom-aligned)
		verticalCellsCount.forEach((col, colIndex) => {
			const allItems = [...col.items].filter((item) => item.number > 0).reverse()
			allItems.forEach((item, j) => {
				if (item.color === cellsColors[colorIndex]) {
					const cx = Math.round(countsLeftWidth + borderWidth + colIndex * (cellSize + borderWidth) + cellSize / 2)
					const cy = Math.round(countsTopHeight - (j + 0.5) * countItemSize)
					const layerLeft = Math.round(cx - countItemSize / 2)
					const layerTop = Math.round(cy - fontSize)
					const layerRight = Math.round(cx + countItemSize / 2)
					const layerBottom = Math.round(cy + fontSize)
					textLayers.push({
						name: String(item.number),
						left: layerLeft,
						top: layerTop,
						right: layerRight,
						bottom: layerBottom,
						text: {
							text: String(item.number),
							transform: [1, 0, 0, 1, cx, cy],
							left: layerLeft,
							top: layerTop,
							right: layerRight,
							bottom: layerBottom,
							style: { font: { name: 'ArialMT' }, fontSize, fillColor, fauxBold: true },
							paragraphStyle: { justification: 'center' },
						},
					})
				}
			})
		})

		return { name: `Couleur ${colorIndex + 1}`, children: textLayers }
	})

	const psd = {
		width: canvasWidth,
		height: canvasHeight,
		children: [
			{ name: 'Palette', canvas: paletteCanvas },
			...colorGroups,
			{ name: 'Grille', canvas: gridCanvas },
			{ name: 'Background', canvas: bgCanvas },
		],
	}

	const buffer = writePsd(psd)
	const blob = new Blob([buffer], { type: 'application/octet-stream' })
	const a = document.createElement('a')
	a.href = URL.createObjectURL(blob)

	let fileName = settings.grid.title || 'no-title'
	fileName = fileName.toLowerCase().replace(/\s/g, '-')
	a.download = `${fileName}-game.psd`
	a.click()
}
