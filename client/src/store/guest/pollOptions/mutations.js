/* ------------------------------------------------------------------------
	@desc:
	@socket:
	@source:
------------------------------------------------------------------------*/
const SET_POLL_OPTIONS = (state, pollOptions) => {
	state.pollOptions.push(pollOptions);
};


/* ------------------------------------------------------------------------
	@desc: RESET when leaving event
------------------------------------------------------------------------*/
const RESET = (state) => {
	state.pollOptions = [];
};


export default {
	SET_POLL_OPTIONS,
	RESET,
};
