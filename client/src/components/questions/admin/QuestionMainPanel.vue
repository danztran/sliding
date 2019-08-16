<template>
	<v-layout row wrap>
		<!-- moderator mode - sorting -->
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
					class="font-weight-regular"
					active-class="primary--text font-weight-medium">
					<span v-t="'moderation-view-title'" class="first-letter-uppercase" />
				</v-tab>

				<v-tab
					class="font-weight-regular"
					active-class="primary--text font-weight-medium">
					<span v-t="'btn-live'" class="first-letter-uppercase" />
				</v-tab>

				<v-tab
					class="font-weight-regular"
					active-class="primary--text font-weight-medium">
					<span v-t="'btn-archive'" class="first-letter-uppercase" />
				</v-tab>
			</v-tabs>

			<!--  -->
			<div>
				<v-chip id="users-online" small label color="primary" text-color="white">
					<span class="font-weight-bold">
						{{ onlineUsers }}
					</span>
					<v-icon small right v-text="'$vuetify.icons.group_people'" />
				</v-chip>
			</div>
		</v-layout>

		<v-tabs-items v-model="currentTab" class="w-100">
			<!-- moderation tab in XS-SM -->
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

			<!-- live tab -->
			<v-tab-item
				:transition="false"
				:reverse-transition="false">
				<v-card class="card-wrapper list-scroll scrollbar-primary">
					<empty-state-live v-if="!liveQuestions.length" />
					<v-layout v-else row wrap>
						<v-flex xs12>
							<question-card--live
								v-for="question of livePinnedQuestions"
								:key="question.id"
								:question="question" />
							<question-card--live
								v-for="question of liveOtherQuestions"
								:key="question.id"
								:question="question" />
						</v-flex>
					</v-layout>
				</v-card>
			</v-tab-item>

			<!-- archive tab -->
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
		'question-card--archived': ArchivedQuestionCard,
	},
	data: () => ({
		currentTab: null,
		icon: {
			xsSmall: 17,
			small: 20,
		},
	}),
	computed: {
		...mapGetters({
			onModeration: 'admin/event/onModeration',
			onlineUsers: 'admin/event/getOnlineUsers',
			reviewQuestions: 'admin/questions/getReviewQuestions',
			liveQuestions: 'admin/questions/getLiveQuestions',
			livePinnedQuestions: 'admin/questions/getLivePinnedQuestions',
			liveOtherQuestions: 'admin/questions/getLiveOtherQuestions',
			archivedQuestions: 'admin/questions/getArchivedQuestions',
		}),
	},
};
</script>

<style lang="scss">
$color-noti: var(--v-red);
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
