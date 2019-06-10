<template>
	<div>
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-toolbar color="primary" dark tabs>
			<v-toolbar-side-icon class="hidden-md-and-up" @click="toggleDrawer" />

			<v-list-tile>
				<v-list-tile-avatar size="35" color="white">
					<router-link to="/dashboard/my-events" class="no-underline">
						<v-icon color="primary" v-html="'$vuetify.icons.arrow-left'"></v-icon>
					</router-link>
				</v-list-tile-avatar>

				<v-list-tile-content>
					<span class="body-2">
						{{ loading ? eventInfo.name : 'loading' }}
					</span>
					<span class="caption text-uppercase">
						{{ loading ? eventInfo.code : 'loading' }}
					</span>
				</v-list-tile-content>
			</v-list-tile>

			<v-spacer></v-spacer>

			<v-menu
				transition="slide-y-transition"
				bottom
				left
				offset-y
				content-class="dropdown-menu">
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
import { mapGetters } from 'vuex';
export default {
	name: 'NavBar',
	data: () => ({
		date: '',
		loading: false,
		tabs: [
			{ name: 'questions', url: 'questions' },
			{ name: 'polls', url: 'polls' },
			{ name: 'ideas', url: 'ideas' },
			{ name: 'analytics', url: 'analytics' }
		]
	}),
	computed: {
		...mapGetters({
			eventInfo: 'event/infoCurrentEvent'
		})
	},
	watch: {
		eventInfo(val) {
			this.loading = true;
		}
	},
	created() {
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

<style>
</style>
