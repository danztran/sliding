const GET_CURRENT_EVENT = (state, event) => {
	state.currentEvent = event;
};

const RESET = (state) => {
	state.currentEvent = {};
};

export default {
	GET_CURRENT_EVENT,
	RESET
};
