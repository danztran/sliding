import cookies from '@/modules/vue-cookies-custom';

const AuthMdw = {
	guard(to, from, next) {
		if (!AuthMdw.isAuthenticated()) {
			cookies.set('redirected', true);
			return next({ name: 'login' });
		}
		return next();
	},

	beforeEnterLogin(to, from, next) {
		if (AuthMdw.isAuthenticated()) {
			return next({ name: 'dashboard' });
		}
		return next();
	},

	isAuthenticated(to, from, next) {
		return Boolean(cookies.get(process.env.VUE_APP_CK_USER));
	},
};
export default AuthMdw;
