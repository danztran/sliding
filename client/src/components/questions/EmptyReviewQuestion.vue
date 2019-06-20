<template>
	<v-layout
		v-if="emptyQuestion"
		align-center
		justify-center
		column
		fill-height>
		<template>
			<v-icon
				v-if="onModerator"
				size="35"
				color="success"
				v-text="'$vuetify.icons.approve'" />
			<img
				v-else
				class="emptyQuestion"
				:src="require('@/assets/moderationOff.svg')">
		</template>

		<div
			v-t="onModerator ? 'moderator-view-on' : 'moderator-view-off'"
			class="title font-weight-regular mt-2" />

		<div v-t="'moderator-view-des'" class="subheading grey--text text--darken-1" />

		<v-btn
			v-t="onModerator ? 'btn-disable-moderator' : 'btn-enable-moderator'"
			class="mt-3"
			color="primary"
			outline
			small
			:ripple="false"
			@click="toggleModeratorMode" />
	</v-layout>
</template>

<script>
export default {
	name: 'EmptyModeratorQuestion',
	props: {
		onModerator: {
			type: Boolean,
			default: false
		},
		emptyQuestion: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		toggleModeratorMode() {
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
