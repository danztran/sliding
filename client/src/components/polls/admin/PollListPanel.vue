<template>
	<v-layout row wrap>
		<!-- @desc: title - actions create -->
		<v-layout
			class="pl-3 py-2"
			row
			justify-space-between
			align-center>
			<!-- *title: List poll -->
			<div v-t="'poll-list-view-title'" class="pt-1 body-1 grey--text" />

			<div class="d-flex">
				<!-- *create poll -->
				<v-btn
					small
					round
					color="success"
					@click="toggleDialogHandlePoll">
					<span
						v-t="'btn-create-poll'"
						class="first-letter-uppercase px-2" />
				</v-btn>
				<v-menu
					v-if="polls.length > 1"
					bottom
					nudge-bottom="5"
					offset-y
					left>
					<template v-slot:activator="{ on }">
						<v-btn
							icon
							small
							v-on="on">
							<v-icon
								size="17"
								v-text="'$vuetify.icons.filter'" />
						</v-btn>
					</template>
					<v-list class="py-0 custom-list" dense subheader>
						<v-subheader v-t="'opt-sort-by-title'" />
						<!-- *oldest -->
						<v-list-tile @click="sortPolls('asc')">
							<v-list-tile-action>
								<v-icon
									v-show="orderBy === 'asc'"
									color="primary"
									v-text="'$vuetify.icons.check'" />
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title
									v-t="'btn-oldest'"
									class="first-letter-uppercase" />
							</v-list-tile-content>
						</v-list-tile>

						<!-- *recent (newest) -->
						<v-list-tile @click="sortPolls('desc')">
							<v-list-tile-action>
								<v-icon
									v-show="orderBy === 'desc'"
									color="primary"
									v-text="'$vuetify.icons.check'" />
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title
									v-t="'btn-recent'"
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
					<poll--card
						v-for="poll in polls"
						:key="poll.id"
						:poll="poll"
						@get-poll-opts="emitGetPollOpts(poll.id)" />
					<poll-card--create />
				</v-flex>
			</v-layout>
		</v-card>
	</v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import PollCreateCard from './PollCreateCard.vue';
import PollCard from './PollCard.vue';

export default {
	name: 'PollListPanel',
	components: {
		'poll-card--create': PollCreateCard,
		'poll--card': PollCard,
	},
	data: () => ({
		orderBy: 'desc',
	}),
	computed: {
		...mapGetters({
			polls: 'admin/polls/getPolls',
		}),
	},
	methods: {
		toggleDialogHandlePoll() {
			this.$root.$emit('dialog-handle-poll', { type: 'create' });
		},
		sortPolls(order) {
			this.orderBy = order;
			this._cm.customSort(this.polls, order, 'created_at');
		},
	},
};
</script>

<style lang="css" scoped>
</style>
