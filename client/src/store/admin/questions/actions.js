const getQuestions = (context, questions) => {
	context.commit('GET_QUESTION', questions);
};

const getQuestionReplies = (context, replies) => {
	context.commit('GET_QUESTION_REPLIES', replies);
};

const sendQuestionReply = (context, reply) => {
	context.commit('SEND_QUESTION_REPLY', reply);
};

const removeErrorQuestionReply = (context, questionId) => {
	context.commit('REMOVE_ERROR_QUESTION_REPLY', questionId);
};

export default {
	getQuestions,
	getQuestionReplies,
	sendQuestionReply,
	removeErrorQuestionReply
};
