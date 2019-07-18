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
			let ioEvent = io.$fn.getEvent(code);
			let event = ioEvent;
			if (!event) {
				event = await Event.findByCode(code).exec();
				if (!event) throw socket.$fn.t('eventNotFound');
				event.admins = await EventRole.findAdmins(event.id).exec();
				ioEvent = io.$fn.saveEvent(event);
			}
			result.event = event;
			delete result.event.password;

			// check user role
			if (socket.$fn.isAuthenticated()) {
				const user = socket.$fn.getUser();
				const eventRole = await EventRole.findRole({
					event_id: result.event.id,
					user_id: user.id,
				}).exec();
				if (eventRole) {
					result.role = Roles[eventRole.role];
				}
				else {
					EventRole.create({
						user_id: user.id,
						event_id: event.id,
						role: 'guest',
					}).exec();
					result.role = Roles.guest;
				}
			}
			else {
				throw {
					expected: 'Unauthenticated',
				};
			}
			socket.$fn.setRole(result.role.name);
			socket.$fn.setEventCode(result.event.code);

			// join role room
			socket.join(ioEvent.rooms.main);
			if (socket.$fn.isAdmin()) {
				socket.join(ioEvent.rooms.admin);
			}
			else {
				socket.join(ioEvent.rooms.guest);
			}

			return socket.emit('get_event', result);
		}
		catch (error) {
			return socket.$fn.handleError(error);
		}
	},

	async editEvent({ io, socket }, info, callback) {
		if (socket.$fn.cannot('editEvent', callback)) return;
		// VALIDATE INFO HERE
		// ..
		const event = socket.$fn.getCurrentEvent();
		const result = {};
		try {
			const Event = new EventModel();
			const newInfo = {
				...info,
				id: event.id,
				code: event.code,
			};
			const editedEvent = await Event.update(newInfo).exec();
			io.$fn.saveEvent({ ...event, ...editedEvent });
			result.event = newInfo;
			delete result.event.password;

			socket.to(event.rooms.main).emit('new_edited_event', newInfo);
			return callback(result);
		}
		catch (e) {
			socket.$fn.handleError(e, callback);
		}
	},
};
