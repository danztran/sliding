<template>
	<div>
		<span v-show="false">{{ $t('FOR_A_PURPOSE') }}</span>
		<v-layout row justify-space-between align-center>
			<div v-t="'event-status'"></div>
			<v-btn
				round
				color="success"
				dark small
				@click.stop="createEvent">
				{{ $t('create-event') }}
			</v-btn>
		</v-layout>
		<!-- <bouncy-loader v-show="loading"/> -->
		<template v-for="(event, i) in events">
			<event-card  :key="i" :field="event"/>
		</template>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import EventCard from '@/components/EventCard.vue';
// import BouncyBallLoader from '@/components/BouncyBallLoader.vue';

export default {
	name: 'Events',
	components: {
		'event-card': EventCard
		// 'bouncy-loader': BouncyBallLoader
	},
	data: () => ({
		queryOpt: {
			offset: 0,
			length: 0,
			order: 'created_at'
		}
	}),
	computed: {
		...mapGetters({
			events: 'event/events'
		})
	},
	methods: {
		createEvent() {
			this.$root.$emit('create-new-event');
		}
	},
	mounted() {
		this.$store.dispatch('event/queryEvent', this.queryOpt);
	}
};
</script>

<style>
</style>
