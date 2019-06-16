const Translator = requireWrp('modules/translator');
const Validator = requireWrp('modules/validator-custom');

module.exports = (socket) => {
	if (!socket) return;
	const locale = socket.request.headers['accept-language'];
	const translator = new Translator(locale);

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
	socket.$fn.$err = (error) => {
		let errmsg = socket.$fn.$t('somethingWrongs');
		if (error) {
			if (error.expected) {
				errmsg = errmsg.expected;
			}
		}
		console.error(error);
		return socket.emit('event_errmsg', errmsg);
	};
	// role & permission
	socket.$state.role = {
		name: '',
		permissions: {}
	};
	socket.$fn.$cannot = (permission) => {
		if (socket.$state.role.permissions[permission]) {
			return false;
		}
		const message = socket.$fn.$t('noPermissionTo', {
			permission: socket.$fn.$t(permission)
		});
		socket.$fn.$err({ expected: message });
		return true;
	};
};
