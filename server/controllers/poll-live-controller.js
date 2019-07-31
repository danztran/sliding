const PollModel = requireWrp('models/poll');

module.exports = {
	async getPolls({ io, socket }, callback) {
		const event = socket.$fn.getCurrentEvent();
		const result = {};
		const query = {
			event_id: event.id,
			is_deleted: false,
		};

		try {
			const Poll = new PollModel();
			result.polls = await Poll.find(query, {
				select: 'id, content, created_at, max_choices, allow_guest_view_result',
			}).exec();

			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},

	async addPoll({ io, socket }, info, callback) {
		if (socket.$fn.cannot('addPoll', callback)) return;
		if (socket.$fn.forbid('allow_poll', callback)) return;
		// validate info here
		// ...
		const event = socket.$fn.getCurrentEvent();
		const user = socket.$fn.getUser();
		const result = {};
		try {
			const Poll = new PollModel();

			const poll = await Poll.create({
				...info,
				user_id: user.id,
				event_id: event.id,
			}).exec();
			result.poll = poll;

			socket.to(event.rooms.main).emit('new_added_poll', result.poll);
			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},

	async editPoll({ io, socket }, info, callback) {
		if (socket.$fn.cannot('editPoll', callback)) return;
		// validate info here
		// ...
		const event = socket.$fn.getCurrentEvent();
		const result = {};

		try {
			const Poll = new PollModel();
			const poll = await Poll.findOne({
				id: info.id,
				event_id: event.id,
				is_deleted: false,
			}).exec();
			if (!poll) throw socket.$fn.t('pollNotFound');

			const editedPoll = await Poll.update(info).exec();
			result.poll = editedPoll;
			// emit to admin room
			socket.to(event.rooms.main).emit('new_edited_poll', result.poll);

			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},

	async deletePoll({ socket }, info, callback) {
		if (socket.$fn.cannot('deletePoll', callback)) return;
		// VALIDATE INFO HERE
		// ...
		const event = socket.$fn.getCurrentEvent();
		const result = {};
		try {
			const Poll = new PollModel();
			const poll = await Poll.findOne({
				id: info.id,
				event_id: event.id,
				is_deleted: false,
			}).exec();
			if (!poll) throw socket.$fn.t('pollNotFound');

			const deletedPoll = await Poll.setDeleted(info).exec();
			result.poll = deletedPoll;

			// emiter
			socket.to(event.rooms.main).emit('new_deleted_poll', result.poll);

			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},
};
