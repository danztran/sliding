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
			:timeout="9000000">
			<span
				class="body-1 black--text"
				v-text="message" />
			<v-btn
				v-t="'btn-close'"
				:color="type === 'danger'
					? 'error'
					: (type === 'warning' ? 'warning' : 'primary')"
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
		timer: null,
	}),
	mounted() {
		this.$root.$on('show-noti', ({ msg, type, duration }) => {
			this.show = true;
			this.message = msg;
			this.type = type || '';
			const timeout = duration || 5000;
			if (this.timer) {
				clearTimeout(this.timer);
			}
			this.timer = setTimeout(() => {
				this.show = false;
				this.timer = null;
			}, timeout);
		});
		this.$root.$on('hide-noti', () => {
			this.show = false;
		});
	},
};
</script>

<style lang="scss">
$success: var(--v-primary-base);

#my-snackbar {
	.v-snack__content {
		position: relative;
	}
	.snackbar-danger {
		.v-snack__content::before {
			background-color: var(--v-error-base);
		}
	}
	.snackbar-warning {
		.v-snack__content::before {
			background-color: var(--v-warning-base);
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
