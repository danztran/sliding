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
			<div v-t="'moderation-view-title'" class="pt-1 body-1 grey--text" />
			<!-- @desc: moderation mode/sorting -->
			<div class="d-flex">
				<!-- moderation mode -->
				<v-switch
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
			:class="{'bg-grey': !onModeration}"
			class="w-100 card-parent list-scroll scrollbar-primary list-scroll">
			<v-layout
				v-if="onModeration && !emptyQuestion"
				row
				wrap>
				<v-flex xs12>
					<!-- @desc: question review -->
					<slot />
				</v-flex>
			</v-layout>

			<empty-review
				:on-moderation="onModeration"
				:empty-question="emptyQuestion" />
		</v-card>
	</v-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import EmptyReview from './EmptyReviewQuestion.vue';

export default {
	name: 'QuestionModerationPanel',
	components: {
		'empty-review': EmptyReview
	},
	props: {
		emptyQuestion: {
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
	computed: {
		...mapGetters({
			onModeration: 'admin/event/onModeration'
		})
	},
	methods: {
		...mapMutations({
			mergeTempSettings: 'admin/event/MERGE_TEMP_SETTINGS'
		}),
		toggleModeModeration() {
			this.mergeTempSettings({ on_moderation: !this.onModeration });
			this.$root.$emit('save-settings');
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
