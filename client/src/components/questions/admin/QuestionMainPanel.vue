<!--
	@desc:
		*including questions posted from the audience
		*if (moderation) on: questions approved by Moderation
	@contains:
		*live/archive tabs in Medium(MD) and up devices
		*for-review(moderation)/live/archive tabs in XS-SM devices
-->
<template>
	<v-layout row wrap>
		<!-- @desc: header: title -- switch moderation mode, sorting-->
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
					v-if="isSMnXS"
					:class="{'new': currentTab !== 0 && reviewQuestions.length}"
					active-class="primary--text font-weight-medium">
					{{ $t('moderation-view-title') }}
				</v-tab>

				<v-tab
					active-class="primary--text font-weight-medium">
					{{ $t('btn-live') }}
				</v-tab>

				<v-tab
					active-class="primary--text font-weight-medium">
					{{ $t('btn-archive') }}
				</v-tab>
			</v-tabs>

			<!-- *actions: search/archive/sort -->
			<div>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn
							v-if="!isSMnXS"
							class="ma-0"
							icon
							v-on="on">
							<v-icon
								color="grey darken-1"
								:size="icon.small"
								v-text="'$vuetify.icons.search'" />
						</v-btn>
					</template>
					<span v-t="'search'" />
				</v-tooltip>

				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn
							v-if="currentTab === 0 && !isSMnXS"
							class="ma-0"
							icon
							v-on="on">
							<v-icon
								color="grey darken-1"
								:size="icon.small"
								v-text="'$vuetify.icons.archive_all'" />
						</v-btn>
					</template>
					<span v-t="'btn-archive-all'" />
				</v-tooltip>

				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="ma-0" icon v-on="on">
							<v-icon
								color="grey darken-1"
								:size="icon.small"
								v-text="'$vuetify.icons.filter'" />
						</v-btn>
					</template>
					<span v-t="'btn-filter'" />
				</v-tooltip>
			</div>
		</v-layout>

		<!-- @desc: tab name -->
		<v-tabs-items v-model="currentTab" class="w-100">
			<!-- @tab: moderation tab in XS-SM -->
			<v-tab-item
				v-if="isSMnXS"
				:transition="false"
				:reverse-transition="false">
				<v-card class="card-wrapper list-scroll scrollbar-primary">
					<empty-state-review v-if="!reviewQuestions.length" />
					<v-layout row wrap>
						<v-flex xs12>
							<question-card--review
								v-for="question of reviewQuestions"
								:key="question.id"
								:question="question" />
						</v-flex>
					</v-layout>
				</v-card>
			</v-tab-item>

			<!-- @tab: live tabs -->
			<v-tab-item
				:transition="false"
				:reverse-transition="false">
				<v-card class="card-wrapper list-scroll scrollbar-primary">
					<empty-state-live v-if="!liveQuestions.length" />
					<v-layout v-else row wrap>
						<v-flex xs12>
							<question-card--live
								v-for="question of liveQuestions"
								:key="question.id"
								:question="question" />
						</v-flex>
					</v-layout>
				</v-card>
			</v-tab-item>

			<!-- @tab: archive tab -->
			<v-tab-item
				:transition="false"
				:reverse-transition="false">
				<v-card class="card-wrapper list-scroll scrollbar-primary">
					<empty-state-archived v-if="!archivedQuestions.length" />
					<v-layout v-else row wrap>
						<v-flex xs12>
							<question-card--archived
								v-for="question of archivedQuestions"
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
import EmptyLive from './EmptyLiveQuestion.vue';
import EmptyReview from './EmptyReviewQuestion.vue';
import EmptyArchived from './EmptyArchivedQuestion.vue';
import LiveQuestionCard from './LiveQuestionCard.vue';
import ReviewQuestionCard from './ReviewQuestionCard.vue';
import ArchivedQuestionCard from './ArchivedQuestionCard.vue';

export default {
	name: 'QuestionMainPanel',
	components: {
		'empty-state-review': EmptyReview,
		'empty-state-live': EmptyLive,
		'empty-state-archived': EmptyArchived,
		'question-card--live': LiveQuestionCard,
		'question-card--review': ReviewQuestionCard,
		'question-card--archived': ArchivedQuestionCard
	},
	data: () => ({
		currentTab: null,
		icon: {
			xsSmall: 17,
			small: 20
		}
	}),
	computed: {
		...mapGetters({
			onModeration: 'admin/event/onModeration',
			reviewQuestions: 'admin/questions/getReviewQuestions',
			liveQuestions: 'admin/questions/getLiveQuestions',
			archivedQuestions: 'admin/questions/getArchivedQuestions'
		})
	}
};
</script>

<style lang="scss">
$color-noti: #e54731;
.v-tabs__div.new {
    position: relative;
    a.v-tabs__item::before {
		content: '*';
		position: absolute;
		top: 0;
		right: 0;
		color: $color-noti;
	}
}
</style>
