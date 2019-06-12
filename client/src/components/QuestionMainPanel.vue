<template>
	<v-layout row wrap>
		<!-- HEADER -->
		<v-layout
			class="px-3 pt-1"
			align-center
			justify-space-between
			row
			fill-height>
			<v-tabs
				v-model="currentTab"
				color="transparent"
				slider-color="primary"
				right>
				<v-tab
					active-class="primary--text font-weight-medium">
					{{ $t('btn-live') }}
				</v-tab>

				<v-tab
					active-class="primary--text font-weight-medium">
					{{ $t('btn-archive') }}
				</v-tab>
			</v-tabs>

			<!-- ACTIONS SORT/SEARCH/ -->
			<div>
				<v-btn class="ma-0" icon>
					<v-icon
						color="grey darken-1"
						:size="icon.small"
						v-html="'$vuetify.icons.search'">
					</v-icon>
				</v-btn>

				<v-btn class="ma-0" icon>
					<v-icon
						color="grey darken-1"
						:size="icon.small"
						v-html="'$vuetify.icons.archive_all'">
					</v-icon>
				</v-btn>

				<v-btn class="ma-0" icon>
					<v-icon
						color="grey darken-1"
						:size="icon.small"
						v-html="'$vuetify.icons.filter'">
					</v-icon>
				</v-btn>
			</div>
		</v-layout>

		<!-- CONTENT -->
		<v-tabs-items v-model="currentTab">
			<v-tab-item
				:transition="false"
				:reverse-transition="false">
				<v-card class="w-100 card-parent list-scroll scrollbar-primary">
					<v-layout row wrap>
						<v-flex xs12>
							<!-- CARD MESSAGE PASSING HERE -->
							<slot name="live-tab"></slot>
						</v-flex>
					</v-layout>
				</v-card>
			</v-tab-item>

			<v-tab-item
				:transition="false"
				:reverse-transition="false">
				<v-card class="w-100 card-parent list-scroll scrollbar-primary">
					<v-layout row wrap>
						<v-flex xs12>
							<slot name="archive-tab"></slot>
						</v-flex>
					</v-layout>
				</v-card>
			</v-tab-item>
		</v-tabs-items>

	</v-layout>
</template>

<script>
export default {
	name: 'QuestionMainPanel',
	data: () => ({
		onModerator: false,
		currentTab: null,
		icon: {
			xsSmall: 17,
			small: 20
		}
	}),
	methods: {
		replyQuestion() {
			this.$root.$emit('dialog-reply-question');
		}
	}
};
</script>

<style>
</style>
