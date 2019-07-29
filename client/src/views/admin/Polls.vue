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
		<dialog--create-poll />
	</div>
</template>

<script>
import { mapMutations } from 'vuex';
import PollListPanel from '@/components/polls/admin/PollListPanel.vue';
import PollLivePanel from '@/components/polls/admin/PollLivePanel.vue';
import DialogCreatePoll from '@/components/polls/admin/DialogCreatePoll.vue';

export default {
	name: 'AdminPolls',
	components: {
		'poll-panel--list': PollListPanel,
		'poll-panel--live': PollLivePanel,
		'dialog--create-poll': DialogCreatePoll,
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
	methods: {
		...mapMutations({
			setPolls: 'admin/polls/SET_POLLS',
		}),
	},
};
</script>

<style>
</style>
