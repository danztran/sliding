<template>
	<span>
		<template slot="loader">
			<span class="loading-circle">
				<v-icon
					v-html="'$vuetify.icons.loading_circle'">
				</v-icon>
			</span>
		</template>

		<template v-if="success">
			<v-icon
				class="loading-success"
				v-html="'$vuetify.icons.loading_success'">
			</v-icon>
		</template>

		<template v-else-if="fail">
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
	name: 'ButtonEditLoading',
	props: {
		success: {
			type: Boolean,
			default: false
		},
		fail: {
			type: Boolean,
			default: false
		},
		timeout: {
			type: Number,
			default: 2000
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
