<template>
	<div>
		<empty--state-poll v-if="!polls.length" />
		<panel--poll v-else />
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
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
	created() {
		this.emitGetPolls();
	},
	sockets: {
		new_added_poll(poll) {
			this.addPoll(poll);
		},
		new_deleted_poll(poll) {
			this.deletePoll(poll);
		},
		new_edited_poll(newInfo) {
			this.mergePoll(newInfo);
		},
	},
	methods: {
		...mapMutations({
			setPolls: 'guest/polls/SET_POLLS',
			addPoll: 'guest/polls/ADD_POLL',
			deletePoll: 'guest/polls/DELETE_POLL',
			mergePoll: 'guest/polls/MERGE_POLL',
		}),
		emitGetPolls() {
			this.$socket.emit('get-polls', ({ errmsg, polls }) => {
				if (!polls) {
					if (errmsg) {
						// ...
					}
					return;
				}
				this.setPolls(polls);
			});
		},
	},
};
</script>

<style>
</style>
