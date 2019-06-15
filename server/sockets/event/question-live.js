const QuestionLiveCtlr = requireWrp('controllers/question-live-controller');

module.exports = (args) => {
	const { io, socket, code } = args;
	// queries
	socket.on('get-questions', () => QuestionLiveCtlr.getQuestions(args));
};
