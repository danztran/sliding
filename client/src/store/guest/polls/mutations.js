/* ------------------------------------------------------------------------
	@desc: get all polls set to state
	@socket: emiter 'get-polls'
	@source: views/admin/Polls.vue
------------------------------------------------------------------------*/
const SET_POLLS = (state, polls) => {
	state.polls = polls;
};


/* ------------------------------------------------------------------------
	@desc: when leave event clear state
------------------------------------------------------------------------*/
const RESET = (state) => {
	state.polls = [];
};

export default {
	SET_POLLS,
	RESET,
};
