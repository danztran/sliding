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

				<v-toolbar-title class="white--text ml-0">
					<v-list-tile-content>
						<div class="hidden-xs-only">
							<div class="body-2">
								<v-icon size="20" v-text="'$vuetify.icons.user'" />
								<!-- {{ user ? user.email : '' }} -->
								{{ user.email !== null ? user.email : $t('anonymous-empty-email') }}
							</div>
							<div class="caption text-capitalize">
								{{ user ? user.name : '' }}
							</div>
						</div>
						<div v-if="isXS" class="text-xs-center">
							Sliding
						</div>
					</v-list-tile-content>
				</v-toolbar-title>

				<v-spacer class="hidden-xs-only" />

				<v-list-tile class="no-padding">
					<user-actions-avatar />
				</v-list-tile>
			</v-layout>

			<!-- TAB SLIDER -->
			<template v-slot:extension>
				<v-tabs
					v-model="activeTab"
					light
					color="white"
					:grow="isSMnXS">
					<v-tabs-slider color="primary" />

					<!-- *My events -->
					<v-tab
						:to="{ 'name': 'my-events' }"
						fixed-tabs
						class="font-weight-regular"
						active-class="primary--text font-weight-bold">
						<span v-t="'my-events'" class="first-letter-uppercase" />
					</v-tab>

					<!-- *Coop events -->
					<v-tab
						:to="{ 'name': 'coop-events' }"
						fixed-tabs
						class="font-weight-regular"
						active-class="primary--text font-weight-bold">
						<span v-t="'coop-events'" class="first-letter-uppercase" />
					</v-tab>
				</v-tabs>
			</template>
		</v-toolbar>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserActionsAvatar from '@/components/user/UserActionsAvatar.vue';

export default {
	components: {
		'user-actions-avatar': UserActionsAvatar,
	},
	data() {
		return {
			activeTab: null,
		};
	},
	computed: {
		...mapGetters({
			user: 'auth/user',
		}),
	},
	methods: {
		toggleDrawer() {
			this.$root.$emit('toggle-drawer');
		},
	},
};
</script>

<style lang="scss">
.my-toolbar {
	width: 80%;
	left:  10%;
}
.no-padding .v-list__tile {
	padding: 0 !important;
}
</style>
