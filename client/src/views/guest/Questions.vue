<template>
	<div>
		<field-ask />
		<question-tabs>
			<template #popular-tab>
				<question-card
					v-for="question in questionsPublic"
					:key="question.id"
					:question="question" />
			</template>

			<template #recent-tab>
				<question-card />
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
		questionsPublic() {
			return this.questions.filter(q => q.stage === 'public');
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
	methods: {
		...mapMutations({
			setQuestions: 'guest/questions/SET_QUESTIONS'
		})
	}
};
</script>

<style lang="scss">
</style>
