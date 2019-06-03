import _cm from '@/modules/common-methods';

const SET_CURRENT_USER = (state, user) => {
	state.loggedIn = true;
	state.userData = user;
};

const CHECK_AUTH = (state, user) => {
	if (_cm.notEmpty(user)) {
		state.loggedIn = true;
		state.userData = user;
	}
	else {
		state.loggedIn = false;
		state.userData = null;
	}
};

export default {
	SET_CURRENT_USER,
	CHECK_AUTH
};
