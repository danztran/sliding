<template>
	<div id="admin-question">
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>

		<question-reply--dialog />

		<v-layout row wrap>
			<v-flex v-if="!isSMnXS" class="pr-1" xs12 md6>
				<question-panel--review />
			</v-flex>

			<v-flex :class="{'pl-1': !isSMnXS}" xs12 md6>
				<question-panel--main />
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import QuestionReviewPanel from '@/components/questions/admin/QuestionReviewPanel.vue';
import QuestionMainPanel from '@/components/questions/admin/QuestionMainPanel.vue';
import QuestionReplyDialog from '@/components/questions/admin/QuestionReplyDialog.vue';

export default {
	name: 'AdminQuestions',
	components: {
		'question-panel--review': QuestionReviewPanel,
		'question-panel--main': QuestionMainPanel,
		'question-reply--dialog': QuestionReplyDialog,
	},
	computed: {
		...mapGetters({
			reviewQuestions: 'admin/questions/getReviewQuestions',
			event: 'admin/event/getEventInfo',
		}),
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
		new_edited_question(question) {
			this.mergeQuestion(question);
		},
		new_deleted_question(question) {
			this.deleteQuestion(question);
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
			this.$root.$emit('update-reactions');
		},
	},
	methods: {
		...mapMutations({
			setQuestions: 'admin/questions/SET_QUESTIONS',
			addQuestion: 'admin/questions/ADD_QUESTION',
			mergeQuestion: 'admin/questions/MERGE_QUESTION',
			deleteQuestion: 'admin/questions/DELETE_QUESTION',
			addQuestionReply: 'admin/questions/ADD_QUESTION_REPLY',
			mergeQuestionReply: 'admin/questions/MERGE_EDIT_REPLY',
			mergeQuestionReaction: 'admin/questions/MERGE_QUESTION_REACTION',
			deleteQuestionReply: 'admin/questions/DELETE_QUESTION_REPLY',
		}),
	},
};
</script>

<style lang="scss">
	$primary: var(--v-primary-base);
	#admin-question {
		.v-input--switch label {
			font-size: 14px !important;
		}
		.v-list__tile__action {
			min-width: 35px !important
		}
	}
</style>
