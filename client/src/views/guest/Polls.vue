<template>
	<div>
		<empty--state-poll v-if="!polls.length" />
		<template v-else>
			<div v-t="'poll-live-title'" class="mx-3 my-2 body-1 grey--text" />

			<card--poll
				v-for="poll in polls"
				:key="poll.id"
				:poll="poll" />
		</template>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import PollCard from '@/components/polls/guest/PollCard.vue';
import EmptyPoll from '@/components/polls/guest/EmptyPoll.vue';

export default {
	name: 'Polls',
	components: {
		'card--poll': PollCard,
		'empty--state-poll': EmptyPoll,
	},
	computed: {
		...mapGetters({
			polls: 'guest/polls/getPolls',
		}),
	},
	created() {
		this.emitGetPolls();
		this.emitGetAllOptChoices();
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
			setPollOptChoice: 'guest/pollOptions/SET_POLL_OPTION_CHOICE',
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
		emitGetAllOptChoices() {
			const emiter = 'get-all-poll-option-choices';
			this.$socket.emit(emiter, ({ errmsg, choices }) => {
				if (!choices) {
					if (errmsg) {
						this.showNotify(errmsg, 'danger');
					}
					return;
				}
				this.setOptChoice(choices);
				console.warn(choices);
			});
		},
		setOptChoice(choices) {
			for (const choice of choices) {
				this.setPollOptChoice(choice);
			}
		},
	},
};
</script>

<style>
</style>
