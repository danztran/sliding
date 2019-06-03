const Event = requireWrp('models/event');
const EventUser = requireWrp('models/event-user');
const codeBone = 'abcdefghijklmnopqrstuvwxyz0123456789';
const codeStart = 'aaa';
const { nextStringOf } = requireWrp('modules/common');

const ctrl = {

	async create(req, res, next) {
		const rules = {
			name: 'string|required|max:100',
			description: 'string',
			allow_search: 'boolean',
			require_auth: 'boolean',
			start_at: 'date|required',
			end_at: 'date|required|after_or_equal:start_at'
		};
		if (!res.$v.rif(rules)) return;

		const info = req.body;
		const result = {};
		try {
			// generate new code
			info.code = codeStart;
			const lastEvent = await Event.findLastOf('id', 'code').exec();
			if (lastEvent) {
				info.code = nextStringOf(lastEvent.code, codeBone);
			}

			const event = await Event.create(info).exec();
			await EventUser.create({
				user_id: req.user.id,
				event_id: event.id,
				role: 'master'
			}).exec();
			result.code = event.code;
		}
		catch (error) {
			return next(error);
		}

		return res.status(200).sendwm(result);
	}
};

module.exports = ctrl;
