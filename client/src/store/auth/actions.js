import router from '@/router';
import _cm from '@/modules/common-methods';
import cookies from '@/modules/vue-cookies-custom';
const { VUE_APP_CK_USER, VUE_APP_CK_FLASH_MESSAGE } = process.env;

const setAuth = (context, userData) => {
	context.commit('SET_CURRENT_USER', userData);
	cookies.set(
		VUE_APP_CK_USER,
		userData
	);
};

const checkAuth = (context) => {
	if (!_cm.notEmpty(cookies.get(VUE_APP_CK_USER))) {
		router.push({ name: 'login' });
	}
};

const logout = (context, data) => {
	context.dispatch('resetAll', {}, { root: true });
	cookies.remove(VUE_APP_CK_USER);
	cookies.set(
		VUE_APP_CK_FLASH_MESSAGE,
		data.messages['auth.logout']
	);
	router.push({ name: 'login' });
};

const signup = (context, data) => {
	context.commit('SET_INFO_AFTER_SIGNUP', data);
	cookies.set(
		VUE_APP_CK_FLASH_MESSAGE,
		data.messages['auth.signup']
	);
	router.push({ name: 'login' });
};

export default {
	setAuth,
	checkAuth,
	logout,
	signup
};
