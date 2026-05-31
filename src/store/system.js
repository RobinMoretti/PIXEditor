import { defineStore } from 'pinia'
import { useGridStore } from './grid'

export const useSystemStore = defineStore('system', {
	state: () => ({
		zoom: 1,
		mouse: {
			clicked: false,
		},
	}),

	actions: {
		toggleClicked(clickState = null) {
			if (clickState != null) {
				this.mouse.clicked = clickState
			} else {
				this.mouse.clicked = !this.mouse.clicked
			}

			if (this.mouse.clicked === false) {
				const gridStore = useGridStore()
				gridStore.toggleCellsInteractionClicked(false)
			}
		},

		disableOtherClick() {
			const gridStore = useGridStore()
			gridStore.toggleCellsInteractionClicked(false)
		},

		updateZoom(value) {
			this.zoom = value
		},
	},
})
