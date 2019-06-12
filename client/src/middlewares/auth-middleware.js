import cookies from '@/modules/vue-cookies-custom';
// eslint-disable-next-line
import router from '@/router';

const AuthMdw = {
	guard(to, from, next) {
		if (!AuthMdw.isAuthenticated()) {
			return router.push({ name: 'login' });
		}
		return next();
	},

	beforeEnterLogin(to, from, next) {
		if (AuthMdw.isAuthenticated()) {
			return router.push({ name: 'dashboard' });
		}
		return next();
	},

	isAuthenticated(to, from, next) {
		return Boolean(cookies.get(process.env.VUE_APP_CK_USER));
	}
};
export default AuthMdw;
