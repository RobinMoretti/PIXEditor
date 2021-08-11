export function downloadJsonFile(content: Record<string, unknown>, fileName: string): void {
	const a = document.createElement('a');
	const file = new Blob([
		JSON.stringify(content, null, 2),
	], { type: 'application/json' });

	a.href = URL.createObjectURL(file);
	a.download = fileName;
	a.click();
}

// export function downloadImageFile(content: Record<string, unknown>){
// 	const file = new Blob([
// 		JSON.stringify(content, null, 2),
// 	], { type: 'image/jpeg' });

// 	console.log('file =', file);
// }