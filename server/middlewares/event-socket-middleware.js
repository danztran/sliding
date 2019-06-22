const Translator = requireWrp('modules/translator');
// const Validator = requireWrp('modules/validator-custom');
module.exports = {
	setIO(io) {
		// init state
		io.$state = {
			events: {}
		};

		// init func
		io.$fn = {
			saveEvent(event) {
				const { code } = event;
				const _event = {
					...event,
					rooms: {
						main: `/${code}`,
						admin: `/${code}/admin`,
						guest: `/${code}/guest`
					}
				};
				io.$state.events[code] = _event;
				return { ..._event };
			},
			getEvent(code) {
				const event = io.$state.events[code];
				return event ? { ...event } : undefined;
			},
			removeEvent(code) {
				delete io.$state.events[code];
			},
			removeEventIfNoClient({ code }) {
				const event = io.$state.events[code];
				if (!io.adapter.rooms[event.rooms.main]) {
					delete io.$state.events[code];
				}
			}
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
			user: socket.request.session.user || null
		};

		// functions
		socket.$fn = {
			t: translator.$t,
			d: translator.$d,
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
				return io.$fn.getEvent(this.getEventCode());
			},
			setUser(user) {
				socket.$state.user = { ...user };
			},
			getUser() {
				return { ...socket.$state.user };
			},
			isAuthenticated() {
				return !!socket.$state.user;
			},
			setRole(role) {
				socket.$state.role = { ...role };
			},
			getRole() {
				const { role } = socket.$state;
				return role ? { ...role } : null;
			},
			can(permission) {
				const { role } = socket.$state;
				return role && role.permissions[permission];
			},
			cannot(permission, callback) {
				if (this.can(permission)) return false;
				const message = this.t('noPermissionTo', {
					permission: this.t(permission)
				});
				this.handleError({ expected: message }, callback);
				return true;
			},
			handleError(error, callback) {
				console.error(error);
				// check if error caused by system or user
				let errmsg = this.t('somethingWrong');
				if (error && error.expected) {
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
			}
		};
	}
};
