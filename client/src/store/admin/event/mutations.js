const SET_CURRENT_EVENT = (state, resData) => {
	state.infoEvent = resData.event;
	state.role = resData.role;
};

const MERGE_CURRENT_EVENT = (state, newInfo) => {
	state.infoEvent = { ...state.infoEvent, ...newInfo };
};

const RESET = (state) => {
	state.infoEvent = {};
	state.role = {};
};

export default {
	SET_CURRENT_EVENT,
	MERGE_CURRENT_EVENT,
	RESET
};
