<template>
	<v-card class="no-shadow">
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
						v-text="'$vuetify.icons.person'" />
				</v-list-tile-avatar>

				<!-- @desc: user info -->
				<v-list-tile-content>
					<span class="body-2">
						Username
					</span>
					<span class="body-1 grey--text font-weight-light">
						<v-icon :size="icon.xs" v-text="'$vuetify.icons.like'" />
						Date Created
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
								color="grey lighten-2"
								:size="icon.sm"
								v-text="'$vuetify.icons.like'" />
						</v-btn>

						<!-- *dislike -->
						<v-btn
							flat
							icon
							small
							color="red lighten-1">
							<v-icon
								color="grey lighten-2"
								:size="icon.sm"
								@click="dislikeQuestion"
								v-text="'$vuetify.icons.dislike'" />
						</v-btn>
					</v-list-tile>
				</v-list-tile-action>
			</v-list-tile>
		</v-list>

		<v-card-title class="py-0 px-4">
			<p class="body-1 mb-0">
				Question content
			</p>
		</v-card-title>

		<v-card-actions class="py-0">
			<v-list-tile class="grow">
				<span class="grey--text caption">
					Count likes
				</span>
				<v-btn
					color="grey lighten-1"
					flat
					small
					@click="showDialogReplies">
					<v-icon size="13" v-text="'$vuetify.icons.guest_reply'" />
					<span class="caption text-lowercase">
						&nbsp;1 reply
					</span>
					<!-- <span
						v-t="question.count_replies > 2 ? 'btn-reply' : 'btn-replies'"
						class="caption" /> -->
				</v-btn>
			</v-list-tile>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: 'QuestionCard',
	data: () => ({
		icon: {
			xs: 14,
			sm: 17,
			lg: 25
		}
	}),
	methods: {
		showDialogReplies() {
			// toggle dialog reply
		},
		dislikeQuestion() {
			// ...
		},
		likeQuestion() {
			// ...
		}
	}
};
</script>

<style lang="scss">
</style>
