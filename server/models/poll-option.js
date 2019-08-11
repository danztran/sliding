const qh = requireWrp('modules/query-helper');
const Model = requireWrp('models/model');

class PollOptionModel extends Model {
	constructor() {
		super('poll_option');
	}

	create(info, opt) {
		return this.createOne({
			user_id: info.user_id,
			content: info.content || '',
			poll_id: info.poll_id,
			updated_at: new Date().toISOString(),
			created_at: new Date().toISOString(),
		}, {
			select: '*',
			...opt,
		});
	}

	findByEventId(eid, opt) {
		this.setQuery(`
			SELECT o.*
			FROM
				poll p, ${this.getName()} o
			WHERE
				p.id = o.poll_id
				AND p.event_id = ${qh.toDollarQuoted(eid)}
				AND p.is_deleted = FALSE
				AND o.is_deleted = FALSE
		`);
		this.setRowReturn(0);
		return this;
	}

	update(info, opt) {
		return this.updateOne({
			id: info.id,
		}, {
			content: info.content,
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
			select: '"id", "poll_id"',
		});
	}
}

module.exports = PollOptionModel;
