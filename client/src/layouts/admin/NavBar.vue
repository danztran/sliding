<template>
	<div>
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-toolbar
			dark
			color="primary"
			tabs>
			<v-layout
				row
				align-center
				justify-space-between
				fill-height>
				<v-toolbar-side-icon
					v-if="isXS"
					@click="toggleDrawer" />

				<v-list-tile>
					<v-list-tile-avatar
						v-if="!isXS"
						size="35"
						color="white">
						<router-link
							id="btn-back"
							to="/dashboard/my-events"
							class="no-underline pt-1">
							<v-icon
								size="25"
								color="primary"
								v-text="'$vuetify.icons.arrow_left'" />
						</router-link>
					</v-list-tile-avatar>

					<v-list-tile-content>
						<div class="subheading text-capitalize font-weight-medium">
							{{ eventInfo ? eventInfo.name : '...' }}
						</div>
						<div
							class="caption text-uppercase hidden-xs-only">
							{{ eventInfo ? `#${eventInfo.code}` : '...' }}
						</div>
					</v-list-tile-content>
				</v-list-tile>

				<v-spacer class="hidden-xs-only" />
				<v-list-tile>
					<div />
				</v-list-tile>

				<!-- USER DROPDOWN ACTIONS -->
				<user-actions-avatar />
			</v-layout>

			<!-- TAB SLIDER -->
			<template v-slot:extension>
				<v-tabs
					light
					color="white">
					<v-tabs-slider color="primary" />

					<v-tab
						v-for="(tab, i) of tabs"
						:key="i"
						:to="tab.url"
						class="font-weight-medium"
						active-class="primary--text font-weight-bold">
						{{ tab.name }}
					</v-tab>
				</v-tabs>

				<v-btn icon @click="toggleEventSettingDialog">
					<v-icon
						size="17"
						color="grey darken-1"
						v-text="'$vuetify.icons.setting'" />
				</v-btn>
			</template>
		</v-toolbar>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserActionsAvatar from '@/components/user/UserActionsAvatar.vue';

export default {
	name: 'NavBar',
	components: {
		'user-actions-avatar': UserActionsAvatar,
	},
	data: () => ({
		date: '',
		tabs: [
			{ name: 'questions', url: 'questions' },
			{ name: 'polls', url: 'polls' },
			{ name: 'ideas', url: 'ideas' },
			{ name: 'analytics', url: 'analytics' },
		],
	}),
	computed: {
		...mapGetters({
			eventInfo: 'admin/event/getEventInfo',
		}),
	},
	created() {
		this.tabs.forEach((e) => {
			e.name = this.$t(e.name);
		});
	},
	methods: {
		toggleDrawer() {
			this.$root.$emit('toggle-drawer');
		},
		toggleEventSettingDialog() {
			this.$root.$emit('toggle-event-setting');
		},
	},
};
</script>

<style scoped>
#btn-back {
	width: 25px;
	height: 25px;
	margin-right: 2px;
	padding: 0 !important;
}
</style>
