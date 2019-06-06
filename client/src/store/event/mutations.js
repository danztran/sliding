const QUERY_EVENT = (state, result) => {
	state.events = result.events;
};

const CREATE_EVENT = (state, newEvent) => {
	state.events = [newEvent, ...state.events];
};

export default {
	QUERY_EVENT,
	CREATE_EVENT
};
