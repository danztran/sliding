<template>
	<v-hover>
		<v-card class="no-shadow card-question" slot-scope="{ hover }">
			<!-- INFO USER/MESSAGE -->
			<v-list subheader class="py-1">
				<v-list-tile>
					<!-- AVATAR -->
					<v-list-tile-avatar class="pl-2" :size="icon.lg" color="grey lighten-2">
						<v-icon :size="icon.sm" color="white" v-html="'$vuetify.icons.person'"></v-icon>
					</v-list-tile-avatar>

					<!-- INFO USER -->
					<v-list-tile-content>
						<span class="body-2">
							{{ question.user.name }}
						</span>
						<span class="body-1 grey--text font-weight-light">
							<span>{{ question.likes.length }} </span>
							<v-icon :size="icon.xs" v-html="'$vuetify.icons.like'"/>
							• Date time
						</span>
					</v-list-tile-content>

					<!-- MANAGER MESSAGE -->
					<v-list-tile-action v-if="hover">
						<!-- RESTORE QUEST for ARCHIVE -->
						<v-list-tile v-if="archive">
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
						</v-list-tile>

						<!-- HIGHLIGHT/MARK ANSWERED QUEST for ADMIN-->
						<v-list-tile v-if="!archive && !moderator">
							<!-- HIGHLIGHT QUESTIONS -->
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

							<!-- MARK ANSWERED -->
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

						</v-list-tile>

						<!-- APPROVE/DISMISS/STAR QUEST for MODERATOR -->
						<v-list-tile v-if="moderator">
							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn icon v-on="on">
										<v-icon
											color="grey lighten-1"
											:size="icon.sm"
											v-html="'$vuetify.icons.star_border'">
										</v-icon>
									</v-btn>
								</template>
								<span v-t="'btn-not-star-question'"></span>
							</v-tooltip>

							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn
										class="mx-1"
										flat
										icon v-on="on"
										color="success">
										<v-icon
											color="success"
											:size="icon.lg"
											v-html="'$vuetify.icons.approve'">
										</v-icon>
									</v-btn>
								</template>
								<span v-t="'btn-approve-question'"></span>
							</v-tooltip>

							<v-tooltip bottom>
								<template v-slot:activator="{ on }">
									<v-btn
										flat
										icon v-on="on"
										color="red">
										<v-icon
											color="red"
											:size="icon.lg"
											v-html="'$vuetify.icons.dismiss'">
										</v-icon>
									</v-btn>
								</template>
								<span v-t="'btn-dismiss-question'"></span>
							</v-tooltip>

						</v-list-tile>
					</v-list-tile-action>
				</v-list-tile>
			</v-list>

			<!-- MESSSAGE CONTENT -->
			<v-card-title class="py-0 px-4">
				<p
					:class="{'mb-0': !moderator}"
					class="body-1">
					{{ question.content }}
				</p>
			</v-card-title>

			<!-- STAR/REPLY/OPTS for ADMIN -->
			<v-card-actions v-if="!moderator" class="py-0">
				<v-list-tile class="grow">
					<v-tooltip bottom>
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

					<!-- REPLY -->
					<v-layout
						align-center
						justify-end>
						<v-btn
							v-if="reply"
							class="ma-0"
							color="grey lighten-1"
							flat
							small
							@click="replyQuestion(question)">
							<v-icon size="17" v-html="'$vuetify.icons.reply'"/>
							<span>{{ question.count_replies }}</span>
							<span class="caption" v-t="'btn-reply'"></span>
						</v-btn>

						<!-- EDIT/ARCHIVE/DELETE -->
						<v-menu bottom nudge-bottom offset-y left>
							<template v-slot:activator="{ on }">
								<v-btn
									v-on="on"
									class="ma-0"
									icon>
									<v-icon
										color="grey lighten-1"
										:size="icon.sm"
										v-html="'$vuetify.icons.options_dot'">
									</v-icon>
								</v-btn>
							</template>

							<v-list class="py-0" dense>
								<v-list-tile @click="editQuestion">
									<v-list-tile-action>
										<v-icon v-html="'$vuetify.icons.edit'" />
									</v-list-tile-action>
									<v-list-tile-content>
										<v-list-tile-title v-t="'btn-edit'"></v-list-tile-title>
									</v-list-tile-content>
								</v-list-tile>

								<v-list-tile @click="archiveQuestion">
									<v-list-tile-action>
										<v-icon v-html="'$vuetify.icons.archive_all'" />
									</v-list-tile-action>
									<v-list-tile-content>
										<v-list-tile-title v-t="'btn-archive'"></v-list-tile-title>
									</v-list-tile-content>
								</v-list-tile>

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

					</v-layout>

				</v-list-tile>
			</v-card-actions>
		</v-card>
	</v-hover>
</template>

<script>
export default {
	name: 'QuestionMainCard',
	props: {
		reply: {
			type: Boolean,
			default: false
		},
		archive: {
			type: Boolean,
			default: false
		},
		moderator: {
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
					type: Object,
					default: () => ({
						id: null,
						name: ''
					})
				}
			})
		}
	},
	data: () => ({
		icon: {
			xs: 14,
			sm: 17,
			lg: 25
		}
	}),
	methods: {
		replyQuestion(question) {
			this.$root.$emit('dialog-reply-question', question);
		},
		restoreQuestion() {},
		highlightQuestion() {},
		markQuestionAnswered() {},
		markStarQuestion() {},
		editQuestion() {},
		archiveQuestion() {},
		deleteQuestion() {}
	}
};
</script>

<style lang="scss">
</style>
