const EventRoleLiveCtlr = requireWrp('controllers/event-role-live-controller');

module.exports = (args) => {
	const { socket } = args;
	// query all invited
	socket.on('query-invited', (info, callback) => EventRoleLiveCtlr.query(args, info, callback));
	// response to the invite
	socket.on('response-invited', (info, callback) => EventRoleLiveCtlr.response((args, info, callback)));
	// add moderator
	socket.on('add-moderator', (info, callback) => EventRoleLiveCtlr.addModerator(args, info, callback));
	// remove moderator
	socket.on('remove-moderator', (info, callback) => EventRoleLiveCtlr.removeModerator(args, info, callback));
};
