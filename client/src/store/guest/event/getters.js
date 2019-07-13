const getEventInfo = state => state.eventInfo;
const getRole = state => state.role;
const getAdmins = state => state.eventInfo.admins;

const allowQuestion = state => state.eventInfo.allow_question;
const allowQDislike = state => state.eventInfo.allow_question_dislike;
const allowQReply = state => state.eventInfo.allow_question_reply;

export default {
	getEventInfo,
	getRole,
	getAdmins,
	allowQuestion,
	allowQDislike,
	allowQReply,
};
