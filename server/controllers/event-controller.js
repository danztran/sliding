const EventModel = requireWrp('models/event');
const EventRoleModel = requireWrp('models/event-role');
const { nextStringOf } = requireWrp('modules/common');
const { eventCodeBone, eventCodeStart } = requireWrp('config');

// generate new event code
let getEventCode;
new EventModel().findLastOf('id', { select: 'code' })
	.exec()
	.then((lastEvent) => {
		if (lastEvent) {
			console.warn(`Last event code: ${lastEvent.code}`);
		}
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
	async query(req, res) {
		const rules = {
			limit: 'integer|between:0,50',
			offset: 'integer|min:0',
			order: 'alpha_dash',
			role: 'alpha|in:host,moderator,guest',
		};
		if (!res.$v.rif(rules)) return;

		const opt = req.query;
		const result = {};
		const EventRole = new EventRoleModel();
		const events = await EventRole.findEvents({
			user_id: req.user.id,
			role: opt.role,
		}, {
			order: opt.order || 'created_at',
			limit: Number(opt.limit || 10),
			offset: Number(opt.offset || 0),
		}).exec();
		result.events = events;

		return result;
	},

	async create(req, res) {
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
		const Event = new EventModel();
		const EventRole = new EventRoleModel();
		// generate new code
		info.code = getEventCode.next().value;

		const event = await Event.create(info).exec();
		await EventRole.create({
			user_id: req.user.id,
			event_id: event.id,
			role: 'host',
			is_accepted: true,
		}).exec();
		result.code = event.code;

		return result;
	},

	async find(req, res) {
		const rules = {
			code: 'alpha_num|min:3',
		};
		if (!res.$v.rif(rules)) return;

		const {
			code,
		} = req.query;
		const result = {};

		const EventRole = new EventRoleModel();
		const Event = new EventModel();
		const event = await Event.findByCode(code.toLowerCase(), {
			select: 'id, code, name, description, start_at, end_at, require_passcode',
		}).exec();

		if (!event) {
			throw {
				code: 404,
				message: res.$t('notFoundEventByCode'),
			};
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

		return result;
	},
};
