const Model = requireWrp('models/model');
const PollOptionModel = require('./poll-option');
const PollModel = require('./poll');
const qh = requireWrp('modules/query-helper');

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
				AND c.choice = TRUE
		`);
		this.setRowReturn(0);
		return this;
	}

	findByEventId(eid, opt) {
		this.setQuery(`
			SELECT c.*
			FROM ${this.getName()} c,
				${Poll.getName()} p,
				${PollOption.getName()} o
			WHERE
				p.id = o.poll_id
				AND o.id = c.poll_option_id
				AND p.event_id = ${qh.toDollarQuoted(eid)}
				AND p.is_deleted = FALSE
				AND o.is_deleted = FALSE
				AND c.choice = TRUE
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
