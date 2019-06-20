<template>
	<div id="guest-navbar">
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-toolbar
			class="pa-0"
			dark
			color="primary"
			style="height: 58px">
			<v-container
				:class="{'pa-0': isSMnXS}"
				fluid
				grid-list
				py-0>
				<v-layout
					row
					align-center
					justify-space-between
					fill-height>
					<v-flex sm4>
						<v-toolbar-side-icon />
						<div class="d-inline subheading font-weight-medium">
							event name
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

					<v-flex sm4 class="right">
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
export default {
	name: 'NavBar',
	data: () => ({
		tabs: [
			{ name: 'questions', url: 'questions' },
			{ name: 'ideas', url: 'polls' },
			{ name: 'polls', url: 'ideas' }
		]
	}),
	computed: {
		isSMnXS() {
			return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
		}
	},
	methods: {
		toggleDialogProfile() {
			this.$root.$emit('guest-profile-dialog');
		}
	}
};
</script>

<style lang="scss">
#guest-navbar {
	.right {
		text-align: right;
	}
	.v-toolbar__content {
		padding: 0;
	}
	@media only screen and (max-width: 960px) {
		.v-toolbar__content {
			padding: 0;
		}
	}
}
</style>
