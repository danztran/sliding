// const pool = requireWrp('modules/postgresql');
const Model = requireWrp('models/model');


class Event extends Model {
	constructor() {
		super('_.event');
	}

	findById(id, select = '*') {
		return this.findOne({ id }, select);
	}

	findByCode(code, select = '*') {
		return this.findOne({ code }, select);
	}

	create(event) {
		return this.createOne({
			code: event.code,
			name: event.name,
			description: event.description,
			allow_search: event.allow_search,
			require_auth: event.require_auth,
			start_at: new Date(event.start_at).toISOString(),
			end_at: new Date(event.end_at).toISOString(),
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		}, '*');
	}
}

module.exports = new Event();
