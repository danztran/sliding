const PollOptionModel = requireWrp('models/poll-option');

module.exports = {
	async getPollOptions({ io, socket }, { poll_id }, callback) {
		const result = {};
		const query = {
			poll_id,
			is_deleted: false,
		};
		try {
			const PollOption = new PollOptionModel();
			result.poll_options = await PollOption.find(query).exec();
			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},

	async getAllOptions({ io, socket }, callback) {
		const event = socket.$fn.getCurrentEvent();
		const result = {};
		try {
			const PollOption = new PollOptionModel();
			result.poll_options = await PollOption.findByEventId(event.id).exec();
			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},

	async addPollOption({ socket }, info, callback) {
		if (socket.$fn.cannot('addPollOption', callback)) return;
		// VALIDATE INFO HERE
		// ...
		const event = socket.$fn.getCurrentEvent();
		const user = socket.$fn.getUser();
		const result = {};
		try {
			const PollOption = new PollOptionModel();
			const pollOption = await PollOption.create({
				...info,
				user_id: user.id,
			}).exec();
			result.poll_option = pollOption;
			socket.to(event.rooms.main).emit(
				'new_added_poll_option',
				pollOption
			);

			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},

	async editPollOption({ socket }, info, callback) {
		if (socket.$fn.cannot('editPollOption', callback)) return;
		// VALIDATE INFO HERE
		// ...
		const event = socket.$fn.getCurrentEvent();
		const result = {};
		try {
			const PollOption = new PollOptionModel();
			const pollOption = await PollOption.findOne({
				id: info.id,
				is_deleted: false,
			}).exec();

			if (!pollOption) {
				throw socket.$fn.t('pollOptionNotFound');
			}

			const editedPollOption = await PollOption.update(info).exec();
			result.poll_option = editedPollOption;
			socket.to(event.rooms.main).emit(
				'new_edited_poll_option',
				editedPollOption
			);

			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},

	async deletePollOption({ socket }, info, callback) {
		if (socket.$fn.cannot('deletePollOption', callback)) return;
		// VALIDATE INFO HERE
		// ...
		const event = socket.$fn.getCurrentEvent();
		const result = {};
		try {
			const PollOption = new PollOptionModel();
			const pollOption = await PollOption.findOne({
				id: info.id,
				is_deleted: false,
			}).exec();

			if (!pollOption) {
				throw socket.$fn.t('pollOptionNotFound');
			}

			const deletedOption = await PollOption.setDeleted(info).exec();
			result.poll_option = deletedOption;
			socket.to(event.rooms.main).emit(
				'new_deleted_poll_option',
				deletedOption
			);

			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},
};
