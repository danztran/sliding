<template>
	<div>
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-toolbar color="primary" dark tabs>
			<v-toolbar-side-icon class="hidden-md-and-up" @click="toggleDrawer" />

			<v-toolbar-title class="white--text">
				<v-list-tile-content>
					<span class="body-2">
						<v-icon  size="20" v-html="'$vuetify.icons.user'" />
						{{ user.username }}
					</span>
					<span class="caption">{{ user.rule }}</span>
				</v-list-tile-content>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-text-field
				flat
				solo-inverted
				:prepend-inner-icon="'$vuetify.icons.search'"
				:label="$t('search')"
				class="hidden-sm-and-down mt-2 pr-3">
			</v-text-field>

			<v-menu
				transition="slide-y-transition"
				bottom
				left
				offset-y
				content-class="dropdown-menu"
				class="hidden-md-and-down">
				<template v-slot:activator="{ on }">
					<v-avatar :size="35" class="hover" v-on="on">
						<img
							src="https://cdn.vuetifyjs.com/images/john.jpg"
							alt="John">
					</v-avatar>
				</template>

				<v-card>
					<v-list dense>
						<v-list-tile
							v-for="notification in notifications"
							:key="notification">
							<v-list-tile-title v-text="notification" color="primary"/>
						</v-list-tile>
					</v-list>
				</v-card>
			</v-menu>

			<!-- TAB SLIDER -->
			<template v-slot:extension>
				<v-tabs color="primary">
					<v-tabs-slider color="yellow" />

					<v-tab
						v-for="(tab, i) in tabs"
						:key="i"
						fixed-tabs
						:to="tab.url">
						{{ tab.name }}
					</v-tab>
				</v-tabs>
			</template>
		</v-toolbar>
	</div>

</template>

<script>
export default {
	components: {},
	data() {
		return {
			user: {
				username: 'administrator@gmail.com',
				rule: 'Administrator'
			},
			notifications: [
				'You have 5 new tasks',
				'You\'re now a friend with Andrew',
				'Another Notification',
				'Another One'
			],
			tabs: [
				{ name: 'events', url: '/admin/events' },
				{ name: 'team', url: '/admin/team' },
				{ name: 'analytics', url: '/admin/analytics' }
			]
		};
	},
	methods: {
		toggleDrawer() {
			this.$root.$emit('toggle-drawer');
		}
	}
};
</script>

<style lang="css">
.my-toolbar {
	width: 80%;
	left:  10%;
}
.hover {
	cursor: pointer;
	opacity: .8;
}
</style>
