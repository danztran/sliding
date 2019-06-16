const QuestionReplyLiveCtlr = requireWrp('controllers/question-reply-live-controller');

module.exports = (args) => {
	const { socket } = args;
	// queries
	socket.on('get-question-replies', qid => QuestionReplyLiveCtlr.getQuestionReplies(args, qid));
	// add
	socket.on('add-question-reply', info => QuestionReplyLiveCtlr.addQuestionReply(args, info));
	// edit
	socket.on('edit-question-reply', info => QuestionReplyLiveCtlr.editQuestionReply(args, info));
	// delete
	socket.on('delete-question-reply', info => QuestionReplyLiveCtlr.deleteQuestionReply(args, info));
};
