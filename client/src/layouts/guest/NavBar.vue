<template>
	<div id="guest-navbar">
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-toolbar
			class="pa-0"
			dark
			fixed
			color="primary">
			<v-container
				:class="{'pa-0': isSMnXS}"
				fluid
				grid-list
				py-0
				mt-0
				mb-0>
				<v-layout
					row
					align-center
					justify-space-between
					fill-height>
					<v-flex sm4>
						<v-toolbar-side-icon />
						<div class="d-inline subheading font-weight-medium">
							{{ eventInfo.name }}
						</div>
					</v-flex>

					<v-flex sm4 class="hidden-sm-and-down">
						<v-tabs
							color="primary"
							dark
							centered
							slider-color="white">
							<v-tab
								v-for="(tab, i) in tabs"
								:key="i"
								:to="tab.url">
								{{ tab.name }}
							</v-tab>
						</v-tabs>
					</v-flex>

					<v-flex
						v-if="user && user.email !== null"
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
			color="primary hidden-md-and-up"
			centered
			dark
			slider-color="white">
			<v-tab
				v-for="(tab, i) in tabs"
				:key="i"
				:to="tab.url">
				{{ tab.name }}
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
	data: () => ({
		tabs: [
			{ name: 'questions', url: 'questions' },
			{ name: 'ideas', url: 'polls' },
			{ name: 'polls', url: 'ideas' },
		],
	}),
	computed: {
		...mapGetters({
			eventInfo: 'guest/event/getEventInfo',
			user: 'auth/user',
		}),
	},
	created() {
		this.tabs.forEach((e) => {
			e.name = this.$t(e.name);
		});
	},
	methods: {
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
