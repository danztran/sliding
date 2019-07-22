// @desc: set list events after query
const SET_EVENTS = (state, events) => {
	state.events = events;
};

// @desc: socket emiter 'query-invites'
const SET_INVITES = (state, invites) => {
	state.invites = invites;
};

const ADD_NEW_EVENT = (state, newEvent) => {
	state.events.unshift(newEvent);
};

const RESET = (state) => {
	state.events = [];
	state.invites = [];
};

export default {
	SET_EVENTS,
	SET_INVITES,
	RESET,
	ADD_NEW_EVENT,
};
