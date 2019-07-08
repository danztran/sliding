const EventLiveCtlr = requireWrp('controllers/event-live-controller');

module.exports = (args) => {
	const { socket } = args;
	// send event and role data on joining room
	EventLiveCtlr.getEvent(args);
	// change event info & settings
	socket.on('edit-event', (info, callback) => EventLiveCtlr.editEvent(args, info, callback));
	// add moderator
	socket.on('add-moderator', (info, callback) => EventLiveCtlr.addModerator(args, info, callback));
	// remove moderator
	socket.on('remove-moderator', (info, callback) => EventLiveCtlr.removeModerator(args, info, callback));
};
