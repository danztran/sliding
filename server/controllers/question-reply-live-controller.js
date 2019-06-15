const QuestionReply = requireWrp('models/question-reply');

module.exports = {
	async getQuestionReplies({ socket }, qid) {
		let result = [];
		const query = {
			question_id: qid
		};
		try {
			result = await QuestionReply.find(query).exec();
		}
		catch (e) {
			return socket.$fn.$err(e);
		}

		return socket.emit('get_question_replies', result);
	},

	async addQuestionReply({ io, socket }, info) {
		// VALIDATE INFO HERE
		// ...
		const result = {
			bool: false
		};
		try {
			const reply = await QuestionReply.create({
				...info,
				user_id: socket.$state.user.id
			}).exec();
			result.reply = reply;
			result.bool = true;

			socket.to(socket.$state.eventRoom).emit('new_question_reply', result.reply);
		}
		catch (e) {
			return socket.$fn.$err(e);
		}

		return socket.emit('add_question_reply_result', result);
	}
};
