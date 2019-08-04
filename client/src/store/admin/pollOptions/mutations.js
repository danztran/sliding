/* ------------------------------------------------------------------------
	@desc: set pollOptions
	@socket: after emiter 'get-poll-options'
	@source: cpn/polls/admin/DialogHandlePoll.vue
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
	@desc: after socket return data merge to option if had query yet.
	@socket: emiter 'edit-poll-option'
	@source: cpn/polls/admin/DialogHandlePoll.vue
------------------------------------------------------------------------*/
const MERGE_POLL_OPTION = (state, newOptInfo) => {
	const findOpts = state.pollOptions.find(el => Number(el.poll_id) === Number(newOptInfo.poll_id));
	if (findOpts) {
		const oldOpt = findOpts.options.find(opt => Number(opt.id) === Number(newOptInfo.id));
		Object.assign(oldOpt, newOptInfo);
	}
};


/* ------------------------------------------------------------------------
	@desc: socket return result, remove option with id
	@socket: emiter 'delete-poll-option'
	@source: cpn/polls/admin/DialogHandlePoll.vue
------------------------------------------------------------------------*/
const DELETE_POLL_OPTION = (state, info) => {
	const rs = state.pollOptions.find(el => Number(el.poll_id) === Number(info.poll_id));
	if (rs) {
		rs.options.filter(el => Number(el.id) !== Number(info.id));
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
	DELETE_POLL_OPTION,
	MERGE_POLL_OPTION,
	RESET,
};
