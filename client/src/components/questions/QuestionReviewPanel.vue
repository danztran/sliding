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
			<div v-t="'moderator-view-title'" class="pt-1 body-1 grey--text" />
			<!-- @desc: actions active moderator mode/sorting -->
			<div class="d-flex">
				<v-switch
					class="ma-0 pt-2"
					color="primary"
					:label="$t('moderator-view-stt')"
					hide-details
					:input-value="onModerator"
					@change="toggleModeModeration" />

				<v-menu bottom nudge-bottom offset-y left>
					<template v-slot:activator="{ on }">
						<v-btn
							class="ma-0"
							icon
							v-on="on">
							<v-icon
								:size="icon.xs"
								v-text="'$vuetify.icons.options_dot'" />
						</v-btn>
					</template>

					<v-list class="py-0" dense subheader>
						<v-subheader v-t="'opt-sort-by-title'" />
						<v-list-tile>
							<v-list-tile-action>
								<v-icon />
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title v-t="'btn-oldest'" />
							</v-list-tile-content>
						</v-list-tile>

						<v-list-tile>
							<v-list-tile-action>
								<v-icon />
							</v-list-tile-action>
							<v-list-tile-content>
								<v-list-tile-title v-t="'btn-recent'" />
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
				</v-menu>
			</div>
		</v-layout>

		<v-card
			:class="{'bg-grey': !onModerator}"
			class="w-100 card-parent list-scroll scrollbar-primary list-scroll">
			<v-layout
				v-if="onModerator && !emptyQuestion"
				row
				wrap>
				<v-flex xs12>
					<slot />
				</v-flex>
			</v-layout>

			<empty-review
				:on-moderator="onModerator"
				:empty-question="emptyQuestion" />
		</v-card>
	</v-layout>
</template>

<script>
import EmptyReview from './EmptyReviewQuestion.vue';

export default {
	name: 'QuestionModeratorPanel',
	components: {
		'empty-review': EmptyReview
	},
	props: {
		emptyQuestion: {
			type: Boolean,
			default: false
		},
		onModerator: {
			type: Boolean,
			default: false
		}
	},
	data: () => ({
		icon: {
			xs: 20,
			sm: 30,
			lg: 35
		}
	}),
	methods: {
		toggleModeModeration() {
			this.$root.$emit('toggle-mode-moderation');
		}
	}
};
</script>

<style lang="css" scoped>
	.bg-grey {
		background-color: #efefef !important;
	}
	.emptyQuestion {
		height: 112px;
		width: 192px;
	}
</style>
