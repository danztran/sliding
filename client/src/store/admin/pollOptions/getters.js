const getAllPollOptions = state => state.pollOptions;

const getPollOptions = state => (pollId) => {
	const pollOptions = state.pollOptions.filter(el => el.poll_id == pollId);
	return pollOptions || [];
};

const getPollResult = state => state.pollResult;

export default {
	getAllPollOptions,
	getPollOptions,
	getPollResult,
};
