const Ctlr = requireWrp('controllers/poll-option-choice-live-controller');

module.exports = (args) => {
	const { socket } = args;
	socket.on('get-all-poll-option-choices', callback => Ctlr.getAllChoices(args, callback));
	socket.on('add-poll-option-choices', (info, callback) => Ctlr.addChoices(args, info, callback));
};
