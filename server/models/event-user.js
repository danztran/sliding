// const pool = requireWrp('modules/postgresql');
const Model = requireWrp('models/model');

class EventUser extends Model {
	constructor() {
		super('_.event_user');
	}

	findByUserId(uid, select = '*') {
		return this.find({ user_id: uid }, select);
	}

	findEventsByUserId(uid, select = '*') {
		this.query = `
			SELECT ${select}
			FROM _.event
			WHERE id IN (
				${this.findByUserId(uid, 'event_id').query}
			)
		`;
		return this;
	}

	findByEventId(eid, select = '*') {
		return this.find({ event_id: eid }, select);
	}

	findUsersByEventId(eid, select = '*') {
		this.query = `
			SELECT ${select}
			FROM _.user
			WHERE id IN (
				${this.findByEventId(eid, 'user_id').query}
			)
		`;
		return this;
	}

	create(object) {
		return this.createOne({
			user_id: object.user_id,
			event_id: object.event_id,
			role: object.role
		}, '*');
	}
}

module.exports = new EventUser();
