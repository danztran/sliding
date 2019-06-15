const GET_QUESTION = (state, questions) => {
	state.questions = questions;
};

const RESET = (state) => {
	state.questions = [];
};

export default {
	GET_QUESTION,
	RESET
};
