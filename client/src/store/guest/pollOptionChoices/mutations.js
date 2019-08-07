// const SET_POLL_OPTION_CHOICES = (state, choices) => {
// 	state.pollOptionChoices = choices;
// };

const SET_POLL_OPTION_CHOICES = (state, choice) => {
	const rs = state.pollOptionChoices.find(el => Number(el.poll_id) === Number(choice.poll_id));
	if (rs) {
		rs.choices.push(choice);
	}
	else {
		state.pollOptionChoices.push({
			poll_id: choice.poll_id,
			choices: [choice],
		});
	}
};

export default {
	SET_POLL_OPTION_CHOICES,
};
