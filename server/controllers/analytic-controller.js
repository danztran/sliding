// const EventModel = requireWrp('models/event');
const EventRoleModel = requireWrp('models/event-role');
const QuestionModel = requireWrp('models/question');
const QuestrionReplyModel = requireWrp('models/question-reply');
const QuestionReactionModel = requireWrp('models/question-reaction');
const PollModel = requireWrp('models/poll');
// const PollOptionModel = requireWrp('models/poll-option');
// const PollOptionChoiceModel = requireWrp('models/poll-option-choice');

const Ctlr = {
	async getEventIndicator(req, res) {
		const rules = {
			code: 'alpha_num|min:3',
		};
		if (!res.$v.rif(rules)) return;

		const { user } = req;

		const EventRole = new EventRoleModel();
		const role = await EventRole.findByEventCode(req.params.code, 'host').exec();
		if (!role || Number(role.user_id) !== Number(user.id)) {
			throw {
				code: 404,
				message: res.$t('eventNotFound'),
			};
		}

		const eventID = role.event_id;

		const Question = new QuestionModel();
		const countQuestions = Question.getCount({
			event_id: eventID,
		}).exec();

		const QuestionReply = new QuestrionReplyModel();
		const countReplies = QuestionReply.getCountByEventID(eventID).exec();

		const QuestionReaction = new QuestionReactionModel();
		const countLikes = QuestionReaction.getCountByEventID(eventID, true).exec();
		const countDislikes = QuestionReaction.getCountByEventID(eventID, false).exec();

		const Poll = new PollModel();
		const countPolls = Poll.getCount({
			event_id: eventID,
		}).exec();

		const countRoles = EventRole.getCount({
			event_id: eventID,
		}).exec();

		const promises = [
			countQuestions,
			countReplies,
			countLikes,
			countDislikes,
			countPolls,
			countRoles,
		];
		const queries = await Promise.all(promises);
		const result = {
			questions: queries[0].count,
			replies: queries[1].count,
			likes: queries[2].count,
			dislikes: queries[3].count,
			polls: queries[4].count,
			roles: queries[5].count,

		};

		return result;
	},
};

module.exports = Ctlr;
