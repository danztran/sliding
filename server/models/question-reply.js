const Model = requireWrp('models/model');
// const qh = requireWrp('modules/query-helper');

class QuestionReply extends Model {
	constructor() {
		super('_.question_reply');
	}
}

module.exports = new QuestionReply();
