<template>
	<v-layout
		align-center
		justify-center
		column
		fill-height>
		<v-icon large color="success" v-text="'$vuetify.icons.polls'" />
		<div class="subheading text-xs-center grey--text text--darken-2">
			<div v-t="'poll-empty-title'" class="first-letter-uppercase" />
			<div v-t="'poll-empty-subtitle'" class="first-letter-uppercase" />
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
		})
	}
};
</script>

<style lang="scss">
</style>
