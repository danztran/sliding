const EventSocketMdw = requireWrp('middlewares/event-socket-middleware');
const EventLive = require('./event-live');
const QuestionLive = require('./question-live');
const QuestionReplyLive = require('./question-reply-live');

module.exports = (io) => {
	EventSocketMdw.setIO(io);

	io.on('connection', (socket) => {
		EventSocketMdw.setSocket({ io, socket });

		// join event
		socket.on('join-event', (code) => {
			socket.on('disconnect', () => {
				delete io.sockets[socket.id];
				io.$fn.removeEventIfNoClient({ code });
			});

			socket.on('leave-event', () => {
				socket.disconnect();
			});

			EventLive({ io, socket, code });
			QuestionLive({ io, socket });
			QuestionReplyLive({ io, socket });
		});
	});
};
