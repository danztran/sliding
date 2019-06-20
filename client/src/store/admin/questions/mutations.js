// @desc: after get all question in event via socket, set to state
const SET_QUESTIONS = (state, questions) => {
	state.questions = questions;
};

// @desc: after get all question replies via socket, set to state
const SET_QUESTION_REPLIES = (state, dataReplies) => {
	const question = state.questions.find(q => q.id === dataReplies.id);
	Object.assign(question, { replies: dataReplies.replies });
};

// @desc: socket return data question had editted, then merge
const MERGE_EDIT_QUESTION = (state, resQ) => {
	const question = state.questions.find(q => q.id === resQ.id);
	Object.assign(question, resQ);
};

// @desc: socket listen orther user add new question reply
// then add to state
const ADD_QUESTION_REPLY = (state, reply) => {
	const question = state.questions.find(q => q.id === reply.question_id);
	if (question.replies) {
		question.replies.push(reply);
	}
	else {
		question.count_replies = Number(question.count_replies) + 1;
	}
};

// @desc: before socket return reply data had added,
// 	add temp reply for showing in UI
const ADD_TEMP_QUESTION_REPLY = (state, tempReply) => {
	const question = state.questions.find(q => q.id === tempReply.question_id);
	if (!question) return;
	question.replies = question.replies || [];
	question.replies.push(tempReply.data);
};

// @desc: after socket return success reply data
// merge(override) success reply into temp reply
const MERGE_SUCCESS_QUESTION_REPLY = (state, resReply) => {
	const question = state.questions.find(q => q.id === resReply.question_id);
	const reply = question.replies.find(rl => rl.id === resReply.temp_id);
	delete resReply.temp_id;
	Object.assign(reply, resReply);
};

// @desc: if socket return error, then remove(delete) temp error reply
const DELETE_ERROR_QUESTION_REPLY = (state, infoErrReply) => {
	const question = state.questions.find(q => q.id === infoErrReply.question_id);
	question.replies = question.replies.filter(r => r.id !== infoErrReply.temp_id);
};

// @desc: socket return success reply editted, merge(override) into temp
const MERGE_EDIT_REPLY = (state, resReply) => {
	const question = state.questions.find(q => q.id === resReply.question_id);
	if (!question.replies) return;
	const reply = question.replies.find(rl => rl.id === resReply.id);
	Object.assign(reply, resReply);
};

const DELETE_QUESTION_REPLY = (state, res) => {
	const question = state.questions.find(q => q.id === res.question_id);
	if (question.replies) {
		question.replies = question.replies.filter(rl => rl.id !== res.id);
	}
	else {
		question.count_replies = Number(question.count_replies) - 1;
	}
};

const RESET = (state) => {
	state.questions = [];
};

export default {
	SET_QUESTIONS,
	SET_QUESTION_REPLIES,
	ADD_QUESTION_REPLY,
	MERGE_EDIT_QUESTION,
	ADD_TEMP_QUESTION_REPLY,
	MERGE_SUCCESS_QUESTION_REPLY,
	DELETE_ERROR_QUESTION_REPLY,
	DELETE_QUESTION_REPLY,
	MERGE_EDIT_REPLY,
	RESET
};
