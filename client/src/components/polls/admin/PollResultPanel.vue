<template>
	<v-layout row wrap>
		<v-layout
			class="px-3 pt-3 pb-2"
			align-center
			justify-space-between
			row
			fill-height>
			<!-- title -->
			<div v-t="'btn-poll-result'" class="grey--text pt-1" />

			<!-- count user online -->
			<v-chip id="users-online" small label color="primary" text-color="white">
				<span class="font-weight-bold">
					{{ onlineUsers }}
				</span>
				<v-icon small right v-text="'$vuetify.icons.group_people'" />
			</v-chip>
		</v-layout>

		<v-card class="w-100 card-wrapper list-scroll scrollbar-primary list-scroll">
			<v-layout v-if="_cm.notEmpty(getPollResult)" row wrap>
				<v-flex xs12>
					<card--poll-result />
				</v-flex>
			</v-layout>
			<empty-state--poll v-else />
		</v-card>
	</v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import EmptyPoll from './EmptyPoll.vue';
import PollResultCard from './PollResultCard.vue';

export default {
	name: 'PollResultPanel',
	components: {
		'empty-state--poll': EmptyPoll,
		'card--poll-result': PollResultCard,
	},
	computed: {
		...mapGetters({
			onlineUsers: 'admin/event/getOnlineUsers',
			getPollResult: 'admin/pollOptions/getPollResult',
		}),
	},
};
</script>

<style lang="css">
</style>
