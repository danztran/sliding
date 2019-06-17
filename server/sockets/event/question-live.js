const QuestionLiveCtlr = requireWrp('controllers/question-live-controller');

module.exports = (args) => {
	const { socket } = args;
	// queries
	socket.on('get-questions', callback => QuestionLiveCtlr.getQuestions(args, callback));
	// add
	socket.on('add-question', (info, callback) => QuestionLiveCtlr.addQuestion(args, info, callback));
	// edit
	socket.on('edit-question', (info, callback) => QuestionLiveCtlr.editQuestion(args, info, callback));
	// delete
	socket.on('delete-question', (info, callback) => QuestionLiveCtlr.deleteQuestion(args, info, callback));
};
