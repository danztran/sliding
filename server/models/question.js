const Model = requireWrp('models/model');
const UserModel = requireWrp('models/user');
const QuestionReplyModel = requireWrp('models/question-reply');
const QuestionReactionModel = requireWrp('models/question-reaction');
// const qh = requireWrp('modules/query-helper');

const User = new UserModel();
const QuestionReply = new QuestionReplyModel();
const QuestionReaction = new QuestionReactionModel();

class QuestionModel extends Model {
	constructor() {
		super('_.question');
		this._queryOpt = {
			alias: 'q',
			select: `
				q."id",
				q."content",
				q."created_at",
				q."stage",
				q."is_star",
				q."is_answered",
				q."is_pinned",
				( ${User.findAsJsonById('q."user_id"', { select: '"id", "name"' }).getQuery()} ) AS "user",
				( ${QuestionReply.getCountByQid('q."id"').getQuery()} ) AS "count_replies",
				( ${QuestionReaction.findAsJsonByQid('q."id"').getQuery()} ) AS "reactions"
			`,
		};
	}

	find(info, opt) {
		super.find(info, {
			...this._queryOpt,
			...opt,
		});
		this.setRowReturn(0);
		return this;
	}

	create(info, opt) {
		return this.createOne({
			event_id: info.event_id,
			user_id: info.user_id,
			content: info.content,
			stage: info.stage || 'private',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		}, {
			select: '*',
			...opt,
		});
	}

	update(info, opt) {
		this.updateOne({
			id: info.id,
		}, {
			content: info.content,
			stage: info.stage,
			is_star: info.is_star,
			is_answered: info.is_answered,
			is_pinned: info.is_pinned,
			updated_at: new Date().toISOString(),
		}, {
			...this._queryOpt,
			...opt,
		});
		this.setRowReturn(1);
		return this;
	}

	setDeleted(info) {
		return this.updateOne({
			id: info.id,
		}, {
			is_deleted: true,
			updated_at: new Date().toISOString(),
		}, {
			select: '"id", "event_id"',
		});
	}
}

module.exports = QuestionModel;
