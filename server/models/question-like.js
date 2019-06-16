const Model = requireWrp('models/model');
// const qh = requireWrp('modules/query-helper');

class QuestionLikeModel extends Model {
	constructor() {
		super('_.question_like');
	}
}

module.exports = QuestionLikeModel;
