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
