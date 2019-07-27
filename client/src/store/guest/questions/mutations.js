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
	@desc: receive new question, add to state
	@socket: listen 'new_added_question'
------------------------------------------------------------------------*/
const ADD_QUESTION = (state, question) => {
	state.questions.push(Object.assign(question, { count_replies: 0 }));
};

/* ------------------------------------------------------------------------
	@desc: receive new question, add to state
	@socket: listen 'new_added_question'
------------------------------------------------------------------------*/
const EDIT_QUESTION = (state, editedQuestion) => {
	const question = state.questions.find(q => q.id === editedQuestion.id);
	Object.assign(question, editedQuestion);
};


/* ------------------------------------------------------------------------
	@desc: receive 'id' question, then remove
	@socket: listen 'new_deleted_question'
------------------------------------------------------------------------*/
const DELETE_QUESTION = (state, delQuestion) => {
	state.questions = state.questions.filter(q => q.id !== delQuestion.id);
};


/* ------------------------------------------------------------------------
	@desc: receive success question, add to state
	@socket: after emiter 'add-question'
------------------------------------------------------------------------*/
const ADD_SUCCESS_QUESTION = (state, question) => {
	state.questions.push(Object.assign(question, { reactions: null }));
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
	@desc: add temp reply for showing in UI
	@socket: before emiter 'add-question-reply'
------------------------------------------------------------------------*/
const ADD_TEMP_QUESTION_REPLY = (state, tempReply) => {
	const question = state.questions.find(q => q.id === tempReply.question_id);
	if (!question) return;
	question.replies = question.replies || [];
	question.replies.push(tempReply.data);
};


/* ------------------------------------------------------------------------
	@desc: receive success reply data,
				merge(override) to temp reply
	@socket: after emiter 'add-question-reply'
------------------------------------------------------------------------*/
const MERGE_SUCCESS_QUESTION_REPLY = (state, resReply) => {
	const question = state.questions.find(q => q.id === resReply.question_id);
	const reply = question.replies.find(rl => rl.id === resReply.temp_id);
	delete resReply.temp_id;
	Object.assign(reply, resReply);
};


/* ------------------------------------------------------------------------
	@desc: receice reply editted from admin
				then merge to replies
	@socket: after emiter 'edit-question-reply'
------------------------------------------------------------------------*/
const MERGE_EDIT_REPLY = (state, resReply) => {
	const question = state.questions.find(q => q.id === resReply.question_id);
	if (!question.replies) return;
	const reply = question.replies.find(rl => rl.id === resReply.id);
	Object.assign(reply, resReply);
};


/* ------------------------------------------------------------------------
	@desc: if receive error, remove temp reply
	@socket: after emiter 'add-question-reply'
------------------------------------------------------------------------*/
const DELETE_ERROR_QUESTION_REPLY = (state, infoErrReply) => {
	const question = state.questions.find(q => q.id === infoErrReply.question_id);
	question.replies = question.replies.filter(r => r.id !== infoErrReply.temp_id);
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
	@desc: *receive 'question_id' and 'like', then merge
				into question reactions.
				*current guest react for question, merge show
				in UI straightway.
	@socket: listen 'new_question_reaction'
------------------------------------------------------------------------*/
const MERGE_QUESTION_REACTION = (state, react) => {
	const question = state.questions.find(q => Number(q.id) === Number(react.question_id));
	if (!question.reactions) {
		question.reactions = [];
		question.reactions.push(react);
	}
	else {
		const reaction = question.reactions.find(r => Number(r.user_id) === Number(react.user_id));
		if (reaction) {
			Object.assign(reaction, { like: react.like });
		}
		else {
			question.reactions.push(react);
		}
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
	ADD_QUESTION,
	EDIT_QUESTION,
	DELETE_QUESTION,
	ADD_SUCCESS_QUESTION,
	ADD_QUESTION_REPLY,
	ADD_TEMP_QUESTION_REPLY,
	MERGE_SUCCESS_QUESTION_REPLY,
	DELETE_ERROR_QUESTION_REPLY,
	MERGE_EDIT_REPLY,
	DELETE_QUESTION_REPLY,
	MERGE_QUESTION_REACTION,
	RESET,
};
