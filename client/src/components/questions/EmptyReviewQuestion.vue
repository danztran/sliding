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
				v-html="'$vuetify.icons.approve'"/>
			<img
				v-else
				class="emptyQuestion"
				:src="require('@/assets/moderationOff.svg')"/>
		</template>

		<div
			class="title font-weight-regular mt-2"
			v-t="onModerator ? 'moderator-view-on' : 'moderator-view-off'">
		</div>

		<div class="subheading grey--text text--darken-1" v-t="'moderator-view-des'"></div>

		<v-btn
			class="mt-3"
			color="primary"
			outline
			small
			v-t="onModerator ? 'btn-disable-moderator' : 'btn-enable-moderator'"
			:ripple=false
			@click="toggleModeratorMode"></v-btn>
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
