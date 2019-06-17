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

			<!-- @desc: Replies message content -->
			<div class="test">
				<div class="wrapper-card">
					<question-card :question="question"/>

					<template v-for="reply in replies">
						<reply-card :key="reply.id" :replyData="reply"/>
					</template>
				</div>

				<!-- @desc: textarea for reply -->
				<v-divider />
				<v-card-actions>
					<text-area :field="form.reply"/>
					<v-btn
						flat
						icon
						color="primary"
						:disabled="checkReply"
						@click="sendReply">
						<v-icon v-html="'$vuetify.icons.send'"/>
					</v-btn>
				</v-card-actions>
			</div>

		</v-card>
	</v-dialog>
</template>

<script>
import QuestionCard from './QuestionCard.vue';
import QuestionReply from './QuestionReply.vue';

const initForm = () => ({
	reply: {
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
	name: 'QuestionReplyDialog',
	components: {
		'question-card': QuestionCard,
		'reply-card': QuestionReply
	},
	data: () => ({
		dialogReplyQuestion: false,
		icon: {
			small: 20
		},
		form: initForm(),
		question: {
			content: '',
			count_replies: null,
			id: null,
			likes: [],
			user: {
				id: null,
				name: ''
			}
		},
		replies: []
	}),
	computed: {
		checkReply() {
			const { reply } = this.form;
			if (reply.value.length > reply.counter) {
				reply.errmsg = this.$t('err-limit');
				return true;
			}
			return !this._cm.notEmpty(reply.value)
				|| reply.value.length > reply.counter;
		},
		showSMnXS() {
			return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
		}
	},
	mounted() {
		this.$root.$on('dialog-reply-question', (question) => {
			this.question = question;
			this.dialogReplyQuestion = true;
		});
	},
	sockets: {
		get_question_replies(replies) {
			console.warn(replies);
			this.replies = replies;
			const data = {
				id: this.question.id,
				replies
			};
			this.$store.dispatch('admin/questions/getQuestionReplies', data);
		},
		add_question_reply({ reply, errmsg }) {
			if (!reply) {
				this.form.reply.errmsg = errmsg;
				return this.$store.dispatch('admin/questions/removeErrorQuestionReply', this.question.id);
			}
			return this.$store.dispatch('admin/questions/replaceSuccessQuestionReply', reply);
		}
	},
	methods: {
		sendReply() {
			const user = this.$cookies.get(this.$env.VUE_APP_CK_USER);
			const replyId = this.replies.length > 0
				? parseInt(this.replies[this.replies.length - 1].id, 10) + 1
				: 1;
			const replyInfo = {
				id: this.question.id,
				data: {
					id: replyId,
					content: this.form.reply.value,
					question_id: this.question.id,
					user: {
						id: user.id,
						name: user.name
					}
				}
			};
			this.$store.dispatch('admin/questions/sendQuestionReply', replyInfo);
			this.$socket.emit('add-question-reply', replyInfo.data);
			this.form.reply.value = '';
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
