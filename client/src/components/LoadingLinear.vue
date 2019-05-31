<template>
	<v-progress-linear :height="3" :indeterminate="loading" v-show="loading"/>
</template>

<script>
export default {
	name: 'LoadingLinear',
	props: {
		loading: {
			type: Boolean,
			default: false
		}
	}
};
</script>
