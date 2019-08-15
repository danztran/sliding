<template>
	<v-layout
		row
		wrap
		align-center>
		<v-flex xs12 md7 order-md2>
			<v-img
				aspect-ratio="1.7"
				contain
				:src="require('@/assets/coop_events.svg')" />
		</v-flex>
		<v-flex
			class="text-md-left text-xs-center"
			xs12
			md5
			order-md1>
			<div
				v-t="'coop-empty'"
				class="title font-weight-light first-letter-uppercase" />
			<v-btn
				class="mt-3"
				color="primary"
				dark
				round
				medium
				@click.stop="toggleDialogInvite">
				<span v-t="'btn-dialog-invite'" class="px-3" />
			</v-btn>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	name: 'EmptyCoop',
	methods: {
		toggleDialogInvite() {
			this.$root.$emit('dialog-invite-request');
		},
	},
};
</script>

<style lang="css" scoped>
</style>
