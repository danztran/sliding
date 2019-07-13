// @desc: set list events after query
const SET_EVENTS = (state, result) => {
	state.events = result;
};

const ADD_NEW_EVENT = (state, newEvent) => {
	state.events.unshift(newEvent);
};

const RESET = (state) => {
	state.events = [];
};

export default {
	SET_EVENTS,
	RESET,
	ADD_NEW_EVENT,
};
