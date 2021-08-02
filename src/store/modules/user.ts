import {
	VuexModule,
	Module,
	Mutation,
	// Action,
} from 'vuex-class-modules';
import store from '../index';

@Module
class UserModule extends VuexModule {
	firstName = 'Foo';

	lastName = 'Bar';

	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	@Mutation
	setFirstName(firstName: string) {
		this.firstName = firstName;
	}

	@Mutation
	setLastName(lastName: string) {
		this.lastName = lastName;
	}
}

export default new UserModule({ store, name: 'user' });
