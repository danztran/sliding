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

				<!-- *Search events -->
				<v-text-field
					v-if="!isXS"
					class="pt-2"
					flat
					solo-inverted
					:prepend-inner-icon="'$vuetify.icons.search'"
					:label="$t('search')" />

				<v-list-tile class="hidden-sm-and-up">
					<v-icon
						color="whilte"
						size="20"
						v-text="'$vuetify.icons.search'" />
				</v-list-tile>

				<user-actions-avatar v-if="!isXS" />
			</v-layout>

			<!-- TAB SLIDER -->
			<template v-slot:extension>
				<v-tabs
					v-model="activeTab"
					light
					color="white">
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

					<!-- *Activity-logs -->
					<v-tab
						:to="{ 'name': 'activity-logs' }"
						fixed-tabs
						class="font-weight-regular"
						active-class="primary--text font-weight-bold">
						<span v-t="'activity-logs'" class="first-letter-uppercase" />
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

<style lang="css" scoped>
.my-toolbar {
	width: 80%;
	left:  10%;
}
</style>
