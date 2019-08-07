const getAllOptChoices = state => state.pollOptionChoices;
const getOptChoices = state => (pollID) => {
	const rs = state.pollOptionChoices.find(el => Number(el.poll_id) === Number(pollID));
	return rs ? rs.choices : [];
};

export default {
	getAllOptChoices,
	getOptChoices,
};
