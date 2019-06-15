<!--
	@desc: only fullcreen dialog in small device
	@small device => XS - SM
 -->
<template>
	<v-dialog
		id="reply-question-dialog"
		v-model="dialogReplyQuestion"
		max-width="500px"
		:transition="false"
		:fullscreen="showSMnXS">
		<v-card>
			<!--
				@desc: header dialog
				@contain: Title and btn Close
			-->
			<v-card-title class="py-0">
				<!-- @desc: show back button
									hide title in small device -->
				<template v-if="showSMnXS">
					<v-btn v-if="showSMnXS" icon @click="dialogReplyQuestion=false">
						<v-icon :size="icon.small" v-html="'$vuetify.icons.arrow_left'"/>
					</v-btn>
				</template>
				<template v-else>
					<span v-if="!showSMnXS" v-t="'dialog-reply-question-title'"></span>
				</template>

				<v-spacer></v-spacer>

				<!-- @desc: show edit/delete/archive button
									hide close button in small device -->
				<template v-if="showSMnXS">
					<v-btn icon @click="editQuestion">
						<v-icon :size="icon.small" v-html="'$vuetify.icons.edit'"/>
					</v-btn>
					<v-btn icon @click="deleteQuestion">
						<v-icon :size="icon.small" v-html="'$vuetify.icons.delete'"/>
					</v-btn>
					<v-btn icon @click="archiveQuestion">
						<v-icon :size="icon.small" v-html="'$vuetify.icons.archive_all'"/>
					</v-btn>
				</template>
				<template v-else>
					<v-btn v-if="!showSMnXS" icon @click="dialogReplyQuestion=false">
						<v-icon :size="icon.small" v-html="'$vuetify.icons.close'"/>
					</v-btn>
				</template>
			</v-card-title>
			<v-divider />

			<!--
				@desc: Replies message content
			-->
			<div class="test">
				<div class="wrapper-card">
					<template v-for="question in questions">
						<question-card
							:key="question.id"
							:question="question"/>
					</template>
				</div>

				<!--
					@desc: textarea for reply
				-->
				<v-divider />
				<v-card-actions>
					<text-area :field="form.answer"/>
					<v-btn flat icon color="primary" :disabled="checkReply">
						<v-icon v-html="'$vuetify.icons.send'"/>
					</v-btn>
				</v-card-actions>
			</div>

		</v-card>
	</v-dialog>
</template>

<script>
import QuestionCard from '../QuestionCard.vue';

const initForm = () => ({
	answer: {
		label: 'lb-reply',
		value: '',
		prepend: 'person',
		errmsg: '',
		rows: 1,
		counter: 1000,
		autogrow: true,
		autofocus: true
	}
});

export default {
	name: 'ReplyQuestionDialog',
	components: {
		'question-card': QuestionCard
	},
	data: () => ({
		dialogReplyQuestion: false,
		icon: {
			small: 20
		},
		form: initForm(),
		questions: [],
		replies: []
	}),
	computed: {
		checkReply() {
			const { answer } = this.form;
			if (answer.value.length > answer.counter) {
				answer.errmsg = this.$t('err-limit');
				return true;
			}
			return !this._cm.notEmpty(answer.value)
				|| answer.value.length > answer.counter;
		},
		showSMnXS() {
			return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
		}
	},
	mounted() {
		this.$root.$on('dialog-reply-question', (question) => {
			this.questions = [question];
			this.dialogReplyQuestion = true;
			this.$socket.emit('get-question-replies', question.id);
		});
	},
	sockets: {
		get_question_replies(replies) {
			console.warn(replies);
		},
		add_question_reply({ bool, reply }) {
			// bool: Boolean result, true if success
			// reply: Object, new reply added.
		}
	},
	methods: {
		sendReply() {
			// this.$socket.emit('add-question-reply', replyInfo);
		},
		editQuestion() {},
		deleteQuestion() {},
		archiveQuestion() {}
	}
};
</script>

<style lang="scss">
.wrapper-card {
	height: 300px;
	max-height: 100%;
	flex: 1;
	overflow-y: auto;
	overflow-x: hidden;
}

@media only screen and (max-width: 960px) {
	.wrapper-card {
		max-height: 100%;
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.test {
		height: calc(100vh - 52px);
		display: flex;
		flex-direction: column;
	}
}
</style>
