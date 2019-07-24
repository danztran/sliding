const passport = requireWrp('modules/passport-custom');
const UserModel = requireWrp('models/user');
const crypto = requireWrp('modules/crypto-custom');
const { signUpRules, logInRules, updateRules } = requireWrp('config');

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

	async quickSignup(req, res, next) {
		const result = {};
		try {
			const User = new UserModel();
			const name = `${res.$t('anonymousUser')} ${Math.floor(Math.random() * 10000)}`;
			const user = await User.quickCreate({ name }).exec();
			result.user = user;

			req.logIn(user, (error) => {
				if (error) return next(error);
				req.session.user = req.user;
				result.user = Ctlr.getSafeInfo(user);
				User.setLastAccessed(user).exec();
				return res.sendwm(result);
			});
		}
		catch (error) {
			res.messages = { ...res.messages, ...error };
			return next(error);
		}
	},

	async completeSignup(req, res, next) {
		if (!res.$v.rif(signUpRules)) return;
		const { username, email } = req.body;
		const result = {};
		try {
			if (req.user.username || req.user.email) {
				res.status(400);
				throw { auth: 'rejected' };
			}

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

			const user = await User.completeCreate({
				...req.body,
				id: req.user.id,
			}).exec();
			req.user = user;
			req.session.user = user;
			res.messages['auth.complete-signup'] = res.$t('successSignUp');

			return res.sendwm(result);
		}
		catch (error) {
			res.messages = { ...res.messages, ...error };
			return next(error);
		}
	},

	async update(req, res, next) {
		if (!res.$v.rif(updateRules)) return;
		const result = {};
		const empty = isEmpty(req.body);
		const { id } = req.user;
		const { curPassword } = req.body;
		// check if form object is null

		if (empty === false) {
			try {
				// get current user info
				const User = new UserModel();
				const user = await User.findById(id).exec();
				// if user inputs current password
				if (curPassword !== null && curPassword !== '' && curPassword !== undefined) {
					// if current password from body is not equal password from user
					if (curPassword !== crypto.dec(user.password)) {
						res.status(409);
						throw { password: res.$t('passwordIncorrect') };
					}
				}
				// update user profile
				const newInfo = await User.update(req.user, req.body).exec();
				req.user = newInfo;
				res.messages['newInfo'] = newInfo;
				res.messages['auth.update'] = res.$t('successUpdate');
				return res.sendwm(result);
			}
			catch (error) {
				res.messages = { ...res.messages, ...error };
				return next(error);
			}
		}
		else {
			res.messages['warning'] = 'Fields are empty';
			return res.sendwm(result);
		}
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
		delete req.session.user;
		req.logout();
		res.messages['auth.logout'] = res.$t('successLoggedOut');
		return res.sendwm();
	},
};

function isEmpty(obj) {
	for (const prop in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, prop)) {
			// console.log(`key ${prop}`);
			// console.log(`value ${obj[prop]}`);
			if (obj[prop] === null || obj[prop] === '' || (typeof obj[prop]) === 'undefined') {
				return true;
			}
		}
	}

	return JSON.stringify(obj) === JSON.stringify({});
}

module.exports = Ctlr;
