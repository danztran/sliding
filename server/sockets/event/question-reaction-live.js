const QRLiveCtlr = requireWrp('controllers/question-reaction-live-controller');

module.exports = (args) => {
	const { socket } = args;
	// like or dislike or unlike or undislike a question
	socket.on('add-question-reaction', (info, callback) => QRLiveCtlr.addQuestionReaction(args, info, callback));
};
