module.exports = controller => async function(req, res, next) {
	try {
		const result = await controller(req, res);

		if (result && !res.headersSent) {
			res.sendwm(result);
		}
		return true;
	}
	catch (error) {
		if (typeof error === 'object') {
			if (!(error instanceof Error)) {
				const { message } = error;
				const { code } = error;
				if (message) {
					if (typeof message === 'string') {
						res.messages = { ...res.messages, message };
					}
					else if (typeof message === 'object') {
						res.messages = { ...res.messages, ...message };
					}
				}
				if (code) {
					res.status(code);
				}
			}
		}
		return next(error);
	}
};
