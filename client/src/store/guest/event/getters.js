const getEventInfo = state => state.eventInfo;
const getRole = state => state.role;

const allowQuestion = state => state.eventInfo.allow_question;
const allowQDislike = state => state.eventInfo.allow_question_dislike;

export default {
	getEventInfo,
	getRole,
	allowQuestion,
	allowQDislike
};
