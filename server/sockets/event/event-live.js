const EventLiveCtlr = requireWrp('controllers/event-live-controller');

module.exports = (args) => {
	// send event and role data on joining room
	EventLiveCtlr.emitEventData(args);
};
