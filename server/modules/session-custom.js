const session = require('express-session');

module.exports = session({
	name: '_cn_s',
	secret: 'googlefirstplease',
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: 864000000
	}
});
