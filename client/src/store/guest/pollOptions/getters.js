const getPollOptions = state => (pollID) => {
	const pollOpts = state.pollOptions.find(el => Number(el.poll_id) === Number(pollID));
	return pollOpts ? pollOpts.options : [];
};

export default {
	getPollOptions,
};
