export default {
	auth: {
		login: '/api/auth/login',
		logout: '/api/auth/logout',
		info: '/api/auth/info',
		update: '/api/auth/update',
		signup: '/api/auth/signup',
		quickSignup: '/api/auth/quick-signup',
		updateQSignup: '/api/auth/complete-signup',
	},
	event: {
		query: '/api/event/query',
		create: '/api/event/create',
		search: '/api/event/find',
	},
	role: {
		query: '/api/role/query',
		resRequest: '/api/role/response',
	},
};
