const EventModel = requireWrp('models/event');
const EventRoleModel = requireWrp('models/event-role');
const { nextStringOf } = requireWrp('modules/common');
const { eventCodeBone, eventCodeStart } = requireWrp('config');

// generate new event code
let getEventCode;
new EventModel().findLastOf('id', { select: 'code' })
	.exec()
	.then((lastEvent) => {
		console.warn(`Last event code: ${lastEvent.code}`);
		getEventCode = (function* () {
			let code = eventCodeStart;
			if (lastEvent) {
				code = nextStringOf(lastEvent.code, eventCodeBone);
			}
			while (true) {
				yield code;
				code = nextStringOf(code, eventCodeBone);
			}
		}());
	})
	.catch((error) => {
		console.error(error);
		return process.exit(1);
	});

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
			const events = await EventRole.findEventsByUserId(req.user.id, {
				order: opt.order,
				limit: Number(opt.limit || 10),
				offset: Number(opt.offset || 0),
				role: opt.role,
			}).exec();
			result.events = events;
		}
		catch (error) {
			return next(error);
		}
		return res.sendwm(result);
	},

	async create(req, res, next) {
		const rules = {
			name: 'string|required|max:100',
			description: 'string',
			allow_search: 'boolean',
			require_auth: 'boolean',
			start_at: 'date|required',
			end_at: 'date|required|after_or_equal:start_at',
		};
		if (!res.$v.rif(rules)) return;

		const info = req.body;
		const result = {};
		try {
			const Event = new EventModel();
			const EventRole = new EventRoleModel();
			// generate new code
			info.code = getEventCode.next().value;

			const event = await Event.create(info).exec(1);
			await EventRole.create({
				user_id: req.user.id,
				event_id: event.id,
				role: 'host',
			}).exec();
			result.code = event.code;
		}
		catch (error) {
			return next(error);
		}

		return res.sendwm(result);
	},

	async find(req, res, next) {
		const rules = {
			code: 'string|min:3',
		};
		if (!res.$v.rif(rules)) return;

		const {
			code,
		} = req.query;
		const result = {};

		try {
			const EventRole = new EventRoleModel();
			const Event = new EventModel();
			const event = await Event.findByCode(code, {
				select: 'id, code, name, description, start_at, end_at, require_passcode',
			}).exec();

			if (!event) {
				res.status(404);
				throw { 'find-event': res.$t('notFoundEventByCode') };
			}
			result.event = event;

			if (req.user) {
				const role = await EventRole.findOne({
					user_id: req.user.id,
					event_id: event.id,
				}, {
					select: 'role',
				}).exec();
				result.role = role;
			}

			return res.sendwm(result);
		}
		catch (error) {
			res.messages = { ...res.messages, ...error };
			return next(error);
		}
	},
};
