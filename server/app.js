const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');

global.__rootdir = `${__dirname}\\`;
global.requireWrp = p => require(path.resolve(__dirname, p));

const router = requireWrp('router');

const production = process.env.NODE_ENV === 'production';
const development = !production;

const app = express();

if (development) {
	app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// router
app.use(compression());
app.use(express.static(path.join(__dirname, process.env.VUE_DIST)));
app.use(router);

module.exports = app;
