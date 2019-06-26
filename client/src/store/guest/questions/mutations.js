// @desc: after get all question in event via socket, set to state
const SET_QUESTIONS = (state, questions) => {
	state.questions = questions;
};

const RESET = (state) => {
	state.questions = [];
};

export default {
	SET_QUESTIONS,
	RESET
};
