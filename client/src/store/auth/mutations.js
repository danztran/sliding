import _cm from '@/modules/common-methods';

const SET_CURRENT_USER = (state, user) => {
	state.loggedIn = true;
	state.userData = user;
};

const CLEAR_CURRENT_USER = (state) => {
	state.loggedIn = false;
	state.userData = null;
};

const CHECK_AUTH = (state, user) => {
	if (_cm.notEmpty(user)) {
		SET_CURRENT_USER(state, user);
	}
	else {
		CLEAR_CURRENT_USER(state);
	}
};

export default {
	SET_CURRENT_USER,
	CLEAR_CURRENT_USER,
	CHECK_AUTH
};
