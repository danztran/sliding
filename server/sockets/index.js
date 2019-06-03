const io = require('socket.io')();
const eventNsp = requireWrp('sockets/event-nsp');

eventNsp(io.of('event'));

module.exports = io;
