const Model = requireWrp('models/model');
const User = requireWrp('models/user');
const QuestionReply = requireWrp('models/question-reply');
const QuestionLike = requireWrp('models/question-like');
const qh = requireWrp('modules/query-helper');

class Question extends Model {
	constructor() {
		super('_.question');
	}

	find(info, opt) {
		this.setQuery(`
			SELECT
				q."id",
				q."content",
				ROW_TO_JSON(u) AS "user",
				(
					SELECT COUNT(*)
					FROM ${QuestionReply.getName()}
					WHERE "question_id" = q."id"
				) AS "count_replies",
				(
					SELECT json_agg(ql)
					FROM ${QuestionLike.getName()} as ql
					WHERE "question_id" = q."id"
				) AS "likes"
			FROM
				${this.getName()} AS q
				INNER JOIN
					( ${User.find({}, { select: '"id", "name"' }).getQuery()} ) AS u
					ON q."user_id" = u."id"
			${qh.toWhereClause(info)}
		`);
		this.setRowReturn(0);
		return this;
	}

	create(info) {
		return this.createOne({
			event_id: info.event_id,
			user_id: info.user_id,
			content: info.content,
			stage: info.stage || 'private',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		}, '*');
	}
}

module.exports = new Question();
