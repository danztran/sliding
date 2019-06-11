const EventLiveCtlr = requireWrp('controllers/event-live-controller');

const nsp = (io) => {
	io.on('connection', (socket) => {
		// join event
		socket.on('join-event', (code) => {
			// join to room
			socket.join(`event#${code}`);

			// leave the room
			socket.on('leave', () => {
				socket.leave(`event#${code}`);
			});
			socket.on('disconnect', () => {
				socket.leave(`event#${code}`);
			});

			// send event and role data to client
			EventLiveCtlr.emitEventData({ io, socket, code });
		});
	});
};

module.exports = nsp;
