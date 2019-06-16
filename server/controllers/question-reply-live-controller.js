const QuestionReplyModel = requireWrp('models/question-reply');

module.exports = {
	async getQuestionReplies({ socket }, qid) {
		let replies = [];
		const query = {
			question_id: qid,
			is_deleted: false
		};
		try {
			const QuestionReply = new QuestionReplyModel();
			replies = await QuestionReply.find(query).exec();
		}
		catch (e) {
			return socket.$fn.$err(e);
		}

		return socket.emit('get_question_replies', replies);
	},

	async addQuestionReply({ socket }, info) {
		const emiter = 'add_question_reply';
		if (socket.$fn.$cannot('addQuestionReply', emiter)) return;
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
		}
		catch (e) {
			return socket.$fn.$err(e, emiter);
		}

		return socket.emit(emiter, result);
	},

	async editQuestionReply({ socket }, info) {
		const emiter = 'edit_question_reply';
		if (socket.$fn.$cannot('editQuestionReply', emiter)) return;
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
		}
		catch (e) {
			return socket.$fn.$err(e, emiter);
		}

		return socket.emit(emiter, result);
	},

	async deleteQuestionReply({ socket }, info) {
		const emiter = 'delete_question_reply';
		if (socket.$fn.$cannot('deleteQuestionReply', emiter)) return;
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
		}
		catch (e) {
			return socket.$fn.$err(e, emiter);
		}

		return socket.emit(emiter, result);
	}
};
