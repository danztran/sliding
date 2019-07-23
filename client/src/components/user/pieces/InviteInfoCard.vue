<template>
	<v-card class="no-shadow pb-2">
		<v-layout row wrap>
			<!-- *Event infomation -->
			<v-flex sm10 xs12>
				<div>
					<span class="title font-weight-regular" v-text="infoInvite.event.name" />
					<span class="grey--text text-capitalize">
						&nbsp;({{ infoInvite.role }})
					</span>
				</div>
				<div class="grey--text text--lighten-1 text-uppercase">
					# {{ infoInvite.event.code }}
				</div>
				<div class="grey--text">
					<v-tooltip top>
						<template v-slot:activator="{ on }">
							<span v-on="on">
								<v-icon small v-text="'$vuetify.icons.time_start'" />
								{{ formatTimeEvent(infoInvite.event.start_at) }}
							</span>
						</template>
						<span v-t="'event-start-date'" />
					</v-tooltip>
				</div>
				<div class="grey--text">
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<span v-on="on">
								<v-icon small v-text="'$vuetify.icons.time_end'" />
								{{ formatTimeEvent(infoInvite.event.end_at) }}
							</span>
						</template>
						<span v-t="'event-end-date'" />
					</v-tooltip>
				</div>
			</v-flex>

			<!-- *Accept / Reject invite -->
			<v-flex sm2 xs12>
				<template v-if="infoInvite.is_accepted === null">
					<v-btn
						flat
						small
						color="success"
						@click="emitReponseInvite(true)">
						<span v-t="'btn-accept'" class="first-letter-uppercase" />
					</v-btn>
					<v-btn
						flat
						small
						color="red"
						@click="emitReponseInvite(false)">
						<span v-t="'btn-reject'" class="first-letter-uppercase" />
					</v-btn>
				</template>
				<template v-else-if="infoInvite.is_accepted === true">
					<v-btn
						flat
						small
						color="success"
						@click="toJointEvent">
						<span v-t="'btn-join'" class="first-letter-uppercase" />
					</v-btn>
				</template>
			</v-flex>
		</v-layout>
	</v-card>
</template>

<script>
export default {
	name: 'InviteInfoCard',
	props: {
		infoInvite: {
			type: Object,
			default: () => ({
				created_at: '2019-07-20T16:35:42.147Z',
				is_accepted: null,
				role: 'Guest',
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
	methods: {
		formatTimeEvent(datetime) {
			const parseDate = new Date(datetime);
			const time = parseDate.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
			const date = parseDate.toUTCString().toString().substr(4, 12);
			return `${time} | ${date}`;
		},
		toJointEvent() {
			// ...
			// this.$router.push({ name: 'admin-event', params: { code: this.infoInvite.event.code } });
		},
		emitReponseInvite(res) {
			const emiter = 'response-invited';
			const response = {
				event_id: this.infoInvite.event_id,
				is_accepted: res,
			};
			this.$socket.emit(emiter, response, (data) => {
				console.warn(data);
			});
		},
	},
};
</script>

<style lang="css" scoped>
</style>
