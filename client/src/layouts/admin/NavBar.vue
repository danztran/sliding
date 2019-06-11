<template>
	<div>
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-toolbar color="primary" dark tabs>
			<v-layout align-center justify-space-between row fill-height>
				<v-toolbar-side-icon
					v-if="hiddenXS"
					@click="toggleDrawer" />

				<v-list-tile>
					<v-list-tile-avatar v-if="!hiddenXS" size="35" color="white">
						<router-link to="/dashboard/my-events" class="no-underline pt-1">
							<v-icon size="25" color="primary" v-html="'$vuetify.icons.arrow-left'"></v-icon>
						</router-link>
					</v-list-tile-avatar>

					<v-list-tile-content>
						<div class="body-2">
							{{ loading ? eventInfo.name : 'loading' }}
						</div>
						<div
							class="caption text-uppercase hidden-xs-only">
							{{ loading ? eventInfo.code : 'loading' }}
						</div>
					</v-list-tile-content>
				</v-list-tile>

				<v-spacer class="hidden-xs-only" />
				<v-list-tile>
					<div></div>
				</v-list-tile>

				<!-- USER DROPDOWN ACTIONS -->
				<user-actions-avatar />
			</v-layout>

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
import UserActionsAvatar from '@/components/UserActionsAvatar.vue';

export default {
	name: 'NavBar',
	components: {
		'user-actions-avatar': UserActionsAvatar
	},
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
		hiddenXS() {
			return this.$vuetify.breakpoint.xs;
		},
		...mapGetters({
			eventInfo: 'admin/infoCurrentEvent'
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
