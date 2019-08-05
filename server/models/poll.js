const qh = requireWrp('modules/query-helper');
const Model = requireWrp('models/model');
const PollOptionModel = require('./poll-option');

const PollOption = new PollOptionModel();

class PollModel extends Model {
	constructor() {
		super('poll');
	}

	findByPollOptionId(poid) {
		this.setQuery(`
			SELECT p.*
			FROM ${this.getName()} as p,
				${PollOption.getName()} as po
			WHERE
				p.id = po.poll_id
				AND po.id = ${qh.toDollarQuoted(poid)}
				AND p.is_deleted = false
				AND po.is_delete = false
		`);
		this.setRowReturn(1);
		return this;
	}

	create(info, opt) {
		return this.createOne({
			event_id: info.event_id,
			user_id: info.user_id,
			max_choices: info.max_choices || 1,
			content: info.content || '',
			updated_at: new Date().toISOString(),
			created_at: new Date().toISOString(),
		}, {
			select: '*',
			...opt,
		});
	}

	update(info, opt) {
		return this.updateOne({
			id: info.id,
		}, {
			content: info.content,
			max_choices: info.max_choices,
			is_locked: info.is_locked,
			updated_at: new Date().toISOString(),
		}, {
			select: '*',
			...opt,
		});
	}

	setDeleted(info) {
		return this.updateOne({
			id: info.id,
		}, {
			is_deleted: true,
			updated_at: new Date().toISOString(),
		}, {
			select: '"id", "event_id"',
		});
	}
}

module.exports = PollModel;
