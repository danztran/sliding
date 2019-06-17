const QRLiveCtlr = requireWrp('controllers/question-reply-live-controller');

module.exports = (args) => {
	const { socket } = args;
	// queries
	socket.on('get-question-replies', (qid, callback) => QRLiveCtlr.getQuestionReplies(args, qid, callback));
	// add
	socket.on('add-question-reply', (info, callback) => QRLiveCtlr.addQuestionReply(args, info, callback));
	// edit
	socket.on('edit-question-reply', (info, callback) => QRLiveCtlr.editQuestionReply(args, info, callback));
	// delete
	socket.on('delete-question-reply', (info, callback) => QRLiveCtlr.deleteQuestionReply(args, info, callback));
};
