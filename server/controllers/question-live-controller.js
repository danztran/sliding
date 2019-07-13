const QuestionModel = requireWrp('models/question');

module.exports = {
	async getQuestions({ io, socket }, callback) {
		const event = socket.$fn.getCurrentEvent();
		const result = {};
		const query = {
			event_id: event.id,
			is_deleted: false,
		};
		if (!socket.$fn.can('seeAllQuestions')) {
			query.stage = 'public';
		}
		try {
			const Question = new QuestionModel();
			result.questions = await Question.find(query).exec();

			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},

	async addQuestion({ socket }, info, callback) {
		if (socket.$fn.cannot('addQuestion', callback)) return;
		if (socket.$fn.forbid('allow_question', callback)) return;
		// validate info here
		// ...
		const event = socket.$fn.getCurrentEvent();
		const user = socket.$fn.getUser();
		const result = {};
		try {
			const Question = new QuestionModel();

			const question = await Question.create({
				...info,
				user_id: user.id,
				stage: event.on_moderation ? 'private' : 'public',
			}).exec();
			question.user = {
				id: user.id,
				name: user.name,
			};
			result.question = question;

			socket.to(event.rooms.admin).emit('new_added_question', result.question);
			if (question.stage === 'public') {
				socket.to(event.rooms.guest).emit('new_added_question', result.question);
			}
			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},

	async editQuestion({ socket }, info, callback) {
		if (socket.$fn.cannot('editQuestion', callback)) return;
		// validate info here
		// ...
		const event = socket.$fn.getCurrentEvent();
		const result = {};

		try {
			const Question = new QuestionModel();
			const question = await Question.findOne({
				id: info.id,
				is_deleted: false,
			}).exec();
			if (!question) throw socket.$fn.t('questionNotFound');

			const editedQuestion = await Question.update(info).exec();
			result.question = editedQuestion;
			// emit to admin room
			socket.to(event.rooms.admin).emit('new_edited_question', result.question);

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
				socket.to(event.rooms.guest).emit(guestEvent, result.question);
			}

			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},

	async deleteQuestion({ socket }, info, callback) {
		if (socket.$fn.cannot('deleteQuestion', callback)) return;
		// VALIDATE INFO HERE
		// ...
		const event = socket.$fn.getCurrentEvent();
		const result = {};
		try {
			const Question = new QuestionModel();
			const question = await Question.findOne({
				id: info.id,
				is_deleted: false,
			}).exec();
			if (!question) throw socket.$fn.t('questionNotFound');

			const deletedQuestion = await Question.setDeleted(info).exec();
			result.question = deletedQuestion;

			// emiter
			socket.to(event.rooms.admin).emit('new_deleted_question', result.question);
			if (question.stage === 'public') {
				socket.to(event.rooms.guest).emit('new_deleted_question', result.question);
			}

			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},

};
