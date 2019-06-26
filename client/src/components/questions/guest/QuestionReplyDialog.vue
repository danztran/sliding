<template>
	<v-dialog
		v-model="dialogReplyQuestion"
		max-width="550px"
		:transition="false"
		:fullscreen="isSMnXS">
		<v-card>
			<v-card-title class="py-0">
				<template v-if="isSMnXS">
					<v-btn v-if="isSMnXS" icon @click="dialogReplyQuestion=false">
						<v-icon :size="icon.sm" v-text="'$vuetify.icons.arrow_left'" />
					</v-btn>
				</template>
				<!-- @desc: title -->
				<span v-else v-t="'dialog-reply-question-title'" />

				<v-spacer />
				<!-- @desc: button close -->
				<v-btn
					v-if="!isSMnXS"
					icon
					@click="dialogReplyQuestion=false">
					<v-icon
						:size="icon.sm"
						v-text="'$vuetify.icons.close'" />
				</v-btn>
			</v-card-title>
			<v-divider />

			<div class="max-height-sm-down">
				<div class="wrapper-card">
					<question-card :question="question" reply />
					<div class="wrapper-card--reply">
						<template v-for="reply in replies">
							<reply-card
								:key="reply.id"
								:reply-data="reply" />
						</template>
						<bouncy-loader v-if="loading" />
					</div>
				</div>
			</div>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import QuestionCard from '@/components/questions/guest/QuestionCard.vue';
import QuestionReplyCard from '@/components/questions/guest/QuestionReplyCard.vue';

export default {
	name: 'QuestionReplyDialog',
	components: {
		'question-card': QuestionCard,
		'reply-card': QuestionReplyCard
	},
	data: () => ({
		icon: {
			sm: 20
		},
		dialogReplyQuestion: false,
		loading: false,
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
		...mapGetters({
			getQuestionReplies: 'guest/questions/getQuestionReplies'
		}),
		isSMnXS() {
			return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
		}
	},
	mounted() {
		this.$root.$on('dialog-reply-question', (question) => {
			this.dialogReplyQuestion = true;
			if (this.question && this.question.id === question.id) return;
			this.question = question;
			this.replies = this.question.replies || [];
			if (this.question.replies === undefined && this.question.count_replies > 0) {
				this.loading = true;
				this.emitReplies();
			}
		});
	},
	methods: {
		...mapMutations({
			setQReplies: 'guest/questions/SET_QUESTION_REPLIES'
		}),
		updateReplies() {
			this.replies = this.getQuestionReplies(this.question.id);
			this._cm.customSort(this.replies, 'asc', 'created_at');
		},
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
		}
	}
};
</script>

<style lang="scss">
.wrapper-card {
	position: relative !important;
	flex: 1;
	overflow-x: hidden;
	max-height: 68vh;
	.wrapper-card--reply {
		overflow-y: auto;
		position: relative !important;
		min-height: 30vh;
	}
}

@media only screen and (max-width: 960px) {
	.wrapper-card {
		height: 90vh;
		max-height: 90vh;
		.wrapper-card--reply {
			max-height: unset;
			min-height: 50vh;
		}
	}

	.max-height-sm-down {
		height: calc(100vh - 52px);
		display: flex;
		flex-direction: column;
	}
}
</style>
