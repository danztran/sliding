const getQuestions = state => state.questions;
const getQuestionReplies = state => (id) => {
	const question = state.questions.find(q => q.id === id);
	return question ? question.replies : [];
};

export default {
	getQuestions,
	getQuestionReplies
};
