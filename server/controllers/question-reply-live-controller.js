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

	async addQuestionReply({ io, socket }, info) {
		if (socket.$fn.$cannot('addQuestionReply')) return;
		// VALIDATE INFO HERE
		// ...
		const result = {
			bool: false
		};
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
			result.bool = true;

			socket.to(socket.$state.rooms.event).emit('new_question_reply', result.reply);
		}
		catch (e) {
			return socket.$fn.$err(e);
		}

		return socket.emit('add_question_reply', result);
	},

	async editQuestionReply({ io, socket }, info) {
		if (socket.$fn.$cannot('editQuestionReply')) return;
		// VALIDATE INFO HERE
		// ...
		const result = {
			bool: false
		};
		try {
			const QuestionReply = new QuestionReplyModel();
			const reply = await QuestionReply.findOne({ id: info.id }).exec();
			if (!reply) {
				throw {
					expected: socket.$fn.$t('replyNotFound')
				};
			}

			const editedReply = await QuestionReply.update(info).exec();
			editedReply.user = {
				id: socket.$state.user.id,
				name: socket.$state.user.name
			};
			result.reply = editedReply;
			socket.to(socket.$state.rooms.event).emit('new_edit_question_reply', result.reply);
		}
		catch (e) {
			return socket.$fn.$err(e);
		}

		return socket.emit('edit_question_reply', result);
	},

	async deleteQuestionReply({ io, socket }, info) {
		if (socket.$fn.$cannot('deleteQuestionReply')) return;
		// VALIDATE INFO HERE
		// ...
		const result = {
			bool: false
		};
		try {
			const QuestionReply = new QuestionReplyModel();
			const deletedReply = await QuestionReply.setDeleted(info).exec();
			result.reply = deletedReply;
			socket.to(socket.$state.rooms.event).emit('new_delete_question_reply', result.reply);
		}
		catch (e) {
			return socket.$fn.$err(e);
		}

		return socket.emit('delete_question_reply', result);
	}
};
