<!-- @desc: question card in live/archive tabs -->
<template>
	<div class="question-card">
		<v-hover>
			<v-card
				slot-scope="{ hover }"
				:class="{ deleting }"
				class="no-shadow card-hover">
				<v-list
					subheader
					class="py-1"
					:class="{ 'is-pinned': isPinned }">
					<v-list-tile>
						<!-- @desc: avatar -->
						<v-list-tile-avatar
							class="pl-2"
							:size="icon.lg"
							color="grey lighten-2">
							<v-icon
								:size="icon.sm"
								color="white"
								v-text="'$vuetify.icons.person'" />
						</v-list-tile-avatar>

						<!--
						@desc: info user post question
						@contains: username, question likes, time post
					-->
						<v-list-tile-content>
							<span class="body-2 text-capitalize">
								{{ question.user.name }}
							</span>
							<span class="body-1 grey--text font-weight-light d-flex">
								<template v-if="showReaction">
									<span>{{ likes.length }}&nbsp;</span>
									<v-icon
										:size="icon.xs"
										v-text="'$vuetify.icons.like'" />
									&nbsp;•
								</template>
								<span v-text="dateQCreated" />
								<v-chip
									v-if="isAnswered"
									class="my-0"
									small
									outline
									color="success">Answered</v-chip>
							</span>
						</v-list-tile-content>

						<v-list-tile-action
							v-if="hover"
							class="hidden-sm-and-down">
							<v-list-tile>
								<slot name="action-buttons" />
							<!-- * live: mark great/answered question -->
							</v-list-tile>
						</v-list-tile-action>
					</v-list-tile>
				</v-list>

				<!-- @desc: on edit field / content -->
				<div :class="{ 'is-pinned': isPinned }">
					<v-card-title v-if="onEdit" class="py-0 px-4">
						<span class="v-textarea-override no-shadow w-100">
							<text-area :field="form.editQuestion" />
						</span>
					</v-card-title>
					<v-card-title v-else class="py-0 px-4">
						<p class="body-1 mb-0">
							{{ question.content }}
						</p>
					</v-card-title>

					<!--@desc:
						*reply question by open dialog
						*options: mark start, edit/delete question -->
					<v-card-actions class="py-0">
						<v-list-tile class="grow">
							<!-- *edit: text length -->
							<div
								v-if="onEdit"
								:class="{'red--text': checkValidEdit}"
								class="body-1">
								{{ countCharacterEdit }}
							</div>
							<!-- *options: mark star -->
							<v-tooltip v-else bottom>
								<template v-slot:activator="{ on }">
									<v-btn icon v-on="on">
										<v-icon
											:color="isStar ? 'yellow' : 'grey lighten-1'"
											size="17"
											@click="toggleStar"
											v-text="isStar
												? '$vuetify.icons.star'
												: '$vuetify.icons.star_border'" />
									</v-btn>
								</template>
								<span v-t="'btn-star-question'" />
							</v-tooltip>

							<!-- *reply -->
							<v-layout
								align-center
								justify-end>
								<template v-if="onEdit">
									<v-btn
										v-t="'btn-cancel'"
										flat
										small
										:ripple="false"
										@click="cancelEdit" />
									<v-btn
										v-t="'btn-save'"
										color="primary"
										flat
										small
										:ripple="false"
										:disabled="checkValidEdit"
										@click="saveEdit" />
								</template>
								<div v-else>
									<v-btn
										v-if="reply"
										color="grey lighten-1"
										flat
										small
										@click="replyQuestion(question)">
										<v-icon size="17" v-text="'$vuetify.icons.reply'" />
										<span class="caption">
											{{ question.replies
												? `${question.replies.length}&nbsp;`
												: `${question.count_replies}&nbsp;` }}
										</span>
										<span
											v-t="question.count_replies > 2
												? 'btn-reply'
												: 'btn-replies'"
											class="caption" />
									</v-btn>

									<!-- *options button -->
									<v-menu
										bottom
										nudge-bottom="5"
										offset-y
										left>
										<template v-slot:activator="{ on }">
											<v-btn
												class="ma-0"
												icon
												:disabled="loadingState !== ''"
												v-on="on">
												<icon-loading-circle :state.sync="loadingState">
													<template #otp-icon>
														<v-icon
															color="grey lighten-1"
															:size="icon.xs"
															v-text="'$vuetify.icons.options_dot'" />
													</template>
												</icon-loading-circle>
											</v-btn>
										</template>

										<v-list class="py-0 custom-list" dense>
											<slot name="menu-items" />

											<!-- *options: edit -->
											<v-list-tile @click="editQuestion">
												<v-list-tile-action>
													<v-icon v-text="'$vuetify.icons.edit'" />
												</v-list-tile-action>
												<v-list-tile-content>
													<v-list-tile-title v-t="'btn-edit'" />
												</v-list-tile-content>
											</v-list-tile>

											<!-- *options: delete -->
											<v-list-tile @click="deleteQuestion">
												<v-list-tile-action>
													<v-icon v-text="'$vuetify.icons.delete'" />
												</v-list-tile-action>
												<v-list-tile-content>
													<v-list-tile-title v-t="'btn-delete'" />
												</v-list-tile-content>
											</v-list-tile>
										</v-list>
									</v-menu>
								</div>
							</v-layout>
						</v-list-tile>
					</v-card-actions>
				</div>
			</v-card>
		</v-hover>
	</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import IconLoadingCircle from '@/components/pieces/IconLoadingCircle.vue';

const initForm = () => ({
	editQuestion: {
		label: '',
		value: '',
		errmsg: '',
		autofocus: true,
		rows: 2,
		solo: true,
		outline: true,
		maxLength: 1000,
		required: true,
		autogrow: true,
	},
});

export default {
	name: 'QuestionCard',
	components: {
		'icon-loading-circle': IconLoadingCircle,
	},
	props: {
		showReaction: {
			type: Boolean,
			default: true,
		},
		reply: {
			type: Boolean,
			default: true,
		},
		question: {
			type: Object,
			default: () => ({
				content: '',
				count_replies: null,
				id: null,
				reactions: [],
				is_star: false,
				is_answered: false,
				user: {
					id: null,
					name: '',
				},
				replies: [],
			}),
		},
	},
	data: () => ({
		icon: {
			xs: 14,
			sm: 17,
			lg: 25,
		},
		form: initForm(),
		reactions: [],
		onEdit: false,
		cache: '',
		loadingState: '',
		tempQuestion: null,
		deleting: false,
	}),
	computed: {
		...mapGetters({
			getQReactions: 'admin/questions/getQuestionsReactions',
		}),
		checkValidEdit() {
			const { editQuestion } = this.form;
			if (editQuestion.value && editQuestion.value.length > editQuestion.maxLength) {
				editQuestion.errmsg = this.$t('err-question-limit');
				return true;
			}
			return !this._cm.notEmpty(editQuestion.value);
		},
		countCharacterEdit() {
			const { editQuestion } = this.form;
			return editQuestion.maxLength - editQuestion.value.length;
		},
		dateQCreated() {
			return this._cm.dayCreate(this.question.created_at);
		},
		isStar() {
			return this.question.is_star;
		},
		isPinned() {
			return this.question.is_pinned;
		},
		isAnswered() {
			return this.question.is_answered;
		},
		likes() {
			if (this.reactions) return this.reactions.filter(r => r.like === true);
			return [];
		},
	},
	mounted() {
		this.$root.$on('update-reactions', () => {
			this.reactions = this.getQReactions(this.question.id);
		});
	},
	methods: {
		...mapMutations({
			mergeQuestion: 'admin/questions/MERGE_QUESTION',
			delQuestion: 'admin/questions/DELETE_QUESTION',
		}),
		resetForm() {
			this.cache = '';
			this.tempQuestion = null;
			const { editQuestion } = this.form;
			editQuestion.value = '';
			editQuestion.errmsg = '';
		},
		replyQuestion(question) {
			this.$root.$emit('dialog-reply-question', question);
		},
		toggleStar() {
			this.tempQuestion = { ...this.question };
			this.question.is_star = !this.question.is_star;
			this.emitEdit({ is_star: this.question.is_star });
		},
		editQuestion() {
			this.onEdit = true;
			this.cache = this.question.content;
			this.form.editQuestion.value = this.question.content;
		},
		cancelEdit() {
			this.onEdit = false;
			this.resetForm();
		},
		saveEdit() {
			this.loadingState = 'loading';
			this.onEdit = false;
			this.question.content = this.form.editQuestion.value;
			const infoQEdit = {
				content: this.form.editQuestion.value.trim(),
			};
			this.emitEdit(infoQEdit);
		},
		emitEdit(info) {
			const emiter = 'edit-question';
			this.$socket.emit(emiter, {
				id: this.question.id,
				...info,
			}, ({ errmsg, question }) => {
				if (errmsg) {
					if (this.cache) {
						this.question.content = this.cache;
					}
					if (this.tempQuestion) {
						this.question = { ...this.question, ...this.tempQuestion };
					}
					this.changeLoadingState('fail');
					// do something
					return;
				}
				this.changeLoadingState('success');
				this.resetForm();
				this.mergeQuestion(question);
			});
		},
		deleteQuestion() {
			this.deleting = true;
			const emiter = 'delete-question';
			this.$socket.emit(emiter, { id: this.question.id }, ({ errmsg, question }) => {
				if (errmsg) {
					this.deleting = false;
					// show notify
					return;
				}
				this.delQuestion(question);
			});
		},
		changeLoadingState(state) {
			if (this.loadingState === 'loading') {
				this.loadingState = state;
			}
		},
	},
};
</script>

<style lang="scss">
.question-card {
	.deleting {
		opacity: .4;
		cursor: not-allowed;
	}
	.is-pinned {
		background: rgba(162, 209, 218, 0.231372549) !important;
	}
	.v-chip--small {
		height: 21px !important;
	}
}
</style>
