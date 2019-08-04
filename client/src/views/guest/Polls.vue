<template>
	<div>
		<empty--state-poll v-if="!polls.length" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import EmptyPoll from '@/components/polls/guest/EmptyPoll.vue';

export default {
	name: 'Polls',
	components: {
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
