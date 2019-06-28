<template>
	<v-layout
		id="guest-tabs"
		row
		wrap>
		<!-- @desc: header: tab title - count questions -->
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

			<!-- @desc: count questions alive -->
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
			<!-- @tab:  popular -->
			<v-tab-item
				:transition="false"
				:reverse-transition="false">
				<v-card class="guest-list-scroll scrollbar-primary">
					<v-layout row wrap>
						<v-flex xs12>
							<question-card
								v-for="question in popularQuestions"
								:key="question.id"
								:question="question" />
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
							<question-card
								v-for="question in recentQuestions"
								:key="question.id"
								:question="question" />
						</v-flex>
					</v-layout>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import QuestionCard from './QuestionCard.vue';

export default {
	name: 'QuestionTabs',
	components: {
		'question-card': QuestionCard
	},
	data: () => ({
		currentTab: null
	}),
	computed: {
		...mapGetters({
			questions: 'guest/questions/getQuestions',
			popularQuestions: 'guest/questions/getPopularQuestions',
			recentQuestions: 'guest/questions/getRecentQuestions'
		})
	}
};
</script>

<style lang="scss">
	#guest-tabs {
		.guest-list-scroll {
			overflow-y: auto;
			scroll-behavior: smooth;
			box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
			-webkit-box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
			-webkit-overflow-scrolling: touch;
		}
	}
</style>
