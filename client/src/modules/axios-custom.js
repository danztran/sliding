import axios from 'axios';
import router from '@/router';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL || '';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
	response => response,
	(error) => {
		let errorResult = {};
		if (error.response) {
			if (error.response.status === 401) {
				router.push({ name: 'login' });
			}
			errorResult = error.response.data;
		}
		else {
			errorResult = { messages: 'Server not responding' };
		}
		return Promise.reject(errorResult);
	}
);

export default axios;
