<template>
	<div>
		<template v-if="hostOnly">
			<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
			<div v-t="'ana-title'" class="subheading first-letter-uppercase mx-3 my-2" />

			<v-layout
				align-center
				justify-space-between
				wrap
				fill-height>
				<!-- *Active users -->
				<v-flex sm4 xs12 :px-2="!isXS" :mb-4="isXS">
					<card--over-view
						icon="group_people"
						:info="cards.activeUsers"
						:header-count="analytics.roles" />
				</v-flex>

				<!-- *Questions -->
				<v-flex sm4 xs12 :px-2="!isXS" :mb-4="isXS">
					<card--over-view
						question
						icon="questions"
						:info="cards.questions"
						:header-count="analytics.questions"
						:f-title-count="analytics.likes"
						:f-sub-title-count="analytics.dislikes"
						:s-title-count="analytics.replies" />
				</v-flex>

				<!-- *Polls -->
				<v-flex sm4 xs12 :pl-1="!isXS">
					<card--over-view
						icon="polls"
						:info="cards.polls"
						:header-count="analytics.polls" />
				</v-flex>
			</v-layout>
		</template>

		<v-layout
			v-else
			:wrap="!isXS"
			:column="isXS"
			align-center
			justify-center>
			<v-flex xs12 md7 order-md2>
				<img class="mt-4" :src="require('@/assets/no_data.svg')">
			</v-flex>
			<v-flex
				class="text-xs-center"
				xs12
				md5
				order-md1>
				<div
					v-t="'err-permission-analytic'"
					class="headline font-weight-light" />
				<v-btn
					v-t="'btn-back-event'"
					round
					small
					class="mt-3 px-3"
					color="primary"
					@click="backToEvent" />
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import OverViewCard from '@/components/analytics/OverViewCard.vue';
const initCard = () => ({
	activeUsers: {
		color: 'deep-orange',
		header: 'ana-users',
		fTitle: 'ana-users',
		sTitle: 'ana-users',
	},
	questions: {
		color: 'orange',
		header: 'ana-questions',
		fTitle: 'ana-questions-react',
		sTitle: 'ana-questions-replies',
	},
	polls: {
		color: 'green',
		header: 'ana-poll-votes',
		fTitle: 'ana-poll-created',
		sTitle: 'ana-vote-per-poll',
	},
});

export default {
	name: 'AdminAnalytics',
	components: {
		'card--over-view': OverViewCard,
	},
	data: () => ({
		cards: initCard(),
		analytics: {
			dislikes: '0',
			likes: '0',
			polls: '0',
			questions: '0',
			replies: '0',
			roles: '0',
		},
	}),
	computed: {
		...mapGetters({
			eventInfo: 'admin/event/getEventInfo',
			eventRole: 'admin/event/getRole',
		}),
		hostOnly() {
			if (this.eventRole && this.eventRole.name !== undefined && this.eventRole.name === 'host') {
				return true;
			}
			return false;
		},
		fetchAnalytic() {
			if (this.hostOnly) {
				this.getEventAnalytic();
			}
			return false;
		},
	},
	methods: {
		getEventAnalytic() {
			this.$axios
				.get(`${this.$api.event.analytic}/${this.eventInfo.code}`)
				.then((res) => {
					Object.assign(this.analytics, res.data);
					console.warn(res.data);
				})
				.catch(err => console.warn(err));
		},
		backToEvent() {
			this.$router.push({
				name: 'admin-event',
				params: { code: this.eventInfo.code },
			});
		},
	},
};
</script>

<style>
</style>
