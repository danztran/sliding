/* ------------------------------------------------------------------------
	@desc: get all polls set to state
	@socket: emiter 'get-polls'
	@source: views/admin/Polls.vue
------------------------------------------------------------------------*/
const SET_POLLS = (state, polls) => {
	state.polls = polls;
};


/* ------------------------------------------------------------------------
	@desc: get all polls set to state
	@socket: emiter 'add-poll'
	@source: cpn/polls/admin/DialogCreatePoll.vue
------------------------------------------------------------------------*/
const ADD_POLL = (state, poll) => {
	state.polls.unshift(poll);
};


/* ------------------------------------------------------------------------
	@desc: delete poll after socket return data
	@socket: emiter 'delete-poll'
	@source: cpn/polls/admin/PollListPanel.vue
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
	DELETE_POLL,
	RESET,
};
