const EventLiveCtlr = requireWrp('controllers/event-live-controller');

module.exports = (args) => {
	const { socket } = args;
	// send event and role data on joining room
	EventLiveCtlr.getEvent(args);

	socket.on('edit-event', (info, callback) => EventLiveCtlr.editEvent(args, info, callback));

	socket.on('add-moderator', (info, callback) => EventLiveCtlr.addModerator(args, info, callback));
};
