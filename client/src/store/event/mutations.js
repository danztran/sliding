const QUERY_EVENT = (state, result) => {
	state.events = result.events;
	state.loading = false;
};

export default {
	QUERY_EVENT
};
