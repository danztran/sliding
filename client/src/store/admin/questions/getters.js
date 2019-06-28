const getQuestions = state => state.questions;

const getReviewQuestions = state => state.questions.filter(q => q.stage === 'private');
const getLiveQuestions = state => state.questions.filter(q => q.stage === 'public');
const getArchivedQuestions = state => state.questions.filter(q => q.stage === 'archived');

const getQuestionReplies = state => (id) => {
	const question = state.questions.find(q => q.id === id);
	return question ? question.replies : [];
};

export default {
	getQuestions,
	getReviewQuestions,
	getLiveQuestions,
	getArchivedQuestions,
	getQuestionReplies
};
