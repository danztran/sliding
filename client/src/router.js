import Router from 'vue-router';
// eslint-disable-next-line
import authMdw from './middlewares/auth-middleware';

import About from './views/About.vue';
import Login from './views/Login.vue';

// Page Layout
import Page from './layouts/Page.vue';

// Admin
import UserLayout from './layouts/admin/index.vue';
import Events from './views/admin/Events.vue';
import Team from './views/admin/Team.vue';
import Analytics from './views/admin/Analytics.vue';

// Guest
import GuestLayout from './layouts/guest/index.vue';
import Questions from './views/guest/Questions.vue';
import Polls from './views/guest/Polls.vue';
import Ideas from './views/guest/Ideas.vue';

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			component: Page,
			children: [
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
					path: '/',
					component: UserLayout,
					beforeEnter: authMdw.guard,
					name: 'admin',
					redirect: '/admin/events',
					children: [
						{
							path: '/admin/events',
							name: 'events',
							component: Events,
							meta: {
								title: 'Events'
							}
						},
						{
							path: '/admin/team',
							name: 'team',
							component: Team,
							meta: {
								title: 'Team'
							}
						},
						{
							path: '/admin/analytics',
							name: 'dashboard',
							component: Analytics,
							meta: {
								title: 'Analytics'
							}
						}
					]
				},
				{
					path: '/anonymous',
					component: GuestLayout,
					redirect: '/anonymous/questions',
					children: [
						{
							path: '/anonymous/questions',
							name: 'questions',
							component: Questions,
							meta: {
								title: 'Questions'
							}
						},
						{
							path: '/anonymous/polls',
							name: 'polls',
							component: Polls,
							meta: {
								title: 'Polls'
							}
						},
						{
							path: '/anonymous/ideas',
							name: 'ideas',
							component: Ideas,
							meta: {
								title: 'Ideas'
							}
						}
					]
				}
			]
		}
	]
});

router.afterEach((to, from) => {
	document.title = `${to.meta.title || ' '}`;
});

export default router;
