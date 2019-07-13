const SET_CURRENT_EVENT = (state, resData) => {
	state.eventInfo = resData.event;
	state.role = resData.role;
	state.tempSettings = resData.event;
};

const MERGE_TEMP_SETTINGS = (state, temp) => {
	state.tempSettings = { ...state.tempSettings, ...temp };
};

const MERGE_CURRENT_EVENT = (state, newInfo) => {
	state.eventInfo = { ...state.eventInfo, ...newInfo };
};

const RESET = (state) => {
	state.eventInfo = {};
	state.role = {};
	state.tempSettings = {};
};

export default {
	SET_CURRENT_EVENT,
	MERGE_TEMP_SETTINGS,
	MERGE_CURRENT_EVENT,
	RESET,
};
