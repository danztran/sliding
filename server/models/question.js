const Model = requireWrp('models/model');
const UserModel = requireWrp('models/user');
const QuestionReplyModel = requireWrp('models/question-reply');
const QuestionLikeModel = requireWrp('models/question-like');
const qh = requireWrp('modules/query-helper');

const User = new UserModel();
const QuestionReply = new QuestionReplyModel();
const QuestionLike = new QuestionLikeModel();

class QuestionModel extends Model {
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
		}, {
			select: '*'
		});
	}

	update(info, opt) {
		this.setQuery(`
			UPDATE ${this.getName()} as q
			${qh.toSetClause({
		content: info.content,
		stage: info.stage,
		is_star: info.is_star,
		is_answer: info.is_answer,
		updated_at: new Date().toISOString()
	})}
				FROM
					( ${this.findOne({ id: info.id }).getQuery()} FOR UPDATE ) AS subq
				JOIN
					( ${User.find({}, { select: '"id", "name"' }).getQuery()} ) AS u
				ON subq."user_id" = u."id"
			RETURNING q.*, row_to_json(u) as "user"
		`);
		this.setRowReturn(1);
		return this;
	}

	setDeleted(info, opt) {
		return this.updateOne({
			id: info.id
		}, {
			is_deleted: true,
			updated_at: new Date().toISOString()
		}, {
			select: '"id", "event_id"'
		});
	}
}

module.exports = QuestionModel;
