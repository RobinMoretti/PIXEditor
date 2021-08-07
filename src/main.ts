import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

import EventBus from 'vue-bus-ts';
Vue.use(EventBus);
var bus = new EventBus.Bus();

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
