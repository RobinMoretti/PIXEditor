<template>
    <div class="modal-container" @click="hide" :class="{visible: visible}">
        <div class="modal" @click.stop>
            <div @click="hide" class="close">X</div>
            <slot/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

const ModalProps = Vue.extend({
  props: {
    onTitle: String
  }
})

@Component({})
export default class BottomMenu extends ModalProps  {
    visible: boolean = false;
    
    public hide(): void{
        this.visible = false;
    }
    
    public display(): void{
        this.visible = true;
    }

    mounted(): void{
		this.$bus.$on(this.onTitle, this.display);
    }
}
</script>


<style lang="scss">

    .modal-container.visible{
        display: flex !important;
    }

    .modal-container{
        position: fixed;
        left: 0; top: 0; right: 0; bottom: 0;
        display: none;
        justify-content: flex-end;
        align-items: flex-end;
        background-color: rgba(128, 128, 128, 0.377);
        z-index: 100;
        padding: 20px;
        padding-bottom: 50px;
        
        .close{
            cursor: pointer;
            border: rgba(129, 129, 129, 0.418) 3px solid;
            color: rgb(129, 129, 129);
            border-radius: 100%;
            width: 30px; height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;
            font-weight: 900;
            position: absolute;
            left: 10px;
            top: 10px;
        }

        .close:hover{
            border: rgba(129, 129, 129, 0.767) 3px solid;
        }

        .modal{
            position: relative;
            background: white;
            border-radius: 3px;
            padding: 20px;
            text-align: right;
            max-width: 500px;

            ul{
                padding-right: 5px;
                margin-top: 5px;
                li{
                    &:after {
                        content: " ←";
                    }
                }
            }

            p{
                margin-top: 10px;
                margin-left: 30px;
                line-height: 20px;
            }
        }
    }
</style>
