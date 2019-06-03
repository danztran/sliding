// const pool = requireWrp('modules/postgresql');
const Model = requireWrp('models/model');

class EventUser extends Model {
	constructor() {
		super('_.event_user');
	}

	findByUserId(uid) {
		return this.find({ user_id: uid });
	}

	findEventsByUserId(uid) {
		this.query = `
			SELECT *
			FROM _.event
			WHERE id IN (
				${this.findByUserId(uid, 'event_id').query}
			)
		`;
		return this;
	}

	findByEventId(eid) {
		return this.find({ event_id: eid });
	}

	findUsersByEventId(eid) {
		this.query = `
			SELECT *
			FROM _.user
			WHERE id IN (
				${this.findByEventId(eid, 'user_id').query}
			)
		`;
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
