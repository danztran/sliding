import cookies from '@/modules/vue-cookies-custom';
// eslint-disable-next-line
import router from '@/router';

const authMdw = {
	// async guard(to, from, next) {
	// 	if (store.state.auth.loggedIn) {
	// 		return next();
	// 	}
	// 	await store.dispatch('auth/checkAuth');

	// 	if (store.state.auth.loggedIn) {
	// 		next();
	// 	}
	// 	else {
	// 		return router.push({ name: 'login' });
	// 	}
	// 	return next();
	// }
	guard(to, from, next) {
		if (!authMdw.isAuthenticated()) {
			return router.push({ name: 'login' });
		}
		return next();
	},

	isAuthenticated(to, from, next) {
		return Boolean(cookies.get('user'));
	}
};
export default authMdw;
