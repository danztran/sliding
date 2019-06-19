<template>
	<span>
		<template
			v-if="state === 'loading'"
			class="loading-circle"
			slot="loader">
			<v-icon
				v-html="'$vuetify.icons.loading_circle'">
			</v-icon>
		</template>

		<template v-else-if="state === 'success'">
			<v-icon
				class="loading-success"
				v-html="'$vuetify.icons.loading_success'">
			</v-icon>
		</template>

		<template v-else-if="state === 'fail'">
			<v-icon
				class="loading-fail"
				color="error"
				v-html="'$vuetify.icons.loading_fail'">
			</v-icon>
		</template>

		<template v-else>
			<slot name="otp-icon"></slot>
		</template>
	</span>
</template>

<script>
export default {
	name: 'IconLoadingCircle',
	props: {
		state: {
			type: String,
			default: ''
		}
	}
};
</script>

<style lang="css" scoped>
	.loading-circle {
		animation: loader 1s infinite;
		display: flex;
	}
	@-moz-keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@-webkit-keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@-o-keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
