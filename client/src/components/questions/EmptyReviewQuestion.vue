<template>
	<v-layout
		v-if="emptyQuestion"
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
				class="emptyQuestion"
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
export default {
	name: 'EmptyModerationQuestion',
	props: {
		onModeration: {
			type: Boolean,
			default: false
		},
		emptyQuestion: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		toggleModerationMode() {
			this.$root.$emit('toggle-mode-moderation');
		}
	}
};
</script>

<style lang="css" scoped>
	.emptyQuestion {
		height: 112px;
		width: 192px;
	}
</style>
