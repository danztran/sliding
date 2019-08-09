const getPollOptions = state => (pollID) => {
	const poll = state.pollOptions.find(el => Number(el.poll_id) === Number(pollID));
	return poll ? poll.options : [];
};

const getPollOptChoices = state => (pollID) => {
	const poll = state.optionChoices.find(el => Number(el.poll_id) === Number(pollID));
	return poll ? poll.choices : [];
};

export default {
	getPollOptions,
	getPollOptChoices,
};
