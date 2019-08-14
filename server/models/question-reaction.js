const qh = requireWrp('modules/query-helper');
const Model = requireWrp('models/model');

const questionName = 'question';

class QuestionReactionModel extends Model {
	constructor() {
		super('question_reaction');
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

	getCountByEventID(eid, like) {
		this.setQuery(`
			SELECT COUNT(r.*)
			FROM ${this.getName()} as "r", ${questionName} as "q"
			WHERE r.question_id = q.id
				AND q.event_id = ${eid}
				AND r."like" = ${qh.toDollarQuoted(like)}
		`);
		this.setRowReturn(1);
		return this;
	}

	createOrUpdate(info, opt) {
		return super.createOrUpdate({
			question_id: info.question_id,
			user_id: info.user_id,
		}, {
			like: info.like,
		}, opt);
	}

	create(info, opt) {
		return this.createOne({
			question_id: info.question_id,
			user_id: info.user_id,
			like: info.like,
		}, opt);
	}

	update(info, opt) {
		return this.updateOne({
			question_id: info.question_id,
			user_id: info.user_id,
		}, {
			like: info.like,
		}, opt);
	}
}

module.exports = QuestionReactionModel;
