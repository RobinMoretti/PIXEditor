<template>
	<div class="background-container" :style="rectVars">
		<div
			class="rect"
			v-for="rect in rectsCount"
			:key="'rect-' + rect">
			<div class="decorator"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class GridMenu extends Vue {
	public rectSize = 30;

	public rectsCount = 0;

	get rectVars(): Record<string, string> {
		return {
			'--rect-size': `${this.rectSize}px`,
		};
	}
}
</script>

<style scoped lang="scss">
	.background-container{
		position: fixed;
		left: 0; top: 0;
		background-color: rgba(240, 248, 255, 0.555);
		width: calc(100% + 25px); height: 100%;
		z-index: -1;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		flex-direction: row;
		max-width: calc(100vw + 20px); max-height: calc(100vh + 20px);
	}

	.rect{
		// border: 1px solid black;
		box-sizing: border-box;
		width:  var(--rect-size); height:  var(--rect-size);
		// display: flex;
		// justify-content: center;
		// align-items: center;

		.decorator{
			width: 1px; height: 1px;
			background: black;
			border-radius: 100%;
		}
	}
</style>
