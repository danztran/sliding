const Event = requireWrp('models/event');
const EventUser = requireWrp('models/event-user');
const Roles = requireDir('resources/roles/');

const ctlr = {
	async emitEventData({ socket, code, io }) {
		const result = {};
		try {
			const uid = socket.request.session.passport.user;
			const event = await Event.findByCode(code).exec();
			if (!event) {
				throw { event: 'event not found' };
			}

			const eventUser = await EventUser.findRole({
				event_id: event.id,
				user_id: uid
			}).exec();

			result.event = event;
			result.role = Roles[eventUser.role];

			if (['host', 'moderator'].includes(eventUser.role)) {
				socket.join(`admin/event#${code}`);
			}
			else {
				socket.join(`guest/event#${code}`);
			}
		}
		catch (error) {
			console.warn(error);
		}

		return socket.emit('event_data', result);
	}
};

module.exports = ctlr;
