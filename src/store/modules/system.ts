import {
	VuexModule,
	Module,
	Mutation,
	// Action,
} from 'vuex-class-modules';
import store from '../index';

import gridModule from './grid';

@Module
class SystemModule extends VuexModule {
	gridModule = gridModule;

	mouse = {
		clicked: false,
	};

	@Mutation
	toggleClicked(clickState: boolean | null = null) {
		if (clickState != null) {
			this.mouse.clicked = clickState;
		} else {
			this.mouse.clicked = !this.mouse.clicked;
		}

		if (this.mouse.clicked === false) {
			// reset all other model
			gridModule.toggleCellsInteractionClicked(false);
		}
	}

	@Mutation
	disableOtherClick():void{
		this.gridModule.toggleCellsInteractionClicked(false);
	}
}

export default new SystemModule({ store, name: 'system' });
