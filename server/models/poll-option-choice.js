const Model = requireWrp('models/model');

class PollOptionChoiceModel extends Model {
	constructor() {
		super('poll_option_choice');
	}

	createOrUpdate(info, opt) {
		return super.createOrUpdate({
			poll_option_id: info.poll_option_id,
			user_id: info.user_id,
		}, {
			choice: info.choice,
		}, {
			select: '*',
			...opt,
		});
	}
}

module.exports = PollOptionChoiceModel;
