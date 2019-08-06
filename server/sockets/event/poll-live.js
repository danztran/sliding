const PollLiveCtlr = requireWrp('controllers/poll-live-controller');

module.exports = (args) => {
	const { socket } = args;
	// queries
	socket.on('get-polls', callback => PollLiveCtlr.getPolls(callback));
	// add
	socket.on('add-poll', (info, callback) => PollLiveCtlr.addPoll(args, info, callback));
	// edit
	socket.on('edit-poll', (info, callback) => PollLiveCtlr.editPoll(args, info, callback));
	// delete
	socket.on('delete-poll', (info, callback) => PollLiveCtlr.deletePoll(args, info, callback));
};
