<template>
	<div id="my-snackbar">
		<v-snackbar
			v-model="show"
			left
			color="grey lighten-5"
			:bottom="!isSMnXS"
			:top="isSMnXS"
			:multi-line="isSMnXS"
			:class="type ? `snackbar-${type}` : ''"
			:timeout="6000">
			<span
				class="body-1 black--text"
				v-text="message" />
			<v-btn
				v-t="'btn-close'"
				:color="type === 'danger'
					? 'error'
					: 'primary'"
				flat
				:ripple="false"
				@click="show=false" />
		</v-snackbar>
	</div>
</template>

<script>
export default {
	name: 'Notify',
	data: () => ({
		show: false,
		type: '',
		message: '',
	}),
	mounted() {
		this.$root.$on('show-noti', ({ msg, type }) => {
			this.show = true;
			this.message = msg;
			this.type = type || '';
		});
	},
};
</script>

<style lang="scss">
$success: #3ba0b1;

#my-snackbar {
	.v-snack__content {
		position: relative;
	}
	.snackbar-danger {
		.v-snack__content::before {
			background-color: #832800;
		}
	}
	.v-snack__content::before {
		content: '';
		background-color: $success;
		position: absolute;
		height: 100%;
		width: 4px;
		left: 0;
		border-radius: 10% 0% 0% 10%;
	}
}
</style>
