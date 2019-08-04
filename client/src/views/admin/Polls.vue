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
			console.warn(newPollOpt);
		},
		new_edited_poll_option(editPollOpt) {
			console.warn(editPollOpt);
		},
		new_deleted_poll_option(delPollOpt) {
			console.warn(delPollOpt);
		},
	},
	methods: {
		...mapMutations({
			setPolls: 'admin/polls/SET_POLLS',
			addPoll: 'admin/polls/ADD_POLL',
			deletePoll: 'admin/polls/DELETE_POLL',
			mergePoll: 'admin/polls/MERGE_POLL',
		}),
	},
};
</script>

<style>
</style>
