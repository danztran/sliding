/* ------------------------------------------------------------------------
	@desc: setting current info event when join event
	@socket: listener 'get_event'
	@source: layout/guest/index.vue
------------------------------------------------------------------------*/
const SET_CURRENT_EVENT = (state, resData) => {
	state.eventInfo = resData.event;
	state.role = resData.role;
	state.onlineUsers = resData.onlineUsers;
};


/* ------------------------------------------------------------------------
	@desc: guest listen admin setting event success, then merge
	@socket: listener 'new_edited_event'
	@source: layout/guest/index.vue
------------------------------------------------------------------------*/
const MERGE_CURRENT_EVENT = (state, newInfo) => {
	state.eventInfo = { ...state.eventInfo, ...newInfo };
};


/* ------------------------------------------------------------------------
	@desc: new user join, then update
	@socket: listen 'new_updated_online_users'
	@source: layouts/guest/index.vue
------------------------------------------------------------------------*/
const UPDATE_ONLINE_USERS = (state, onlUsers) => {
	state.onlineUsers = onlUsers;
};


const RESET = (state) => {
	state.eventInfo = null;
	state.role = null;
	state.onlineUsers = 0;
};


export default {
	SET_CURRENT_EVENT,
	MERGE_CURRENT_EVENT,
	UPDATE_ONLINE_USERS,
	RESET,
};
