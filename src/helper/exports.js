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

export async function exportPsd({ cells, cellsColors, settings, backgroudColor }) {
	const { writePsd } = await import('ag-psd')

	const width = settings.grid.width
	const height = settings.grid.height

	// One canvas layer per color
	const colorLayers = cellsColors.map((color, colorIndex) => {
		const canvas = document.createElement('canvas')
		canvas.width = width
		canvas.height = height
		const ctx = canvas.getContext('2d')

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const cellIndex = y * width + x
				if (cells[cellIndex] === colorIndex) {
					ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`
					ctx.fillRect(x, y, 1, 1)
				}
			}
		}

		return {
			name: `Couleur ${colorIndex + 1}`,
			canvas,
		}
	})

	// Background layer
	const bgCanvas = document.createElement('canvas')
	bgCanvas.width = width
	bgCanvas.height = height
	const bgCtx = bgCanvas.getContext('2d')
	bgCtx.fillStyle = `rgb(${backgroudColor.r}, ${backgroudColor.g}, ${backgroudColor.b})`
	bgCtx.fillRect(0, 0, width, height)

	const psd = {
		width,
		height,
		children: [
			...colorLayers.reverse(),
			{ name: 'Background', canvas: bgCanvas },
		],
	}

	const buffer = writePsd(psd)
	const blob = new Blob([buffer], { type: 'application/octet-stream' })
	const a = document.createElement('a')
	a.href = URL.createObjectURL(blob)

	let fileName = settings.grid.title || 'no-title'
	fileName = fileName.toLowerCase().replace(/\s/g, '-')
	a.download = `${fileName}.psd`
	a.click()
}
