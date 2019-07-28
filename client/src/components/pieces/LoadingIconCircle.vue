<template>
	<span>
		<template
			v-if="state === 'loading'"
			slot="loader"
			class="loading-circle">
			<v-icon
				v-text="'$vuetify.icons.loading_circle'" />
		</template>

		<template v-else-if="state === 'success'">
			<v-icon
				class="loading-success"
				v-text="'$vuetify.icons.loading_success'" />
		</template>

		<template v-else-if="state === 'fail'">
			<v-icon
				class="loading-fail"
				color="error"
				v-text="'$vuetify.icons.loading_fail'" />
		</template>

		<template v-else>
			<slot name="otp-icon" />
		</template>
	</span>
</template>

<script>
export default {
	name: 'LoadingIconCircle',
	props: {
		state: {
			type: String,
			default: '',
			validator: val => ['loading', 'success', 'fail', ''].includes(val),
		},
	},
	watch: {
		state(val) {
			if (val === 'success' || val === 'fail') {
				setTimeout(() => {
					this.$emit('update:state', '');
				}, 1000);
			}
		},
	},
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
