const EventLiveCtlr = requireWrp('controllers/event-live-controller');
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

		EventLive({ io, socket });
		EventRoleLive({ io, socket });
		QuestionLive({ io, socket });
		QuestionReplyLive({ io, socket });
		QuestionReactionLive({ io, socket });
		PollLive({ io, socket });
		PollOptionLive({ io, socket });
		PollOptionChoiceLive({ io, socket });

		// join event
		socket.on('join-event', (code) => {
			// send event and role data on joining room
			EventLiveCtlr.getEvent({ io, socket, code });
		});

		socket.on('disconnect', () => {
			socket.$fn.leaveRoom();
		});

		socket.on('leave-event', () => {
			socket.$fn.leaveRoom();
		});
	});
};
