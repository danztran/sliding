const getQuestions = state => state.questions;
const getReplies = state => (id) => {
	const question = state.questions.find(q => q.id === id);
	return question ? question.replies : [];
};

export default {
	getQuestions,
	getReplies
};
