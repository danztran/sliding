/* ------------------------------------------------------------------------
	@desc: set pollOptions
	@socket: emiter ''
	@source:
------------------------------------------------------------------------*/
const SET_POLL_OPTIONS = (state, options) => {
	state.pollOptions = options;
};

const ADD_POLL_OPTIONS = (state, options) => {
	// ...
};


/* ------------------------------------------------------------------------
	@desc: RESET when leaving event
------------------------------------------------------------------------*/
const RESET = (state) => {
	state.pollOptions = [];
};


export default {
	SET_POLL_OPTIONS,
	ADD_POLL_OPTIONS,
	RESET,
};
