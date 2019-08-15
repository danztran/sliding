<template>
	<div id="guest-navbar">
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-toolbar
			class="pa-0"
			dark
			fixed
			clipped-left
			color="primary">
			<v-container
				:class="{'pa-0': isSMnXS}"
				fluid
				grid-list
				ma-0
				py-0
				px-1>
				<v-layout
					row
					align-center
					justify-space-between
					fill-height>
					<v-flex sm4>
						<v-toolbar-side-icon @click="toggleDrawer" />
						<div class="d-inline subheading font-weight-medium">
							{{ eventInfo ? eventInfo.name : '...' }}
						</div>
					</v-flex>

					<v-flex sm4 class="hidden-sm-and-down">
						<v-tabs
							color="primary"
							dark
							centered
							slider-color="white">
							<!-- *Question -->
							<v-tab
								:to="{ name: 'guest-questions' }"
								class="font-weight-regular"
								active-class="white--text font-weight-medium">
								<span v-t="'questions'" class="first-letter-uppercase" />
							</v-tab>

							<!-- *Polls -->
							<v-tab
								:to="{ name: 'guest-polls' }"
								class="font-weight-regular"
								active-class="white--text font-weight-medium">
								<span v-t="'polls'" class="first-letter-uppercase" />
							</v-tab>
						</v-tabs>
					</v-flex>

					<v-flex
						v-if="userActive"
						sm4
						class="right">
						<actions-avatar--user />
					</v-flex>
					<v-flex
						v-else
						sm4
						class="right">
						<v-btn
							icon
							@click="toggleDialogProfile">
							<v-icon v-text="'$vuetify.icons.person'" />
						</v-btn>
					</v-flex>
				</v-layout>
			</v-container>
		</v-toolbar>
		<v-tabs
			v-if="isSMnXS"
			class="mt-5"
			color="primary"
			centered
			dark
			slider-color="white">
			<!-- *Question -->
			<v-tab
				:to="{ name: 'guest-questions' }"
				class="font-weight-regular"
				active-class="white--text font-weight-medium">
				<span v-t="'questions'" class="first-letter-uppercase" />
			</v-tab>

			<!-- *Polls -->
			<v-tab
				:to="{ name: 'guest-polls' }"
				class="font-weight-regular"
				active-class="white--text font-weight-medium">
				<span v-t="'polls'" class="first-letter-uppercase" />
			</v-tab>
		</v-tabs>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserActionsAvatar from '@/components/user/UserActionsAvatar.vue';

export default {
	name: 'NavBar',
	components: {
		'actions-avatar--user': UserActionsAvatar,
	},
	computed: {
		...mapGetters({
			eventInfo: 'guest/event/getEventInfo',
			user: 'auth/user',
		}),
		userActive() {
			if (this.user && this.user.email !== null) {
				return true;
			}
			return false;
		},
	},
	methods: {
		toggleDrawer() {
			this.$root.$emit('toggle-guest-drawer');
		},
		toggleDialogProfile() {
			this.$root.$emit('guest-signup-dialog');
		},
	},
};
</script>

<style lang="scss">
#guest-navbar {
	.right {
		text-align: right;
	}
	.v-toolbar__content {
		padding: 0;
		height: 54px !important;
		.v-tabs__container {
			height: 54px !important;
		}
		.v-tabs__item {
			opacity: 1;
		}
	}
	@media only screen and (max-width: 960px) {
		.v-toolbar {
			height: 48px;
			.v-toolbar__content {
				padding: 0;
				height: 48px;
				.v-tabs__container {
					height: 48px;
				}
			}
		}
	}
}
</style>
