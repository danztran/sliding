// const pool = requireWrp('modules/postgresql');
const Model = requireWrp('models/model');


class Event extends Model {
	constructor() {
		super('_.event');
	}

	findById(id, opt) {
		return this.findOne({ id }, opt);
	}

	findByCode(code, opt) {
		return this.findOne({ code }, opt);
	}

	create(event, opt) {
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
		}, opt);
	}
}

module.exports = new Event();
