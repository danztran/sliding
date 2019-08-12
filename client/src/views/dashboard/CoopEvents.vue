<template>
	<div>
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-layout
			class="ml-3 mb-1"
			row
			justify-space-between
			align-center>
			<template v-if="!loading && !isEmpty">
				<!-- *Title -->
				<div v-t="'coop-status'" />

				<!-- *Sort -->
				<div class="d-flex">
					<!-- @desc: button manage invites -->
					<v-btn
						class="px-3"
						color="primary"
						dark
						round
						small
						@click.stop="toggleDialogInvite">
						<span v-t="'btn-dialog-invite'" class="first-letter-uppercase" />
					</v-btn>

					<!-- *sort -->
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
		<!-- *list coop events -->
		<v-card class="list-event scrollbar-primary">
			<event--card
				v-for="event in coopAccepted"
				:key="event.code"
				:coop-info="event" />
		</v-card>
		<!-- *empty state event -->
		<div v-if="loading || isEmpty" style="height: 70vh; width: 100%;">
			<bouncy-loader v-show="loading" />
			<div v-show="isEmpty" class="empty-state mt-3">
				<v-layout align-center justify-center column>
					<div
						v-t="'coop-empty'"
						class="title font-weight-light first-letter-uppercase" />
					<v-btn
						class="mt-3"
						color="primary"
						dark
						round
						medium
						@click.stop="toggleDialogInvite">
						<span v-t="'btn-dialog-invite'" class="px-3" />
					</v-btn>
				</v-layout>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import EventCard from '@/components/dashboard/coop-events/EventCard.vue';

export default {
	name: 'CoopEvents',
	components: {
		'event--card': EventCard,
	},
	data: () => ({
		orderBy: 'desc',
		isEmpty: false,
		loading: false,
	}),
	computed: {
		...mapGetters({
			invites: 'dashboard/getInvites',
		}),
		coopAccepted() {
			return this.invites.filter(el => el.is_accepted === true);
		},
	},
	watch: {
		coopAccepted(val) {
			this.loading = false;
			this.isEmpty = val.length === 0;
		},
	},
	mounted() {
		if (this.coopAccepted.length === 0) {
			this.loading = true;
		}
	},
	methods: {
		sortEvent(order) {
			this.orderBy = order;
			this._cm.customSort(this.coopAccepted, order, 'created_at');
		},
		toggleDialogInvite() {
			this.$root.$emit('dialog-invite-request');
		},
	},
};
</script>

<style lang="css" scoped>
.list-event {
	max-height: 75vh;
	overflow-y: auto;
	box-shadow: 0 3px 10px rgba(0,0,0,.1);
}
</style>
