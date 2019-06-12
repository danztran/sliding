const io = require('socket.io')();
const EventNsp = require('./event');

EventNsp(io.of('event'));

module.exports = io;
