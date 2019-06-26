// @desc: after get all question in event via socket, set to state
const SET_QUESTIONS = (state, questions) => {
	state.questions = questions;
};

// @desc: after get all question replies via socket, set to state
const SET_QUESTION_REPLIES = (state, dataReplies) => {
	const question = state.questions.find(q => q.id === dataReplies.id);
	Object.assign(question, { replies: dataReplies.replies });
};

const RESET = (state) => {
	state.questions = [];
};

export default {
	SET_QUESTIONS,
	SET_QUESTION_REPLIES,
	RESET
};
