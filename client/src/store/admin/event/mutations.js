const SET_CURRENT_EVENT = (state, resData) => {
	state.infoEvent = resData.event;
	state.role = resData.role;
};

const RESET = (state) => {
	state.infoEvent = {};
	state.role = {};
};

export default {
	SET_CURRENT_EVENT,
	RESET
};
