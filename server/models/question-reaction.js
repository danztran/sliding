const Model = requireWrp('models/model');
// const qh = requireWrp('modules/query-helper');

class QuestionReactionModel extends Model {
	constructor() {
		super('_.question_reaction');
	}

	findAsJsonByQid(qid) {
		this.setQuery(`
			SELECT json_agg(ql)
			FROM ${this.getName()} as "ql"
			WHERE ql."question_id" = ${qid}
				AND ql."like" IS NOT NULL
		`);
		return this;
	}

	createOrUpdate(info, opt) {
		return super.createOrUpdate({
			question_id: info.question_id,
			user: info.user_id
		}, {
			like: info.like
		}, opt);
	}

	create(info, opt) {
		return this.createOne({
			question_id: info.question_id,
			user_id: info.user_id,
			like: info.like
		}, opt);
	}

	update(info, opt) {
		return this.updateOne({
			question_id: info.question_id,
			user_id: info.user_id
		}, {
			like: info.like
		}, opt);
	}
}

module.exports = QuestionReactionModel;
