import _cm from '@/modules/common-methods';

const SET_CURRENT_USER = (state, user) => {
	state.loggedIn = true;
	state.userData = user;
};

const RESET = (state) => {
	state.loggedIn = false;
	state.userData = null;
};

const CHECK_AUTH = (state, user) => {
	if (_cm.notEmpty(user)) {
		SET_CURRENT_USER(state, user);
	}
	else {
		RESET(state);
	}
};

const FILL_LOGIN_AFTER_SIGNUP = (state, user) => {
	state.fillInfo.username = user.username;
	state.fillInfo.password = user.password;
};

export default {
	SET_CURRENT_USER,
	RESET,
	CHECK_AUTH,
	FILL_LOGIN_AFTER_SIGNUP
};
