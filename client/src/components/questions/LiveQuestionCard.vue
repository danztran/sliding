<!-- @desc: question card in live/archive tabs -->
<template>
	<v-hover>
		<v-card class="no-shadow" slot-scope="{ hover }">
			<v-list subheader class="py-1">
				<v-list-tile>
					<!-- @desc: avatar -->
					<v-list-tile-avatar
						class="pl-2"
						:size="icon.lg"
						color="grey lighten-2">
						<v-icon
							:size="icon.sm"
							color="white"
							v-html="'$vuetify.icons.person'">
						</v-icon>
					</v-list-tile-avatar>

					<!--
						@desc: info user post question
						@contains: username, question likes, time post
					-->
					<v-list-tile-content>
						<span class="body-2">
							{{ question.user.name }}
						</span>
						<span class="body-1 grey--text font-weight-light">
							<span>{{ question.likes ? question.likes.length : 0 }} </span>
							<v-icon :size="icon.xs" v-html="'$vuetify.icons.like'"/>
							• Date time
						</span>
					</v-list-tile-content>

					<!--
						@desc: questions managerment funcs
						@contains: funcs
							*archive: restore question
							*live: mark star, mark answered
					-->
					<v-list-tile-action v-if="hover">
						<v-list-tile>
							<!-- * archive: restore -->
							<template v-if="archive">
								<v-tooltip bottom>
									<template v-slot:activator="{ on }">
										<v-btn
											@click="restoreQuestion"
											class="mx-1"
											flat
											icon v-on="on">
											<v-icon
												color="grey lighten-1"
												:size="icon.lg"
												v-html="'$vuetify.icons.restore'">
											</v-icon>
										</v-btn>
									</template>
									<span v-t="'btn-restore-question'"></span>
								</v-tooltip>
							</template>

							<!-- * live: mark great/answered question -->
							<template v-else>
								<v-tooltip bottom>
									<template v-slot:activator="{ on }">
										<v-btn
											@click="highlightQuestion"
											class="mx-1"
											flat
											icon v-on="on"
											color="primary lighten-1">
											<v-icon
												color="primary lighten-1"
												:size="icon.lg"
												v-html="'$vuetify.icons.highlight_question'">
											</v-icon>
										</v-btn>
									</template>
									<span v-t="'btn-mark-highlight'"></span>
								</v-tooltip>

								<v-tooltip bottom>
									<template v-slot:activator="{ on }">
										<v-btn
											flat
											icon v-on="on"
											color="success">
											<v-icon
												@click="markQuestionAnswered"
												color="success"
												:size="icon.lg"
												v-html="'$vuetify.icons.approve'">
											</v-icon>
										</v-btn>
									</template>
									<span v-t="'btn-mark-answer'"></span>
								</v-tooltip>
							</template>
						</v-list-tile>
					</v-list-tile-action>
				</v-list-tile>
			</v-list>

			<!-- @desc: on edit field / content -->
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
					*options: mark start, edit/delete/archive question -->
			<v-card-actions class="py-0">
				<v-list-tile class="grow">
					<!-- *edit: text length -->
					<div
						v-if="onEdit"
						:class="{'red--text': checkValidEdit}"
						class="body-1">
						{{ form.editQuestion.value.length }}
					</div>
					<!-- *options: mark star -->
					<v-tooltip v-else bottom>
						<template v-slot:activator="{ on }">
							<v-btn icon v-on="on">
								<v-icon
									@click="markStarQuestion"
									color="grey lighten-1"
									size="17"
									v-html="'$vuetify.icons.star_border'">
								</v-icon>
							</v-btn>
						</template>
						<span v-t="'btn-star-question'"></span>
					</v-tooltip>

					<!-- *reply -->
					<v-layout
						align-center
						justify-end>
						<template v-if="onEdit">
							<v-btn
								flat
								small
								:ripple=false
								v-t="'btn-cancel'"
								@click="cancelEdit">
							</v-btn>
							<v-btn
								color="primary"
								flat
								small
								:ripple=false
								v-t="'btn-save'"
								:disabled="checkValidEdit"
								@click="saveEdit">
							</v-btn>
						</template>
						<div v-else>
							<v-btn
								v-if="reply"
								color="grey lighten-1"
								flat
								small
								@click="replyQuestion(question)">
								<v-icon size="17" v-html="'$vuetify.icons.reply'"/>
								<span class="caption">
									{{ question.replies
										? `${question.replies.length}&nbsp;`
										: `${question.count_replies}&nbsp;` }}
									<!-- {{ `${question.replies.length}&nbsp;` }} -->
								</span>
								<span
									class="caption"
									v-t="question.count_replies > 2 ? 'btn-reply' : 'btn-replies'">
								</span>
							</v-btn>

							<!-- *options button -->
							<v-menu bottom nudge-bottom offset-y left>
								<template v-slot:activator="{ on }">
									<v-btn
										v-on="on"
										class="ma-0"
										icon
										:disabled="mixEditLoading.loading || mixEditLoading.success"
										:loading="mixEditLoading.loading">
										<button-edit-loading
											:success="mixEditLoading.success"
											:fail="mixEditLoading.fail">
											<template slot="otp-icon">
												<v-icon
													color="grey lighten-1"
													:size="icon.xs"
													v-html="'$vuetify.icons.options_dot'">
												</v-icon>
											</template>
										</button-edit-loading>
									</v-btn>
								</template>

								<v-list class="py-0" dense>
									<!-- *options: edit -->
									<v-list-tile @click="editQuestion">
										<v-list-tile-action>
											<v-icon v-html="'$vuetify.icons.edit'" />
										</v-list-tile-action>
										<v-list-tile-content>
											<v-list-tile-title v-t="'btn-edit'"></v-list-tile-title>
										</v-list-tile-content>
									</v-list-tile>

									<!-- *options: archive -->
									<v-list-tile @click="archiveQuestion">
										<v-list-tile-action>
											<v-icon v-html="'$vuetify.icons.archive_all'" />
										</v-list-tile-action>
										<v-list-tile-content>
											<v-list-tile-title v-t="'btn-archive'"></v-list-tile-title>
										</v-list-tile-content>
									</v-list-tile>

									<!-- *options: delete -->
									<v-list-tile @click="deleteQuestion">
										<v-list-tile-action>
											<v-icon v-html="'$vuetify.icons.delete'"></v-icon>
										</v-list-tile-action>
										<v-list-tile-content>
											<v-list-tile-title v-t="'btn-delete'"></v-list-tile-title>
										</v-list-tile-content>
									</v-list-tile>
								</v-list>
							</v-menu>
						</div>

					</v-layout>
				</v-list-tile>
			</v-card-actions>
		</v-card>
	</v-hover>
</template>

<script>
import { mapMutations } from 'vuex';
import ButtonEditLoading from '@/components/pieces/ButtonEditLoading.vue';
import MixinButtonEditLoading from '@/mixins/buttonEditLoading';

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
		autogrow: true
	}
});

export default {
	name: 'QuestionCard',
	components: {
		'button-edit-loading': ButtonEditLoading
	},
	mixins: [MixinButtonEditLoading],
	props: {
		reply: {
			type: Boolean,
			default: false
		},
		archive: {
			type: Boolean,
			default: false
		},
		question: {
			type: Object,
			default: () => ({
				content: '',
				count_replies: null,
				id: null,
				likes: [],
				user: {
					id: null,
					name: ''
				},
				replies: []
			})
		}
	},
	data: () => ({
		icon: {
			xs: 14,
			sm: 17,
			lg: 25
		},
		form: initForm(),
		onEdit: false,
		cache: ''
	}),
	computed: {
		checkValidEdit() {
			const { editQuestion } = this.form;
			if (editQuestion.value && editQuestion.value.length > editQuestion.maxLength) {
				editQuestion.errmsg = this.$t('err-question-limit');
				return true;
			}
			return !this._cm.notEmpty(editQuestion.value);
		}
	},
	methods: {
		...mapMutations({
			mergeQEdit: 'admin/questions/MERGE_EDIT_QUESTION'
		}),
		resetForm() {
			const { editQuestion } = this.form;
			editQuestion.value = '';
			editQuestion.errmsg = '';
		},
		replyQuestion(question) {
			this.$root.$emit('dialog-reply-question', question);
		},
		restoreQuestion() {},
		highlightQuestion() {},
		markQuestionAnswered() {},
		markStarQuestion() {},
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
			this.mixEditLoading.loading = true;
			this.onEdit = false;
			this.question.content = this.form.editQuestion.value;
			const infoQEdit = {
				id: this.question.id,
				content: this.form.editQuestion.value.trim(),
				stage: 'public',
				is_star: false,
				is_answered: false
			};
			const emiter = 'edit-question';
			this.$socket.emit(emiter, infoQEdit, ({ errmsg, question }) => {
				if (errmsg) {
					this.question.content = this.cache;
					this.mixEditLoading.loading = false;
					this.buttonEditLoading('fail');
					// do something
					return;
				}
				this.resetForm();
				this.mixEditLoading.loading = false;
				this.buttonEditLoading('success');
				this.mergeQEdit(question);
			});
		},
		archiveQuestion() {},
		deleteQuestion() {}
	}
};
</script>

<style lang="scss">
</style>
