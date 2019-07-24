<template>
	<v-dialog
		v-model="dialog"
		max-width="450px"
		:transition="false"
		:fullscreen="isSMnXS">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-card>
			<v-container>
				<v-card-title class="py-1 px-2" primary-title>
					<div class="headline font-weight-light" v-text="'QRCode'" />
					<v-spacer />
					<!-- *Button close -->
					<v-btn
						icon
						@click="dialog=false">
						<v-icon
							size="20"
							v-text="'$vuetify.icons.close'" />
					</v-btn>
				</v-card-title>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'DialogQRCode',
	data: () => ({
		dialog: false,
	}),
	mounted() {
		this.$root.$on('dialog-qrcode', (eventCode) => {
			this.dialog = true;
		});
	},
};
</script>

<style lang="css" scoped>
</style>
