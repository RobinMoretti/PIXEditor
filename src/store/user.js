import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
	state: () => ({
		firstName: 'Foo',
		lastName: 'Bar',
	}),

	getters: {
		fullName: (state) => `${state.firstName} ${state.lastName}`,
	},

	actions: {
		setFirstName(firstName) {
			this.firstName = firstName
		},
		setLastName(lastName) {
			this.lastName = lastName
		},
	},
})
