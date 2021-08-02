<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png">
		{{fullName}}
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import userModule from '@/store/modules/user';

@Component
export default class Home extends Vue {
	private userModule = userModule;

	public name = 'ok cool';

	static get firstName(): string {
		return userModule.firstName;
	}

	get fullName(): string {
		return this.userModule.firstName;
	}

	static created(): void {
		userModule.setFirstName('Foo');
	}
}
</script>
