<template>
	<v-layout
		align-center
		justify-center
		column
		fill-height>
		<!-- <img :src="require('@/assets/empty_result.svg')"> -->
		<div class="subheading text-xs-center grey--text text--darken-2">
			<div v-t="'poll-empty-result'" class="first-letter-uppercase" />
		</div>
	</v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'EmptyPoll',
	computed: {
		...mapGetters({
			// ....
		}),
	},
};
</script>

<style lang="scss">
</style>
