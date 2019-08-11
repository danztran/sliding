/* ------------------------------------------------------------------------
	@desc: using for add and setter
	@socket:emiter 'get-all-poll-options' - views/admin/poll
					listen 'new_added_poll_option' - cpn/polls/DialogHandlePoll
					emiter 'add-poll-option' - cpn/polls/DialogHandlePoll
------------------------------------------------------------------------*/
const SET_POLL_OPTION = (state, option) => {
	const rs = state.pollOptions.find(el => Number(el.poll_id) === Number(option.poll_id));
	if (rs) {
		rs.options.push(option);
	}
	else {
		state.pollOptions.push({
			poll_id: option.poll_id,
			options: [option],
		});
	}
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
		rs.options = rs.options.filter(el => Number(el.id) !== Number(info.id));
	}
};


/* ------------------------------------------------------------------------
	@desc: RESET when leaving event
------------------------------------------------------------------------*/
const RESET = (state) => {
	state.pollOptions = [];
};


export default {
	DELETE_POLL,
	SET_POLL_OPTION,
	DELETE_POLL_OPTION,
	MERGE_POLL_OPTION,
	RESET,
};
