<template>
	<div>
		<v-layout
			class="mx-3 my-2"
			row
			justify-space-between
			align-center>
			<!-- *event being activated -->
			<div v-t="'poll-live-title'" class="body-1 grey--text" />

			<span class="grey--text">
				0
				<v-icon small v-text="'$vuetify.icons.group_people'" />
			</span>
		</v-layout>
		<v-slide-y-transition group>
			<poll-card
				v-for="poll in polls"
				:key="poll.id"
				:poll="poll" />
		</v-slide-y-transition>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import PollCard from './PollCard.vue';

export default {
	name: 'PollPanel',
	components: {
		'poll-card': PollCard,
	},
	computed: {
		...mapGetters({
			polls: 'guest/polls/getPolls',
		}),
	},
};
</script>

<style>
</style>
