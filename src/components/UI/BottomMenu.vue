<template>
<div class="bottom-nav-container"
@mousedown.stop
@mouseup.stop
@keydown.stop>
        <div @click="displayAbout" class="about-button">?</div>
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
        <div class="grid-container">
            <p  class="grid-title">GRID:</p>

            <p @click="displayEmptyButton" class="button export-button" v-if="!emptyButtonIsVisible">EMPTY</p>
            <p @click="emptyGrid" class="button export-button" v-else>REALLY ?</p>

            <p @click="displayClearButton" class="button export-button" v-if="!clearButtonIsVisible">RESET</p>
            <p @click="clearDatas" class="button export-button" v-else>REALLY ?</p>
        </div>
</div>
</template>

<script>
import { useGridStore } from '@/store/grid'
import { downloadJsonFile } from '@/helper/exports'
import { emitter } from '@/eventBus'
import json from '@/assets/pix-grid/pix-editor.json'

export default {
setup() {
return {
gridModule: useGridStore(),
}
},
data() {
return {
gridWidth: 0,
gridHeight: 0,
gridTitle: '',
clearButtonIsVisible: false,
emptyButtonIsVisible: false,
}
},
mounted() {
if (localStorage.getItem('grid')) {
this.gridModule.loadGridFromLocalStorage()
} else if (this.gridModule.firstInitied === false) {
this.importData(json)
this.gridModule.init()
}
this.updateBottomMenuDatas()
},
methods: {
updateBottomMenuDatas() {
this.gridWidth = this.gridModule.settings.grid.width
this.gridHeight = this.gridModule.settings.grid.height
this.gridTitle = this.gridModule.settings.grid.title
},
updateGridWidth() {
this.gridModule.updateGridWidth(this.gridWidth)
},
updateGridHeight() {
this.gridModule.updateGridHeight(this.gridHeight)
},
updateTitleGrid() {
this.gridModule.updateGridTitle(this.gridTitle)
},
exportGame() {
emitter.emit('EXPORT_GAME')
},
exportSolution() {
emitter.emit('EXPORT_SOLUTION')
},
displayAbout() {
emitter.emit('DISPLAY_ABOUT')
},
exportData() {
const toExport = this.gridModule.getFullDatas
let fileName = toExport.settings.grid.title

if (fileName.length === 0) fileName = 'no-title'

fileName = fileName.toLowerCase().replace(/\s/g, '-')
fileName += '.json'

downloadJsonFile(toExport, fileName)
},
clickInputData() {
if (this.$refs.fileInput) {
this.$refs.fileInput.click()
}
},
uploadJsonFile(event) {
const files = event.target.files
if (files && files[0]) {
const file = files[0]

if (file.type !== 'application/json') {
alert('Please select JSON files only!')
return
}

const reader = new FileReader()
reader.onload = () => {
if (typeof reader.result === 'string') {
this.importData(JSON.parse(reader.result))
}
}
reader.readAsText(file)
}
},
importData(data) {
this.gridModule.importDatas(data)
this.updateBottomMenuDatas()
},
displayClearButton() {
this.clearButtonIsVisible = true
setTimeout(() => {
this.clearButtonIsVisible = false
}, 3000)
},
clearDatas() {
this.gridModule.clear()
location.reload()
},
displayEmptyButton() {
this.emptyButtonIsVisible = true
setTimeout(() => {
this.emptyButtonIsVisible = false
}, 3000)
},
emptyGrid() {
this.gridModule.empty()
},
},
}
</script>

<style scoped lang="scss">
.bottom-nav-container{
position: fixed;
bottom: 0; left: 0;
        width: 100%; height: 40px;
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
    
    .export-container, .import-container, .grid-container{
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

    .about-button{
        background: rgb(211, 192, 158);
        border-radius: 100%;
        width: 25px; height: 25px;
        display: inline-block;
        cursor: pointer;
        color: white;
        font-weight: 900;

        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 15px;
    }
</style>
