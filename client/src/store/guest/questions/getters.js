import _cm from '@/modules/common-methods';

const getQuestions = state => state.questions;
const getRecentQuestions = state => _cm.customSort([...state.questions], 'desc', 'created_at');
const getPopularQuestions = state => [...state.questions].sort((a, b) => getPoint(b) - getPoint(a));

const getQuestionReplies = state => (id) => {
	const question = state.questions.find(q => q.id === id);
	return question ? question.replies : [];
};

function getPoint(q) {
	const reactions = q.reactions ? [...q.reactions].filter(e => e.like !== null).length : 0;
	const replies = q.replies ? q.replies.length : Number(q.count_replies);
	return reactions + replies;
}

export default {
	getQuestions,
	getPopularQuestions,
	getRecentQuestions,
	getQuestionReplies,
};
