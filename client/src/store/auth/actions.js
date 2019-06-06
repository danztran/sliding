import router from '@/router';
import _cm from '@/modules/common-methods';
import cookies from '@/modules/vue-cookies-custom';

const setAuth = (context, userData) => {
	context.commit('SET_CURRENT_USER', userData);
	cookies.set('user', userData);
};

const checkAuth = (context) => {
	if (!_cm.notEmpty(cookies.get('user'))) {
		router.push({ name: 'login' });
	}
};

export default {
	setAuth,
	checkAuth
};
