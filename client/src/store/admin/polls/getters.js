const getPolls = state => state.polls;
const getPoll = state => (id) => {
	const poll = state.polls.find(el => Number(el.id) === Number(id));
	return poll || null;
};

const getPollEditInfo = state => state.editInfo;

export default {
	getPolls,
	getPoll,
	getPollEditInfo,
};
