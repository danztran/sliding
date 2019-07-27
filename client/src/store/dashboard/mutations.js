/* ------------------------------------------------------------------------
	@desc: set list events after query
------------------------------------------------------------------------*/
const SET_EVENTS = (state, events) => {
	state.events = events;
};


/* ------------------------------------------------------------------------
	@desc: emiter socket query list iniites
	@socket: emiter 'query-invites'
	@source: cpn/user/userActionsAvatar.vue
------------------------------------------------------------------------*/
const SET_INVITES = (state, invites) => {
	state.invites = invites;
};


/* ------------------------------------------------------------------------
	@desc: listen admin, add new moderator
	@socket: emiter 'new_invited_to_event'
	@source: layouts/Page.vue
------------------------------------------------------------------------*/
const ADD_INVITE = (state, newInviteInfo) => {
	const invite = {
		event: {
			...newInviteInfo,
		},
		event_id: newInviteInfo.id,
		is_accepted: null,
		role: 'moderator',
	};
	state.invites.push(invite);
};

/* ------------------------------------------------------------------------
	@desc: listen admin remove invite
	@socket: listen 'new_removed_from_event'
	@source: layouts/Page.vue
------------------------------------------------------------------------*/
const DELETE_INVITE = (state, inviteEvent) => {
	const idx = state.invites.findIndex(i => Number(i.event_id) === Number(inviteEvent.id));
	if (!idx) return;
	state.invites.splice(idx, 1);
};


/* ------------------------------------------------------------------------
	@desc: after emiter response invite request
	@socket: emiter 'response-invited'
	@source: cpn/user/pieces/InviteInfoCard.vue
------------------------------------------------------------------------*/
const MERGE_RESPONSE_INVITE = (state, resInvite) => {
	const invite = state.invites.find(el => Number(el.event_id) === Number(resInvite.event_id));
	if (!invite) return;
	Object.assign(invite, resInvite);
};


const ADD_NEW_EVENT = (state, newEvent) => {
	state.events.unshift(newEvent);
};


/* ------------------------------------------------------------------------
	@desc: after logout reset state
------------------------------------------------------------------------*/
const RESET = (state) => {
	state.events = [];
	state.invites = [];
};

export default {
	SET_EVENTS,
	SET_INVITES,
	ADD_INVITE,
	DELETE_INVITE,
	MERGE_RESPONSE_INVITE,
	ADD_NEW_EVENT,
	RESET,
};
