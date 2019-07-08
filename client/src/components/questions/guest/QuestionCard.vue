<template>
	<v-card class="no-shadow">
		<v-list subheader class="py-1">
			<v-list-tile>
				<!-- *avatar -->
				<v-list-tile-avatar
					class="pl-2"
					:size="icon.lg"
					color="grey lighten-2">
					<v-icon
						:size="icon.sm"
						color="white"
						v-text="'$vuetify.icons.person'" />
				</v-list-tile-avatar>

				<!-- *info: usename & date_created -->
				<v-list-tile-content>
					<span class="body-2 text-capitalize">
						{{ question.user.name }}
					</span>
					<span class="body-1 grey--text font-weight-light">
						{{ dateQCreated }}
					</span>
				</v-list-tile-content>

				<v-list-tile-action>
					<v-list-tile>
						<!-- *like -->
						<v-btn
							class="mx-1"
							flat
							icon
							small
							color="primary lighten-1"
							@click="likeQuestion">
							<v-icon
								:color="react === true
									? 'primary'
									: 'grey lighten-2'"
								:size="icon.sm"
								v-text="'$vuetify.icons.like'" />
						</v-btn>

						<!-- *dislike -->
						<v-btn
							v-if="allowQDislike"
							color="grey lighten-2"
							flat
							icon
							small>
							<v-icon
								:color="react === false
									? 'primary'
									: 'grey lighten-2'"
								:size="icon.sm"
								@click="dislikeQuestion"
								v-text="'$vuetify.icons.dislike'" />
						</v-btn>
					</v-list-tile>
				</v-list-tile-action>
			</v-list-tile>
		</v-list>

		<!-- *content -->
		<v-card-title class="py-0 px-4">
			<p class="body-1 mb-0">
				{{ question.content }}
			</p>
		</v-card-title>

		<!-- *footer: count_replies & replies dialog -->
		<v-card-actions class="py-0">
			<v-list-tile class="grow">
				<span class="grey--text caption">
					{{ count_likes.length }}&nbsp;
				</span>
				<span
					v-t="count_likes.length > 2
						? 'guest-question-count-likes'
						: 'guest-question-count-like'"
					class="grey--text caption text-lowercase" />

				<v-btn
					v-if="!reply"
					color="grey lighten-1"
					class="text-lowercase"
					flat
					small
					@click="showDialogReplies(question)">
					<v-icon size="13" v-text="'$vuetify.icons.guest_reply'" />
					<span class="caption text-lowercase">
						&nbsp;{{ question.count_replies }}&nbsp;
					</span>
					<span
						v-t="question.count_replies > 2
							? 'btn-reply'
							: 'btn-replies'"
						class="caption" />
				</v-btn>
			</v-list-tile>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
	name: 'QuestionCard',
	props: {
		reply: {
			type: Boolean,
			default: false
		},
		question: {
			type: Object,
			default: () => ({
				content: '',
				count_replies: null,
				created_at: null,
				id: null,
				is_answered: false,
				is_star: false,
				reactions: [],
				// stage: "public"
				user: {
					id: null,
					name: ''
				}
			})
		}
	},
	data: () => ({
		icon: {
			xs: 14,
			sm: 17,
			lg: 25
		},
		react: null
	}),
	computed: {
		...mapGetters({
			allowQDislike: 'guest/event/allowQDislike',
			user: 'auth/user'
		}),
		dateQCreated() {
			return this._cm.dayCreate(this.question.created_at);
		},
		count_likes() {
			if (this._cm.notEmpty(this.question.reactions)) {
				return this.question.reactions.filter(r => r.like === true);
			}
			return [];
		}
	},
	mounted() {
		if (this._cm.notEmpty(this.question.reactions)) {
			const { reactions } = this.question;
			const rs = reactions.find(r => (r.user_id).toString() === this.user.id);
			this.react = (rs !== undefined) ? null || rs.like : null;
		}
	},
	methods: {
		...mapMutations({
			mergeQReact: 'guest/questions/MERGE_QUESTION_REACT'
		}),
		showDialogReplies(question) {
			this.$root.$emit('dialog-reply-question', question);
		},
		updateQReact(react) {
			const qInfo = {
				question_id: this.question.id,
				like: react,
				user_id: this.user.id
			};
			this.mergeQReact(qInfo);
		},
		dislikeQuestion() {
			if (this.react === false) {
				this.react = null;
				this.updateQReact(this.react);
				return this.reactionQuestion({ like: null });
			}
			this.react = false;
			this.updateQReact(this.react);
			return this.reactionQuestion({ like: false });
		},
		likeQuestion() {
			if (this.react === true) {
				this.react = null;
				this.updateQReact(this.react);
				return this.reactionQuestion({ like: null });
			}
			this.react = true;
			this.updateQReact(this.react);
			return this.reactionQuestion({ like: true });
		},
		reactionQuestion(info) {
			const emiter = 'add-question-reaction';
			this.$socket.emit(emiter, {
				question_id: this.question.id,
				...info
			}, (data) => {
				console.warn(data);
			});
		}
	}
};
</script>

<style lang="scss">
</style>
