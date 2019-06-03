const passport = requireWrp('modules/passport-custom');
const User = requireWrp('models/user');

const ctrl = {
	getSafeInfo(user) {
		const info = { ...user };
		delete info.password;
		return info;
	},

	info(req, res, next) {
		if (req.user) {
			return res.sendwm({ user: ctrl.getSafeInfo(req.user) });
		}
		res.messages['auth.info'] = res.$t('sessionExpired');
		res.status(440);
		return res.sendwm();
	},

	async signup(req, res, next) {
		const rules = {
			name: 'string|required|max:100',
			email: 'email|required|max:320',
			username: 'string|required|max:50',
			password: 'string|required|max:50'
		};
		if (!res.$v.rif(rules)) return;
		const { username, email } = req.body;
		const result = {};
		try {
			const checkExistUsername = await User.findOne({ username }).exec();
			if (checkExistUsername) {
				res.status(409);
				throw { username: res.$t('usernameTaken') };
			}

			const checkExistEmail = await User.findOne({ email }).exec();
			if (checkExistEmail) {
				res.status(409);
				throw { email: res.$t('emailTaken') };
			}

			const user = await User.create(req.body).exec();
			res.messages['auth.signup'] = res.$t('successSignUp');

			req.login(user, (err) => {
				if (err) throw err;
				result.user = ctrl.getSafeInfo(user);
				User.setLastAccessed(user).exec();
				return res.sendwm(result);
			});
		}
		catch (error) {
			res.messages = { ...res.messages, ...error };
			return next(error);
		}
	},

	login(req, res, next) {
		if (req.user) {
			res.messages['auth.login'] = res.$t('alreadyLoggedIn');
			return res.sendwm({ user: ctrl.getSafeInfo(req.user) });
		}
		const rules = {
			username: 'string|required',
			password: 'string|required'
		};
		if (!res.$v.rif(rules)) return;
		passport.authenticate('local', (err, user, field, messageCode) => {
			const result = {};
			if (err) return next(err);

			if (!user) {
				res.status(401);
				if (field && messageCode) {
					res.messages[field] = res.$t(messageCode);
				}
				else if (field) {
					res.messages['field'] = user;
				}
				return res.sendwm();
			}

			req.logIn(user, (error) => {
				if (error) return next(error);

				res.messages['auth.login'] = res.$t('successLoggedIn');
				result.user = ctrl.getSafeInfo(user);
				User.setLastAccessed(user).exec();
				return res.sendwm(result);
			});
		})(req, res, next);
	},

	logout(req, res) {
		req.logout();
		res.messages['auth.logout'] = res.$t('successLoggedOut');
		return res.sendwm();
	}
};

module.exports = ctrl;
