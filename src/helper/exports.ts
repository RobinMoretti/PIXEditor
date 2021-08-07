export function downloadJsonFile(content: object, fileName: string): void {
    var a = document.createElement("a");
    var file = new Blob([
        JSON.stringify(content, null, 2)
    ], {type: "application/json"});

    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}