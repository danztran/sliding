<template>
	<div id="my-events-page">
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-layout
			class="ml-3 mb-1"
			row
			justify-space-between
			align-center>
			<template v-if="!loading && !isEmpty">
				<!-- *event being activated -->
				<div v-t="'event-status'" />

				<div class="d-flex">
					<!-- *button create event -->
					<v-btn
						class="px-3"
						color="success lighten--2"
						dark
						round
						small
						@click.stop="createEvent">
						<span v-t="'btn-create-event'" class="first-letter-uppercase" />
					</v-btn>

					<v-menu
						bottom
						nudge-bottom="5"
						offset-y
						left>
						<template v-slot:activator="{ on }">
							<v-btn
								class="ma-0"
								icon
								v-on="on">
								<v-icon
									size="17"
									v-text="'$vuetify.icons.filter'" />
							</v-btn>
						</template>

						<v-list class="py-0 custom-list" dense subheader>
							<v-subheader v-t="'opt-sort-by-title'" />
							<!-- *oldest -->
							<v-list-tile @click="sortEvent('asc')">
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
							<v-list-tile @click="sortEvent('desc')">
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
			</template>
		</v-layout>

		<!-- *list events -->
		<v-card class="list-event scrollbar-primary">
			<template v-for="event of events">
				<event-card :key="event.code" :info="event" />
			</template>
		</v-card>

		<!-- *empty state event -->
		<div v-if="loading || isEmpty" style="height: 70vh; width: 100%;">
			<bouncy-loader v-show="loading" />
			<div v-show="isEmpty" class="empty-state mt-3">
				<empty-event />
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import EmptyEvent from '@/components/dashboard/my-events/EmptyEvent.vue';
import EventCard from '@/components/dashboard/my-events/EventCard.vue';

export default {
	name: 'Events',
	components: {
		'event-card': EventCard,
		'empty-event': EmptyEvent,
	},
	data: () => ({
		orderBy: 'desc',
		isEmpty: false,
		loading: false,
	}),
	computed: {
		...mapGetters({
			events: 'dashboard/getEvents',
		}),
	},
	watch: {
		events(val) {
			this.loading = false;
			this.isEmpty = val.length === 0;
		},
	},
	mounted() {
		if (this.events.length === 0) {
			const queryOpt = {
				offset: 0,
				limit: 0,
				order: '-created_at',
				role: 'host',
			};
			this.loading = true;
			this.$store.dispatch('dashboard/queryEvent', queryOpt);
		}
	},
	methods: {
		createEvent() {
			this.$root.$emit('dialog-create-new-event');
		},
		toEventLive(code) {
			this.$router.push({ name: 'admin-event', params: { code } });
		},
		sortEvent(order) {
			this.orderBy = order;
			this._cm.customSort(this.events, order, 'created_at');
		},
	},
};
</script>

<style lang="scss">
#my-events-page {
	.list-event {
		max-height: 75vh;
		overflow-y: auto;
		box-shadow: 0 3px 10px rgba(0,0,0,.1);
	}
	.empty-state {
		text-align: center;
		height: 100%;
		.empty-state-title {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
</style>
