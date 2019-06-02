const authMdw = {
	// async guard(to, from, next) {
	// 	if (store.state.auth.loggedIn) {
	// 		return next();
	// 	}
	// 	await store.dispatch('auth/checkAuth');

	// 	if (store.state.auth.loggedIn) {
	// 		next();
	// 	}
	// 	else {
	// 		return router.push({ name: 'login' });
	// 	}
	// 	return next();
	// }
	guard(to, from, next) {
		return next();
	}
};
export default authMdw;
