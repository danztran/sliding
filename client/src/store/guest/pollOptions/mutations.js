/* ------------------------------------------------------------------------
	@desc: query options success set to state
	@socket:
	@source: cpn/polls/guest/PollCard.vue
------------------------------------------------------------------------*/
const SET_POLL_OPTIONS = (state, options) => {
	state.pollOptions.push({
		...options,
	});
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
const SET_POLL_OPTION_CHOICE = (state, choice) => {
	const userID = Number(choice.user_id);
	const rs = state.optionChoices.find(el => Number(el.poll_id) === Number(choice.poll_id));
	if (rs) {
		const opt = rs.choices.find(el => Number(el.option_id) === Number(choice.poll_option_id));
		if (opt) {
			opt.users = opt.users.indexOf(userID) > -1
				? opt.users
				: [...opt.users, userID];
		}
		else {
			rs.choices.push({
				option_id: choice.poll_option_id,
				users: [userID],
			});
		}
	}
	else {
		state.optionChoices.push({
			poll_id: choice.poll_id,
			choices: [{
				option_id: choice.poll_option_id,
				users: [userID],
			}],
		});
	}
};


/* ------------------------------------------------------------------------
	@desc: RESET when leaving event
------------------------------------------------------------------------*/
const RESET = (state) => {
	state.pollOptions = [];
	state.optionChoices = [];
};


export default {
	SET_POLL_OPTIONS,
	SET_POLL_OPTION_CHOICE,
	RESET,
};
