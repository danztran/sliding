const rateLimit = require('express-rate-limit');

const routes = {
	signup: rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 5,
		message: 'Too many accounts created from this IP, please try again after 15 minutes',
	}),
	quickSignup: rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 5,
		message: 'Too many accounts created from this IP, please try again after 15 minutes',
	}),
	login: rateLimit({
		windowMs: 10 * 60 * 1000,
		max: 10,
		message: 'Too many fails login, please try again after 10 minutes',
	}),
	createEvent: rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 15,
		message: 'Too many events created, please try again after 15 minutes',
	}),
	analyticEvent: rateLimit({
		windowMs: 1 * 60 * 1000,
		max: 10,
		message: 'Too many analytic requests, please try again after some minutes',
	}),
};

module.exports = routes;
