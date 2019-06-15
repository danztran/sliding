const QuestionReplyLiveCtlr = requireWrp('controllers/question-reply-live-controller');

module.exports = (args) => {
	const { io, socket, code } = args;
	// queries
	socket.on('get-question-replies', qid => QuestionReplyLiveCtlr.getQuestionReplies(args, qid));
	// add
	socket.on('add-question-reply', info => QuestionReplyLiveCtlr.addQuestionReply(args, info));
};
