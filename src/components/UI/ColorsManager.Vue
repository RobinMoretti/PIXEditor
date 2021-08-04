<template>
	<div class="colors-manager-container">
        colors
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class ColorsManager extends Vue {
}
</script>

<style scoped lang="scss">
	.colors-manager-container{
        position: fixed;
        right: 0;
        top: 0;
	}
</style>
