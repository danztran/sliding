import api from '@/api';
import router from '@/router';
import axios from '@/modules/axios-custom';
import _cm from '@/modules/common-methods';
import cookies from '@/modules/vue-cookies-custom';

const login = (context, userData) => {
	axios.post(api.auth.login, userData)
		.then((res) => {
			context.commit('SET_CURRENT_USER', res.data);
			cookies.set('user', res.data.user);
			router.push({ name: 'admin' });
		})
		.catch((err) => {
			// eslint-disable-next-line
			console.log(err);
			router.push({ name: 'login' });
		});
};

const checkAuth = (context) => {
	if (!_cm.notEmpty(cookies.get('user'))) {
		router.push({ name: 'login' });
	}
};

export default {
	login,
	checkAuth
};
