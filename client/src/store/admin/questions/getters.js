const getQuestions = state => state.questions;

const getReviewQuestions = state => state.questions.filter(q => q.stage === 'private');
const getLiveQuestions = state => state.questions.filter(q => q.stage === 'public');
const getArchivedQuestions = state => state.questions.filter(q => q.stage === 'archived');
const getLivePinnedQuestions = state => state.questions.filter(q => q.stage === 'public' && q.is_pinned);
const getLiveOtherQuestions = state => state.questions.filter(q => q.stage === 'public' && !q.is_pinned);

const getQuestionReplies = state => (id) => {
	const question = state.questions.find(q => q.id === id);
	return question ? question.replies : [];
};

export default {
	getQuestions,
	getReviewQuestions,
	getLiveQuestions,
	getLivePinnedQuestions,
	getLiveOtherQuestions,
	getArchivedQuestions,
	getQuestionReplies,
};
