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
							:to="{ name: 'my-events' }"
							class="no-underline pt-1">
							<v-icon
								size="25"
								color="primary"
								v-text="'$vuetify.icons.arrow_left'" />
						</router-link>
					</v-list-tile-avatar>

					<v-list-tile-content>
						<div class="subheading font-weight-medium">
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
					<v-icon
						v-if="isXS && hostOnly"
						size="17"
						color="white"
						@click="toggleEventSettingDialog"
						v-text="'$vuetify.icons.setting'" />
					<div v-else />
				</v-list-tile>

				<!-- USER DROPDOWN ACTIONS -->
				<user-actions-avatar v-if="!isXS" />
			</v-layout>

			<!-- TAB SLIDER -->
			<template v-slot:extension>
				<v-tabs
					light
					color="white">
					<v-tabs-slider color="primary" />

					<!-- *Questions -->
					<v-tab
						:to="{ name: 'admin-questions' }"
						class="font-weight-regular"
						active-class="primary--text font-weight-bold">
						<span v-t="'questions'" class="first-letter-uppercase" />
					</v-tab>

					<!-- *Polls -->
					<v-tab
						:to="{ name: 'admin-polls' }"
						class="font-weight-regular"
						active-class="primary--text font-weight-bold">
						<span v-t="'polls'" class="first-letter-uppercase" />
					</v-tab>

					<!-- *analytics -->
					<v-tab
						v-if="hostOnly"
						:to="{ name: 'admin-analytics' }"
						class="font-weight-regular"
						active-class="primary--text font-weight-bold">
						<span v-t="'analytics'" class="first-letter-uppercase" />
					</v-tab>
				</v-tabs>

				<!-- *qrcode -->
				<v-btn
					v-if="!isXS"
					class="mr-1"
					icon
					@click="toggleDialogQRCode">
					<img :src="require('@/assets/qrcode.svg')">
				</v-btn>

				<!-- *event setting -->
				<v-btn
					v-if="!isXS && hostOnly"
					class="mr-1"
					icon
					@click="toggleEventSettingDialog">
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
	}),
	computed: {
		...mapGetters({
			eventInfo: 'admin/event/getEventInfo',
			eventRole: 'admin/event/getRole',
		}),
		hostOnly() {
			if (this.eventRole && this.eventRole.name !== undefined && this.eventRole.name === 'host') {
				return true;
			}
			return false;
		},
	},
	methods: {
		toggleDrawer() {
			this.$root.$emit('toggle-drawer');
		},
		toggleEventSettingDialog() {
			this.$root.$emit('toggle-event-setting');
		},
		toggleDialogQRCode() {
			this.$root.$emit('dialog-qrcode', this.eventInfo.code);
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
