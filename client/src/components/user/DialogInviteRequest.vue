<template>
	<v-dialog
		v-model="dialog"
		width="800"
		:transition="false"
		:fullscreen="isSMnXS">
		<v-card>
			<loading-linear />
			<v-card-title class="py-0 pr-0">
				<span v-t="'dialog-user-access-invite'" />
				<!-- *Title -->
				<template>
					<span v-if="!isSMnXS" v-t="'dialog-user-access-invite'" />
				</template>

				<v-spacer />
				<!-- *Button close -->
				<v-btn
					v-if="!isSMnXS"
					icon
					@click="dialog=false">
					<v-icon
						size="20"
						v-text="'$vuetify.icons.close'" />
				</v-btn>
			</v-card-title>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'DialogInviteRequest',
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
