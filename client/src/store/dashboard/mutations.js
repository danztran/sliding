const QUERY_EVENT = (state, result) => {
	state.events = result.events;
};

const CREATE_EVENT = (state, newEvent) => {
	state.events.unshift(newEvent);
};

const RESET = (state) => {
	state.events = [];
};

export default {
	QUERY_EVENT,
	RESET,
	CREATE_EVENT
};
