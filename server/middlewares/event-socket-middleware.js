const Translator = requireWrp('modules/translator');
// const Validator = requireWrp('modules/validator-custom');

module.exports = (socket) => {
	if (!socket) return;
	const acceptlangs = socket.request.headers['accept-language'];
	let locales = null;
	if (acceptlangs) {
		locales = acceptlangs.split(';')[0].split(',');
	}
	const translator = new Translator(locales);

	// init state
	socket.$state = socket.$state || {};
	socket.$state.locale = translator.locale;
	// check auth
	const { user } = socket.request.session;
	socket.$state.user = user || null;

	// functions
	socket.$fn = {};
	socket.$fn.$t = translator.$t;
	socket.$fn.$d = translator.$d;
	socket.$fn.$err = (error, callback) => {
		console.error(error);
		// check if error caused by system or user
		let errmsg = socket.$fn.$t('somethingWrong');
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
	};
	// role & permission
	socket.$state.role = {
		name: '',
		permissions: {}
	};
	socket.$fn.$cannot = (permission, callback) => {
		if (socket.$state.role.permissions[permission]) {
			return false;
		}
		const message = socket.$fn.$t('noPermissionTo', {
			permission: socket.$fn.$t(permission)
		});
		socket.$fn.$err({ expected: message }, callback);
		return true;
	};
};
