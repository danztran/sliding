const Model = requireWrp('models/model');

class PollModel extends Model {
	constructor() {
		super('poll');
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
