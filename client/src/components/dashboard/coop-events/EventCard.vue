<template>
	<v-card class="no-shadow card-hover hover-pointer">
		<v-list two-line>
			<v-list-tile avatar>
				<!-- *Icon -->
				<v-list-tile-avatar>
					<v-icon
						class="avatar-bg"
						small
						color="primary"
						v-text="'$vuetify.icons.group_people'" />
				</v-list-tile-avatar>

				<!-- *Event info -->
				<v-list-tile-content @click="toEventCoop">
					<v-list-tile-title>
						<span class="subheading">
							{{ coopInfo.event.name }}
						</span>
						<span class="grey--text text-uppercase body-1">
							&nbsp;(#{{ coopInfo.event.code }})
						</span>
					</v-list-tile-title>
					<v-list-tile-sub-title class="text--primary">
						{{ formatTime(coopInfo.event.start_at) }}
						-
						{{ formatTime(coopInfo.event.end_at) }}
					</v-list-tile-sub-title>
					<v-list-tile-sub-title>
						{{ eventDate }}
					</v-list-tile-sub-title>
				</v-list-tile-content>

				<!-- *Icons arrow -->
				<v-list-tile-action>
					<v-icon
						color="primary"
						v-text="'$vuetify.icons.arrow_forward'" />
				</v-list-tile-action>
			</v-list-tile>
		</v-list>
	</v-card>
</template>

<script>
export default {
	name: 'EventCard',
	props: {
		coopInfo: {
			type: Object,
			default: () => ({
				is_accepted: null,
				role: 'Moderator',
				event_id: null,
				event: {
					name: '...',
					code: '...',
					start_at: '2019-07-20T16:35:42.147Z',
					end_at: '2019-07-20T16:35:42.147Z',
					descriptions: '...',
				},
			}),
		},
	},
	computed: {
		eventDate() {
			const start = new Date(this.coopInfo.event.start_at);
			const end = new Date(this.coopInfo.event.end_at);
			const dateEnd = end.toUTCString().toString().substr(4, 12);
			return `${start.getDate()} ${start.getMonth() !== end.getMonth() ? start.toLocaleString('default', { month: 'long' }) : ''} - ${dateEnd}`;
		},
	},
	methods: {
		formatTime(date) {
			return new Date(date).toLocaleString([], { hour: '2-digit', minute: '2-digit' });
		},
		toEventCoop() {
			const { code } = this.coopInfo.event;
			this.$router.push({ name: 'admin-event', params: { code } });
		},
	},
};
</script>

<style lang="css" scoped>
.v-card {
	margin: 0 !important;
	border: 1px solid rgba(0,0,0,.1);
	box-shadow: none;
}
</style>
