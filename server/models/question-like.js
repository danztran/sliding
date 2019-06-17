const Model = requireWrp('models/model');
// const qh = requireWrp('modules/query-helper');

class QuestionLikeModel extends Model {
	constructor() {
		super('_.question_like');
	}

	findAsJsonByQid(qid) {
		this.setQuery(`
			SELECT json_agg(ql)
			FROM ${this.getName()} as "ql"
			WHERE ql."question_id" = ${qid}
				AND ql."is_liked" = true
		`);
		return this;
	}
}

module.exports = QuestionLikeModel;
