<template>
	<div>
		<v-layout row wrap>
			<v-flex class="pr-1" xs12 md6>
				<poll-panel--list />
			</v-flex>
			<v-flex class="pl-1" xs12 md6>
				<poll-panel--result />
			</v-flex>
		</v-layout>
		<dialog--handle-poll />
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
import DialogHandlePoll from '@/components/polls/admin/DialogHandlePoll.vue';
import PollListPanel from '@/components/polls/admin/PollListPanel.vue';
import PollResultPanel from '@/components/polls/admin/PollResultPanel.vue';

export default {
	name: 'AdminPolls',
	components: {
		'dialog--handle-poll': DialogHandlePoll,
		'poll-panel--list': PollListPanel,
		'poll-panel--result': PollResultPanel,
	},
	created() {
		this.$socket.emit('get-polls', ({ errmsg, polls }) => {
			if (!polls) {
				if (errmsg) {
					this.showNotify(errmsg, 'danger');
				}
				return;
			}
			this.setPolls(polls);
			this.emitGetAllPollOpts();
		});
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
		new_added_poll_option(newPollOpt) {
			this.addPollOption(newPollOpt);
		},
		new_edited_poll_option(opt) {
			this.mergePollOpt(opt);
		},
		new_deleted_poll_option(opt) {
			this.deletePollOption(opt);
		},
		new_poll_option_choices(choices) {
			this.editPollOptionChoices(choices);
		},
	},
	methods: {
		...mapMutations({
			setPolls: 'admin/polls/SET_POLLS',
			addPoll: 'admin/polls/ADD_POLL',
			mergePoll: 'admin/polls/MERGE_POLL',
			deletePoll: 'admin/polls/DELETE_POLL',
			setPollOptions: 'admin/pollOptions/SET_POLL_OPTIONS',
			addPollOption: 'admin/pollOptions/ADD_POLL_OPTION',
			mergePollOpt: 'admin/pollOptions/MERGE_POLL_OPTION',
			deletePollOption: 'admin/pollOptions/DELETE_POLL_OPTION',
			setPollOptionChoices: 'admin/pollOptions/SET_POLL_OPTION_CHOICES',
			editPollOptionChoices: 'admin/pollOptions/EDIT_POLL_OPTION_CHOICES',
		}),
		emitGetAllPollOpts() {
			const emiter = 'get-all-poll-options';
			this.$socket.emit(emiter, ({ errmsg, poll_options }) => {
				if (!poll_options) {
					if (errmsg) {
						// ...
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
				this.setPollOptionChoices(choices);
			});
		},
	},
};
</script>

<style>
</style>
