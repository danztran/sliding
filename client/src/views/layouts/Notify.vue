<template>
	<v-card>
		<v-snackbar
			:top="true"
			:right="true"
			:multi-line="true"
			:vertical="true"
			:timeout=6000
			v-model="show">
			{{ message }}
			<v-btn
				color="pink"
				flat
				@click="show = false">Close</v-btn>
		</v-snackbar>
	</v-card>
</template>

<script>
export default {
	name: 'Notify',
	data() {
		return {
			show: false,
			message: ''
		};
	},
	watch: {
		$route(to, from) {
			this.show = true;
		}
	},
	mouted() {
		this.$root.$on('show-noti', (message) => {
			this.message = message;
			this.show = true;
		});
		this.$root.$on('hide-noti', () => {
			this.show = false;
		});
	}
};
</script>
