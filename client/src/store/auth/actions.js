import router from '@/router';
import _cm from '@/modules/common-methods';
import cookies from '@/modules/vue-cookies-custom';
import api from '@/api';
import axios from '@/modules/axios-custom';
const { env } = process;

const setAuth = (context, userData) => {
	context.commit('SET_CURRENT_USER', userData);
	cookies.set(env.VUE_APP_CK_USER, userData);
};

const checkAuth = (context) => {
	if (!_cm.notEmpty(cookies.get(env.VUE_APP_CK_USER))) {
		router.push({ name: 'login' });
	}
};

const logout = (context) => {
	axios.get(api.auth.logout)
		.then((res) => {
			context.commit('CLEAR_CURRENT_USER');
			cookies.set(env.VUE_APP_CK_FLASH_MESSAGE, res.data.messages['auth.logout']);
			router.push({ name: 'login' });
		});
};

export default {
	setAuth,
	logout,
	checkAuth
};
