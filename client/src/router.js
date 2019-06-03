import Router from 'vue-router';
// eslint-disable-next-line
import authMdw from './middlewares/auth-middleware';

import About from './views/About.vue';
import Login from './views/Login.vue';

// Page Layout
import Page from './layouts/Page.vue';

// Admin
import AdminLayout from './layouts/admin/index.vue';
import Events from './views/admin/Events.vue';
import Team from './views/admin/Team.vue';
import Analytics from './views/admin/Analytics.vue';

// Anonymous
import AnonymousLayout from './layouts/anonymous/index.vue';
import Questions from './views/anonymous/Questions.vue';
import Polls from './views/anonymous/Polls.vue';
import Ideas from './views/anonymous/Ideas.vue';

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
					component: AdminLayout,
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
					component: AnonymousLayout,
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
