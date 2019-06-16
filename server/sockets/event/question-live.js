const QuestionLiveCtlr = requireWrp('controllers/question-live-controller');

module.exports = (args) => {
	const { socket } = args;
	// queries
	socket.on('get-questions', () => QuestionLiveCtlr.getQuestions(args));
	// add
	socket.on('add-question', info => QuestionLiveCtlr.addQuestion(args));
	// edit
	socket.on('edit-question', info => QuestionLiveCtlr.editQuestion(args));
	// delete
	socket.on('delete-question', info => QuestionLiveCtlr.deleteQuestion(args));
};
