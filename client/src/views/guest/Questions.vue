<template>
	<div>
		<field-ask />
		<empty-state-question v-if="!questions.length" />
		<question--tabs v-else />
		<question-reply--dialog />
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import FieldAsk from '@/components/questions/guest/FieldAsk.vue';
import QuestionTabs from '@/components/questions/guest/QuestionTabs.vue';
import QuestionReplyDialog from '@/components/questions/guest/QuestionReplyDialog.vue';
import EmptyQuestion from '@/components/questions/guest/EmptyQuestion.vue';

export default {
	name: 'Questions',
	components: {
		'field-ask': FieldAsk,
		'empty-state-question': EmptyQuestion,
		'question--tabs': QuestionTabs,
		'question-reply--dialog': QuestionReplyDialog
	},
	computed: {
		...mapGetters({
			questions: 'guest/questions/getQuestions'
		})
	},
	created() {
		this.$socket.emit('get-questions', ({ errmsg, questions }) => {
			if (errmsg) {
				// notify
				return;
			}
			this.setQuestions(questions);
		});
	},
	sockets: {
		new_added_question(question) {
			this.addQuestion(question);
		},
		new_deleted_question(question) {
			this.delQuestion(question);
			this.$root.$emit('delquestion-in-dialog', question.id);
		},
		new_added_question_reply(reply) {
			this.addQuestionReply(reply);
		},
		new_edited_question_reply(reply) {
			this.mergeQuestionReply(reply);
		},
		new_deleted_question_reply(reply) {
			this.deleteQuestionReply(reply);
			this.$root.$emit('update-replies');
		},
		new_question_reaction(questionReact) {
			this.mergeQuestionReaction(questionReact);
		}
	},
	methods: {
		...mapMutations({
			setQuestions: 'guest/questions/SET_QUESTIONS',
			addQuestion: 'guest/questions/ADD_QUESTION',
			delQuestion: 'guest/questions/DELETE_QUESTION',
			addQuestionReply: 'guest/questions/ADD_QUESTION_REPLY',
			mergeQuestionReply: 'guest/questions/MERGE_EDIT_REPLY',
			mergeQuestionReaction: 'guest/questions/MERGE_QUESTION_REACTIONS',
			deleteQuestionReply: 'guest/questions/DELETE_QUESTION_REPLY'
		})
	}
};
</script>

<style lang="scss">
</style>
