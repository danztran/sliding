const EventSocketMdw = requireWrp('middlewares/event-socket-middleware');
const EventLive = require('./event-live');
const QuestionLive = require('./question-live');
const QuestionReplyLive = require('./question-reply-live');

module.exports = (io) => {
	io.on('connection', (socket) => {
		EventSocketMdw(socket);

		// join event
		socket.on('join-event', (code) => {
			// join to room
			const room = `event/${code}`;
			socket.join(room);
			socket.$state.rooms = {
				eventRoom: room,
				adminRoom: `${room}/admin`,
				guestRoom: `${room}/guest`
			};

			// leave the room
			socket.on('leave-event', () => {
				socket.disconnect();
			});
			socket.on('disconnect', () => {
				delete io.sockets[socket.id];
			});

			EventLive({ io, socket, code });
			QuestionLive({ io, socket });
			QuestionReplyLive({ io, socket });
		});
	});
};
