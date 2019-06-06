<template>
	<v-progress-linear :height="4" :indeterminate="loading" v-show="loading"/>
</template>
<style scoped>
.v-progress-linear {
	position: absolute;
	top: 0;
	left: 0;
	padding: 0;
	margin: 0;
}
</style>
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
