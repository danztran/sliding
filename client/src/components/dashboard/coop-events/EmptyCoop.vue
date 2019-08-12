<template>
	<v-layout
		row
		wrap
		align-center>
		<div>empty</div>
		<v-btn
			v-t="'btn-create-event'"
			class="px-4 ma-0 mt-3"
			color="success lighten--2"
			round
			dark
			medium
			@click.stop="toggleDialogManageInvites" />
	</v-layout>
</template>

<script>
export default {
	name: 'EmptyCoop',
	methods: {
		toggleDialogManageInvites() {
			// ..
		},
	},
};
</script>

<style lang="css" scoped>
</style>
