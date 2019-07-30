<template>
	<v-layout row wrap>
		<!-- @desc: title - actions create -->
		<v-layout
			class="pl-3 py-2"
			align-center
			justify-space-between
			row
			fill-height>
			<!-- *title: List poll -->
			<div v-t="'poll-list-view-title'" class="pt-1 body-1 grey--text" />
			<!-- *create poll -->
			<v-btn
				small
				round
				color="success"
				@click="toggleDialogCreate">
				<span
					v-t="'btn-create-poll'"
					class="first-letter-uppercase px-2" />
			</v-btn>
		</v-layout>

		<v-card class="w-100 card-wrapper list-scroll scrollbar-primary list-scroll">
			<v-layout row wrap>
				<v-flex xs12>
					<poll-card--create />
					<poll--card
						v-for="poll in polls"
						:key="poll.id"
						:poll="poll"
						@delete-poll="deletePoll(poll.id)" />
				</v-flex>
			</v-layout>
		</v-card>
	</v-layout>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import PollCreateCard from './PollCreateCard.vue';
import PollCard from './PollCard.vue';

export default {
	name: 'PollListPanel',
	components: {
		'poll-card--create': PollCreateCard,
		'poll--card': PollCard,
	},
	computed: {
		...mapGetters({
			polls: 'admin/polls/getPolls',
		}),
	},
	methods: {
		...mapMutations({
			delPoll: 'admin/polls/DELETE_POLL',
		}),
		toggleDialogCreate() {
			this.$root.$emit('dialog-create-poll');
		},
		deletePoll(id) {
			const emiter = 'delete-poll';
			this.deleting = true;
			this.$socket.emit(emiter, { id }, ({ errmsg, poll }) => {
				this.deleting = false;
				if (!poll) {
					if (errmsg) {
						this.showNotify(errmsg, 'danger');
					}
					return;
				}
				this.delPoll(poll);
			});
		},
	},
};
</script>

<style lang="css" scoped>
</style>
