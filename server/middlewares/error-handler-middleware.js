const { cookie } = requireWrp('config');

module.exports = (err, req, res, next) => {
	console.error(err);
	if (res.statusCode === 200) {
		res.status(500);
	}
	if (res.statusCode === 500) {
		res.messages = { server: res.$t('somethingWrong') };
	}
	if (req.xhr) {
		return res.sendwm();
	} if (err.redirect && err.redirect.indexOf('login') !== -1) {
		return res.redirect('/login');
	}
	res.cookie(cookie.flashMessage, err.message || res.$t('somethingWrong'));
	return res.redirect('/login');
};
