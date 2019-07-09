<template>
	<v-card class="no-shadow guest-question-card">
		<v-list subheader class="py-1">
			<v-list-tile>
				<!-- *avatar -->
				<v-list-tile-avatar
					class="pl-2 mw-50"
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
							class="mx-1 mw-50"
							round
							outline
							flat
							small
							:color="currentGuestReact === true
								? 'primary'
								: 'grey lighten-2'"
							@click="likeQuestion">
							<span>
								{{ count_likes.length }}
							</span>
							<v-icon
								:color="currentGuestReact === true
									? 'primary'
									: 'grey lighten-2'"
								:size="icon.sm"
								v-text="'$vuetify.icons.like'" />
						</v-btn>

						<!-- *dislike -->
						<v-btn
							v-if="allowQDislike"
							class="mw-50"
							round
							outline
							flat
							:color="currentGuestReact === false
								? 'primary'
								: 'grey lighten-2'"
							small>
							<v-icon
								:color="currentGuestReact === false
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
		<v-card-title
			class="py-0 px-4"
			:class="{'pb-2': reply}">
			<p class="body-1 mb-0">
				{{ question.content }}
			</p>
		</v-card-title>

		<!-- *footer: count_replies & replies dialog -->
		<v-card-actions v-if="!reply" class="py-0">
			<v-list-tile class="grow">
				<span
					class="grey--text text-lighten-2 text-lowercase btn-replies"
					@click="showDialogReplies(question)">
					<v-icon size="14" v-text="'$vuetify.icons.guest_reply'" />
					<span class="caption text-lowercase">
						{{ question.count_replies }}&nbsp;
					</span>
					<span
						v-t="question.count_replies > 2
							? 'btn-reply'
							: 'btn-replies'"
						class="caption" />
				</span>
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
		currentGuestReact: null
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
			this.currentGuestReact = (rs !== undefined) ? null || rs.like : null;
		}
	},
	methods: {
		...mapMutations({
			mergeQReaction: 'guest/questions/MERGE_QUESTION_REACTION'
		}),
		showDialogReplies(question) {
			this.$root.$emit('dialog-reply-question', question);
		},
		updateQReact(currentGuestReact) {
			const qInfo = {
				question_id: this.question.id,
				like: currentGuestReact,
				user_id: this.user.id
			};
			this.mergeQReaction(qInfo);
		},
		dislikeQuestion() {
			if (this.currentGuestReact === false) {
				this.currentGuestReact = null;
				this.updateQReact(this.currentGuestReact);
				return this.reactionQuestion({ like: null });
			}
			this.currentGuestReact = false;
			this.updateQReact(this.currentGuestReact);
			return this.reactionQuestion({ like: false });
		},
		likeQuestion() {
			if (this.currentGuestReact === true) {
				this.currentGuestReact = null;
				this.updateQReact(this.currentGuestReact);
				return this.reactionQuestion({ like: null });
			}
			this.currentGuestReact = true;
			this.updateQReact(this.currentGuestReact);
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
.guest-question-card {
	.mw-50 {
		min-width: 50px;

		.v-btn__content {
			justify-content: space-evenly;
		}
	}

	.btn-replies {
		&:hover {
			cursor: pointer;
			background-color: #f3f3f3;
		};
	}
}
</style>
