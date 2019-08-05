<template>
	<div>
		<v-layout row wrap>
			<v-flex class="pr-1" xs12 md6>
				<poll-panel--list />
			</v-flex>
			<v-flex class="pl-1" xs12 md6>
				<poll-panel--live />
			</v-flex>
		</v-layout>
		<dialog--handle-poll />
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
import DialogHandlePoll from '@/components/polls/admin/DialogHandlePoll.vue';
import PollListPanel from '@/components/polls/admin/PollListPanel.vue';
import PollLivePanel from '@/components/polls/admin/PollLivePanel.vue';

export default {
	name: 'AdminPolls',
	components: {
		'dialog--handle-poll': DialogHandlePoll,
		'poll-panel--list': PollListPanel,
		'poll-panel--live': PollLivePanel,
	},
	created() {
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
			// this.$root.$emit('update-poll-options');
		},
		new_edited_poll_option(opt) {
			this.mergePollOpt(opt);
			this.$root.$emit('update-poll-options');
		},
		new_deleted_poll_option(opt) {
			console.warn(opt);
			// this.$root.$emit('update-poll-options');
		},
	},
	methods: {
		...mapMutations({
			setPolls: 'admin/polls/SET_POLLS',
			addPoll: 'admin/polls/ADD_POLL',
			deletePoll: 'admin/polls/DELETE_POLL',
			deletePollOption: 'admin/pollOptions/DELETE_POLL_OPTION',
			mergePoll: 'admin/polls/MERGE_POLL',
			mergePollOpt: 'admin/pollOptions/MERGE_POLL_OPTION',
		}),
	},
};
</script>

<style>
</style>
