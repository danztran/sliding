const Model = requireWrp('models/model');
const User = requireWrp('models/user');
const qh = requireWrp('modules/query-helper');

class QuestionReply extends Model {
	constructor() {
		super('_.question_reply');
	}

	find(info, opt) {
		this.setQuery(`
			SELECT
				qr."id",
				qr."question_id",
				qr."content",
				ROW_TO_JSON(u) AS "user"
			FROM
				${this.getName()} AS qr
				INNER JOIN
					( ${User.find({}, { select: '"id", "name"' }).getQuery()} ) AS u
					ON qr."user_id" = u."id"
			${qh.toWhereClause(info)}
		`);
		this.setRowReturn(0);
		return this;
	}

	create(info) {
		return this.createOne({
			question_id: info.question_id,
			user_id: info.user_id,
			content: info.content,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		}, {
			select: '"id", "question_id", "content", "created_at"'
		});
	}

	update(info, opt) {
		return this.updateOne({
			id: info.id
		}, {
			content: info.content,
			updated_at: new Date().toISOString()
		}, {
			select: '"id", "question_id", "content", "created_at"'
		});
	}

	setDeleted(info, opt) {
		return this.updateOne({
			id: info.id
		}, {
			is_deleted: true,
			updated_at: new Date().toISOString()
		}, {
			select: '"id", "question_id"'
		});
	}
}

module.exports = new QuestionReply();
