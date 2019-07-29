/* ------------------------------------------------------------------------
	@desc: setting current info event when join event
	@socket: listener 'get_event'
	@source: layout/guest/index.vue
------------------------------------------------------------------------*/
const SET_CURRENT_EVENT = (state, resData) => {
	state.eventInfo = resData.event;
	state.role = resData.role;
};


/* ------------------------------------------------------------------------
	@desc: guest listen admin setting event success, then merge
	@socket: listener 'new_edited_event'
	@source: layout/guest/index.vue
------------------------------------------------------------------------*/
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
