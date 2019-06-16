const Question = requireWrp('models/question');

module.exports = {
	async getQuestions({ socket }) {
		let result = [];
		const query = {
			event_id: socket.$state.event.id,
			is_deleted: false
		};
		if (!socket.$state.role.permissions.seeAllQuestions) {
			query.stage = 'public';
		}
		try {
			result = await Question.find(query).exec();
		}
		catch (e) {
			return socket.$fn.$err(e);
		}

		return socket.emit('get_questions', result);
	}
};
