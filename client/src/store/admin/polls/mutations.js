/* ------------------------------------------------------------------------
	@desc: get all polls set to state
	@socket: emiter 'get-polls'
	@source: views/admin/Polls.vue
------------------------------------------------------------------------*/
const SET_POLLS = (state, polls) => {
	state.polls = polls;
};


/* ------------------------------------------------------------------------
	@desc: set info for trigger socket emiter
	@socket:
	@source:
------------------------------------------------------------------------*/
const SET_EDIT_POLL_INFO = (state, info) => {
	state.editInfo = info;
};


/* ------------------------------------------------------------------------
	@desc:- add new poll to state if success
				- listener other user added poll
	@socket:- emiter 'add-poll'
					- listener 'new_added_poll'
	@source:- cpn/polls/admin/DialogCreatePoll.vue
					- views/admin/Polls.vue
------------------------------------------------------------------------*/
const ADD_POLL = (state, poll) => {
	state.polls.unshift(poll);
};


/* ------------------------------------------------------------------------
	@desc:- lister and merge new info
				- edit success then merge
	@socket:- listener 'new_edited_poll'
					- emiter 'edit-poll'
	@source:- views/admin/Polls.vue
					- cpn/polls/admin/DialogHandlePoll.vue
------------------------------------------------------------------------*/
const MERGE_POLL = (state, newInfo) => {
	const poll = state.polls.find(el => Number(el.id) === Number(newInfo.id));
	Object.assign(poll, newInfo);
};


/* ------------------------------------------------------------------------
	@desc:- delete poll after socket return data
				- listen delete poll
	@socket:- emiter 'delete-poll'
					- listener 'new_deleted_poll'
	@source:- cpn/polls/admin/PollListPanel.vue
					- views/admin/Polls.vue
------------------------------------------------------------------------*/
const DELETE_POLL = (state, result) => {
	state.polls = state.polls.filter(el => Number(el.id) !== Number(result.id));
};


/* ------------------------------------------------------------------------
	@desc: when leave event clear state
------------------------------------------------------------------------*/
const RESET = (state) => {
	state.polls = [];
	state.editInfo = null;
};

export default {
	SET_POLLS,
	SET_EDIT_POLL_INFO,
	ADD_POLL,
	MERGE_POLL,
	DELETE_POLL,
	RESET,
};
