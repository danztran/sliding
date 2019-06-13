const getQuestions = (context, questions) => {
	context.commit('GET_QUESTION', questions);
};

export default {
	getQuestions
};
