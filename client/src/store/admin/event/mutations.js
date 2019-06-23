const SET_CURRENT_EVENT = (state, resData) => {
	state.eventInfo = resData.event;
	state.role = resData.role;
};

const SET_TEMP_SETTING = (state, temp) => {
	state.tempSetting = { ...state.tempSetting, ...temp };
};

const MERGE_CURRENT_EVENT = (state, newInfo) => {
	state.eventInfo = { ...state.eventInfo, ...newInfo };
};

const RESET = (state) => {
	state.eventInfo = {};
	state.role = {};
	state.tempSetting = {};
};

export default {
	SET_CURRENT_EVENT,
	SET_TEMP_SETTING,
	MERGE_CURRENT_EVENT,
	RESET
};
