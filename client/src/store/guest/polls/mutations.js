/* ------------------------------------------------------------------------
	@desc: after join event, get all polls then set to state
	@socket: emiter 'get-polls'
	@source: views/admin/Polls.vue
------------------------------------------------------------------------*/
const SET_POLLS = (state, polls) => {
	state.polls = polls;
};


/* ------------------------------------------------------------------------
	@desc: listen admin added new poll set to state
	@socket: listener 'new_added_poll'
	@source: views/guest/Polls.vue
------------------------------------------------------------------------*/
const ADD_POLL = (state, poll) => {
	state.polls.unshift(poll);
};


/* ------------------------------------------------------------------------
	@desc: listen admin edit poll, then merger
	@socket: 'new_edited_poll'
	@source: views/guest/Polls.vue
------------------------------------------------------------------------*/
const MERGE_POLL = (state, newInfo) => {
	const poll = state.polls.find(el => Number(el.id) === Number(newInfo.id));
	Object.assign(poll, newInfo);
};


/* ------------------------------------------------------------------------
	@desc: listen admin delete poll
	@socket: listener 'new_deleted_poll'
	@source: views/guest/Polls.vue
------------------------------------------------------------------------*/
const DELETE_POLL = (state, result) => {
	state.polls = state.polls.filter(el => Number(el.id) !== Number(result.id));
};


/* ------------------------------------------------------------------------
	@desc: when leave event clear state
------------------------------------------------------------------------*/
const RESET = (state) => {
	state.polls = [];
};

export default {
	SET_POLLS,
	ADD_POLL,
	MERGE_POLL,
	DELETE_POLL,
	RESET,
};
