import cookies from '@/modules/vue-cookies-custom';
// eslint-disable-next-line
import router from '@/router';

const authMdw = {
	guard(to, from, next) {
		if (!authMdw.isAuthenticated()) {
			return router.push({ name: 'login' });
		}
		return next();
	},

	isAuthenticated(to, from, next) {
		return Boolean(cookies.get(process.env.VUE_APP_CK_USER));
	}
};
export default authMdw;
