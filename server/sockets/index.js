const { socket } = requireWrp('config');
const io = require('socket.io')({
	path: socket.path,
});
const EventNsp = require('./event');

EventNsp(io);

module.exports = io;
