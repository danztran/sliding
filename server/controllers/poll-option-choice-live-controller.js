const PollModel = requireWrp('models/poll');
const ChoiceModel = requireWrp('models/poll-option-choice');

module.exports = {
	async getAllChoices({ io, socket }, callback) {
		const event = socket.$fn.getCurrentEvent();
		const result = {};
		try {
			const Choice = new ChoiceModel();
			result.choices = await Choice.findByEventId(event.id).exec();
			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},

	async addChoice({ io, socket }, info, callback) {
		// VALIDATE HERE
		// ...
		const event = socket.$fn.getCurrentEvent();
		const user = socket.$fn.getUser();
		const result = {};
		try {
			const Poll = new PollModel();
			const Choice = new ChoiceModel();

			const optionId = info.poll_option_id;

			const poll = await Poll.findByPollOptionId(optionId).exec();
			if (!poll) {
				throw socket.$fn.t('pollOptionNotFound');
			}
			if (poll.is_locked) {
				throw socket.$fn.t('pollLocked');
			}

			if (info.choice === true) {
				const choices = await Choice.findOfPoll({
					poll_id: poll.id,
					user_id: user.id,
				}).exec();
				if (choices && choices.length >= Number(poll.max_choices)) {
					throw socket.$fn.t('reachMaxChoices');
				}
			}

			const choice = await Choice.createOrUpdate({
				...info,
				poll_option_id: optionId,
				user_id: user.id,
			}).exec();
			result.choice = choice;
			socket.to(event.rooms.main).emit('new_poll_option_choice', choice);
			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},
};
