<template>
	<div>
		<empty--state-poll v-if="!polls.length" />
		<panel--poll v-else />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import PollPanel from '@/components/polls/guest/PollPanel.vue';
import EmptyPoll from '@/components/polls/guest/EmptyPoll.vue';

export default {
	name: 'Polls',
	components: {
		'panel--poll': PollPanel,
		'empty--state-poll': EmptyPoll,
	},
	computed: {
		...mapGetters({
			polls: 'guest/polls/getPolls',
		}),
	},
	sockets: {
		// ...
	},
	methods: {
		// ....
	},
};
</script>

<style>
</style>
