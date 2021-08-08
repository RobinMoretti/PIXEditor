import Vue from 'vue';
import EventBus from 'vue-bus-ts';
import './registerServiceWorker';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import store from './store';

import App from './App.vue';

Vue.use(VueAxios, axios);
Vue.use(EventBus);
const bus = new EventBus.Bus();

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	bus,
	render: (h) => h(App),
}).$mount('#app');
