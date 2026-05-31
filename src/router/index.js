import { createRouter, createWebHashHistory } from 'vue-router'
import Grid from '../views/Grid.vue'

const routes = [
	{
		path: '/',
		name: 'grid',
		component: Grid,
	},
	{
		path: '/Pages',
		name: 'Pages',
		component: () => import('../views/Pages.vue'),
	},
	{
		path: '/About',
		name: 'About',
		component: () => import('../views/About.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
