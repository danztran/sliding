const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
const compression = require('compression');
const requireDirectory = require('require-dir');

global.requireWrp = p => require(path.resolve(__dirname, p));
global.requireDir = p => requireDirectory(path.resolve(__dirname, p));

const session = requireWrp('modules/session-custom');
const router = requireWrp('router');

const production = process.env.NODE_ENV === 'production';
const development = !production;

const app = express();

if (development) {
	app.use(logger('dev'));
	app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// passport - session
app.use(session);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// router
app.use(compression());
app.use(express.static(path.join(__dirname, process.env.VUE_DIST)));
app.use(router);

module.exports = app;
