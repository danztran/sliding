const passport = requireWrp('modules/passport-custom');
const User = requireWrp('models/user');
const nameRegExp = 'regex:/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/g';

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
			name: ['required', 'min:3', 'max:100', nameRegExp],
			email: 'email|required|max:320',
			username: 'alpha_num|required|min:6|max:50|regex:/^[a-z][a-z0-9]*$/g',
			password: 'string|required|min:6|max:50',
			rePassword: 'string|required|min:6|max:50|same:password'
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

			await User.create(req.body).exec();
			res.messages['auth.signup'] = res.$t('successSignUp');

			return res.sendwm(result);
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
