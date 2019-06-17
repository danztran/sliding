const QuestionReplyModel = requireWrp('models/question-reply');

module.exports = {
	async getQuestionReplies({ socket }, qid, callback) {
		const result = {};
		const query = {
			question_id: qid,
			is_deleted: false
		};
		try {
			const QuestionReply = new QuestionReplyModel();
			result.replies = await QuestionReply.find(query).exec();

			return callback(result);
		}
		catch (e) {
			return socket.$fn.$err(e, callback);
		}
	},

	async addQuestionReply({ socket }, info, callback) {
		if (socket.$fn.$cannot('addQuestionReply', callback)) return;
		// VALIDATE INFO HERE
		// ...
		const result = {};
		try {
			const QuestionReply = new QuestionReplyModel();
			const reply = await QuestionReply.create({
				...info,
				user_id: socket.$state.user.id
			}).exec();
			reply.user = {
				id: socket.$state.user.id,
				name: socket.$state.user.name
			};
			result.reply = reply;
			socket.to(socket.$state.rooms.event).emit('new_added_question_reply', result.reply);

			return callback(result);
		}
		catch (e) {
			return socket.$fn.$err(e, callback);
		}
	},

	async editQuestionReply({ socket }, info, callback) {
		if (socket.$fn.$cannot('editQuestionReply', callback)) return;
		// VALIDATE INFO HERE
		// ...
		const result = {};
		try {
			const QuestionReply = new QuestionReplyModel();
			const reply = await QuestionReply.findOne({
				id: info.id,
				is_deleted: false
			}).exec();
			if (!reply) {
				throw {
					expected: socket.$fn.$t('replyNotFound')
				};
			}

			const editedReply = await QuestionReply.update(info).exec();
			result.reply = editedReply;
			socket.to(socket.$state.rooms.event).emit('new_edited_question_reply', result.reply);

			return callback(result);
		}
		catch (e) {
			return socket.$fn.$err(e, callback);
		}
	},

	async deleteQuestionReply({ socket }, info, callback) {
		if (socket.$fn.$cannot('deleteQuestionReply', callback)) return;
		// VALIDATE INFO HERE
		// ...
		const result = {};
		try {
			const QuestionReply = new QuestionReplyModel();
			const reply = await QuestionReply.findOne({
				id: info.id,
				is_deleted: false
			}).exec();
			if (!reply) {
				throw {
					expected: socket.$fn.$t('replyNotFound')
				};
			}

			const deletedReply = await QuestionReply.setDeleted(info).exec();
			result.reply = deletedReply;
			socket.to(socket.$state.rooms.event).emit('new_deleted_question_reply', result.reply);

			return callback(result);
		}
		catch (e) {
			return socket.$fn.$err(e, callback);
		}
	}
};
