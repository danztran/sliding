const Model = requireWrp('models/model');
const PollOptionModel = require('./poll-option');
const PollModel = require('./poll');

const PollOption = new PollOptionModel();
const Poll = new PollModel();

class PollOptionChoiceModel extends Model {
	constructor() {
		super('poll_option_choice');
	}

	findOfPoll({ poll_id, user_id }) {
		this.setQuery(`
			SELECT c.*
			FROM ${this.getName()} c,
				${Poll.getName()} p,
				${PollOption.getName()} o
			WHERE
				p.id = o.poll_id
				AND o.id = c.poll_option_id
				AND p.id = ${poll_id}
				AND c.user_id = ${user_id}
		`);
		this.setRowReturn(0);
		return this;
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
