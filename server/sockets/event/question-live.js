const QuestionLiveCtlr = requireWrp('controllers/question-live-controller');

module.exports = (args) => {
	const { io, socket, code } = args;
	socket.on('get-questions', () => QuestionLiveCtlr.emitQuestions(args));
};
