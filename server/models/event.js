const Model = require('./model');

class EventModel extends Model {
	constructor() {
		super('_.event');
	}

	findById(id, opt) {
		return this.findOne({ id, is_deleted: false }, opt);
	}

	findByCode(code, opt) {
		return this.findOne({ code, is_deleted: false }, opt);
	}

	create(event, opt) {
		return this.createOne({
			code: event.code,
			name: event.name,
			description: event.description,
			start_at: new Date(event.start_at).toISOString(),
			end_at: new Date(event.end_at).toISOString(),
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		}, opt);
	}

	update(info, opt) {
		return this.updateOne({
			id: info.id,
		}, {
			...info,
			updated_at: new Date().toISOString(),
		}, {
			select: '*',
			...opt,
		});
	}
}

module.exports = EventModel;
