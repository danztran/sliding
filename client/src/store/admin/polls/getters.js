const getPolls = state => state.polls;
const getPoll = state => (id) => {
	const poll = state.polls.find(el => Number(el.id) === Number(id));
	return poll || null;
};

export default {
	getPolls,
	getPoll,
};
