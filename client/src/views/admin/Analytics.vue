<template>
	<div>
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<div v-t="'ana-title'" class="subheading first-letter-uppercase mx-3 my-2" />

		<v-layout align-center justify-space-between wrap fill-height>
			<!-- *Active users -->
			<v-flex md4 xs12 :px-2="!isXS" :mb-4="isXS">
				<card--over-view :info="cards.activeUsers" icon="group_people" />
			</v-flex>

			<!-- *Questions -->
			<v-flex md4 xs12 :px-2="!isXS" :mb-4="isXS">
				<card--over-view :info="cards.questions" question icon="questions" />
			</v-flex>

			<!-- *Polls -->
			<v-flex md4 xs12 :pl-1="!isXS">
				<card--over-view :info="cards.polls" icon="polls" />
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
import OverViewCard from '@/components/analytics/OverViewCard.vue';
const initCard = () => ({
	activeUsers: {
		color: 'deep-orange',
		header: 'ana-users',
		headerCount: 0,
		fTitle: 'ana-users',
		fTitleCount: 0,
		sTitle: 'ana-users',
		sTitleCount: 0,
	},
	questions: {
		color: 'orange',
		header: 'ana-questions',
		headerCount: 0,
		fTitle: 'ana-questions-react',
		fTitleCount: 0,
		sTitle: 'ana-questions-anonymous',
		sTitleCount: 0,
	},
	polls: {
		color: 'green',
		header: 'ana-poll-votes',
		headerCount: 0,
		fTitle: 'ana-poll-created',
		fTitleCount: 0,
		sTitle: 'ana-vote-per-poll',
		sTitleCount: 0,
	},
});

export default {
	name: 'AdminAnalytics',
	components: {
		'card--over-view': OverViewCard,
	},
	data: () => ({
		cards: initCard(),
	}),
};
</script>

<style>
</style>
