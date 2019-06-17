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
		:fullscreen="isSMnXS">
		<v-card>
			<!--
				@desc: header dialog
				@contain: Title and btn Close
			-->
			<v-card-title class="py-0">
				<!-- @desc: show back button
									hide title in small device -->
				<template v-if="isSMnXS">
					<v-btn v-if="isSMnXS" icon @click="dialogReplyQuestion=false">
						<v-icon :size="icon.sm" v-html="'$vuetify.icons.arrow_left'"/>
					</v-btn>
				</template>
				<template v-else>
					<span v-if="!isSMnXS" v-t="'dialog-reply-question-title'"></span>
				</template>

				<v-spacer></v-spacer>

				<!-- @desc: show edit/delete/archive button
									hide close button in small device -->
				<template v-if="isSMnXS">
					<v-btn icon @click="editQuestion">
						<v-icon :size="icon.sm" v-html="'$vuetify.icons.edit'"/>
					</v-btn>
					<v-btn icon @click="deleteQuestion">
						<v-icon :size="icon.sm" v-html="'$vuetify.icons.delete'"/>
					</v-btn>
					<v-btn icon @click="archiveQuestion">
						<v-icon :size="icon.sm" v-html="'$vuetify.icons.archive_all'"/>
					</v-btn>
				</template>
				<template v-else>
					<v-btn v-if="!isSMnXS" icon @click="dialogReplyQuestion=false">
						<v-icon :size="icon.sm" v-html="'$vuetify.icons.close'"/>
					</v-btn>
				</template>
			</v-card-title>
			<v-divider />

			<!-- @desc: Replies message content -->
			<div class="max-height-sm-down">
				<div class="wrapper-card">
					<question-card :question="question"/>
					<bouncy-loader v-show="loading" :loading="loading"/>
					<template v-for="reply in replies">
						<reply-card :key="reply.id" :replyData="reply"/>
					</template>
				</div>

				<!-- @desc: textarea for reply -->
				<v-divider />
				<v-card-actions>
					<text-area class="field-reply" :field="form.reply"/>
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
import { mapGetters } from 'vuex';
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
			sm: 20
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
		loading: false,
		tempReplyID: null,
		replies: []
	}),
	computed: {
		...mapGetters({
			getReplies: 'admin/questions/getReplies'
		}),
		checkReply() {
			const { reply } = this.form;
			if (reply.value.length > reply.counter) {
				reply.errmsg = this.$t('err-limit');
				return true;
			}
			return !this._cm.notEmpty(reply.value)
				|| reply.value.length > reply.counter;
		},
		isSMnXS() {
			return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
		}
	},
	mounted() {
		this.$root.$on('dialog-reply-question', (question) => {
			this.loading = this.replies.length < 0;
			this.question = question;
			this.dialogReplyQuestion = true;
		});
		this.$root.$on('delete-reply', (reply) => {
			this.$store.dispatch('admin/questions/deleteQuestionReply', reply);
			this.updateReplies();
		});
	},
	sockets: {
		get_question_replies(replies) {
			console.warn(replies);
			// this.replies = replies;
			const data = {
				id: this.question.id,
				replies
			};
			this.$store.dispatch('admin/questions/getQuestionReplies', data);
			this.updateReplies();
		},
		add_question_reply({ reply, errmsg }) {
			const infoReply = {
				question_id: this.question.id,
				temp_id: this.tempReplyID
			};
			if (errmsg) {
				this.form.reply.errmsg = errmsg;
				return this.$store.dispatch('admin/questions/removeErrorQuestionReply', infoReply);
			}
			this.$store.dispatch('admin/questions/replaceSuccessQuestionReply', Object.assign(reply, { temp_id: infoReply.temp_id }));
			return this.updateReplies();
		}
	},
	methods: {
		updateReplies() {
			this.replies = this.getReplies(this.question.id);
		},
		sendReply() {
			// @desc: generator temp id for new reply
			this.tempReplyID = Math.random().toString(36).substring(7);
			const replyId = this.tempReplyID;
			const user = this.$cookies.get(this.$env.VUE_APP_CK_USER);
			const replyInfo = {
				question_id: this.question.id,
				data: {
					id: replyId,
					content: this.form.reply.value.trim(),
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
	position: relative !important;
	height: 300px;
	max-height: 100%;
	flex: 1;
	overflow-y: auto;
	overflow-x: hidden;
}
.field-reply {
	textarea {
		max-height: 120px;
		overflow-y: auto !important;
	}
}

@media only screen and (max-width: 960px) {
	.max-height-sm-down {
		height: calc(100vh - 52px);
		display: flex;
		flex-direction: column;
	}
}
</style>
