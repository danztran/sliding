<template>
	<v-menu
		class="hidden-xs-only"
		transition="slide-y-transition"
		bottom
		left
		offset-y
		:nudge-width="250"
		content-class="dropdown-menu">
		<!-- @desc: avatar -->
		<template v-slot:activator="{ on }">
			<v-avatar :size="35" class="hover ml-2 hidden-xs-only" v-on="on">
				<v-icon color="white" v-text="'$vuetify.icons.person'" />
			</v-avatar>
		</template>

		<v-layout
			class="fill-height"
			column>
			<v-card>
				<v-list>
					<v-list-tile>
						<v-list-tile-avatar size="30">
							<v-icon size="20" v-text="'$vuetify.icons.person'" />
						</v-list-tile-avatar>

						<v-list-tile-content>
							<div class="body-1 text-capitalize">
								{{ user ? user.name : '' }}
							</div>
							<div class="caption grey--text">
								{{ user ? user.email : '' }}
							</div>
						</v-list-tile-content>

						<v-list-tile-action>
							<v-btn icon>
								<span
									v-t="'btn-edit-profile'"
									class="primary--text" />
							</v-btn>
						</v-list-tile-action>
					</v-list-tile>
				</v-list>
				<v-divider />

				<v-list class="pa-0">
					<!-- @desc: homepage -->
					<v-list-tile to="/">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="secondary"
								size="20"
								v-text="'$vuetify.icons.home'" />
						</v-list-tile-action>

						<v-list-tile-title v-t="'home-page'" />
					</v-list-tile>

					<!-- @desc: event -->
					<v-list-tile to="/dashboard/my-events">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="primary"
								size="20"
								v-text="'$vuetify.icons.event'" />
						</v-list-tile-action>

						<v-list-tile-title v-t="'my-events'" />
					</v-list-tile>

					<!-- @desc: button for toggle diaog create event -->
					<v-list-tile @click="toggleDialogCreateEvent">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="yellow"
								size="20"
								v-text="'$vuetify.icons.add'" />
						</v-list-tile-action>

						<v-list-tile-title v-t="'btn-create-event'" />
					</v-list-tile>

					<!-- @desc: coop-event -->
					<v-list-tile to="/dashboard/coop-events">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="success"
								size="20"
								v-text="'$vuetify.icons.person'" />
						</v-list-tile-action>

						<v-list-tile-title v-t="'coop-events'" />
					</v-list-tile>

					<!-- @desc: analytic activities -->
					<v-list-tile to="/dashboard/activity-logs">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="red"
								size="20"
								v-text="'$vuetify.icons.analytics'" />
						</v-list-tile-action>

						<v-list-tile-title v-t="'activity-logs'" />
					</v-list-tile>

					<v-divider />
					<!-- @desc: logout -->
					<v-list-tile :to="{ name: 'logout' }">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								size="20"
								v-text="'$vuetify.icons.signout'" />
						</v-list-tile-action>

						<v-list-tile-title v-t="'logout'" />
					</v-list-tile>
				</v-list>
			</v-card>
		</v-layout>
	</v-menu>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'UserActionsAvatar',
	data: () => ({}),
	computed: {
		...mapGetters({
			user: 'auth/user'
		})
	},
	methods: {
		editProfile() {},
		toggleDialogCreateEvent() {
			this.$root.$emit('dialog-create-new-event');
		}
	}
};
</script>

<style>
.hover {
	cursor: pointer;
	opacity: .8;
}
</style>
