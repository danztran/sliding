const qh = requireWrp('modules/query-helper');
const Model = requireWrp('models/model');
const EventModel = requireWrp('models/event');
const UserModel = requireWrp('models/user');

const Event = new EventModel();
const User = new UserModel();

class EventRoleModel extends Model {
	constructor() {
		super('event_role');
	}

	findRole(info) {
		return this.findOne(info, {
			select: 'role',
		});
	}

	findAdmins(eid) {
		this.setQuery(`
			SELECT
				r.user_id,
				r.role,
				u.name,
				u.email,
				r.is_accepted,
				r.updated_at
			FROM
				${this.getName()} as "r",
				${User.getName()} as "u" 
			WHERE
				r.event_id = ${qh.toDollarQuoted(eid)}
				AND r.user_id = u.id
				AND r.role IN ('moderator', 'host')
		`);
		this.setRowReturn(0);
		return this;
	}

	findEvents({ user_id, role }, {
		// select = '*',
		order,
		limit,
		offset,
	} = {}) {
		this.setQuery(`
			SELECT
				e.*,
				row_to_json(r) AS "role",
				row_to_json(u) AS "user"
			FROM 
				${Event.getName()} as "e", 
				(SELECT id, name from ${User.getName()}) as "u", 
				${this.getName()} as "r"
			WHERE
				e.id = r.event_id
				AND r.user_id = u.id
				AND r.user_id = ${qh.toDollarQuoted(user_id)}
				${role ? `AND r.role = (${qh.toDollarQuoted(role)})` : ''}
			${qh.toOrderClause(order)}
			${qh.toLimitClause(limit)}
			${qh.toOffsetClause(offset)}
		`);
		this.setRowReturn(0);

		return this;
	}

	findRoles({ user_id, role }, {
		// select = '*',
		order,
		limit,
		offset,
	} = {}) {
		this.setQuery(`
			SELECT
				r.*,
				row_to_json(e) AS "event",
				row_to_json(u) AS "user"
			FROM 
				${Event.getName()} as "e", 
				(SELECT id, name from ${User.getName()}) as "u", 
				${this.getName()} as "r"
			WHERE
				e.id = r.event_id
				AND r.user_id = u.id
				AND r.user_id = ${qh.toDollarQuoted(user_id)}
				AND (e.is_deleted = FALSE OR e.is_deleted is NULL)
				AND (r.is_deleted = FALSE OR r.is_deleted is NULL)
				${role ? `AND r.role = (${qh.toDollarQuoted(role)})` : ''}
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

	findByUserId(uid, opt) {
		return this.find({ user_id: uid }, opt);
	}

	findUsersByEventId(eid, {
		select = '*',
		order,
		limit,
		offset,
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

	create(info, opt) {
		return this.createOne({
			user_id: info.user_id,
			event_id: info.event_id,
			role: info.role,
			is_accepted: info.is_accepted,
			accessed_at: info.accessed_at,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		}, opt);
	}

	update(info, opt) {
		return this.updateOne({
			event_id: info.event_id,
			user_id: info.user_id,
		}, {
			role: info.role,
			is_accepted: info.is_accepted,
			updated_at: new Date().toISOString(),
		}, opt);
	}

	setLastAccessed(info) {
		return this.updateOne({
			event_id: info.event_id,
			user_id: info.user_id,
		}, {
			accessed_at: new Date().toISOString(),
		});
	}
}

module.exports = EventRoleModel;
