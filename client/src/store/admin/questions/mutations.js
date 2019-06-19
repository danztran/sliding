const GET_QUESTION = (state, questions) => {
	state.questions = questions;
};

const MERGE_EDIT_QUESTION = (state, resQ) => {
	const question = state.questions.find(q => q.id === resQ.id);
	Object.assign(question, resQ);
};

const GET_QUESTION_REPLIES = (state, dataReplies) => {
	const question = state.questions.find(q => q.id === dataReplies.id);
	Object.assign(question, { replies: dataReplies.replies });
};

const SEND_QUESTION_REPLY = (state, reply) => {
	const question = state.questions.find(q => q.id === reply.question_id);
	if (!question) return;
	question.replies = question.replies || [];
	question.replies.push(reply.data);
};

const MERGE_SUCCESS_QUESTION_REPLY = (state, resReply) => {
	const question = state.questions.find(q => q.id === resReply.question_id);
	const reply = question.replies.find(rl => rl.id === resReply.temp_id);
	delete resReply.temp_id;
	Object.assign(reply, resReply);
};

const MERGE_EDIT_REPLY = (state, resReply) => {
	const question = state.questions.find(q => q.id === resReply.question_id);
	const reply = question.replies.find(rl => rl.id === resReply.id);
	Object.assign(reply, resReply);
};

const REMOVE_ERROR_QUESTION_REPLY = (state, infoErrReply) => {
	const question = state.questions.find(q => q.id === infoErrReply.question_id);
	question.replies = question.replies.filter(r => r.id !== infoErrReply.temp_id);
};

const DELETE_QUESTION_REPLY = (state, res) => {
	const question = state.questions.find(q => q.id === res.question_id);
	question.replies = question.replies.filter(rl => rl.id !== res.id);
};

const RESET = (state) => {
	state.questions = [];
};

export default {
	GET_QUESTION,
	MERGE_EDIT_QUESTION,
	GET_QUESTION_REPLIES,
	SEND_QUESTION_REPLY,
	MERGE_SUCCESS_QUESTION_REPLY,
	REMOVE_ERROR_QUESTION_REPLY,
	DELETE_QUESTION_REPLY,
	MERGE_EDIT_REPLY,
	RESET
};
