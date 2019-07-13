const mdw = {
	authen(req, res, next) {
		if (!req.user) {
			res.messages['authenticate'] = res.$t('unauthenticated');
			return res.status(401).sendwm();
		}
		return next();
	},
};

module.exports = mdw;
