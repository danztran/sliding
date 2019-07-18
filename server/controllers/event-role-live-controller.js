const EventModel = requireWrp('models/event');
const EventRoleModel = requireWrp('models/event-role');
const UserModel = requireWrp('models/user');

module.exports = {
	async query({ io, socket }, info, callback) {
		// VALIDATE HERE
		// const rules = {
		// 	limit: 'integer|between:0,50',
		// 	offset: 'integer|min:0',
		// 	order: 'alpha_dash',
		// 	role: 'alpha|in:host,moderator,guest',
		// };
		// if (!res.$v.rif(rules)) return;

		const result = {};
		const user = socket.$fn.getUser();
		try {
			const EventRole = new EventRoleModel();
			const events = await EventRole.findRoles({
				user_id: user.id,
				role: 'moderator',
			}, {
				order: info.order || '-created_at',
				limit: Number(info.limit || 10),
				offset: Number(info.offset || 0),
			}).exec();
			result.events = events;
			callback(result);
		}
		catch (error) {
			return socket.$fn.handleError(error);
		}
	},

	async response({ io, socket }, info, callback) {
		// VALIDATE HERE
		// const rules = {
		// 	event_id: 'integer|required',
		// 	is_accepted: 'required',
		// };
		// if (!res.$v.rif(rules)) return;

		const user = socket.$fn.getUser();
		const { event_id, is_accepted } = info;
		try {
			const EventRole = new EventRoleModel();
			const query = {
				event_id,
				user_id: user.id,
				role: 'moderator',
			};

			const role = await EventRole.findOne(query).exec();
			if (!role) throw 'not found invited';

			const newRole = await EventRole.update({
				...role,
				role: 'moderator',
				is_accepted,
			}).exec();

			const Event = new EventModel();
			const event = await Event.findById(event_id).exec();
			if (event) {
				if (is_accepted) {
					socket.to(`/${event.code}/admin`).emit('new_accepted_invite');
				}
				else {
					socket.to(`/${event.code}/admin`).emit('new_denied_invite');
				}
			}
			return callback({ role: newRole });
		}
		catch (error) {
			return socket.$fn.handleError(error);
		}
	},

	async addModerator({ io, socket }, info, callback) {
		if (socket.$fn.cannot('addModerator', callback)) return;
		// VALIDATE INFO HERE
		// ...
		const event = socket.$fn.getCurrentEvent();
		const result = {};
		try {
			const User = new UserModel();
			const EventRole = new EventRoleModel();

			if (socket.$fn.getUser().email === info.email) {
				throw socket.$fn.t('userHostAlready');
			}

			// find user
			const query = [{ email: info.email }, { select: '"id", "name", "username"' }];
			const user = await User.findOne(...query).exec();
			if (!user) throw socket.$fn.t('userNotFoundByEmail');

			result.user = { ...user, email: info.email };

			// check role exists
			const role = await EventRole.findOne({
				event_id: event.id,
				user_id: result.user.id,
				is_deleted: false,
			}).exec();
			if (role) throw socket.$fn.t('userModeratorAlready');

			const admin = await EventRole.createOrUpdate({
				user_id: result.user.id,
				event_id: event.id,
			}, {
				role: 'moderator',
				updated_at: new Date().toISOString(),
			}, {
				select: '"user_id", "role"',
			}).exec();

			socket.$fn.addAdmin(admin);
			socket.to(`user#${user.username}`).emit('new_invited_to_event', event);
			return callback(result);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},

	async removeModerator({ io, socket }, info, callback) {
		if (socket.$fn.cannot('removeModerator', callback)) return;
		// VALIDATE INFO HERE
		// ...
		const event = socket.$fn.getCurrentEvent();
		try {
			const EventRole = new EventRoleModel();

			// check role exists
			const role = await EventRole.findOne({
				event_id: event.id,
				user_id: info.user.id,
			}).exec();

			if (role) {
				await EventRole.updateOne({
					event_id: event.id,
					user_id: info.user_id,
				}, {
					role: 'guest',
					updated_at: new Date().toISOString(),
					is_deleted: true,
				}).exec();
				socket.to(event.rooms.main).emit('new_removed_admin', info);
			}
			socket.$fn.removeAdmin({ id: info.user_id });
			callback(true);

			// notify to user
			const User = new UserModel();
			const user = await User.findById(info.user_id).exec();
			socket.to(`user#${user.username}`).emit('new_removed_from_event', event);
		}
		catch (e) {
			return socket.$fn.handleError(e, callback);
		}
	},
};
