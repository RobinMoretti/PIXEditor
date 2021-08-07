<template>
    <div class="background-image-container">
        <img src="@/assets/images/castex.jpg">
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import gridModule from '@/store/modules/grid';

@Component
export default class backgroundImage extends Vue {
	gridModule = gridModule;
}
</script>

<style scoped lang="scss">
    .background-image-container{
        position: absolute;
        left: 0; top: 0;
        width: 100%;
        opacity: 50%;
        img{
            width: 100%;
        }
    }
</style>
