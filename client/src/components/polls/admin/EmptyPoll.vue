<template>
	<v-layout
		align-center
		justify-center
		column
		fill-height>
		<img :src="require('@/assets/poll_result.svg')">
		<div class="subheading text-xs-center grey--text text--darken-2 px-3">
			<div v-t="'poll-empty-result'" class="first-letter-uppercase" />
		</div>
	</v-layout>
</template>

<script>
export default {
	name: 'EmptyPoll',
};
</script>

<style lang="scss">
</style>
