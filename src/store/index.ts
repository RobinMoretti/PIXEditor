import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

// define your typings for the store state
export interface State {
	// mousePosition: object,
	canUpdateMousePosition: boolean
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
	state: {
		canUpdateMousePosition: false,
	},
	mutations: {
		// updateMousePostion: function(state, position){
		// 	state.mousePosition = position;
		// },
		// toggleMouseTracker: function(state, value = null){
		// 	if(value != null)
		// 		state.updateMousePosBool = value;
		// 	else
		// 		state.updateMousePosBool = !state.updateMousePosBool;
		// },
	},
	actions: {
	},
	modules: {
	}
})


// define your own `useStore` composition function
export function useStore () {
	return baseUseStore(key)
}