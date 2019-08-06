const PollModel = requireWrp('models/poll');
const POCModel = requireWrp('models/poll-option-choice');

module.exports = {
	async addChoice({ io, socket }, info, callback) {
		// VALIDATE HERE
		// ...
		const event = socket.$fn.getCurrentEvent();
		const user = socket.$fn.getUser();
		const result = {};
		try {
			const Poll = new PollModel();
			const POC = new POCModel();

			const optionId = info.poll_option_id;

			const poll = await Poll.findByPollOptionId(optionId).exec();
			if (!poll) {
				throw socket.$fn.t('pollOptionNotFound');
			}
			if (poll.is_locked) {
				throw socket.$fn.t('pollLocked');
			}

			if (info.choice === true) {
				const choices = await POC.findOfPoll({
					poll_id: poll.id,
					user_id: user.id,
				}).exec();
				if (choices && choices.length >= Number(poll.max_choices)) {
					throw socket.$fn.t('reachMaxChoices');
				}
			}

			const choice = await POC.createOrUpdate({
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
