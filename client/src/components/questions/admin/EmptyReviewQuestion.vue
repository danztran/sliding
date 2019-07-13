<template>
	<v-layout
		v-if="!reviewQuestions.length"
		align-center
		justify-center
		column
		fill-height>
		<template>
			<v-icon
				v-if="onModeration"
				size="35"
				color="success"
				v-text="'$vuetify.icons.approve'" />
			<img
				v-else
				class="empty-question"
				:src="require('@/assets/moderationOff.svg')">
		</template>

		<div
			v-t="onModeration ? 'moderation-view-on' : 'moderation-view-off'"
			class="title font-weight-regular mt-2" />

		<div v-t="'moderation-view-des'" class="subheading grey--text text--darken-1 px-2" />

		<v-btn
			v-t="onModeration ? 'btn-disable-moderation' : 'btn-enable-moderation'"
			class="mt-3"
			color="primary"
			outline
			small
			:ripple="false"
			@click="toggleModerationMode" />
	</v-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
	name: 'EmptyModerationQuestion',
	computed: {
		...mapGetters({
			reviewQuestions: 'admin/questions/getReviewQuestions',
			onModeration: 'admin/event/onModeration',
		}),
	},
	methods: {
		...mapMutations({
			mergeTemptSettings: 'admin/event/MERGE_TEMP_SETTINGS',
		}),
		toggleModerationMode() {
			this.mergeTemptSettings({ on_moderation: !this.onModeration });
			this.$root.$emit('save-settings');
		},
	},
};
</script>

<style lang="css" scoped>
.empty-question {
	height: 112px;
	width: 192px;
}
</style>
