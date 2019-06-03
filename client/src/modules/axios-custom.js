import axios from 'axios';
import router from '@/router';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
	response => response,
	(error) => {
		if (error.response) {
			if (error.response.status === 401) {
				router.push({ name: 'login' });
			}
		}
		else {
			return Promise.reject(new Error('Server not responding.'));
		}

		return Promise.reject(error.response.data);
	}
);

export default axios;
