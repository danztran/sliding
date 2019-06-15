const Event = requireWrp('models/event');
const EventUser = requireWrp('models/event-user');
const Roles = requireDir('resources/roles/');

module.exports = {
	async emitEventData({ io, socket, code }) {
		const result = {};

		try {
			// find event
			const event = await Event.findByCode(code).exec();
			if (!event) {
				throw { expected: socket.$fn.$t('eventNotFound') };
			}
			result.event = event;

			// check user role
			if (socket.$state.user) {
				const eventUser = await EventUser.findRole({
					event_id: event.id,
					user_id: socket.$state.user.id
				}).exec();
				result.role = Roles[eventUser ? eventUser.role : 'guest'];
			}
			else {
				result.role = Roles.guest;
			}
			socket.$state.role = result.role;
			socket.$state.event = result.event;

			// join role room
			if (['host', 'moderator'].includes(result.role.name)) {
				socket.join(socket.$state.rooms.admin);
			}
			else {
				socket.join(socket.$state.rooms.guest);
			}
		}
		catch (error) {
			return socket.$fn.$err(error);
		}

		return socket.emit('event_data', result);
	}
};
