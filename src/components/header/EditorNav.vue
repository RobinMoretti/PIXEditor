<template>
	<header class="editor-nav">
		<nav class="left">
			<h1>PIX</h1>
			<ul>
				<li @click="goToPage('Book')">livre</li>
				<li @click="goToPage('Pages')">pages</li>
				<li @click="goToPage('Grids')">grilles</li>
			</ul>
		</nav>
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
		width: 100%;
		background-color: rgb(54, 54, 54);
		padding: 0px 5px;

		display: flex;
		justify-content: space-between;
		flex-direction: row;

		nav.left{
			width: 100%;
			display: flex;
			justify-content: flex-start;
			flex-direction: row;
			align-items: stretch;
		}

		h1{
			font-size: 20px;
			font-weight: 350;
			color: white;
			margin-right: 15px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}

		ul{
			height: 30px;
			margin: 0; padding: 0;
			color: white;
			display: flex;
			justify-content: flex-start;
			flex-direction: row;
			align-items: center;

			li{
				height: 100%;
				padding: 0 5px;
				margin-right: 10px;
				font-weight: 500;
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}

			li:hover{
				background-color: rgba(245, 245, 245, 0.158);
			}
			li.active{
				background-color: rgba(175, 31, 156, 0.158);
			}
		}
	}
</style>
