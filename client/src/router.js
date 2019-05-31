import Router from 'vue-router';

import Home from './views/Home.vue';
import About from './views/About.vue';
import Login from './views/Login.vue';
import Dashboard from './views/layouts/dashboard/index.vue';

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				title: 'Home page'
			}
		},
		{
			path: '/about',
			name: 'about',
			component: About,
			meta: {
				title: 'About'
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				title: 'Login'
			}
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			component: Dashboard,
			meta: {
				title: 'Dashboard'
			}
		}
	]
});

router.afterEach((to, from) => {
	document.title = `${to.meta.title || ' '}`;
});

export default router;
