const EventLiveCtlr = requireWrp('controllers/event-live-controller');

module.exports = (args) => {
	const { socket } = args;
	// change event info & settings
	socket.on('edit-event', (info, callback) => EventLiveCtlr.editEvent(args, info, callback));
};
