/* ------------------------------------------------------------------------
	@desc: set pollOptions
	@socket: after emiter 'get-poll-options'
	@source: cpn/polls/admin/PollListPanel.vue
------------------------------------------------------------------------*/
const SET_POLL_OPTIONS = (state, pollOptions) => {
	state.pollOptions.push(pollOptions);
};


/* ------------------------------------------------------------------------
	@desc: delete poll success, then delete pollOptions
	@socket: emiter 'delete-poll'
	@source: cpn/polls/admin/PollCard.vue
------------------------------------------------------------------------*/
const DELETE_POLL = (state, pollID) => {
	state.pollOptions = state.pollOptions.filter(poll => Number(poll.poll_id) !== Number(pollID));
};


/* ------------------------------------------------------------------------
	@desc:
	@socket: emiter ''
	@source:
------------------------------------------------------------------------*/
const ADD_POLL_OPTION = (state, info) => {
	const rs = state.pollOptions.find(el => Number(el.poll_id) === Number(info.poll_id));
	if (rs) {
		rs.options.push(info.option);
	}
	else {
		state.pollOptions.push({
			poll_id: info.poll_id,
			options: [info.option],
		});
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
	DELETE_POLL,
	ADD_POLL_OPTION,
	RESET,
};
