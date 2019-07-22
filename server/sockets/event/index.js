const EventSocketMdw = requireWrp('middlewares/event-socket-middleware');
const EventLive = require('./event-live');
const EventRoleLive = require('./event-role-live');
const QuestionLive = require('./question-live');
const QuestionReplyLive = require('./question-reply-live');
const QuestionReactionLive = require('./question-reaction-live');
const PollLive = require('./poll-live');

module.exports = (io) => {
	EventSocketMdw.setIO(io);

	io.on('connection', (socket) => {
		EventSocketMdw.setSocket({ io, socket });

		socket.on('update-authen', () => {
			socket.$fn.reloadSession();
		});

		EventRoleLive({ io, socket });

		// join event
		socket.on('join-event', (code) => {
			socket.on('disconnect', () => {
				io.$fn.removeEventIfNoClient({ code });
			});

			socket.on('leave-event', () => {
				const event = socket.$fn.getCurrentEvent();
				if (event) {
					for (const room of Object.values(event.rooms)) {
						socket.leave(room);
					}
					io.$fn.removeEventIfNoClient({ code });
				}
			});

			EventLive({ io, socket, code });
			QuestionLive({ io, socket });
			QuestionReplyLive({ io, socket });
			QuestionReactionLive({ io, socket });
			PollLive({ io, socket });
		});
	});
};
