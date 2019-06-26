<template>
	<v-layout
		id="guest-tabs"
		row
		wrap>
		<!-- @desc: header: tab title - count question -->
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
					class="text-capitalize"
					active-class="primary--text font-weight-medium">
					{{ $t('popular') }}
				</v-tab>

				<v-tab
					class="text-capitalize"
					active-class="primary--text font-weight-medium">
					{{ $t('recent') }}
				</v-tab>
			</v-tabs>

			<!-- @desc: count question -->
			<div>
				<span class="grey--text body-1">
					<span>
						{{ questions.length }}
					</span>
					<span v-t="'recent-count-question-title'" class="text-lowercase" />
				</span>
			</div>
		</v-layout>

		<v-tabs-items v-model="currentTab" class="w-100">
			<!-- @tab:  live tab-->
			<v-tab-item
				:transition="false"
				:reverse-transition="false">
				<v-card class="guest-list-scroll scrollbar-primary">
					<v-layout row wrap>
						<v-flex xs12>
							<slot name="popular-tab" />
						</v-flex>
					</v-layout>
				</v-card>
			</v-tab-item>

			<!-- @tab: recent -->
			<v-tab-item
				:transition="false"
				:reverse-transition="false">
				<v-card
					class="guest-list-scroll scrollbar-primary">
					<v-layout row wrap>
						<v-flex xs12>
							<slot name="recent-tab" />
						</v-flex>
					</v-layout>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'QuestionTabs',
	data: () => ({
		currentTab: null
	}),
	computed: {
		...mapGetters({
			questions: 'guest/questions/getQuestions'
		})
	}
};
</script>

<style lang="scss">
#guest-tabs {
	.guest-list-scroll {
		height: 65vh;
		overflow-y: scroll;
		scroll-behavior: smooth;
	}
}
</style>
