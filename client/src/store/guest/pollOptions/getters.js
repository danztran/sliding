const getAllPollOptions = state => state.pollOptions;

const getPollOptions = state => (pollID) => {
	const options = state.pollOptions.filter(el => el.poll_id == pollID);
	return options;
};

export default {
	getAllPollOptions,
	getPollOptions,
};
