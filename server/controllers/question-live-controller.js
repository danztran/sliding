const QuestionModel = requireWrp('models/question');

module.exports = {
	async getQuestions({ socket }, callback) {
		const result = {};
		const query = {
			event_id: socket.$state.event.id,
			is_deleted: false
		};
		if (!socket.$state.role.permissions.seeAllQuestions) {
			query.stage = 'public';
		}
		try {
			const Question = new QuestionModel();
			result.questions = await Question.find(query).exec();

			return callback(result);
		}
		catch (e) {
			return socket.$fn.$err(e, callback);
		}
	},

	async addQuestion({ socket }, info, callback) {
		if (socket.$fn.$cannot('addQuestion', callback)) return;
		// validate info here
		// ...
		const result = {};

		try {
			const Question = new QuestionModel();

			const question = await Question.create({
				...info,
				user_id: socket.$state.user.id,
				stage: socket.$state.event.on_moderation ? 'private' : 'public'
			}).exec();
			question.user = {
				id: socket.$state.user.id,
				name: socket.$state.user.name
			};
			result.question = question;

			socket.to(socket.$state.rooms.admin).emit('new_added_question', result.question);
			if (question.stage === 'public') {
				socket.to(socket.$state.rooms.guest).emit('new_added_question', result.question);
			}
			return callback(result);
		}
		catch (e) {
			return socket.$fn.$err(e, callback);
		}
	},

	async editQuestion({ socket }, info, callback) {
		if (socket.$fn.$cannot('editQuestion', callback)) return;
		// validate info here
		// ...
		const result = {};

		try {
			const Question = new QuestionModel();
			const question = await Question.findOne({
				id: info.id,
				is_deleted: false
			}).exec();
			if (!question) {
				throw {
					expected: socket.$fn.$t('questionNotFound')
				};
			}

			const editedQuestion = await Question.update(info).exec();
			result.question = editedQuestion;
			// emit to admin room
			socket.to(socket.$state.rooms.admin).emit('new_edited_question', result.question);

			// emit to guest room
			const oldStage = question.stage;
			const newStage = editedQuestion.stage;
			let guestEvent = false;
			if (oldStage === newStage && oldStage === 'public') {
				guestEvent = 'new_edited_question';
			}
			else if (oldStage !== newStage && newStage === 'public') {
				guestEvent = 'new_added_question';
			}
			else if (oldStage === 'public' && newStage !== oldStage) {
				guestEvent = 'new_deleted_question';
			}
			if (guestEvent) {
				socket.to(socket.$state.rooms.guest).emit(guestEvent, result.question);
			}

			return callback(result);
		}
		catch (e) {
			return socket.$fn.$err(e, callback);
		}
	},

	async deleteQuestion({ socket }, info, callback) {
		if (socket.$fn.$cannot('deleteQuestion', callback)) return;
		// VALIDATE INFO HERE
		// ...
		const result = {};
		try {
			const Question = new QuestionModel();
			const question = await Question.findOne({
				id: info.id,
				is_deleted: false
			}).exec();
			if (!question) {
				throw {
					expected: socket.$fn.$t('questionNotFound')
				};
			}

			const deletedQuestion = await Question.setDeleted(info).exec();
			result.question = deletedQuestion;
			socket.to(socket.$state.rooms.admin).emit('new_deleted_question', result.question);
			if (question.stage === 'public') {
				socket.to(socket.$state.rooms.guest).emit('new_deleted_question', result.question);
			}

			return callback(result);
		}
		catch (e) {
			return socket.$fn.$err(e, callback);
		}
	}

};
