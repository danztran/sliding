const getCurrentEvent = (context, event) => {
	context.commit('GET_CURRENT_EVENT', event);
};

export default {
	getCurrentEvent
};
