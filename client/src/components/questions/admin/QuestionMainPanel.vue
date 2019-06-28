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
				<v-card class="card-parent list-scroll scrollbar-primary">
					<v-layout row wrap>
						<v-flex xs12>
							<slot name="for-review-moderation-tab" />
						</v-flex>
					</v-layout>
					<empty-state-review
						:on-moderation="onModeration"
						:empty-question="true" />
				</v-card>
			</v-tab-item>

			<!-- @tab: live tabs -->
			<v-tab-item
				:transition="false"
				:reverse-transition="false">
				<v-card
					class="card-parent list-scroll scrollbar-primary">
					<v-layout v-if="emptyLive" row wrap>
						<v-flex xs12>
							<slot name="live-tab" />
						</v-flex>
					</v-layout>
					<empty-state-live v-else />
				</v-card>
			</v-tab-item>

			<!-- @tab: archive tab -->
			<v-tab-item
				:transition="false"
				:reverse-transition="false">
				<v-card class="card-parent list-scroll scrollbar-primary">
					<empty-state-archived v-if="emptyArchive" />
					<v-layout v-else row wrap>
						<v-flex xs12>
							<slot name="archive-tab" />
						</v-flex>
					</v-layout>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</v-layout>
</template>

<script>
import EmptyLive from './EmptyLiveQuestion.vue';
import EmptyReview from './EmptyReviewQuestion.vue';
import EmptyArchived from './EmptyArchivedQuestion.vue';

export default {
	name: 'QuestionMainPanel',
	components: {
		'empty-state-review': EmptyReview,
		'empty-state-live': EmptyLive,
		'empty-state-archived': EmptyArchived
	},
	props: {
		emptyLive: {
			type: Boolean,
			default: false
		},
		emptyArchive: {
			type: Boolean,
			default: false
		},
		onModeration: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
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
