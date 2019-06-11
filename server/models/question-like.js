const Model = requireWrp('models/model');
// const qh = requireWrp('modules/query-helper');

class QuestionLike extends Model {
	constructor() {
		super('_.question_like');
	}
}

module.exports = new QuestionLike();
