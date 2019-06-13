<template>
	<div>
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-toolbar color="primary" dark tabs>
			<v-layout align-center justify-space-between row fill-height>
				<v-toolbar-side-icon
					v-if="$vuetify.breakpoint.xs"
					@click="toggleDrawer" />

				<v-toolbar-title class="white--text ml-0">
					<v-list-tile-content>
						<div class="hidden-xs-only">
							<div class="body-2">
								<v-icon  size="20" v-html="'$vuetify.icons.user'" />
								{{ user.email }}
							</div>
							<div class="caption text-capitalize">
								{{ user.name }}
							</div>
						</div>
						<div v-if="$vuetify.breakpoint.xs" class="text-xs-center">
							Tabname
						</div>
					</v-list-tile-content>
				</v-toolbar-title>

				<v-spacer class="hidden-xs-only"/>

				<v-text-field
					v-if="!hiddenXS"
					flat
					solo-inverted
					:prepend-inner-icon="'$vuetify.icons.search'"
					:label="$t('search')">
				</v-text-field>

				<v-list-tile class="hidden-sm-and-up">
					<v-icon
						color="whilte"
						size="20">
						search
					</v-icon>
				</v-list-tile>

				<user-actions-avatar />
			</v-layout>

			<!-- TAB SLIDER -->
			<template v-slot:extension>
				<v-tabs
					v-if="!hiddenXS"
					v-model="activeTab"
					light
					color="white">
					<v-tabs-slider color="primary" />

					<v-tab
						v-for="(tab) of tabs"
						:key="tab.id"
						:to="tab.url"
						fixed-tabs
						class="font-weight-medium"
						active-class="primary--text font-weight-bold">
						{{ tab.name }}
					</v-tab>
				</v-tabs>
			</template>
		</v-toolbar>
	</div>
</template>

<script>
import UserActionsAvatar from '@/components/UserActionsAvatar.vue';

export default {
	components: {
		'user-actions-avatar': UserActionsAvatar
	},
	data() {
		return {
			user: {
				email: '',
				name: ''
			},
			tabs: [
				{ id: 1, name: 'my-events', url: '/dashboard/my-events' },
				{ id: 2, name: 'coop-events', url: '/dashboard/coop-events' },
				{ id: 3, name: 'activity-logs', url: '/dashboard/activity-logs' }
			],
			activeTab: '',
			actions: [
				{
					id: 1,
					name: 'logout',
					icon: 'signout',
					func: 'callLogout'
				}
			]
		};
	},
	computed: {
		hiddenXS() {
			return this.$vuetify.breakpoint.xs;
		}
	},
	created() {
		this.user = this.$cookies.get(this.$env.VUE_APP_CK_USER);
		this.tabs.forEach((e) => {
			e.name = this.$t(e.name);
		});
	},
	methods: {
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
</style>
