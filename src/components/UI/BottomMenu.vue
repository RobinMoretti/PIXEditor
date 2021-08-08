<template>
	<div class="bottom-nav-container">
        <div class="title-container">
            <input 
                type="text" 
                v-model="gridTitle" 
                @change="updateTitleGrid">
        </div>

        <div class="grid-sizing">
            <input 
                type="number" 
                v-model="gridWidth" 
                @change="updateGridWidth">
            <p class="division">/</p>
            <input 
                type="number" 
                v-model="gridHeight" 
                @change="updateGridHeight">
        </div>
        
        <div class="export-container">
            <p  class="export-title">EXPORT:</p>
            <p @click="exportGame" class="button export-button">GAME</p>
            <p @click="exportSolution" class="button export-button">SOLUTION</p>
            <p @click="exportData" class="button export-button">DATA</p>
        </div>

        <div class="import-container">
            <p  class="export-title">IMPORT:</p>
            <input type="file" id="input" ref="fileInput" class="file-input" @change="uploadJsonFile($event)">
            <p @click="clickInputData" class="button export-button">DATA</p>
        </div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';
import { downloadJsonFile } from '@/helper/exports';
const json = require('@/assets/pix-grid/pix-editor.json');
// import defaultGrid from '@/assets/pix-grid/pix-editor.json';

@Component({
})
export default class BottomMenu extends Vue {
    gridModule = gridModule;
    gridWidth = this.gridModule.settings.grid.width;
    gridHeight = this.gridModule.settings.grid.height;
    gridTitle = this.gridModule.settings.grid.title;

    mounted(): void{ 
        console.log(json);
        if(localStorage.getItem('grid')){
            this.gridModule.loadGridFromLocalStorage();
        }
        else if(this.gridModule.firstInitied === false){
            this.importData(json); 
            this.gridModule.init();
        }
        this.updateBottomMenuDatas();
    }

    updateBottomMenuDatas(): void{
        this.gridWidth = this.gridModule.settings.grid.width;
        this.gridHeight = this.gridModule.settings.grid.height;
        this.gridTitle = this.gridModule.settings.grid.title;
    }

    updateGridWidth(): void{
        this.gridModule.updateGridWidth(this.gridWidth);
    }
    updateGridHeight(): void{
        this.gridModule.updateGridHeight(this.gridHeight);
    }

    updateTitleGrid(): void{
        this.gridModule.updateGridTitle(this.gridTitle);
    }

    exportGame(): void{
        this.$bus.$emit('EXPORT_GAME')
    }
    exportSolution(): void{
        this.$bus.$emit('EXPORT_SOLUTION')
    }

    exportData(){
        let toExport = this.gridModule.getFullDatas;

        let fileName: string = toExport.settings.grid.title;

        if(fileName.length == 0)
            fileName = "no-title";
            
        fileName = fileName.toLowerCase().replace(/\s/g, '-');
        fileName += ".json";

        downloadJsonFile(toExport, fileName);
    }

    clickInputData(): void{
        if(this.$refs.fileInput){
            let htmlFileElem = <HTMLInputElement>this.$refs.fileInput;
            htmlFileElem.click();
        }
    }
    uploadJsonFile(event: Event){
        let files = (<HTMLInputElement>event.target).files;
        if(files && files[0]){
            let file = files[0];

            if (file.type != 'application/json') {
                alert('Please select JSON files only!');
                return;
            }
            
            // for displaying the contents of the file
            const reader = new FileReader();
            reader.onload = (e) => {
                if(typeof(reader.result) === "string"){
                    let fileContent: string = reader.result;
                    this.importData(JSON.parse(reader.result))
                }
            }
            reader.readAsText(file);
        }
    }

    importData(data: object){
        let response = this.gridModule.importDatas(data);
    }

}
</script>

<style scoped lang="scss">
	.bottom-nav-container{
		position: fixed;
		bottom: 0; left: 0;
        width: 100%;
		background-color: rgb(255, 255, 255);
		width: 100%;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: baseline;
	}

    .grid-sizing{
        display: flex;
        justify-content: flex-start;
        align-items: baseline;
        .division{
            font-weight: 600;
            font-size: 20px;
            margin: 0 5px;
        }
    }

    .title-container{
        input{
            min-width: 100px;
        }
        margin-right: 15px;
    }
    
    .export-container, .import-container{
        display: flex;
        justify-content: flex-start;
        align-items: baseline;
        flex-direction: row;
        margin-left: 30px;

        .export-button{
            margin-left: 10px;
            cursor: pointer;
            border-bottom: rgba(19, 19, 19, 0.335) 4px solid;
            padding-bottom: 2px;
        }
        .export-button:hover{
            margin-left: 10px;
            cursor: pointer;
            border-bottom: rgba(19, 19, 19, 0.644) 4px solid;
            padding-bottom: 2px;
        }
    }

    input[type=number], input[type=text]{
        border: 0;
        border-bottom: rgba(19, 19, 19, 0.335) 4px solid;
        background-color: unset;
        outline: none;
        font-size: 15px;
        width: 25px;
        padding-bottom: 1px;
        text-align: center;
    }
    
    input[type=number]:focus, input[type=text]:focus{
        border-bottom: rgba(19, 19, 19, 0.644) 4px solid;

    }
    
    
    input[type=number] { 
        -moz-appearance: textfield;
        appearance: textfield;
        margin: 0; 
    }

    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }

    .file-input{
        position: fixed;
        right: -10000px; top: -10000px;
    }
</style>
