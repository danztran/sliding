<template>
	<v-dialog
		v-model="dialog"
		max-width="450px"
		no-click-animation
		:fullscreen="isXS">
		<span v-show="false">
			{{ $t('FOR_A_PURPOSE') }}
		</span>
		<v-card>
			<v-card-title v-if="isXS" class="pa-2">
				<v-spacer />
				<!-- *close dialog -->
				<v-btn
					v-if="isXS"
					icon
					@click="dialog=false">
					<v-icon
						size="20"
						v-text="'$vuetify.icons.close'" />
				</v-btn>
			</v-card-title>
			<v-container :class="{ 'py-5': !isXS }">
				<qr-code class="text-xs-center" :value="value" :size="size" level="H" />
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
	name: 'DialogQRCode',
	components: {
		'qr-code': QrcodeVue,
	},
	data: () => ({
		dialog: false,
		value: '',
		size: 340,
	}),
	mounted() {
		this.$root.$on('dialog-qrcode', (eventCode) => {
			const baseURL = this.$env.VUE_APP_HOST_NAME;
			this.value = `${baseURL}/event/${eventCode}`;
			this.dialog = true;
		});
	},
};
</script>

<style lang="css" scoped>
</style>
