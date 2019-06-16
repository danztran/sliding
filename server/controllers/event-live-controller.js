const EventModel = requireWrp('models/event');
const EventRoleModel = requireWrp('models/event-role');
const Roles = requireDir('resources/roles/');

module.exports = {
	async getEvent({ io, socket, code }) {
		const result = {};

		try {
			const Event = new EventModel();
			const EventRole = new EventRoleModel();
			// find event
			const event = await Event.findByCode(code).exec();
			if (!event) {
				throw { expected: socket.$fn.$t('eventNotFound') };
			}
			result.event = event;

			// check user role
			if (socket.$state.user) {
				const eventRole = await EventRole.findRole({
					event_id: event.id,
					user_id: socket.$state.user.id
				}).exec();
				result.role = Roles[eventRole ? eventRole.role : 'guest'];
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

		return socket.emit('get_event', result);
	}
};
