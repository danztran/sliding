const SET_CURRENT_EVENT = (state, resData) => {
	state.eventInfo = resData.event;
	state.role = resData.role;
};

const MERGE_CURRENT_EVENT = (state, newInfo) => {
	state.eventInfo = { ...state.eventInfo, ...newInfo };
};

const RESET = (state) => {
	state.eventInfo = null;
	state.role = null;
};

export default {
	SET_CURRENT_EVENT,
	MERGE_CURRENT_EVENT,
	RESET,
};
