const getEvents = state => state.events;
const getInvites = state => (state.invites.length > 0
	? state.invites.filter(el => el.is_accepted === null)
	: []);

export default {
	getEvents,
	getInvites,
};
