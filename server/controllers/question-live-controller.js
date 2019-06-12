const Question = requireWrp('models/question');

module.exports = {
	async emitQuestions({ io, socket, code }) {
		let result = [];
		const query = {
			event_id: socket.$state.event.id
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

		return socket.emit('event_questions', result);
	}
};
