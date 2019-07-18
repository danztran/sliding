const io = require('socket.io')();
const EventNsp = require('./event');

EventNsp(io);

module.exports = io;
