const Ctlr = requireWrp('controllers/poll-option-choice-live-controller');

module.exports = (args) => {
	const { socket } = args;
	socket.on('add-poll-option-choice', (info, callback) => Ctlr.addChoice(args, info, callback));
};
