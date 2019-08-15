<template>
	<v-card class="card-hover">
		<v-list two-line>
			<v-list-tile avatar>
				<!-- *Icon -->
				<v-list-tile-avatar>
					<v-icon
						class="avatar-bg"
						small
						color="primary"
						v-text="'$vuetify.icons.event'" />
				</v-list-tile-avatar>

				<!-- *Info -->
				<v-list-tile-content @click="toEventLive">
					<v-list-tile-title>
						<span class="body-2">
							{{ info.name }}
						</span>
						<span class="body-1 grey--text text-uppercase">
							&nbsp;(#{{ info.code }})
						</span>
					</v-list-tile-title>
					<v-list-tile-sub-title class="body-1 text--primary">
						{{ formatTime(info.start_at) }}
						-
						{{ formatTime(info.end_at) }}
					</v-list-tile-sub-title>
					<v-list-tile-sub-title>
						{{ eventDate }}
					</v-list-tile-sub-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>
	</v-card>
</template>

<script>
export default {
	name: 'EventCard',
	props: {
		info: {
			type: Object,
			default: () => ({
				name: 'Name Event',
				code: 'Event code',
				start_at: '',
				end_at: '',
			}),
		},
	},
	computed: {
		eventDate() {
			const start = new Date(this.info.start_at);
			const end = new Date(this.info.end_at);
			const dateEnd = end.toUTCString().toString().substr(4, 12);
			return `${start.getDate()} ${start.getMonth() !== end.getMonth() ? start.toLocaleString('default', { month: 'long' }) : ''} - ${dateEnd}`;
		},
	},
	methods: {
		formatTime(date) {
			return new Date(date).toLocaleString([], { hour: '2-digit', minute: '2-digit' });
		},
		toEventLive() {
			const { code } = this.info;
			this.$router.push({ name: 'admin-event', params: { code } });
		},
	},
};
</script>

<style lang="scss" scoped>
.v-card {
	margin: 0 !important;
	border: 1px solid rgba(0,0,0,.1);
	box-shadow: none;
}
.otp {
	opacity: 0;
	visibility: hidden;
}
.card-hover:hover {
	cursor: pointer;
	background-color: #f5f5f5;
	.otp {
		opacity: 1;
		visibility: visible;
	}
}
.iconHover.material-icons.theme--light:hover {
	color: var(--v-primary-base);
}
</style>
