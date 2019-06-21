const session = require('express-session');
const FileStore = require('session-file-store')(session);
const {
	sessionName,
	sessionSecret,
	sessionMaxAge,
	sessionResave,
	sessionSaveUninitialized,
	fileStorePath,
	fileStoreSecret,
	fileStoreExtension,
	fileStoreMaxAge
} = requireWrp('./config');

module.exports = session({
	name: sessionName,
	secret: sessionSecret,
	resave: sessionResave,
	saveUninitialized: sessionSaveUninitialized,
	cookie: {
		maxAge: sessionMaxAge
	},
	store: new FileStore({
		path: fileStorePath,
		secret: fileStoreSecret,
		ttl: fileStoreMaxAge,
		fileExtension: fileStoreExtension
	})
});
