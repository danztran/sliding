const EventRoleModel = requireWrp('models/event-role');

module.exports = {
	async query(req, res, next) {
		const rules = {
			limit: 'integer|between:0,50',
			offset: 'integer|min:0',
			order: 'alpha_dash',
			role: 'alpha|in:host,moderator,guest',
		};
		if (!res.$v.rif(rules)) return;

		const opt = req.query;
		const result = {};
		try {
			const EventRole = new EventRoleModel();
			const events = await EventRole.findRoles({
				user_id: req.user.id,
				role: 'moderator',
			}, {
				order: opt.order || '-created_at',
				limit: Number(opt.limit || 10),
				offset: Number(opt.offset || 0),
			}).exec();
			result.events = events;
			return res.sendwm(result);
		}
		catch (error) {
			res.messages = { ...res.messages, ...error };
			return next(error);
		}
	},

	async response(req, res, next) {
		const rules = {
			event_id: 'integer|required',
			is_accepted: 'required',
		};
		if (!res.$v.rif(rules)) return;

		const { event_id, is_accepted } = req.body;
		try {
			const EventRole = new EventRoleModel();
			const query = {
				event_id,
				user_id: req.user.id,
				role: 'moderator',
			};

			const role = await EventRole.findOne(query).exec();
			if (!role) {
				res.status(404);
				throw { 'response-invite': 'not found invited' };
			}

			const newRole = await EventRole.update({
				...role,
				role: 'moderator',
				is_accepted,
			}).exec();

			return res.sendwm({ role: newRole });
		}
		catch (error) {
			res.messages = { ...res.messages, ...error };
			return next(error);
		}
	},
};
