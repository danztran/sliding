const session = require('express-session');
const FileStore = require('session-file-store')(session);
const RedisStore = require('connect-redis')(session);
const {
	sessionName,
	sessionSecret,
	sessionMaxAge,
	sessionResave,
	sessionSaveUninitialized,
	fileStorePath,
	fileStoreSecret,
	fileStoreExtension,
	fileStoreMaxAge,
	redisOn,
	redisUrl,
} = requireWrp('./config');

let store;
if (redisOn) {
	store = new RedisStore({
		url: redisUrl,
		ttl: sessionMaxAge,
		logErrors: true,
	});
}
else {
	store = new FileStore({
		path: fileStorePath,
		secret: fileStoreSecret,
		ttl: fileStoreMaxAge,
		fileExtension: fileStoreExtension,
		logFn() {},
	});
}

module.exports = session({
	name: sessionName,
	secret: sessionSecret,
	resave: sessionResave,
	saveUninitialized: sessionSaveUninitialized,
	cookie: {
		maxAge: sessionMaxAge,
	},
	store,
});
