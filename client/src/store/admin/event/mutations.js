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


/* ------------------------------------------------------------------------
	@desc: admin add new moderator
	@socket: emiter 'add-moderator'
	@source: cpn/settings/EventSettingInviteAdmin.vue
------------------------------------------------------------------------*/
const ADD_MODERATOR = (state, moderator) => {
	state.eventInfo.admins.unshift(moderator);
};


/* ------------------------------------------------------------------------
	@desc: admin revoke(remove) moderator
	@socket: emiter 'add-moderator'
	@source: cpn/settings/EventSettingInviteAdmin.vue
------------------------------------------------------------------------*/
const DELETE_MODERATOR = (state, userId) => {
	const idx = state.eventInfo.admins.findIndex(us => Number(us.user_id) === Number(userId));
	state.eventInfo.admins.splice(idx, 1);
};


/* ------------------------------------------------------------------------
	@desc: after user reponse invite request
	@socket: listen 'new_edited_role'
	@source: layouts/admin/index.vue
------------------------------------------------------------------------*/
const MERGE_RESPONSE_INVITE = (state, response) => {
	const invite = state.eventInfo.admins.find(us => Number(us.user_id) === Number(response.user_id));
	Object.assign(invite, response);
};


/* ------------------------------------------------------------------------
	@desc: after leave event or logout
------------------------------------------------------------------------*/
const RESET = (state) => {
	state.eventInfo = null;
	state.role = null;
	state.tempSettings = {};
};

export default {
	SET_CURRENT_EVENT,
	MERGE_TEMP_SETTINGS,
	MERGE_CURRENT_EVENT,
	ADD_MODERATOR,
	DELETE_MODERATOR,
	MERGE_RESPONSE_INVITE,
	RESET,
};
