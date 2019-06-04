const Model = requireWrp('models/model');
const Event = requireWrp('models/event');
const User = requireWrp('models/user');
const qh = requireWrp('modules/query-helper');

class EventUser extends Model {
	constructor() {
		super('_.event_user');
	}

	findByUserId(uid, opt) {
		return this.find({ user_id: uid }, opt);
	}

	findEventsByUserId(uid, {
		select = '*',
		order,
		limit,
		offset
	} = {}) {
		this.setQuery(`
			SELECT ${select}
			FROM ${Event.getName()}
			WHERE id IN (
				${this.findByUserId(uid, { select: 'event_id' }).getQuery()}
			)
			${qh.toOrderClause(order)}
			${qh.toLimitClause(limit)}
			${qh.toOffsetClause(offset)}
		`);
		this.setRowReturn(0);
		return this;
	}

	findByEventId(eid, opt) {
		return this.find({ event_id: eid }, opt);
	}

	findUsersByEventId(eid, {
		select = '*',
		order,
		limit,
		offset
	} = {}) {
		this.setQuery(`
			SELECT ${select}
			FROM ${User.getName()}
			WHERE id IN (
				${this.findByEventId(eid, { select: 'user_id' }).getQuery()}
			)
			${qh.toOrderClause(order)}
			${qh.toLimitClause(limit)}
			${qh.toOffsetClause(offset)}
		`);
		this.setRowReturn(0);
		return this;
	}

	create(info) {
		return this.createOne({
			user_id: info.user_id,
			event_id: info.event_id,
			role: info.role
		}, '*');
	}
}

module.exports = new EventUser();
