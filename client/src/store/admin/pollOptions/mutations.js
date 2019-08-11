/* ------------------------------------------------------------------------
	@desc:
	@socket:
------------------------------------------------------------------------*/
const SET_POLL_OPTIONS = (state, options) => {
	state.pollOptions = options;
};


const ADD_POLL_OPTION = (state, option) => {
	state.pollOptions.push(option);
};


/* ------------------------------------------------------------------------
	@desc:
	@socket: emiter 'delete-poll'
	@source: cpn/polls/admin/PollCard.vue
------------------------------------------------------------------------*/
const DELETE_POLL = (state, pollID) => {
	state.pollOptions = state.pollOptions.filter(poll => poll.poll_id != pollID);
};


/* ------------------------------------------------------------------------
	@desc:
	@socket: emiter 'edit-poll-option'
	@source: cpn/polls/admin/DialogHandlePoll.vue
------------------------------------------------------------------------*/
const MERGE_POLL_OPTION = (state, newOptInfo) => {
	const opt = state.pollOptions.find(el => el.id == newOptInfo.id);
	if (opt) {
		Object.assign(opt, newOptInfo);
	}
};


/* ------------------------------------------------------------------------
	@desc:
	@socket: emiter 'delete-poll-option'
	@source: cpn/polls/admin/DialogHandlePoll.vue
------------------------------------------------------------------------*/
const DELETE_POLL_OPTION = (state, info) => {
	const optIdx = state.pollOptions.findIndex(o => o.id == info.id);
	if (optIdx !== -1) {
		state.pollOptions.splice(optIdx, 1);
	}
};


/* ------------------------------------------------------------------------
	@desc: RESET when leaving event
------------------------------------------------------------------------*/
const RESET = (state) => {
	state.pollOptions = [];
};


export default {
	SET_POLL_OPTIONS,
	ADD_POLL_OPTION,
	DELETE_POLL_OPTION,
	MERGE_POLL_OPTION,
	DELETE_POLL,
	RESET,
};
