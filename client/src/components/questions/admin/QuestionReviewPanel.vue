<!--
	@desc:
		*including questions posted from the audience
		*questions posted are approved first, and then move question to live tabs
	@contains:
		*question moderation card
		*XS-SM: merge tab to main panel
-->
<template>
	<v-layout row wrap>
		<!-- @desc: header - actions -->
		<v-layout
			class="pl-3 py-2"
			align-center
			justify-space-between
			row
			fill-height>
			<!-- @desc: title -->
			<div v-t="'moderation-view-title'" class="pt-1 body-1 grey--text first-letter-uppercase" />
			<!-- @desc: moderation mode/sorting -->
			<div class="d-flex">
				<!-- moderation mode -->
				<v-switch
					v-if="onlyHost"
					class="ma-0 pt-2"
					color="primary"
					:label="$t('moderation-view-stt')"
					hide-details
					:input-value="onModeration"
					@change="toggleModeModeration" />

				<!-- sorting -->
				<v-menu bottom nudge-bottom offset-y left>
					<template v-slot:activator="{ on }">
						<v-btn
							class="ma-0"
							icon
							medium
							v-on="on">
							<v-icon
								size="20"
								color="grey lighten-1"
								v-text="'$vuetify.icons.options_dot'" />
						</v-btn>
					</template>

					<v-list class="py-0 custom-list" dense subheader>
						<v-subheader v-t="'opt-sort-by-title'" />
						<v-list-tile>
							<v-list-tile-action>
								<v-icon />
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title
									v-t="'btn-oldest'"
									class="first-letter-uppercase" />
							</v-list-tile-content>
						</v-list-tile>

						<v-list-tile>
							<v-list-tile-action>
								<v-icon />
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title
									v-t="'btn-recent'"
									class="first-letter-uppercase" />
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</v-menu>
			</div>
		</v-layout>

		<v-card
			:class="{'bg-grey': !onModeration}"
			class="w-100 card-wrapper list-scroll scrollbar-primary list-scroll">
			<empty-review v-if="!reviewQuestions.length" />
			<v-layout v-else row wrap>
				<v-flex xs12>
					<!-- @desc: question review -->
					<question-card--review
						v-for="question of reviewQuestions"
						:key="question.id"
						:question="question"
						reply />
				</v-flex>
			</v-layout>
		</v-card>
	</v-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import EmptyReview from './EmptyReviewQuestion.vue';
import ReviewQuestionCard from './ReviewQuestionCard.vue';

export default {
	name: 'QuestionModerationPanel',
	components: {
		'empty-review': EmptyReview,
		'question-card--review': ReviewQuestionCard,
	},
	computed: {
		...mapGetters({
			reviewQuestions: 'admin/questions/getReviewQuestions',
			eventRole: 'admin/event/getRole',
			onModeration: 'admin/event/onModeration',
		}),
		onlyHost() {
			if (this.eventRole && this.eventRole.name !== undefined && this.eventRole.name === 'host') {
				return true;
			}
			return false;
		},
	},
	methods: {
		...mapMutations({
			mergeTempSettings: 'admin/event/MERGE_TEMP_SETTINGS',
		}),
		toggleModeModeration() {
			this.mergeTempSettings({ on_moderation: !this.onModeration });
			this.$root.$emit('save-settings');
		},
	},
};
</script>

<style lang="css" scoped>
</style>
