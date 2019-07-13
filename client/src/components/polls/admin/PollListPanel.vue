<template>
	<v-layout row wrap>
		<!-- @desc: title - actions create -->
		<v-layout
			class="pl-3 py-2"
			align-center
			justify-space-between
			row
			fill-height>
			<!-- *title: List poll -->
			<div v-t="'poll-list-view-title'" class="pt-1 body-1 grey--text" />
			<!-- *create poll -->
			<div class="d-flex">
				<v-menu
					bottom
					nudge-bottom="5"
					offset-y
					left>
					<template v-slot:activator="{ on }">
						<v-btn
							small
							round
							color="success"
							v-on="on">
							<span
								v-t="'btn-create-poll'"
								class="first-letter-uppercase px-2" />
						</v-btn>
					</template>

					<v-list class="py-0 custom-list" dense>
						<!-- *opts: multiple choice -->
						<v-list-tile @click="pollVia('multiple')">
							<v-list-tile-action>
								<v-icon
									color="primary"
									small
									v-text="'$vuetify.icons.multiple_choice'" />
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title
									v-t="'btn-poll-multiple-choice'"
									class="first-letter-uppercase" />
							</v-list-tile-content>
						</v-list-tile>

						<!-- *otps: open text -->
						<v-list-tile @click="pollVia('text')">
							<v-list-tile-action>
								<v-icon
									color="success"
									small
									v-text="'$vuetify.icons.ask_question'" />
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title
									v-t="'btn-poll-open-text'"
									class="first-letter-uppercase" />
							</v-list-tile-content>
						</v-list-tile>

						<!-- *otps: word cloud -->
						<v-list-tile @click="pollVia('cloud')">
							<v-list-tile-action>
								<v-icon
									color="secondary"
									small
									v-text="'$vuetify.icons.word_cloud'" />
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title
									v-t="'btn-poll-word-cloud'"
									class="first-letter-uppercase" />
							</v-list-tile-content>
						</v-list-tile>

						<!-- *otps: rating -->
						<v-list-tile @click="pollVia('rating')">
							<v-list-tile-action>
								<v-icon
									color="yellow"
									small
									v-text="'$vuetify.icons.star_border'" />
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title
									v-t="'btn-poll-rating'"
									class="first-letter-uppercase" />
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</v-menu>
			</div>
		</v-layout>

		<v-card class="w-100 card-wrapper list-scroll scrollbar-primary list-scroll">
			<v-layout row wrap>
				<v-flex xs12>
					<poll-card--create />
					<poll-list--card multiple-choice />
					<poll-list--card open-text />
					<poll-list--card word-cloud />
					<poll-list--card rating />
				</v-flex>
			</v-layout>
		</v-card>
	</v-layout>
</template>

<script>
import PollCreateCard from './PollCreateCard.vue';
import PollListCard from './PollListCard.vue';

export default {
	name: 'PollListPanel',
	components: {
		'poll-card--create': PollCreateCard,
		'poll-list--card': PollListCard
	},
	methods: {
		pollVia(otp) {
			// ... open modal via user choice otp
		}
	}
};
</script>

<style lang="css" scoped>
</style>
