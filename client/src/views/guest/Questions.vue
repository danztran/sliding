<template>
	<div>
		<field-ask />
		<question-tabs>
			<template #popular-tab>
				<question-card
					v-for="question in popularQuestions"
					:key="question.id"
					:question="question" />
			</template>

			<template #recent-tab>
				<question-card
					v-for="question in recentQuestions"
					:key="question.id"
					:question="question" />
			</template>
		</question-tabs>
	</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import FieldAsk from '@/components/questions/guest/FieldAsk.vue';
import QuestionTabs from '@/components/questions/guest/QuestionTabs.vue';
import QuestionCard from '@/components/questions/guest/QuestionCard.vue';

export default {
	name: 'Questions',
	components: {
		'field-ask': FieldAsk,
		'question-tabs': QuestionTabs,
		'question-card': QuestionCard
	},
	computed: {
		...mapGetters({
			questions: 'guest/questions/getQuestions'
		}),
		popularQuestions() {
			return this._cm.customSort([...this.questions], 'desc', 'reactions');
		},
		recentQuestions() {
			return this._cm.customSort([...this.questions], 'desc', 'created_at');
		}

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
		}
	},
	methods: {
		...mapMutations({
			setQuestions: 'guest/questions/SET_QUESTIONS',
			addQuestion: 'guest/questions/ADD_QUESTION',
			delQuestion: 'guest/questions/DELETE_QUESTION',
			addQuestionReply: 'guest/questions/ADD_QUESTION_REPLY',
			mergeQuestionReply: 'guest/questions/MERGE_EDIT_REPLY',
			deleteQuestionReply: 'guest/questions/DELETE_QUESTION_REPLY'
		})
	}
};
</script>

<style lang="scss">
</style>
