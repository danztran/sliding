import cookies from '@/modules/vue-cookies-custom';
import axios from '@/modules/axios-custom';
import _cm from '@/modules/common-methods';

const login = (context, userData) => {
	axios.post('/auth/login', userData)
		.then((res) => {
			context.commit('SET_CURRENT_USER', res.data);
			cookies.set('user', res.data.user);
		})
		// eslint-disable-next-line
		.catch(err => console.log(err));
};

const checkAuth = (context) => {
	_cm.notEmpty(cookies.get('user'));
};

export default {
	login,
	checkAuth
};
