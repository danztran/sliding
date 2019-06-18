<!--
	@desc: only fullcreen dialog in small device
	@small device => XS - SM
 -->
<template>
	<v-dialog
		id="reply-question-dialog"
		v-model="dialogReplyQuestion"
		max-width="550px"
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
					<question-card--live :question="question"/>
					<div class="wrapper-card--reply">
						<template v-for="reply in replies">
							<reply-card :key="reply.id" :replyData="reply"/>
						</template>
						<bouncy-loader v-if="loading"/>
					</div>
				</div>

				<!-- @desc: textarea for reply -->
				<v-divider />
				<v-card-actions style="padding: 5px 24px;">
					<!-- <div @keydown.enter.capture.prevent.stop> -->
					<text-area class="field-reply"
						:field="form.reply"
						@keydown.native.enter.capture="onReplyKeydown"/>
					<!-- </div> -->
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
import { mapGetters, mapActions } from 'vuex';
import LiveQuestionCard from './LiveQuestionCard.vue';
import QuestionReplyCard from './QuestionReplyCard.vue';

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
		'question-card--live': LiveQuestionCard,
		'reply-card': QuestionReplyCard
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
			if (reply.value && reply.value.length > reply.counter) {
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
			this.question = question;
			this.dialogReplyQuestion = true;
			if (this.question.replies === undefined && this.question.count_replies > 0) {
				this.loading = true;
				this.emitReplies();
			}
			else {
				this.replies = this.question.replies;
			}
		});
		this.$root.$on('delete-reply', (reply) => {
			this.deleteQReply(reply);
			this.updateReplies();
		});
	},
	methods: {
		...mapActions({
			deleteQReply: 'admin/questions/deleteQuestionReply',
			setQReplies: 'admin/questions/getQuestionReplies',
			removeErrorQReply: 'admin/questions/removeErrorQuestionReply',
			mergeQReply: 'admin/questions/replaceSuccessQuestionReply',
			sendQReply: 'admin/questions/sendQuestionReply'
		}),
		emitReplies() {
			const emiter = 'get-question-replies';
			this.$socket.emit(emiter, this.question.id, ({ errmsg, replies }) => {
				this.loading = false;
				if (errmsg) {
					// notify
					return;
				}
				const data = {
					id: this.question.id,
					replies
				};
				this.setQReplies(data);
				this.updateReplies();
			});
		},
		updateReplies() {
			this.replies = this.getReplies(this.question.id);
		},
		onReplyKeydown(event) {
			if (event && !event.shiftKey) {
				event.preventDefault();
				this.sendReply();
				this.form.reply.value = '';
			}
		},
		sendReply() {
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
			this.sendQReply(replyInfo);
			const emiter = 'add-question-reply';
			this.$socket.emit(emiter, replyInfo.data, ({ reply, errmsg }) => {
				const infoReply = {
					question_id: this.question.id,
					temp_id: this.tempReplyID
				};
				if (errmsg) {
					this.form.reply.errmsg = errmsg;
					return this.removeErrorQReply(infoReply);
				}
				this.mergeQReply(Object.assign(reply, { temp_id: infoReply.temp_id }));
				return this.updateReplies();
			});
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
	flex: 1;
	overflow-x: hidden;
	height: 68vh;
	.wrapper-card--reply {
		overflow-y: auto;
		position: relative !important;
		min-height: 30vh;
	}
}
.field-reply {
	textarea {
		max-height: 10vh;
	}
}

@media only screen and (max-width: 960px) {
	.wrapper-card {
		height: 90vh;
		.wrapper-card--reply {
			max-height: unset;
			min-height: 30vh;
		}
	}
	.field-reply {
		textarea {
			max-height: 10vh;
		}
	}

	.max-height-sm-down {
		height: calc(100vh - 52px);
		display: flex;
		flex-direction: column;
	}
}
</style>
