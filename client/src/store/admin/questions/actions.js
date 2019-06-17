const getQuestions = (context, questions) => {
	context.commit('GET_QUESTION', questions);
};

const getQuestionReplies = (context, replies) => {
	context.commit('GET_QUESTION_REPLIES', replies);
};

const sendQuestionReply = (context, reply) => {
	context.commit('SEND_QUESTION_REPLY', reply);
};

const replaceSuccessQuestionReply = (context, resReply) => {
	context.commit('REPLACE_SUCCESS_QUESTION_REPLY', resReply);
};

const removeErrorQuestionReply = (context, questionId) => {
	context.commit('REMOVE_ERROR_QUESTION_REPLY', questionId);
};

const deleteQuestionReply = (context, res) => {
	context.commit('DELETE_QUESTION_REPLY', res);
};

export default {
	getQuestions,
	getQuestionReplies,
	sendQuestionReply,
	replaceSuccessQuestionReply,
	removeErrorQuestionReply,
	deleteQuestionReply
};
