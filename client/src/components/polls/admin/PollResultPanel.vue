<template>
	<v-layout row wrap>
		<!-- @desc: header: title - show result -->
		<v-layout
			class="pl-3 py-2"
			align-center
			justify-space-between
			row
			fill-height>
			<!-- *title: result -->
			<div v-t="'btn-poll-result'" class="grey--text" />

			<!-- *actions: show dialog poll result -->
			<v-btn
				small
				flat
				round
				outline
				color="grey">
				<span v-t="'btn-poll-result'" class="first-letter-uppercase" />
			</v-btn>
		</v-layout>

		<v-card class="w-100 card-wrapper list-scroll scrollbar-primary list-scroll">
			<v-layout v-if="_cm.notEmpty(getPollResult)" row wrap>
				<v-flex xs12>
					<card--poll-result />
				</v-flex>
			</v-layout>
			<empty-state--poll v-else />
		</v-card>
	</v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import EmptyPoll from './EmptyPoll.vue';
import PollResultCard from './PollResultCard.vue';

export default {
	name: 'PollResultPanel',
	components: {
		'empty-state--poll': EmptyPoll,
		'card--poll-result': PollResultCard,
	},
	computed: {
		...mapGetters({
			getPollResult: 'admin/pollOptions/getPollResult',
		}),
	},
};
</script>

<style lang="css">
</style>
