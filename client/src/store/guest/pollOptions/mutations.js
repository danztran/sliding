/* ------------------------------------------------------------------------
	@desc: query options success set to state
	@socket:
	@source: cpn/polls/guest/PollCard.vue
------------------------------------------------------------------------*/
const SET_POLL_OPTIONS = (state, options) => {
	state.pollOptions = options;
};


/* ------------------------------------------------------------------------
	@desc:
	@socket:
	@source:
	@choice: (socket return)
		.user_id: ID of user choice
		.poll_id: choice on Poll ID
		.poll_option_id: choce Option ID
------------------------------------------------------------------------*/
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
		state.pollOptions = [...pollOptions];
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
	SET_POLL_OPTION_CHOICES,
	EDIT_POLL_OPTION_CHOICES,
	RESET,
};
