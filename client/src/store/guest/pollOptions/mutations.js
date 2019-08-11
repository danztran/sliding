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


/* ------------------------------------------------------------------------
	@desc: RESET when leaving event
------------------------------------------------------------------------*/
const RESET = (state) => {
	state.pollOptions = [];
};


export default {
	SET_POLL_OPTIONS,
	SET_POLL_OPTION_CHOICES,
	RESET,
};
