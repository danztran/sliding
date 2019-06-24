const passport = requireWrp('modules/passport-custom');
const UserModel = requireWrp('models/user');
const { signUpRules, logInRules } = requireWrp('config');

const Ctlr = {
	getSafeInfo(user) {
		const info = { ...user };
		delete info.password;
		return info;
	},

	info(req, res, next) {
		if (req.user) {
			return res.sendwm({ user: Ctlr.getSafeInfo(req.user) });
		}
		res.messages['auth.info'] = res.$t('sessionExpired');
		res.status(440);
		return res.sendwm();
	},

	async signup(req, res, next) {
		if (!res.$v.rif(signUpRules)) return;
		const { username, email } = req.body;
		const result = {};
		try {
			const User = new UserModel();
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

			await User.create(req.body).exec();
			res.messages['auth.signup'] = res.$t('successSignUp');

			return res.sendwm(result);
		}
		catch (error) {
			res.messages = { ...res.messages, ...error };
			return next(error);
		}
	},

	async update(req, res, next) {
		// ...
	},

	login(req, res, next) {
		const User = new UserModel();
		if (req.user) {
			res.messages['auth.login'] = res.$t('alreadyLoggedIn');
			return res.sendwm({ user: Ctlr.getSafeInfo(req.user) });
		}
		if (!res.$v.rif(logInRules)) return;
		passport.authenticate('local', (err, user, field, info) => {
			const result = {};
			if (err) return next(err);

			if (!user) {
				res.status(401);
				if (typeof field === 'object') {
					for (const key of Object.keys(field)) {
						res.messages[key] = res.$t(field[key]);
					}
				}
				else if (field) {
					res.messages['authen'] = info;
				}
				return res.sendwm();
			}

			req.logIn(user, (error) => {
				if (error) return next(error);
				req.session.user = req.user;
				res.messages['auth.login'] = res.$t('successLoggedIn');
				result.user = Ctlr.getSafeInfo(user);
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

module.exports = Ctlr;
