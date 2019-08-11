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
		new_poll_option_choices(choices) {
			this.editPollOptionChoices(choices);
			// console.warn(choices);
		},
		new_edited_poll_option(option) {
			console.warn(option);
		},
		new_added_poll_option(option) {
			console.warn(option);
		},
		new_deleted_poll_option(option) {
			console.warn(option);
		},
	},
	methods: {
		...mapMutations({
			setPolls: 'guest/polls/SET_POLLS',
			setPollOptions: 'guest/pollOptions/SET_POLL_OPTIONS',
			setPollOptionChoices: 'guest/pollOptions/SET_POLL_OPTION_CHOICES',
			addPoll: 'guest/polls/ADD_POLL',
			editPollOptionChoices: 'guest/pollOptions/EDIT_POLL_OPTION_CHOICES',
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
				this.emitGetAllPollOptions();
			});
		},
		emitGetAllPollOptions() {
			const emiter = 'get-all-poll-options';
			this.$socket.emit(emiter, ({ errmsg, poll_options }) => {
				if (!poll_options) {
					if (errmsg) {
						this.showNotify(errmsg, 'danger');
					}
					return;
				}
				this.setPollOptions(poll_options);
				this.emitGetAllOptChoices();
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
				// console.warn(choices);
				// this.setOptChoice(choices);
				this.setPollOptionChoices(choices);
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
