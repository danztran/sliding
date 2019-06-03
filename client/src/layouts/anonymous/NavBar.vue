<template>
	<div>
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-toolbar dark color="primary" style="height: 58px">
			<v-container fluid grid-list py-0>
				<v-layout row justify-space-between>
					<v-flex sm4>
						<v-toolbar-side-icon />
						<div class="inline subheading font-weight-regular">Title</div>
					</v-flex>

					<v-flex sm4 class="hidden-sm-and-down">
						<v-tabs
							color="primary"
							centered
							dark
							slider-color="error">
							<v-tab
								v-for="(tab, i) in tabs"
								:key="i"
								:to="tab.url">
								{{ tab.name }}
							</v-tab>
						</v-tabs>
					</v-flex>

					<v-flex sm4 class="right">
						<v-btn icon>
							<v-icon v-html="'$vuetify.icons.anonymous'"/>
						</v-btn>
					</v-flex>

				</v-layout>
			</v-container>
		</v-toolbar>
		<v-tabs
			color="primary hidden-md-and-up"
			centered
			dark
			slider-color="error">
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
			{ name: 'questions', url: '/anonymous/questions' },
			{ name: 'ideas', url: '/anonymous/ideas' },
			{ name: 'polls', url: '/anonymous/polls' }
		]
	})
};
</script>

<style lang="css" scoped>
.inline {
	display: inline;
}
.right {
	text-align: right;
}
</style>
