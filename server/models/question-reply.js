const Model = requireWrp('models/model');
const UserModel = requireWrp('models/user');
// const qh = requireWrp('modules/query-helper');

const User = new UserModel();

class QuestionReplyModel extends Model {
	constructor() {
		super('_.question_reply');
	}

	find(info, opt) {
		super.find(info, {
			alias: 'qr',
			select: `
				qr."id",
				qr."question_id",
				qr."content",
				qr."created_at",
				( ${User.findAsJsonById('qr."user_id"', { select: '"id", "name"' }).getQuery()} ) AS "user"
			`,
			...opt,
		});
		this.setRowReturn(0);
		return this;
	}

	getCountByQid(qid) {
		this.setQuery(`
			SELECT COUNT(*)
			FROM ${this.getName()} as reply
			WHERE
				reply."question_id"=${qid}
				AND reply."is_deleted"= false
		`);
		return this;
	}

	create(info) {
		return this.createOne({
			question_id: info.question_id,
			user_id: info.user_id,
			content: info.content,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		}, {
			select: '"id", "question_id", "content", "created_at"',
		});
	}

	update(info, opt) {
		return this.updateOne({
			id: info.id,
		}, {
			content: info.content,
			updated_at: new Date().toISOString(),
		}, {
			select: '"id", "question_id", "content", "created_at"',
		});
	}

	setDeleted(info, opt) {
		return this.updateOne({
			id: info.id,
		}, {
			is_deleted: true,
			updated_at: new Date().toISOString(),
		}, {
			select: '"id", "question_id"',
		});
	}
}

module.exports = QuestionReplyModel;
