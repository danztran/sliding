import _cm from '@/modules/common-methods';

const getQuestions = state => state.questions;
const getPopularQuestions = state => _cm.customSort([...state.questions], 'asc', 'reactions');
const getRecentQuestions = state => _cm.customSort([...state.questions], 'desc', 'created_at');

const getQuestionReplies = state => (id) => {
	const question = state.questions.find(q => q.id === id);
	return question ? question.replies : [];
};

export default {
	getQuestions,
	getPopularQuestions,
	getRecentQuestions,
	getQuestionReplies,
};
