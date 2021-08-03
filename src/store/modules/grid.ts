import {
	VuexModule,
	Module,
	Mutation,
	// Action,
} from 'vuex-class-modules';
import store from '../index';

@Module
class GridModule extends VuexModule {
	cellsInteraction = {
		clicked: false,
	};


	@Mutation
	toggleCellsInteractionClicked(clickState?: boolean | null) {
		if(clickState != null){
			this.cellsInteraction.clicked = clickState;
		}
		else{
			this.cellsInteraction.clicked = !this.cellsInteraction.clicked;
		}
	}
}

export default new GridModule({ store, name: 'grid' });
