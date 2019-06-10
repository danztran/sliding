<template>
	<div>
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-toolbar color="primary" dark tabs>
			<v-toolbar-side-icon class="hidden-md-and-up" @click="toggleDrawer" />

			<v-toolbar-title class="white--text">
				<v-list-tile-content>
					<span class="body-2">
						<v-icon  size="20" v-html="'$vuetify.icons.user'" />
						{{ user.email }}
					</span>
					<span class="caption text-capitalize">
						{{ user.name }}
					</span>
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
					<v-list dense primary>
						<v-list-tile class="hover">
							<v-list-tile-title v-t="'logout'" @click="callLogout" />
						</v-list-tile>
					</v-list>
				</v-card>
			</v-menu>

			<!-- TAB SLIDER -->
			<template v-slot:extension>
				<v-tabs color="primary">
					<v-tabs-slider color="yellow" />

					<v-tab
						v-for="(tab, i) of tabs"
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
	data() {
		return {
			user: {
				email: '',
				name: ''
			},
			tabs: [
				{ name: 'my-events', url: '/dashboard/my-events' },
				{ name: 'coop-events', url: '/dashboard/coop-events' },
				{ name: 'activity-logs', url: '/dashboard/activity-logs' }
			]
		};
	},
	created() {
		this.user = this.$cookies.get(this.$env.VUE_APP_CK_USER);
		this.tabs.forEach((e) => {
			e.name = this.$t(e.name);
		});
	},
	methods: {
		callLogout() {
			this.$store.dispatch('auth/logout');
		},
		toggleDrawer() {
			this.$root.$emit('toggle-drawer');
		}
	}
};
</script>

<style lang="css" scoped>
.my-toolbar {
	width: 80%;
	left:  10%;
}
.hover {
	cursor: pointer;
	opacity: .8;
}
</style>
