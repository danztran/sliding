<template>
	<v-menu
		class="hidden-xs-only"
		transition="slide-y-transition"
		bottom
		left
		offset-y
		:nudge-width="250"
		content-class="dropdown-menu">
		<template v-slot:activator="{ on }">
			<v-avatar :size="35" class="hover ml-2 hidden-xs-only" v-on="on">
				<v-icon color="white" v-html="'$vuetify.icons.person'"/>
			</v-avatar>
		</template>

		<v-layout
			class="fill-height"
			column>
			<v-card>
				<v-list>
					<v-list-tile>
						<v-list-tile-avatar size="30">
							<v-icon size="20" v-html="'$vuetify.icons.person'" />
						</v-list-tile-avatar>

						<v-list-tile-content>
							<div class="body-1 text-capitalize">
								{{ user.name }}
							</div>
							<div class="caption grey--text">
								{{ user.email }}
							</div>
						</v-list-tile-content>

						<v-list-tile-action>
							<v-btn icon>
								<span class="primary--text">EDIT</span>
							</v-btn>
						</v-list-tile-action>
					</v-list-tile>
				</v-list>
				<v-divider></v-divider>

				<v-list class="pa-0">
					<!-- HOMEPAGE -->
					<v-list-tile to="/">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="secondary"
								size="20"
								v-html="'$vuetify.icons.home'">
							</v-icon>
						</v-list-tile-action>

						<v-list-tile-title v-t="'home-page'"/>
					</v-list-tile>

					<!-- EVENTS -->
					<v-list-tile to="/dashboard/my-events">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="primary"
								size="20"
								v-html="'$vuetify.icons.event'">
							</v-icon>
						</v-list-tile-action>

						<v-list-tile-title v-t="'my-events'"/>
					</v-list-tile>

					<!-- MODAL CREATE EVENT -->
					<v-list-tile @click="toggleModalCreateEvent">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="yellow"
								size="20"
								v-html="'$vuetify.icons.add'">
							</v-icon>
						</v-list-tile-action>

						<v-list-tile-title v-t="'btn-create-event'"/>
					</v-list-tile>

					<!-- COOP EVENT -->
					<v-list-tile to="/dashboard/coop-events">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="success"
								size="20"
								v-html="'$vuetify.icons.person'">
							</v-icon>
						</v-list-tile-action>

						<v-list-tile-title v-t="'coop-events'"/>
					</v-list-tile>

					<!-- ANALYTICS -->
					<v-list-tile to="/dashboard/activity-logs">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								color="red"
								size="20"
								v-html="'$vuetify.icons.analytics'">
							</v-icon>
						</v-list-tile-action>

						<v-list-tile-title v-t="'activity-logs'"/>
					</v-list-tile>

					<v-divider></v-divider>
					<!-- LOGOUT -->
					<v-list-tile :to="{ name: 'logout' }">
						<v-list-tile-action>
							<v-icon
								class="pl-1"
								size="20"
								v-html="'$vuetify.icons.signout'">
							</v-icon>
						</v-list-tile-action>

						<v-list-tile-title v-t="'logout'"/>
					</v-list-tile>
				</v-list>
			</v-card>
		</v-layout>
	</v-menu>
</template>

<script>
export default {
	name: 'UserActionsAvatar',
	data: () => ({
		user: {
			email: '',
			name: ''
		}
	}),
	created() {
		this.user = this.$cookies.get(this.$env.VUE_APP_CK_USER);
	},
	methods: {
		editProfile() {},
		toggleModalCreateEvent() {
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
