const QuestionLiveCtlr = requireWrp('controllers/question-live-controller');

module.exports = (args) => {
	const { socket } = args;
	// queries
	socket.on('get-questions', () => QuestionLiveCtlr.getQuestions(args));
};
