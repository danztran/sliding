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

	async addChoices({ io, socket }, info, callback) {
		// VALIDATE HERE
		// ...
		const event = socket.$fn.getCurrentEvent();
		const user = socket.$fn.getUser();
		const result = {};
		try {
			const Poll = new PollModel();
			const Choice = new ChoiceModel();

			const { choices } = info;
			const optionId = choices[0].poll_option_id;

			const poll = await Poll.findByPollOptionId(optionId).exec();
			if (!poll) {
				throw socket.$fn.t('pollOptionNotFound');
			}
			if (poll.is_locked) {
				throw socket.$fn.t('pollLocked');
			}

			if (choices.length >= Number(poll.max_choices)) {
				throw socket.$fn.t('reachMaxChoices');
			}

			// remove old choices
			const oldChoices = await Choice.findOfPoll({
				poll_id: poll.id,
				user_id: user.id,
			}).exec();
			if (oldChoices && oldChoices.length > 0) {
				const queryInfo = oldChoices.map(e => ({
					poll_option_id: e.poll_option_id,
					user_id: user.id,
				}));
				Choice.update(queryInfo, { choice: null }).exec();
			}

			// add new choices
			const promiseNewChoices = [];
			for (const choice of choices) {
				promiseNewChoices.push(Choice.createOrUpdate({
					poll_option_id: choice.poll_option_id,
					user_id: user.id,
					choice: true,
				}).exec());
			}

			result.choices = await Promise.all(promiseNewChoices);
			socket.to(event.rooms.main).emit('new_poll_option_choices', result.choices);
			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},
};
