<!--
	@desc:
		*including questions posted from the audience
		*if (moderator) on: questions approved by Moderator
	@contains:
		*live/archive tabs in Medium(MD) and up devices
		*for-review(moderator)/live/archive tabs in XS-SM devices
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
					v-if="showSMnXS"
					active-class="primary--text font-weight-medium">
					{{ $t('moderator-view-title') }}
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
							v-if="!showSMnXS"
							class="ma-0"
							icon
							v-on="on">
							<v-icon
								color="grey darken-1"
								:size="icon.small"
								v-html="'$vuetify.icons.search'">
							</v-icon>
						</v-btn>
					</template>
					<span v-t="'search'"></span>
				</v-tooltip>

				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn
							v-if="currentTab === 0 && !showSMnXS"
							class="ma-0"
							icon
							v-on="on">
							<v-icon
								color="grey darken-1"
								:size="icon.small"
								v-html="'$vuetify.icons.archive_all'">
							</v-icon>
						</v-btn>
					</template>
					<span v-t="'btn-archive-all'"></span>
				</v-tooltip>

				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn class="ma-0" icon v-on="on">
							<v-icon
								color="grey darken-1"
								:size="icon.small"
								v-html="'$vuetify.icons.filter'">
							</v-icon>
						</v-btn>
					</template>
					<span v-t="'btn-filter'"></span>
				</v-tooltip>
			</div>
		</v-layout>

		<!-- @desc: tab name -->
		<v-tabs-items v-model="currentTab" class="w-100">
			<!-- @tab: moderator tab in XS-SM -->
			<v-tab-item
				v-if="showSMnXS"
				class="list-scroll"
				:transition="false"
				:reverse-transition="false">
				<v-card class="card-parent list-scroll scrollbar-primary">
					<v-layout row wrap>
						<v-flex xs12>
							<slot name="for-review-moderator-tab"></slot>
						</v-flex>
					</v-layout>
					<empty-state-moderator
						:emptyQuestion=true
						:onModerator="onModerator"/>
				</v-card>
			</v-tab-item>

			<!-- @tab: live tabs -->
			<v-tab-item
				class="list-scroll"
				:transition="false"
				:reverse-transition="false">
				<v-card
					class="card-parent list-scroll scrollbar-primary">
					<v-layout v-if="emptyLive" row wrap>
						<v-flex xs12>
							<slot name="live-tab"></slot>
						</v-flex>
					</v-layout>
					<empty-state-live v-else />
				</v-card>
			</v-tab-item>

			<!-- @tab: archive tab -->
			<v-tab-item
				class="list-scroll"
				:transition="false"
				:reverse-transition="false">
				<v-card class="card-parent list-scroll scrollbar-primary">
					<empty-state-archive v-if="emptyArchive" />
					<v-layout v-else row wrap>
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
import EmptyModerator from '@/components/empty/ModeratorQuestion.vue';
import EmptyLive from '@/components/empty/LiveQuestion.vue';
import EmptyArchive from '@/components/empty/ArchiveQuestion.vue';

export default {
	name: 'QuestionMainPanel',
	components: {
		'empty-state-moderator': EmptyModerator,
		'empty-state-live': EmptyLive,
		'empty-state-archive': EmptyArchive
	},
	props: {
		emptyModerator: {
			type: Boolean,
			default: false
		},
		emptyLive: {
			type: Boolean,
			default: false
		},
		emptyArchive: {
			type: Boolean,
			default: false
		},
		onModerator: {
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
	computed: {
		showSMnXS() {
			return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
		}
	},
	methods: {
		replyQuestion() {
			this.$root.$emit('dialog-reply-question');
		}
	}
};
</script>

<style>
</style>
