<template>
	<header class="editor-nav">
			<h1>PIX Editor</h1>
	</header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class EditorNav extends Vue {
	public goToPage(targetPage: string): void{
		if (this.$route.name !== targetPage) {
			this.$router.push({
				name: targetPage,
			});
		}
	}
}
</script>

<style scoped lang="scss">
	.editor-nav{
		h1{
			font-size: 20px;
			font-weight: 350;
			position: absolute;
			left: 5px; top: 5px;
			visibility: hidden;
		}
	}
</style>
