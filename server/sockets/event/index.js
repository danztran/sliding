const EventLive = require('./event-live');
const QuestionLive = require('./question-live');
const EventSocketMdw = requireWrp('middlewares/event-socket-middleware');

module.exports = (io) => {
	io.on('connection', (socket) => {
		EventSocketMdw(socket);

		// join event
		socket.on('join-event', (code) => {
			// join to room
			socket.join(`event/${code}`);

			// leave the room
			socket.on('leave-event', () => {
				socket.disconnect();
			});
			socket.on('disconnect', () => {
				delete io.sockets[socket.id];
			});

			EventLive({ io, socket, code });
			QuestionLive({ io, socket, code });
		});
	});
};
