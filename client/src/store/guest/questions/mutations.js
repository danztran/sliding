/* ------------------------------------------------------------------------
	@desc: get all questions in event set to state
	@socket: emiter 'get-questions'
------------------------------------------------------------------------*/
const SET_QUESTIONS = (state, questions) => {
	state.questions = questions;
};


/* ------------------------------------------------------------------------
	@desc: get all replies in question, set to state
	@socket: emiter 'get-question-replies'
------------------------------------------------------------------------*/
const SET_QUESTION_REPLIES = (state, dataReplies) => {
	const question = state.questions.find(q => q.id === dataReplies.id);
	Object.assign(question, { replies: dataReplies.replies });
};


/* ------------------------------------------------------------------------
	@desc: listen other user add new reply,
				then find question by 'id' and add
	@socket: listen 'new_added_question_reply'
------------------------------------------------------------------------*/
const ADD_QUESTION_REPLY = (state, reply) => {
	const question = state.questions.find(q => q.id === reply.question_id);
	if (question.replies) {
		question.replies.push(reply);
	}
	else {
		question.count_replies = Number(question.count_replies) + 1;
	}
};


/* ------------------------------------------------------------------------
	@desc: receice reply editted, then merge to replies
	@socket: after emiter 'edit-question-reply'
------------------------------------------------------------------------*/
const MERGE_EDIT_REPLY = (state, resReply) => {
	const question = state.questions.find(q => q.id === resReply.question_id);
	if (!question.replies) return;
	const reply = question.replies.find(rl => rl.id === resReply.id);
	Object.assign(reply, resReply);
};


/* ------------------------------------------------------------------------
	@desc: receive 'id' reply, then remove
				and reduce count_replies
	@socket: listen 'new_deleted_question_reply'
------------------------------------------------------------------------*/
const DELETE_QUESTION_REPLY = (state, res) => {
	const question = state.questions.find(q => q.id === res.question_id);
	if (question.replies) {
		question.replies = question.replies.filter(rl => rl.id !== res.id);
	}
	else {
		question.count_replies = Number(question.count_replies) - 1;
	}
};


/* ------------------------------------------------------------------------
	@desc: when leave event clear state
------------------------------------------------------------------------*/
const RESET = (state) => {
	state.questions = [];
};

export default {
	SET_QUESTIONS,
	SET_QUESTION_REPLIES,
	ADD_QUESTION_REPLY,
	MERGE_EDIT_REPLY,
	DELETE_QUESTION_REPLY,
	RESET
};
