<template>
	<v-card
		class="no-shadow hover-pointer mb-1">
		<v-list two-line dense class="pa-0 invite-card-info">
			<v-list-tile>
				<v-list-tile-avatar
					class="ml-1"
					size="23"
					color="grey lighten-2">
					<v-icon
						size="15"
						color="white"
						v-text="'$vuetify.icons.person'" />
				</v-list-tile-avatar>

				<!-- *info: mail, role -->
				<v-list-tile-content>
					<v-list-tile-title>
						{{ info.email }}
						<span class="grey--text text-lowercase">
							-	{{ info.is_accepted === null ?
								$t('invite-pending')
								: info.is_accepted === true
									? $t('invite-accepted')
									: $t('invite-rejected') }}
						</span>
					</v-list-tile-title>
					<v-list-tile-sub-title class="first-letter-uppercase">
						{{ info.role }}
					</v-list-tile-sub-title>
				</v-list-tile-content>

				<v-list-tile-action>
					<v-menu
						bottom
						nudge-bottom="5"
						offset-y
						left>
						<template v-slot:activator="{ on }">
							<v-btn
								icon
								small
								v-on="on">
								<v-icon color="grey lighten-1" v-text="'$vuetify.icons.more_vert'" />
							</v-btn>
						</template>
						<v-list dense>
							<!-- *revoke invite request -->
							<v-list-tile @click="removeAccess">
								<v-list-tile-title v-t="'btn-revoke-access'" />
							</v-list-tile>

							<!-- *resend invite request -->
							<v-list-tile @click="resendRequest">
								<v-list-tile-title v-t="'btn-resend-invite'" />
							</v-list-tile>
						</v-list>
					</v-menu>
				</v-list-tile-action>
			</v-list-tile>
		</v-list>
		<v-divider inset />
	</v-card>
</template>

<script>
export default {
	name: 'InviteInfoCard',
	props: {
		info: {
			type: Object,
			default: () => ({
				email: '...',
				role: 'Moderator',
				name: '',
				is_accepted: null,
			}),
		},
	},
	methods: {
		removeAccess() {
			this.$emit('remove-moderator');
		},
		resendRequest() {
			// ...
		},
	},
};
</script>

<style lang="scss">
.invite-card-info {
	.v-list__tile {
		padding-left: 0;
		height: 6vh;
		.v-list__tile__avatar {
			min-width: 35px;
		}
	}
}
</style>
