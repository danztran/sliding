/* ------------------------------------------------------------------------
	@desc:
	@socket:
------------------------------------------------------------------------*/
const SET_POLL_OPTIONS = (state, options) => {
	state.pollOptions = options;
};


const ADD_POLL_OPTION = (state, option) => {
	const newOption = Object.assign(option, { choices: [] });
	state.pollOptions.push(newOption);
	if (state.pollResult.poll && state.pollResult.poll.id == option.poll_id) {
		state.pollResult.pollOptions.push(newOption);
	}
};


/* ------------------------------------------------------------------------
	@desc:
	@socket: emiter 'delete-poll'
	@source: cpn/polls/admin/PollCard.vue
------------------------------------------------------------------------*/
const DELETE_POLL = (state, pollID) => {
	state.pollOptions = state.pollOptions.filter(poll => poll.poll_id != pollID);
	if (state.pollResult.poll && state.pollResult.poll.id == pollID) {
		state.pollResult = {};
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
	if (state.pollResult.poll && state.pollResult.poll.id == newOptInfo.poll_id) {
		const optInResult = state.pollResult.pollOptions.find(el => el.id == newOptInfo.id);
		if (optInResult) {
			Object.assign(optInResult, newOptInfo);
		}
	}
};


/* ------------------------------------------------------------------------
	@desc:
	@socket: emiter 'delete-poll-option'
	@source: cpn/polls/admin/DialogHandlePoll.vue
------------------------------------------------------------------------*/
const DELETE_POLL_OPTION = (state, deleteOpt) => {
	const optIdx = state.pollOptions.findIndex(o => o.id == deleteOpt.id);
	if (optIdx !== -1) {
		state.pollOptions.splice(optIdx, 1);
	}
	if (state.pollResult.poll && state.pollResult.poll.id == deleteOpt.poll_id) {
		const rsOptIdx = state.pollResult.pollOptions.findIndex(o => o.id == deleteOpt.id);
		if (rsOptIdx !== -1) {
			state.pollResult.pollOptions.splice(rsOptIdx, 1);
		}
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

		// check poll result available, check result pollID same as current poll option editted
		if (state.pollResult.poll
			&& state.pollResult.poll.id == currentPollOptions[0].poll_id) {
			state.pollResult = {
				...state.pollResult,
				pollOptions: currentPollOptions,
			};
		}
	}
};

const SET_POLL_RESULT = (state, info) => {
	state.pollResult = info;
};


/* ------------------------------------------------------------------------
	@desc: RESET when leaving event
------------------------------------------------------------------------*/
const RESET = (state) => {
	state.pollOptions = [];
	state.pollResult = null;
};


export default {
	SET_POLL_OPTIONS,
	ADD_POLL_OPTION,
	DELETE_POLL_OPTION,
	MERGE_POLL_OPTION,
	DELETE_POLL,
	SET_POLL_OPTION_CHOICES,
	EDIT_POLL_OPTION_CHOICES,
	SET_POLL_RESULT,
	RESET,
};
