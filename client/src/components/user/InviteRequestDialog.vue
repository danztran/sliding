<template>
	<v-dialog
		v-model="dialog"
		width="800"
		:transition="false"
		:fullscreen="isSMnXS">
		<v-card>
			<loading-linear />
			123
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'InviteRequestDialog',
	data: () => ({
		dialog: false,
		invitesRequest: [],
	}),
	mounted() {
		this.$root.$on('dialog-invite-request', () => {
			this.dialog = true;
		});
	},
};
</script>
