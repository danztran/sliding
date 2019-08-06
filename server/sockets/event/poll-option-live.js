const Ctlr = requireWrp('controllers/poll-option-live-controller');

module.exports = (args) => {
	const { socket } = args;
	// queries
	socket.on('get-all-poll-options', callback => Ctlr.getAllOptions(callback));
	socket.on('get-poll-options', (info, callback) => Ctlr.getPollOptions(args, info, callback));
	// add
	socket.on('add-poll-option', (info, callback) => Ctlr.addPollOption(args, info, callback));
	// edit
	socket.on('edit-poll-option', (info, callback) => Ctlr.editPollOption(args, info, callback));
	// delete
	socket.on('delete-poll-option', (info, callback) => Ctlr.deletePollOption(args, info, callback));
};
