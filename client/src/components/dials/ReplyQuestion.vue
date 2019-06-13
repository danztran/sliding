<template>
	<v-dialog v-model="dialogReplyQuestion" max-width="500px" scrollable>
		<v-card>
			<!-- HEADER -->
			<v-card-title class="py-0">
				<span v-t="'dialog-reply-question-title'"></span>
				<v-spacer></v-spacer>
				<v-btn icon @click="dialogReplyQuestion=false">
					<v-icon :size="icon.small" v-html="'$vuetify.icons.close'"/>
				</v-btn>
			</v-card-title>
			<v-divider />

			<!-- CONTENT -->
			<section class="wrapper-card">
				<template v-for="question in questions">
					<question-card
						:key="question.id"
						:question="question"/>
				</template>
			</section>

			<!-- ACTIONS -->
			<v-divider />
			<v-card-actions>
				<text-area :field="form.answer"/>
				<v-btn flat icon color="primary" :disabled="notEmpty">
					<v-icon v-html="'$vuetify.icons.send'"/>
				</v-btn>
			</v-card-actions>

		</v-card>
	</v-dialog>
</template>

<script>
import QuestionMainCard from '@/components/QuestionMainCard.vue';

const initForm = () => ({
	answer: {
		label: 'lb-reply',
		value: '',
		prepend: 'person',
		errmsg: '',
		counter: 1000,
		rows: 1,
		autogrow: true,
		autofocus: true
	}
});

export default {
	name: 'ReplyQuestionDialog',
	components: {
		'question-card': QuestionMainCard
	},
	data: () => ({
		dialogReplyQuestion: false,
		icon: {
			small: 20
		},
		form: initForm(),
		questions: '',
		replies: ''
	}),
	computed: {
		notEmpty() {
			const { answer } = this.form;
			if (answer.value.length > answer.counter) {
				answer.errmsg = this.$t('err-limit');
				return true;
			}
			return !this._cm.notEmpty(answer.value)
				|| answer.value.length > answer.counter;
		}
	},
	mounted() {
		this.$root.$on('dialog-reply-question', (question) => {
			this.questions = [question];
			this.dialogReplyQuestion = true;
		});
	},
	methods: {
		sendReply() {}
	}
};
</script>

<style lang="scss">
.wrapper-card {
	height: 300px
}
</style>
