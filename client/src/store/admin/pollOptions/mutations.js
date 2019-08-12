/* ------------------------------------------------------------------------
	@desc:
	@socket:
------------------------------------------------------------------------*/
const SET_POLL_OPTIONS = (state, options) => {
	state.pollOptions = options;
};


const ADD_POLL_OPTION = (state, option) => {
	state.pollOptions.push(Object.assign(option, { choices: [] }));
};


/* ------------------------------------------------------------------------
	@desc:
	@socket: emiter 'delete-poll'
	@source: cpn/polls/admin/PollCard.vue
------------------------------------------------------------------------*/
const DELETE_POLL = (state, pollID) => {
	state.pollOptions = state.pollOptions.filter(poll => poll.poll_id != pollID);
	if (state.infoResult.poll && state.infoResult.poll.id == pollID) {
		state.infoResult = {};
	}
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


const SET_POLL_OPTION_CHOICES = (state, choices) => {
	const { pollOptions } = state;
	for (const option of pollOptions) {
		option.choices = choices.filter(el => el.poll_option_id == option.id);
	}
	state.pollOptions = [...pollOptions];
};


const EDIT_POLL_OPTION_CHOICES = (state, choices) => {
	const { pollOptions } = state;
	const userID = choices[0].user_id;
	const pollOptID = choices[0].poll_option_id;
	const pollOpt = pollOptions.find(e => e.id == pollOptID);
	if (pollOpt) {
		// find poll
		const pollID = pollOpt.poll_id;
		// find all options of poll
		const currentPollOptions = pollOptions.filter(e => e.poll_id == pollID);
		for (const option of currentPollOptions) {
			// remove old choices
			const oldChoiceIdx = option.choices.findIndex(c => c.user_id == userID);
			if (oldChoiceIdx !== -1) {
				option.choices.splice(oldChoiceIdx, 1);
			}
			// check and add new choice
			const choiceIdx = choices.findIndex(c => c.poll_option_id == option.id);
			if (choiceIdx !== -1) {
				option.choices.push(choices[choiceIdx]);
			}
		}
	}
};

const SET_INFO_RESULT = (state, info) => {
	state.infoResult = info;
};


/* ------------------------------------------------------------------------
	@desc: RESET when leaving event
------------------------------------------------------------------------*/
const RESET = (state) => {
	state.pollOptions = [];
	state.infoResult = null;
};


export default {
	SET_POLL_OPTIONS,
	ADD_POLL_OPTION,
	DELETE_POLL_OPTION,
	MERGE_POLL_OPTION,
	DELETE_POLL,
	SET_POLL_OPTION_CHOICES,
	EDIT_POLL_OPTION_CHOICES,
	SET_INFO_RESULT,
	RESET,
};
