const passport = requireWrp('modules/passport-custom');

const mdw = {
	authen(req, res, next) {
		if (!req.user) {
			res.messages['authenticate'] = res.$t('unauthenticated');
			return res.status(401).sendwm();
		}
		return next();
	},

	outlookCallback(req, res, next) {
		return passport.authenticate('windowslive', {
			failureRedirect: '/login',
		})(req, res, next);
	},
};

module.exports = mdw;
