const EventSocketMdw = requireWrp('middlewares/event-socket-middleware');
const EventLive = require('./event-live');
const EventRoleLive = require('./event-role-live');
const QuestionLive = require('./question-live');
const QuestionReplyLive = require('./question-reply-live');
const QuestionReactionLive = require('./question-reaction-live');
const PollLive = require('./poll-live');
const PollOptionLive = require('./poll-option-live');
const PollOptionChoiceLive = require('./poll-option-choice-live');

module.exports = (io) => {
	EventSocketMdw.setIO(io);

	io.on('connection', (socket) => {
		EventSocketMdw.setSocket({ io, socket });

		socket.on('update-authen', async (callback) => {
			try {
				await socket.$fn.reloadSession();
				if (callback) {
					callback({});
				}
			}
			catch (error) {
				if (callback) {
					callback({ reload: true });
				}
			}
		});

		EventRoleLive({ io, socket });
		QuestionLive({ io, socket });
		QuestionReplyLive({ io, socket });
		QuestionReactionLive({ io, socket });
		PollLive({ io, socket });
		PollOptionLive({ io, socket });
		PollOptionChoiceLive({ io, socket });

		// join event
		socket.on('join-event', (code) => {
			EventLive({ io, socket, code });

			socket.on('disconnect', () => {
				io.$fn.removeEventIfNoClient({ code });
			});

			socket.on('leave-event', () => {
				const event = socket.$fn.getCurrentEvent();
				if (event && event.rooms) {
					const onlineUsers = socket.$fn.getCurrentEventOnlineUsers();
					socket.to(event.rooms.main).emit('new_updated_online_users', onlineUsers - 1);
					for (const room of Object.values(event.rooms)) {
						socket.leave(room);
					}
					io.$fn.removeEventIfNoClient({ code });
				}
			});
		});
	});
};
