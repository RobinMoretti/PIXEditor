import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Book from '../views/Book.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: 'Book',
		component: Book,
	},
	{
		path: '/Pages',
		name: 'Pages',
		component: () => import(/* webpackChunkName: "about" */ '../views/Pages.vue'),
	},
	{
		path: '/Grids',
		name: 'Grids',
		component: () => import(/* webpackChunkName: "about" */ '../views/Grids.vue'),
	},
	{
		path: '/About',
		name: 'About',
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
];

const router = new VueRouter({
	routes,
});

export default router;
