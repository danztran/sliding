<template>
	<transition name="fade">
		<div v-show="loading" id="loading-overlay">
			<bouncy-loader />
		</div>
	</transition>
</template>
<script>
export default {
	name: 'LoadingOverlay',
	data: () => ({
		loading: false,
	}),
	created() {
		this.$root.$on('show-loading-overlay', this.show);
		this.$root.$on('hide-loading-overlay', this.hide);
		this.$root.$on('set-loading-overlay', this.set);
	},
	methods: {
		show() {
			this.loading = true;
		},
		hide() {
			this.loading = false;
		},
		set(status) {
			this.loading = !!status;
		},
	},
};
</script>
<style lang="scss" scoped>
.fade-leave-active {
	transition: opacity .5s linear;
}
.fade-leave-to {
	opacity: 0;
}
#loading-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100vh;
	z-index: 100;
	background-color: #fafafa;
}
</style>
