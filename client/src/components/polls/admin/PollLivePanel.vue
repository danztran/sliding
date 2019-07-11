<template>
	<v-layout row wrap>
		<!-- @desc: header: title - show result -->
		<v-layout
			class="pl-3 py-2"
			align-center
			justify-space-between
			row
			fill-height>
			<!-- *title: live -->
			<div v-t="'btn-live'" class="grey--text" />

			<!-- *actions: show dialog poll result -->
			<div>
				<v-btn
					small
					flat
					round
					outline
					color="grey lighten-2">
					<span v-t="'btn-poll-result'" class="first-letter-uppercase" />
				</v-btn>
			</div>
		</v-layout>

		<v-card class="w-100 card-wrapper list-scroll scrollbar-primary list-scroll">
			<empty-state--poll />
			<!-- <v-layout v-else row wrap>
				<v-flex xs12>
					... poll result here ...
				</v-flex>
			</v-layout> -->
		</v-card>
	</v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import EmptyPoll from './EmptyPoll.vue';

export default {
	name: 'PollLivePanel',
	components: {
		'empty-state--poll': EmptyPoll
	},
	computed: {
		...mapGetters({
			// ....
		})
	}
};
</script>

<style lang="css">
</style>
