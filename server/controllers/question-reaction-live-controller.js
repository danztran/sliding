const QuestionReactionModel = requireWrp('models/question-reaction');

module.exports = {
	async addQuestionReaction({ io, socket }, info, callback) {
		if (info.like === false && socket.$fn.forbid('allow_question_dislike', callback)) return;
		// VALIDATE HERE
		// ...
		const event = socket.$fn.getCurrentEvent();
		const user = socket.$fn.getUser();
		const result = {};
		try {
			const QuestionReaction = new QuestionReactionModel();
			const reaction = await QuestionReaction.createOrUpdate({
				...info,
				user_id: user.id,
			}).exec();
			result.reaction = reaction;
			socket.to(event.rooms.main).emit('new_question_reaction', reaction);
			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},
};
