const Translator = requireWrp('modules/translator');
const Roles = requireDir('resources/roles/');
// const Validator = requireWrp('modules/validator-custom');
module.exports = {
	setIO(io) {
		// init state
		io.$state = {
			events: {},
		};

		// init func
		io.$fn = {
			saveEvent(event) {
				const { code } = event;
				const _event = {
					...event,
					rooms: this.getEventRooms(code),
				};
				io.$state.events[code] = _event;
				return { ..._event };
			},
			getEventRooms(code) {
				return {
					main: `event#${code}`,
					admin: `event#${code}/admin`,
					guest: `event#${code}/guest`,
				};
			},
			getEvent({ id, code }) {
				let event;
				if (id) {
					event = this.getEventById(id);
				}
				else if (code) {
					event = this.getEventByCode(code);
				}
				return event;
			},
			getEventByCode(code) {
				return io.$state.events[code];
			},
			getEventById(id) {
				const event = io.$state.events.find(e => e.id === id);
				return event ? { ...event } : undefined;
			},
			getRoomByUserId(id) {
				return `user#${id}`;
			},
			isUserOnline(id) {
				const room = this.getRoomByUid(id);
				return io.sockets.adapter.rooms[room] ? room : undefined;
			},
			emitIfUserOnline(id, emiter, data) {
				const room = this.isUserOnline(id);
				if (room) {
					io.to(room).emit(emiter, data);
				}
				return Boolean(room);
			},
			saveAdmin({ id, code }, admin) {
				const event = this.getEvent({ id, code });
				if (event) {
					const index = event.admins.findIndex(e => e.id === admin.id);
					if (index !== -1) {
						event.admins.splice(index, 1, {
							...event.admins[index],
							admin,
						});
					}
					else {
						event.admins.push(admin);
					}
					io.$fn.saveEvent(event);
				}
				return { ...event };
			},
			// rooms as string
			// eq: 'main admin', 'admin guest main'...
			emitIfEventLive({ id, code }, rooms, emiter, data) {
				const event = this.getEvent({ id, code });
				if (event) {
					if (rooms.includes('main')) {
						io.to(event.rooms.main).emit(emiter, data);
					}
					if (rooms.includes('admin')) {
						io.to(event.rooms.admin).emit(emiter, data);
					}
					if (rooms.includes('guest')) {
						io.to(event.rooms.guest).emit(emiter, data);
					}
				}
				return Boolean(event);
			},
			removeEvent(code) {
				delete io.$state.events[code];
			},
			removeEventIfNoClient({ code }) {
				const event = io.$state.events[code];
				if ((
					event
					&& io.adapter.rooms
					&& !io.adapter.rooms[event.rooms.main]
				)
					||	!io.adapter.rooms
				) {
					delete io.$state.events[code];
				}
			},
		};
	},
	setSocket({ io, socket }) {
		if (!socket) return;
		const acceptlangs = socket.request.headers['accept-language'];
		let locales = null;
		if (acceptlangs) {
			locales = acceptlangs.split(';')[0].split(',');
		}
		const translator = new Translator(locales);

		// init state
		socket.$state = socket.$state || {
			locale: translator.locale,
			user: socket.request.session.user || null,
		};

		const { user } = socket.$state;
		if (user) {
			if (user.id) {
				const room = io.$fn.getRoomByUserId(user.id);
				socket.join(room);
			}
		}

		// functions
		socket.$fn = {
			t: translator.$t,
			d: translator.$d,
			setSession(key, value) {
				socket.request.session[key] = value;
				socket.request.session.save();
				return true;
			},
			getSession(key) {
				return key ? socket.request.session[key] : socket.request.session;
			},
			reloadSession() {
				socket.request.session.reload((err) => {
					if (err) {
						console.error(err);
					}
					this.setUser(socket.request.session.user || null);
				});
			},
			setLocale(locale) {
				socket.$state.locale = locale;
			},
			setEventCode(code) {
				socket.$state.eventCode = code;
			},
			getEventCode() {
				return socket.$state.eventCode;
			},
			getCurrentEvent() {
				return io.$fn.getEvent({ code: this.getEventCode() });
			},
			setUser(_user) {
				socket.$state.user = _user !== null ? { ..._user } : null;
			},
			getUser() {
				return { ...socket.$state.user };
			},
			isAuthenticated() {
				return !!socket.$state.user;
			},
			setRole(role) {
				socket.$state.role = role;
			},
			getRole() {
				return socket.$state.role;
			},
			isAdmin() {
				return ['host', 'moderator'].includes(this.getRole());
			},
			isGuest() {
				return !this.isAdmin();
			},
			addAdmin(admin) {
				const event = this.getCurrentEvent();
				const index = event.admins.findIndex(e => e.id === admin.id);
				if (index !== -1) {
					event.admins.splice(index, 1, {
						...event.admins[index],
						admin,
					});
				}
				else {
					event.admins.push(admin);
				}
				io.$fn.saveEvent(event);
				return true;
			},
			removeAdmin(admin) {
				const event = this.getCurrentEvent();
				const index = event.admins.findIndex(e => e.id === admin.id);
				if (index !== -1) {
					event.admins.splice(index, 1);
					io.$fn.saveEvent(event);
				}
				return index !== -1;
			},
			// check role permissions
			can(permission) {
				const role = this.getRole();
				const { permissions } = Roles[role];
				return permissions[permission];
			},
			cannot(permission, callback) {
				if (this.can(permission)) return false;
				const message = this.t('noPermissionTo', {
					permission: this.t(permission),
				});
				this.handleError(message, callback);
				return true;
			},
			// check event rule
			allow(action) {
				if (this.isAdmin()) return true;
				const event = io.$fn.getEvent({ code: this.getEventCode() });
				return event && event[action];
			},
			forbid(action, callback) {
				if (this.allow(action)) return false;
				const message = this.t('forbidTo', {
					action: this.t(action),
				});
				this.handleError(message, callback);
				return true;
			},
			handleError(error, callback) {
				console.error(error);
				// check if error caused by system or user
				let errmsg = this.t('somethingWrong');
				if (typeof error === 'string') {
					errmsg = error;
				}
				else if (error && error.expected) {
					errmsg = error.expected;
				}

				// callback if have
				if (callback) {
					if (typeof callback === 'function') {
						return callback({ errmsg });
					}
					errmsg = 'Callback must be a function!';
				}
				return socket.emit('event_errmsg', { errmsg });
			},
		};
	},
};
