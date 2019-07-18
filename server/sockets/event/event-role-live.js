const EventRoleLiveCtlr = requireWrp('controllers/event-role-live-controller');

module.exports = (args) => {
	const { socket } = args;
	// add moderator
	socket.on('add-moderator', (info, callback) => EventRoleLiveCtlr.addModerator(args, info, callback));
	// remove moderator
	socket.on('remove-moderator', (info, callback) => EventRoleLiveCtlr.removeModerator(args, info, callback));
};
