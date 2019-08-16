const getEventInfo = state => state.eventInfo;
const getRole = state => state.role;
const getAdmins = state => (state.eventInfo
	? state.eventInfo.admins
	: null);
const getOnlineUsers = state => state.onlineUsers;

const allowQuestion = state => (state.eventInfo
	? state.eventInfo.allow_question
	: false);
const allowQDislike = state => (state.eventInfo
	? state.eventInfo.allow_question_dislike
	: state.eventInfo);
const allowQReply = state => (state.eventInfo
	? state.eventInfo.allow_question_reply
	: false);

export default {
	getEventInfo,
	getRole,
	getAdmins,
	getOnlineUsers,
	allowQuestion,
	allowQDislike,
	allowQReply,
};
